import { PrismaClient } from "@prisma/client";
import { uploadFile, deleteFile } from "../utils/storageSupabase.js";
import { generateRandomId } from "../utils/randomId.js";

const prisma = new PrismaClient();

// (done)
export const addMotorByUserId = async (req, res) => {
  try {
    // ambil data userId
    const { userId } = req.body;

    // validasi: jika data userId tidak ada
    if (!userId) {
      return res.status(400).json({
        message: "data (userId) tidak ada",
      });
    }

    // cek rental di db
    const rental = await prisma.rental.findUnique({
      where: {
        userId,
      },
    });

    // validasi: jika rental tidak ada
    if (!rental) {
      return res.status(404).json({
        message: "data rental dengan (rentalId) tidak ditemukan",
      });
    }

    // ambil data motor
    let { nama, harga, foto } = req.body;

    // validasi: jika user kurang/tidak mengirimkan data motor
    if (nama === undefined || harga === undefined) {
      return res.status(400).json({
        message: "data (nama, harga dan foto) tidak ada",
      });
    }

    // parsing data ke number
    harga = parseInt(harga);

    // validasi: jika data yang diparsing tidak valid
    if (isNaN(harga) || harga < 0) {
      return res.status(400).json({
        message: "data (harga) tidak valid",
      });
    }

    // validasi: jika ada file
    if (req.file) {
      // ambil file buffer
      const fileBuffer = req.file.buffer;
      const originalFileName = req.file.originalname;

      // proses upload file
      foto = await uploadFile("images", "motor", fileBuffer, originalFileName);
    }

    // buat object motor
    const newMotor = {
      id: `m${generateRandomId(5)}`,
      nama,
      harga,
      foto,
      rentalId: rental.id,
    };

    // cek id di db
    const existingMotor = await prisma.motor.findUnique({
      where: {
        id: newMotor.id,
      },
    });

    // validasi: jika data motor sudah ada
    if (existingMotor) {
      return res.status(400).json({
        message: "data motor berdasarkan motorId sudah ada",
      });
    }

    // proses create data
    const motor = await prisma.motor.create({
      data: newMotor,
    });

    // berikan response success
    return res.status(201).json({
      message: "berhasil menambahkan data motor",
      data: { motorId: motor.id },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const getMotors = async (req, res) => {
  try {
    // ambil data (userId)
    const { userId, rentalId } = req.query;

    // proses mengambil semua data
    let motors;
    if (userId) {
      motors = await prisma.motor.findMany({
        where: {
          rental: {
            userId,
          },
        },
      });
    } else if (rentalId) {
      motors = await prisma.motor.findMany({
        where: {
          rentalId,
        },
      });
    }

    // validasi: jika data motor berdasarkan (rentalId) tidak ditemukan
    if (!motors) {
      return res.status(404).json({
        message: "data motors berdasarkan (rentalId) tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan semua data motor",
      data: motors,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const getMotorByMotorId = async (req, res) => {
  try {
    // mengambail data (motorId)
    const { motorId } = req.query;

    // validasi: jika data (motorId) tidak ditemukan
    if (!motorId) {
      return res.status(400).json({
        message: "data (motorId) tidak ada",
      });
    }

    // proses mengambail data
    const motor = await prisma.motor.findUnique({
      where: {
        id: motorId,
      },
    });

    // validasi: jika data motor tidak ditemukan
    if (!motor) {
      return res.status(404).json({
        message: "data motor dengan (motorId) tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      message: "berhasil mendapatkan satu data motor",
      data: motor,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const updateMotorByMotorId = async (req, res) => {
  try {
    // mengambil data (motorId)
    const { motorId } = req.body;

    // validasi: jika data (motorId) tidak ditemukan
    if (!motorId) {
      return res.status(400).json({
        message: "data (motorId) tidak ada",
      });
    }

    // cek data motor berdasarkan id
    const motor = await prisma.motor.findUnique({
      where: {
        id: motorId,
      },
    });

    // validasi: jika data motor tidak ada
    if (!motor) {
      return res.status(404).json({
        message: "data motor dengan (id) tidak ditemukan",
      });
    }

    // ambil data dari req.body
    let { nama, harga, foto } = req.body;

    // parsing data ke number
    harga = harga !== undefined ? parseFloat(harga) : motor.harga;

    // validasi: jika data yang diparsing tidak valid
    if (harga !== undefined && (isNaN(harga) || harga < 0)) {
      return res.status(400).json({
        message: "data (harga) tidak valid",
      });
    }

    // validasi: jika ada file
    if (req.file) {
      // ambil file buffer
      const fileBuffer = req.file.buffer;
      const originalFileName = req.file.originalname;

      // proses upload file dan isi variabel foto dengan url file
      foto = await uploadFile("images", "motor", fileBuffer, originalFileName);

      // validasi: jika sudah ada foto sebelumnya, maka hapus disupabase
      if (motor.foto) {
        // proses hapus file
        await deleteFile(motor.foto);
      }
    }

    // buat object motor baru
    const newMotor = {
      nama: nama !== undefined ? nama : motor.nama || "",
      harga: harga !== undefined ? harga : motor.harga || 0,
      foto: foto !== undefined ? foto : motor.foto || "",
    };

    // proses update data motor
    await prisma.motor.update({
      where: {
        id: motorId,
      },
      data: newMotor,
    });

    // berikan response success
    return res.json({
      message: "berhasil mengubah data motor",
      data: { motorId },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const deleteMotorByMotorId = async (req, res) => {
  try {
    // mengambil data (motorId)
    const { motorId } = req.query;

    // validasi: jika data (motorId) tidak ditemukan
    if (!motorId) {
      return res.status(400).json({
        message: "data (motorId) tidak ada",
      });
    }

    // cek data motor di database berdasarkan id
    const motor = await prisma.motor.findUnique({
      where: {
        id: motorId,
      },
    });

    // validasi: jika data motor tidak ada
    if (!motor) {
      return res.status(404).json({
        message: "data motor dengan (id) tidak ditemukan",
      });
    }

    // validasi: jika sudah ada foto sebelumnya, maka hapus disupabase
    if (motor.foto) {
      // proses hapus file
      await deleteFile(motor.foto);
    }

    // proses hapus data motor
    await prisma.motor.delete({
      where: {
        id: motorId,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil menghapus satu data motor",
      data: { motorId },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
