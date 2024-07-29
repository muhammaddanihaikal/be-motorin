import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { deleteFile, uploadFile } from "../utils/storageSupabase.js";

const prisma = new PrismaClient();

// (done)
export const updatePenyewaByUserId = async (req, res) => {
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
        message: "data user dengan (userId) tidak ada",
      });
    }

    // cek data penyewa berdasarkan userId
    const penyewa = await prisma.penyewa.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data penyewa tidak ada
    if (!penyewa) {
      return res.status(404).json({
        message: "data penyewa dengan (userId) tidak ada",
      });
    }

    // ambil data profil penyewa
    const { nama, noHp } = req.body;
    let { foto } = req.body;

    // validasi: jika no hp truthy dan tidak valid
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
      foto = await uploadFile(
        "images",
        "penyewa",
        fileBuffer,
        originalFileName
      );

      // validasi: jika sebelumnya ada data penyewa dan foto profil
      if (penyewa.foto) {
        // hapus foto profil di supabase
        await deleteFile(penyewa.foto);
      }
    }

    // buat object profil penyewa dengan data lama
    const newPenyewa = {
      nama: penyewa.nama,
      noHp: penyewa.noHp,
      foto: penyewa.foto,
    };
    // isi dengan value jika ada
    if (nama) newPenyewa.nama = nama;
    if (noHp) newPenyewa.noHp = noHp;
    if (foto) newPenyewa.foto = foto;

    // proses simpan data
    await prisma.penyewa.update({
      where: {
        userId,
      },
      data: newPenyewa,
    });

    // berikan response success
    return res.json({
      message: "berhasil menyimpan data profil penyewa",
      data: { penyewaId: penyewa.id, userId },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const getProfilPenyewaByUserId = async (req, res) => {
  try {
    // ambil userId dari body
    const { userId } = req.query;

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

    // proses ambil data penyewa berdasarkan userId
    const profilPenyewa = await prisma.penyewa.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika data profil penyewa tidak ada
    if (!profilPenyewa) {
      return res.status(404).json({
        message: "data profil penyewa dengan (userId) tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan data profil penyewa",
      data: profilPenyewa,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
