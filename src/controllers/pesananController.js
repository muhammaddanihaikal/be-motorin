import { PrismaClient } from "@prisma/client";
import { currentDate, jakartaIndonesiaTime } from "../utils/time.js";
import { generateRandomId } from "../utils/randomId.js";

const prisma = new PrismaClient();

export const createPesanan = async (req, res) => {
  try {
    // ambil data pesanan
    const {
      tanggalMulai,
      tanggalSelesai,
      lokasiAmbil,
      lokasiKembali,
      waktuAmbil,
      waktuKembali,
      motorId,
      penyewaId,
    } = req.body;
    const jaminanId = parseInt(req.body.jaminanId);

    // validasi: jika data yang diparsing tidak valid
    if (isNaN(jaminanId)) {
      return res.status(400).json({
        message: "data (jaminanId) tidak valid",
      });
    }

    // validasi: jika data tidak ada
    if (
      !tanggalMulai ||
      !tanggalSelesai ||
      !lokasiAmbil ||
      !lokasiKembali ||
      !waktuAmbil ||
      !waktuKembali ||
      !jaminanId ||
      !motorId ||
      !penyewaId
    ) {
      return res.status(400).json({
        message:
          "data (  tanggalMulai | tanggalSelesai  | lokasiAmbil | lokasiKembali | waktuAmbil | waktuKembali | jaminanId | motorId | penyewaId ) tidak ada",
      });
    }

    // buat data tanggal
    const waktuPesanDate = jakartaIndonesiaTime(new Date());
    const tanggalMulaiDate = new Date(tanggalMulai);
    const tanggalSelesaiDate = new Date(tanggalSelesai);

    // validasi: jika data tanggal tidak valid
    if (
      tanggalMulaiDate > tanggalSelesaiDate ||
      tanggalMulaiDate < currentDate() ||
      tanggalSelesaiDate < currentDate()
    ) {
      return res.status(400).json({
        message: "data (tanggalMulai) | (tanggalSelesai) tidak valid",
      });
    }

    // rubah tanggal ke format ISO 8601
    const waktuPesanISO = waktuPesanDate.toISOString();
    const tanggalMulaiISO = tanggalMulaiDate.toISOString();
    const tanggalSelesaiISO = tanggalSelesaiDate.toISOString();

    // buat data durasi (hari)
    const durasi =
      (tanggalSelesaiDate - tanggalMulaiDate) / (1000 * 3600 * 24) + 1;

    // validasi: format waktuAmbil dan waktuKembali harus HH:MM
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeFormat.test(waktuAmbil) || !timeFormat.test(waktuKembali)) {
      return res.status(400).json({
        message: "data (waktuAmbil | waktuKembali) harus dalam format HH:MM",
      });
    }

    // validasi: jika waktu harus antara 05:00-22:00
    const [ambilJam, ambilMenit] = waktuAmbil.split(":").map(Number);
    const [kembaliJam, kembaliMenit] = waktuKembali.split(":").map(Number);
    if (
      ambilJam < 5 ||
      ambilJam > 22 ||
      (ambilJam === 22 && ambilMenit > 0) ||
      kembaliJam < 5 ||
      kembaliJam > 22 ||
      (kembaliJam === 22 && kembaliMenit > 0)
    ) {
      return res.status(400).json({
        message:
          "data (waktuAmbil | waktuKembali) harus antara 05:00 sampai 22:00",
      });
    }

    // cek data motor di db
    const motor = await prisma.motor.findUnique({
      where: {
        id: motorId,
      },
    });

    // validasi: jika data motor tidak ditemukan
    if (!motor) {
      return res.status(404).json({
        message: "data motor berdasarkan (motorId) tidak ditemukan",
      });
    }

    // cek data penyewa di db
    const penyewa = await prisma.penyewa.findUnique({
      where: {
        id: penyewaId,
      },
    });

    // validasi: jika data penyewa tidak ditemukan
    if (!penyewa) {
      return res.status(404).json({
        message: "data penyewa berdasarkan (penyewaId) tidak ditemukan",
      });
    }

    // cek data jaminan di db
    const jaminan = await prisma.jaminan.findUnique({
      where: {
        id: jaminanId,
      },
    });

    // validasi: jika data jaminan tidak ditemukan
    if (!jaminan) {
      return res.status(404).json({
        message: "data jaminan berdasarkan (jaminanId) tidak ditemukan",
      });
    }

    // buat data harga
    const hargaMotor = parseInt(motor.harga);
    const hargaAmbil =
      lokasiAmbil === "rental" ? 0 : parseInt(process.env.HARGA_ANTAR_JEMPUT);
    const hargaKembali =
      lokasiKembali === "rental" ? 0 : parseInt(process.env.HARGA_ANTAR_JEMPUT);

    // validasi: jika data tidak valid
    if (isNaN(hargaMotor) || isNaN(hargaAmbil) || isNaN(hargaKembali)) {
      return res.status(500).json({
        message: "data (hargaMotor, hargaAmbil, hargaKembali) tidak valid",
      });
    }

    // buat data totalHarga
    const totalHarga = hargaMotor * durasi + hargaAmbil + hargaKembali;
    // console.log({
    //   hargaAmbil,
    //   hargaKembali,
    //   durasi,
    //   hargaMotor,
    //   totalHarga,
    // });

    // proses create data pesanan
    const pesanan = await prisma.pesanan.create({
      data: {
        id: `ps${generateRandomId(6)}`,
        totalHarga,
        waktuPesan: waktuPesanISO,
        tanggalMulai: tanggalMulaiISO,
        tanggalSelesai: tanggalSelesaiISO,
        durasi,
        lokasiAmbil,
        lokasiKembali,
        waktuAmbil,
        waktuKembali,
        status: "pending",
        jaminanId,
        motorId,
        penyewaId,
      },
    });

    // buat data pembayaran
    await prisma.pembayaran.create({
      data: {
        id: `pm${generateRandomId(6)}`,
        pesananId: pesanan.id,
      },
    });

    // berikan response success
    return res.status(201).json({
      message: "berhasil membuat data pesanan",
      data: {
        pesananId: pesanan.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// untuk halaman detail pesanan (done)
export const getPesananByPesananId = async (req, res) => {
  try {
    // ambil data (pesananId)
    const { pesananId } = req.query;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan di db
    const pesanan = await prisma.pesanan.findUnique({
      where: {
        id: pesananId,
      },
      include: {
        jaminan: true,
        motor: {
          include: {
            rental: true,
          },
        },
        penyewa: true,
        pembayaran: true,
      },
    });

    // Validasi: jika pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        message: "data pesanan tidak ditemukan",
      });
    }

    // buat object data response
    const pesananData = {
      id: pesanan.id,
      totalHarga: pesanan.totalHarga,
      waktuPesan: pesanan.waktuPesan,
      tanggalMulai: pesanan.tanggalMulai,
      tanggalSelesai: pesanan.tanggalSelesai,
      lokasiAmbil: pesanan.lokasiAmbil,
      lokasiKembali: pesanan.lokasiKembali,
      waktuAmbil: pesanan.waktuAmbil,
      waktuKembali: pesanan.waktuKembali,
      durasi: pesanan.durasi,
      jaminan: pesanan.jaminan.nama,
      status: pesanan.status,
      motor: {
        nama: pesanan.motor.nama,
        harga: pesanan.motor.harga,
        foto: pesanan.motor.foto,
      },
      rental: {
        nama: pesanan.motor.rental.nama,
        alamat: pesanan.motor.rental.alamat,
        noHp: pesanan.motor.rental.noHp,
        foto: pesanan.motor.rental.foto,
      },
      penyewa: {
        nama: pesanan.penyewa.nama,
        noHp: pesanan.penyewa.noHp,
      },
      pembayaran: {
        waktuDibuat: pesanan.pembayaran.waktuDibuat,
        waktuDikonfirmasi: pesanan.pembayaran.waktuDikonfirmasi,
        metode: pesanan.pembayaran.metode,
        status: pesanan.pembayaran.status,
        url: pesanan.pembayaran.url,
      },
    };

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data pesanan berdasarkan (pesanansId)",
      data: pesananData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// untuk halaman pesanan penyewa (done)
export const getPesananPenyewaByUserId = async (req, res) => {
  try {
    // ambil data (userId)
    const { userId, bulan, tahun } = req.query;

    // validasi: jika data (userId) tidak ada
    if (!userId || !bulan || !tahun) {
      return res.status(400).json({
        message: "data (userId, bulan, tahun) tidak ada",
      });
    }

    // cek data penyewa di db
    const penyewa = await prisma.penyewa.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data penyewa tidak ditemukan
    if (!penyewa) {
      return res.status(404).json({
        message: "data penyewa berdasarkan (penyewaId) tidak ditemukan",
      });
    }

    // ambil data pesanan berdasarkan penyewaId
    const pesanan = await prisma.pesanan.findMany({
      where: {
        penyewa: {
          id: penyewa.id,
        },
        tanggalMulai: {
          gte: new Date(tahun, bulan - 1, 1),
          lt: new Date(tahun, bulan, 1),
        },
      },
      include: {
        jaminan: true,
        motor: {
          include: {
            rental: true,
          },
        },
        penyewa: true,
        pembayaran: true,
      },
      orderBy: {
        waktuPesan: "desc", // mengurutkan yang terbaru akan diatas
      },
    });

    // buat object data response
    const pesananData = pesanan.map((e) => ({
      id: e.id,
      totalHarga: e.totalHarga,
      waktuPesan: e.waktuPesan,
      tanggalMulai: e.tanggalMulai,
      tanggalSelesai: e.tanggalSelesai,
      lokasiAmbil: e.lokasiAmbil,
      lokasiKembali: e.lokasiKembali,
      waktuAmbil: e.waktuAmbil,
      waktuKembali: e.waktuKembali,
      durasi: e.durasi,
      status: e.status,
      jaminan: e.jaminan.nama,
      motor: {
        nama: e.motor.nama,
        harga: e.motor.harga,
        foto: e.motor.foto,
      },
      rental: {
        nama: e.motor.rental.nama,
        alamat: e.motor.rental.alamat,
        noHp: e.motor.rental.noHp,
      },
      penyewa: {
        nama: e.penyewa.nama,
        noHp: e.penyewa.noHp,
      },
      pembayaran: {
        waktuDibuat: e.pembayaran.waktuDibuat,
        waktuDikonfirmasi: e.pembayaran.waktuDikonfirmasi,
        metode: e.pembayaran.metode,
        status: e.pembayaran.status,
        url: e.pembayaran.url,
      },
    }));

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data pesanan berdasarkan (penyewaId)",
      data: pesananData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// untuk halaman pesanan rental (done)
export const getPesananRentalByUserId = async (req, res) => {
  try {
    // ambil data (userId)
    const { userId, bulan, tahun } = req.query;

    // validasi: jika data (userId) tidak ada
    if (!userId || !bulan || !tahun) {
      return res.status(400).json({
        message: "data (userId, bulan, tahun) tidak ada",
      });
    }

    // cek data rental di db
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data rental tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message: "data rental berdasarkan (userId) tidak ditemukan",
      });
    }

    // ambil data pesanan berdasarkan rentalId
    const pesanan = await prisma.pesanan.findMany({
      where: {
        motor: {
          rentalId: rental.id,
        },
        tanggalMulai: {
          gte: new Date(tahun, bulan - 1, 1),
          lt: new Date(tahun, bulan, 1),
        },
      },
      include: {
        jaminan: true,
        motor: {
          include: {
            rental: true,
          },
        },
        penyewa: true,
        pembayaran: true,
      },
      orderBy: {
        waktuPesan: "desc", // mengurutkan yang terbaru akan diatas
      },
    });

    // buat object data response
    const pesananData = pesanan.map((e) => ({
      id: e.id,
      totalHarga: e.totalHarga,
      waktuPesan: e.waktuPesan,
      tanggalMulai: e.tanggalMulai,
      tanggalSelesai: e.tanggalSelesai,
      lokasiAmbil: e.lokasiAmbil,
      lokasiKembali: e.lokasiKembali,
      waktuAmbil: e.waktuAmbil,
      waktuKembali: e.waktuKembali,
      durasi: e.durasi,
      jaminan: e.jaminan.nama,
      status: e.status,
      motor: {
        nama: e.motor.nama,
        harga: e.motor.harga,
        foto: e.motor.foto,
      },
      rental: {
        nama: e.motor.rental.nama,
        alamat: e.motor.rental.alamat,
        noHp: e.motor.rental.noHp,
      },
      penyewa: {
        nama: e.penyewa.nama,
        noHp: e.penyewa.noHp,
      },
      pembayaran: {
        waktuDibuat: e.pembayaran.waktuDibuat,
        waktuDikonfirmasi: e.pembayaran.waktuDikonfirmasi,
        metode: e.pembayaran.metode,
        status: e.pembayaran.status,
        url: e.pembayaran.url,
      },
    }));

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data pesanan berdasarkan (rentalId)",
      data: pesananData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// laporan penjualan (done)
export const getPesananByStatusPembayaran99 = async (req, res) => {
  try {
    // ambil data (userId)
    let { userId, bulan, tahun } = req.query;

    // validasi: jika data (userId) tidak ada
    if (!userId || !bulan || !tahun) {
      return res.status(400).json({
        message: "data (userId, bulan, tahun) tidak ada",
      });
    }

    // parsing ke int
    bulan = parseInt(bulan);
    tahun = parseInt(tahun);

    const startDate = new Date(tahun, bulan - 1, 1); // kenapa dikurangi? karena bulan dimulai dari 0
    const endDate = new Date(tahun, bulan, 0, 23, 59, 59); // hari 0 pada bulan adalah, hari akhir pada bulan sebelumnya

    // console.log({ startDate, endDate });

    // cek data rental di db
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data rental tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message: "data rental berdasarkan (rentalId) tidak ditemukan",
      });
    }

    // ambil data pesanan berdasarkan rentalId
    const penjualanBulanan = await prisma.pesanan.findMany({
      where: {
        motor: {
          rental: {
            userId,
          },
        },
        pembayaran: {
          some: {
            status: "settlement",
          },
        },
        waktuPesan: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        motor: true,
        pembayaran: true,
      },
    });
    console.log(penjualanBulanan);

    // Menghitung total pendapatan per motor
    const penjualanPerMotor = penjualanBulanan.reduce((acc, pesanan) => {
      const motor = pesanan.motor;
      if (!acc[motor.id]) {
        acc[motor.id] = {
          nama: motor.merek,
          totalPendapatan: 0,
        };
      }
      acc[motor.id].totalPendapatan += motor.harga * pesanan.durasi;
      // console.log({ harga: motor.harga, durasi: pesanan.durasi });
      return acc;
    }, {});

    // Menghitung total keseluruhan
    const totalKeseluruhan = Object.values(penjualanPerMotor).reduce(
      (acc, motor) => acc + motor.totalPendapatan,
      0
    );

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data pesanan berdasarkan (rentalId)",
      data: {
        penjualanPerMotor: Object.values(penjualanPerMotor),
        totalKeseluruhan,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPesananByStatusPembayaran = async (req, res) => {
  try {
    // Ambil data (userId, bulan, tahun) dari query
    let { userId, bulan, tahun } = req.query;

    // Validasi input
    if (!userId || !bulan || !tahun) {
      return res.status(400).json({
        message: "data (userId, bulan, tahun) tidak ada",
      });
    }

    // Parsing bulan dan tahun ke integer
    bulan = parseInt(bulan);
    tahun = parseInt(tahun);

    // Hitung tanggal awal dan akhir bulan
    const startDate = new Date(tahun, bulan - 1, 1);
    const endDate = new Date(tahun, bulan, 0, 23, 59, 59);

    // Cek data rental di database
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // Validasi: jika data rental tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message: "data rental berdasarkan (userId) tidak ditemukan",
      });
    }

    // Ambil data pesanan berdasarkan rentalId dan status pembayaran "settlement"
    const penjualanBulanan = await prisma.pesanan.findMany({
      where: {
        motor: {
          rental: {
            userId,
          },
        },
        pembayaran: {
          status: "settlement",
        },
        waktuPesan: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        motor: true,
        pembayaran: true,
      },
    });

    // Menghitung total pendapatan per motor
    const penjualanPerMotor = penjualanBulanan.reduce((acc, pesanan) => {
      const motor = pesanan.motor;
      let totalHarga = motor.harga * pesanan.durasi;

      if (pesanan.lokasiAmbil !== "rental") {
        totalHarga += parseInt(process.env.HARGA_ANTAR_JEMPUT);
      }

      if (pesanan.lokasiKembali !== "rental") {
        totalHarga += parseInt(process.env.HARGA_ANTAR_JEMPUT);
      }

      if (!acc[motor.id]) {
        acc[motor.id] = {
          nama: motor.nama,
          totalPendapatan: 0,
        };
      }
      acc[motor.id].totalPendapatan += totalHarga;
      return acc;
    }, {});

    // Menghitung total keseluruhan
    const totalKeseluruhan = Object.values(penjualanPerMotor).reduce(
      (acc, motor) => acc + motor.totalPendapatan,
      0
    );

    // Berikan response success
    return res.json({
      message: "Berhasil mendapatkan data pesanan berdasarkan (userId)",
      data: {
        penjualanPerMotor: Object.values(penjualanPerMotor),
        totalKeseluruhan,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// jaminan
export const getJaminans = async (req, res) => {
  try {
    const jaminans = await prisma.jaminan.findMany();

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan semua data jaminan",
      data: jaminans,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
