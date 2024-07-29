import { PrismaClient } from "@prisma/client";
import { snap } from "../config/midtransConfig.js";
import { jakartaIndonesiaTime } from "../utils/time.js";
import { generateRandomId } from "../utils/randomId.js";
import axios from "axios";
import { uploadFile, deleteFile } from "../utils/storageSupabase.js";

const prisma = new PrismaClient();

// MIDTRANS
// membuat redirect_url midtrans
export const createTransaction99 = async (req, res) => {
  try {
    // ambil data pesananId
    const { pesananId } = req.params;

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: { id: pesananId },
    });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        message: "data pesanan berdasarkan (pesananId) tidak ditemukan",
      });
    }

    // cek data pembayaran
    const pembayaran = await prisma.pembayaran.findUnique({
      where: {
        pesananId,
      },
    });

    // validasi: jika data pembayaran tidak ditemukan
    if (!pembayaran) {
      return res.status(404).json({
        message: "data pembayaran berdasarkan (pesananId) tidak ditemukan",
      });
    }
    // console.log({ pembayaran });

    // konfigurasi authorization midtrans
    const auth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
      "base64"
    );
    // cek status pembayaran
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${pesananId}/status`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const data = response.data;
    // console.log({ data });

    // validasi: jika url pembayaran sudah ada
    if (
      pembayaran.url &&
      data.transaction_status &&
      (data.transaction_status === "pending" ||
        data.transaction_status === "settlement")
    ) {
      return res.status(400).json({
        message: "data pembayaran dengan (pesananId) sudah ada",
      });
    }

    // validasi: jika url pembayaran tidak ada atau sudah expired
    if (
      !pembayaran.url ||
      (pembayaran.url && data.transaction_status === "expire")
    ) {
      // buat data transaksi
      const dataTransaksi = {
        transaction_details: {
          order_id: pesanan.id,
          gross_amount: pesanan.totalHarga,
        },
        credit_card: {
          secure: true,
        },
      };

      // buat data transaksi di midtrans
      const transaksi = await snap.createTransaction(dataTransaksi);

      // validasi: jika data transaksi dan redirect_url ada
      if (transaksi && transaksi.redirect_url) {
        // buat data transaksi di db
        await prisma.pembayaran.update({
          where: {
            pesananId: pesanan.id,
          },
          data: {
            waktuDibuat: jakartaIndonesiaTime(new Date()),
            status: "pending",
            url: transaksi.redirect_url,
          },
        });
      }

      // berikan response success
      return res.json({
        message: "berhasil membuat transaksi",
        data: transaksi,
      });
    }

    return res.status(400).json({
      message: "data pembayaran dengan (pesananId) sudah ada",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    // ambil data pesananId
    const { pesananId } = req.query;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: { id: pesananId },
    });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        error: "data pesanan berdasarkan (pesananId) tidak ditemukan",
      });
    }

    // cek data pembayaran
    const pembayaran = await prisma.pembayaran.findUnique({
      where: {
        pesananId,
      },
    });

    // validasi: jika data pembayaran tidak ditemukan
    if (!pembayaran) {
      return res.status(404).json({
        message: "data pembayaran berdasarkan (pesananId) tidak ditemukan",
      });
    }

    // Konfigurasi otentikasi basic
    const auth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
      "base64"
    );

    // Permintaan ke API Midtrans untuk memeriksa status pembayaran
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${pesananId}/status`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const data = response.data;

    // validasi: jika data pembayaran sudah ada
    if (
      pembayaran.url &&
      data.transaction_status &&
      (data.transaction_status === "pending" ||
        data.transaction_status === "settlement")
    ) {
      return res.status(400).json({
        message: "data pembayaran dengan (pesananId) sudah ada",
      });
    }

    // buat data transaksi
    const dataTransaksi = {
      transaction_details: {
        order_id: pesanan.id,
        gross_amount: pesanan.totalHarga,
      },
      credit_card: {
        secure: true,
      },
    };

    // buat data transaksi di midtrans
    const transaksi = await snap.createTransaction(dataTransaksi);

    // validasi: jika transaksi berhasil
    if (transaksi && transaksi.redirect_url) {
      // update data pembayaran
      await prisma.pembayaran.update({
        where: {
          pesananId: pesanan.id,
        },
        data: {
          waktuDibuat: jakartaIndonesiaTime(new Date()),
          status: "pending",
          url: transaksi.redirect_url,
        },
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil membuat transaksi",
      data: transaksi,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const notificationTransaction = async (req, res) => {
  try {
    // ambil data yang dikirim dari midtrans
    const { order_id, settlement_time, payment_type, transaction_status } =
      req.body;

    // rubah waktu ke WIB dan ISO 8601
    const settlementTimeISO =
      jakartaIndonesiaTime(settlement_time).toISOString();

    // cek data pembayaran di db
    const pembayaran = await prisma.pembayaran.findUnique({
      where: {
        pesananId: order_id,
      },
    });

    // validasi: jika data pembayaran tidak ditemukan
    if (!pembayaran) {
      return res.status(404).json({
        message: "data pembayaran berdasarkan (pesananId) tidak ditemukan",
      });
    }

    // update data pembayaran dan pesanan di db
    await prisma.pembayaran.update({
      where: {
        id: pembayaran.id,
      },
      data: {
        waktuDikonfirmasi:
          transaction_status === "settlement" ? settlementTimeISO : null,
        metode: payment_type,
        status: transaction_status,
      },
    });
    await prisma.pesanan.update({
      where: {
        id: order_id,
      },
      data: {
        status: transaction_status === "settlement" ? "success" : "pending",
      },
    });
    console.log("notif masuk status: " + transaction_status);

    return res.json({
      message: "berhasil menerima data transaksi",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const checkPaymentStatus = async (req, res) => {
  try {
    // Ambil data orderId dari parameter
    const { pesananId } = req.query;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: { id: pesananId },
    });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        error: "data pesanan berdasarkan (pesananId) tidak ditemukan",
      });
    }

    // Konfigurasi otentikasi basic
    const auth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
      "base64"
    );

    // Permintaan ke API Midtrans untuk memeriksa status pembayaran
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${pesananId}/status`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    // Response status transaksi
    return res.json({
      message: "Status transaksi berhasil diperiksa",
      data: response.data,
    });
  } catch (error) {
    // Tangani error
    return res.status(500).json({
      message: error.message,
    });
  }
};

// PAYOUTS/DISBURSEMENTS API mengirimkan dana secara masal
// fungsi untuk daftar bank

// MANUAL / UPLOAD BUKTI
export const updateBuktiPembayaranByPesananId = async (req, res) => {
  try {
    // ambil data (pesananId)
    const { pesananId } = req.body;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: {
        id: pesananId,
      },
      include: {
        jaminan: true,
        motor: true,
      },
    });
    console.log({ pesanan });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        message: "data pesanan tidak ditemukan",
      });
    }

    // ambil data bukti
    let { bukti } = req.body;

    // validasi: jika ada file
    if (req.file) {
      // ambil file buffer
      const fileBuffer = req.file.buffer;
      const originalFileName = req.file.originalname;

      // proses upload file dan isi variabel bukti dengan url file
      bukti = await uploadFile("images", "motor", fileBuffer, originalFileName);
    }

    const pembayaran = await prisma.pembayaran.update({
      where: {
        pesananId,
      },
      data: {
        bukti,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil mengupdate data pembayaran",
      data: {
        pembayaranId: pembayaran.id,
        pesananId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const acceptStatusPembayaranByPesananId = async (req, res) => {
  try {
    // ambil data (pesananId)
    const { pesananId } = req.body;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: {
        id: pesananId,
      },
    });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        message: "data pesanan tidak ditemukan",
      });
    }

    const pembayaran = await prisma.pembayaran.update({
      where: {
        pesananId,
      },
      data: {
        status: "accept",
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil accept status pembayaran",
      data: {
        pembayaranId: pembayaran.id,
        pesananId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectStatusPembayaranByPesananId = async (req, res) => {
  try {
    // ambil data (pesananId)
    const { pesananId } = req.body;

    // validasi: jika data (pesananId) tidak ada
    if (!pesananId) {
      return res.status(400).json({
        message: "data (pesananId) tidak ada",
      });
    }

    // cek data pesanan
    const pesanan = await prisma.pesanan.findUnique({
      where: {
        id: pesananId,
      },
    });

    // validasi: jika data pesanan tidak ditemukan
    if (!pesanan) {
      return res.status(404).json({
        message: "data pesanan tidak ditemukan",
      });
    }

    // cek data pembayaran
    const pembayaran = await prisma.pembayaran.findUnique({
      where: {
        pesananId,
      },
    });

    // validasi: jika data pembayaran tidak ditemukan
    if (!pembayaran) {
      return res.status(404).json({
        message: "data pembayaran tidak ditemukan",
      });
    }

    // validasi: jika terdapat bukti di pembayaran, maka hapus
    if (pembayaran.bukti) {
      // proses hapus file
      await deleteFile(pembayaran.bukti);
    }

    await prisma.pembayaran.update({
      where: {
        pesananId,
      },
      data: {
        status: "reject",
        bukti: null,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil reject status pembayaran",
      data: {
        pembayaranId: pembayaran.id,
        pesananId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
