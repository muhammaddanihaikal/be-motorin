import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { deleteFile, uploadFile } from "../utils/storageSupabase.js";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

// save data rental
export const updateRentalByUserId = async (req, res) => {
  try {
    // ambil userId dari body
    const { userId } = req.body;

    // validasi: jika data userId tidak ada
    if (!userId) {
      return res.status(400).json({
        message: "data (userId) tidak ada",
      });
    }

    // cek user di db
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // validasi: jika data user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "data user dengan (userId) tidak ditemukan",
      });
    }

    // cek data rental berdasarkan userId
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data rental tidak ada
    if (!rental) {
      return res.status(404).json({
        message: "data rental dengan (userId) tidak ditemukan",
      });
    }

    // // validasi: jika user bukan role rental dan userId tidak sama dg di tabel rental
    // // validasi: hanya user rental dan pemilik rental yang bisa operasi profil
    // if (user.roleId !== 2 && userId !== rental.userId) {
    //   return res.status(400).json({
    //
    //     message: "user tidak memiliki akses untuk operasi ini",
    //   });
    // }

    // ambil data profil rental
    let { nama, noHp, alamat, foto, kotaId, bankId, noRekening } = req.body;

    if (!kotaId) {
      return res.status(400).json({
        message: "data (kotaId) tidak ada",
      });
    }

    // parsing data ke number
    kotaId = parseInt(kotaId);

    // validasi: jika data yang diparsing tidak valid
    if (isNaN(kotaId)) {
      return res.status(400).json({
        message: "data (kotaId) tidak valid",
      });
    }

    // cek kota di db
    const kota = await prisma.kota.findUnique({
      where: {
        id: kotaId,
      },
    });

    // validasi: jika data kota tidak ditemukan
    if (!kota) {
      return res.status(404).json({
        message: "data kota berdasarkan (kotaId) tidak ditemukan",
      });
    }

    // validasi: jika no hp tidak valid
    if (noHp && !validator.isMobilePhone(noHp, "id-ID")) {
      return res.status(400).json({
        message: "data (noHp) tidak valid",
      });
    }

    // validasi: jika ada file
    if (req.file) {
      // ambil file buffer
      const fileBuffer = req.file.buffer;
      const originalFileName = req.file.originalname;

      // proses upload file dan isi variabel foto dengan url file
      foto = await uploadFile("images", "rental", fileBuffer, originalFileName);

      // validasi: jika sebelumnya ada data rental dan foto profil
      if (rental.foto) {
        // hapus foto profil di supabase
        await deleteFile(rental.foto);
      }
    }

    // buat object new rental dan isi dengan data lama
    const newRental = {
      nama: rental.nama,
      noHp: rental.noHp,
      foto: rental.foto,
      alamat: rental.alamat,
      kotaId: rental.kotaId,
      bankId: rental.bankId,
      noRekening: rental.noRekening,
    };
    // isi dengan value jika ada (truthy)
    if (nama) newRental.nama = nama;
    if (noHp) newRental.noHp = noHp;
    if (foto) newRental.foto = foto;
    if (alamat) newRental.alamat = alamat;
    if (kotaId) newRental.kotaId = kotaId;
    if (bankId) newRental.bankId = bankId;
    if (noRekening) newRental.noRekening = noRekening;

    // proses simpan data
    await prisma.rental.update({
      data: newRental,
      where: {
        userId,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil menyimpan data profil rental",
      data: { rentalId: rental.id, userId },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ambil satu data rental by userId
export const getRentalByUserId = async (req, res) => {
  try {
    // ambil rentalId dari body
    const { userId, rentalId } = req.query;

    // cek rental berdasarkan rentalId
    let rental;
    if (rentalId) {
      rental = await prisma.rental.findUnique({
        where: {
          id: rentalId,
        },
      });
    } else if (userId) {
      rental = await prisma.rental.findUnique({
        where: {
          userId,
        },
      });
    }

    // validasi: jika data rental tidak ada
    if (!rental) {
      return res.status(404).json({
        message: "data rental dengan (userId | rentalId) tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan satu data rental",
      data: rental,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ambil semua data rental
export const getRentalsByKotaId = async (req, res) => {
  try {
    // ambil kotaId dari body
    const kotaId = parseInt(req.query.kotaId);

    // validasi: jika data kotaId tidak ada
    if (!kotaId) {
      return res.status(400).json({
        message: "data (kotaId) tidak ada",
      });
    }

    // cek kota berdasarkan kotaId
    const kota = await prisma.kota.findUnique({
      where: {
        id: kotaId,
      },
    });

    // validasi: jika data kota tidak ada
    if (!kota) {
      return res.status(404).json({
        message: "data kota dengan (kotaId) tidak ditemukan",
      });
    }

    // proses ambil data rental berdasarkan kotaId
    const rental = await prisma.rental.findMany({
      where: {
        kotaId,
      },
      include: {
        kota: true,
        bank: true,
      },
    });

    // validasi: jika data rental tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message: "data rental dengan (kotaId) tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data rental",
      data: rental,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Kota
export const getKotas = async (req, res) => {
  try {
    const kotas = await prisma.kota.findMany();

    // berikan response success
    return res.json({
      message: "berhasil mengambil semua data kota",
      data: kotas,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//==========================================================

// BANK
// (done)
export const saveRentalBankByUserId = async (req, res) => {
  try {
    // ambil userId dari body
    const { userId } = req.body;

    // validasi: jika data userId tidak ada
    if (!userId) {
      return res.status(400).json({
        message: "data (userId) tidak ada",
      });
    }

    // cek user di db
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // validasi: jika data user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "data user dengan (userId) tidak ditemukan",
      });
    }

    // cek data rental berdasarkan userId
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data rental tidak ada
    if (!rental) {
      return res.status(404).json({
        message: "data rental dengan (userId) tidak ditemukan",
      });
    }

    // ambil data bank
    let { bankId, noRekening } = req.body;

    // validasi: jika data yang dikirim tidak lengkap
    if (!bankId || !noRekening) {
      return res.status(400).json({
        message: "data (bankId,noRekening) tidak ada",
      });
    }

    // proses update data bank
    await prisma.rental.update({
      where: {
        userId,
      },
      data: {
        bankId,
        noRekening,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil menyimpan data rental bank",
      data: { rentalId: rental.id },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const getRentalBankByUserId = async (req, res) => {
  try {
    // ambil userId dari body
    const { userId } = req.body;

    // validasi: jika data userId tidak ada
    if (!userId) {
      return res.status(400).json({
        message: "data (userId) tidak ada",
      });
    }

    // cek user berdasarkan userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // validasi: jika data user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "data user dengan (userId) tidak ditemukan",
      });
    }

    // proses ambil data rental berdasarkan userId
    const rentalBankData = await prisma.rental.findUnique({
      where: {
        userId,
      },
      select: {
        bank: {
          select: {
            nama: true,
          },
        },
        noRekening: true,
      },
    });

    // validasi: jika data bank rental tidak ada
    if (!rentalBankData) {
      return res.status(404).json({
        message: "data rental bank dengan (userId) tidak ditemukan",
      });
    }

    // format rentalBank
    const rentalBank = {
      nama: rentalBankData.bank.nama,
      noRekening: rentalBankData.noRekening,
    };

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data bank rental",
      data: rentalBank,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBanks = async (req, res) => {
  try {
    const banks = await prisma.bank.findMany();

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan semua data bank",
      data: banks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// VERIFIKASI
export const createVerification = async (req, res) => {
  try {
    // ambil data userId
    const { userId } = req.body;

    // validasi: jika data user berdasarkan (userId) tidak ditemukan
    if (!userId) {
      return res.status(400).json({
        message: "data (userId) tidak ada",
      });
    }

    // cek user berdasarkan (userId)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // validasi: jika data user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "data user berdasarkan (userId) tidak ditemukan",
      });
    }

    // proses ambil data rental
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data rental berdasarkan (userId) tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message: "data rental berdasarkan (userId) tidak ditemukan",
      });
    }

    // cek fotoRental di db
    const fotoRental = await prisma.fotoRental.findMany({
      where: {
        rentalId: rental.id,
      },
    });

    // validasi: jika fotoRental sudah ada
    if (fotoRental.length > 0) {
      return res.status(400).json({
        message: "data fotoRental berdasarkan (rentalId) sudah ada",
      });
    }

    // ambil data fotoRental
    const files = req.files;
    console.log(files.length);

    // validasi: jika data (fotoRental) tidak ada
    if (!files) {
      return res.status(400).json({
        message: "data (fotoRental) tidak ada",
      });
    }

    // validasi: jika data fotoRental > 5
    if (files.length > 5) {
      return res.status(400).json({
        message: "data (fotoRental) tidak boleh lebih dari 5",
      });
    }

    // maping data fotoRental
    const fotoRentalPromises = files.map(async (file) => {
      // ambil file buffer
      const fileBuffer = file.buffer;
      const originalFileName = file.originalname;

      // proses upload data
      const fileUrl = await uploadFile(
        "images",
        "rental",
        fileBuffer,
        originalFileName
      );

      // proses create data
      await prisma.fotoRental.create({
        data: {
          id: `fr${nanoid(3)}`,
          url: fileUrl,
          rentalId: rental.id,
        },
      });
    });

    // jalankan semua promise
    await Promise.all(fotoRentalPromises);

    // berikan response success
    return res.status(201).json({
      message: "berhasil mengunggah fotoRental",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
