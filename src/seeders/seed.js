import { PrismaClient } from "@prisma/client";
import * as data from "./data.js";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // memasukan data role
    await prisma.role.createMany({
      data: data.role,
    });

    // memasukan data user
    await prisma.user.createMany({
      data: data.user,
    });

    // memasukan data admin
    await prisma.admin.createMany({
      data: data.admin,
    });

    // memasukan data nama bank
    await prisma.bank.createMany({
      data: data.bank,
    });

    // memasukan data nama kota
    await prisma.kota.createMany({
      data: data.kota,
    });

    // memasukan data rental
    await prisma.rental.createMany({
      data: data.rental,
    });

    // memasukan data penyewa
    await prisma.penyewa.createMany({
      data: data.penyewa,
    });

    //memasukan data motor
    await prisma.motor.createMany({
      data: data.motor,
    });

    //memasukan data jaminan
    await prisma.jaminan.createMany({
      data: data.jaminan,
    });

    //memasukan data pesanan
    await prisma.pesanan.createMany({
      data: data.pesanan,
    });

    //memasukan data pembayaran
    await prisma.pembayaran.createMany({
      data: data.pembayaran,
    });

    console.log("Seeder selesai");
  } catch (error) {
    console.error(error);
    // mengakhiri prosess node.js, sama seperti 'ctrl + c' ketika error
    process.exit(1);
  } finally {
    // memutuskan koneksi database
    await prisma.$disconnect();
  }
};

main();
