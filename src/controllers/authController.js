import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import { generateRandomId } from "../utils/randomId.js";

const prisma = new PrismaClient();

// (done)
export const register = async (req, res) => {
  try {
    // ambil data dari req.body
    let { email, password, confPassword, roleId } = req.body;

    // validasi: jika data tidak ada
    if (!email || !password || !confPassword || !roleId) {
      return res.status(400).json({
        message: "email, password, confirm password dan roleId harus diisi",
      });
    }

    // parsing data
    roleId = parseInt(roleId);

    // validasi: jika data yang diparsing tidak valid
    if (isNaN(roleId)) {
      return res.status(400).json({
        message: "data (roleId) tidak valid",
      });
    }

    // cek role berdasarkan roleId
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    // validasi: jika role tidak ada
    if (!role) {
      return res.status(404).json({
        message: "data role tidak ditemukan",
      });
    }

    // validasi: jika email tidak valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "email tidak valid",
      });
    }

    // validasi: jika password dan confPassword tidak sama
    if (password !== confPassword) {
      return res.status(400).json({
        message: "password dan confirm password tidak sama",
      });
    }

    // cek user berdasarkan email dan role
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // validasi: jika user sudah ada
    if (existingUser) {
      return res.status(400).json({
        message: "user sudah ada",
      });
    }

    // enkripsi password
    const hashPassword = await bcrypt.hash(password, 10);

    // buat id
    const userId = `u${roleId}${generateRandomId(4)}`;

    let adminId, rentalId, penyewaId;
    if (roleId === 1) adminId = `a${generateRandomId(5)}`;
    if (roleId === 2) rentalId = `r${generateRandomId(5)}`;
    if (roleId === 3) penyewaId = `p${generateRandomId(5)}`;

    // buat object user
    const newUser = {
      id: userId,
      email,
      password: hashPassword,
      roleId,
    };

    // proses create user
    const user = await prisma.user.create({
      data: newUser,
    });

    // validasi dan buat profile admin atau rental atau penyewa
    if (roleId === 1) {
      // proses create admin
      await prisma.admin.create({
        data: {
          id: adminId,
          userId: user.id,
        },
      });
    } else if (roleId === 2) {
      // proses create rental
      await prisma.rental.create({
        data: {
          id: rentalId,
          userId: user.id,
        },
      });
    } else {
      // proses create penyewa
      await prisma.penyewa.create({
        data: {
          id: penyewaId,
          userId: user.id,
        },
      });
    }

    // berikan response success
    return res.status(201).json({
      message: "berhasil register",
      data: { userId: user.id },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// (done)
export const login = async (req, res) => {
  try {
    // ambil data dari req.body
    let { email, password } = req.body;

    // validasi: jika data yang dikirim kurang
    if (!email || !password) {
      return res.status(400).json({
        message: "data (email, password) tidak ada",
      });
    }

    // cek user berdasarkan email dan roleId
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // validasi: jika user tidak ada
    if (!user) {
      return res.status(404).json({
        message: "user tidak ada",
      });
    }

    // compare password
    const matchPassword = await bcrypt.compare(password, user.password);

    // validasi: jika password tidak sama
    if (!matchPassword) {
      return res.status(400).json({
        message: "password tidak valid",
      });
    }

    // buat payload
    const payload = {
      userId: user.id,
      email,
      roleId: user.roleId,
    };

    // buat access token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15s",
    });

    // berikan response success
    return res.json({
      message: "login berhasil",
      data: payload,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
