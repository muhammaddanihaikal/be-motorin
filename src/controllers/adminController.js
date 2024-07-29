import { PrismaClient } from "@prisma/client";
import { deleteFile } from "../utils/storageSupabase.js";

const prisma = new PrismaClient();

export const getUnverifiedRental = async (req, res) => {
  try {
    // cek data rental dengan status_verifikasi 'false' dan ada fotonya
    const rentals = await prisma.rental.findMany({
      where: {
        statusVerifikasi: false,
        fotoRental: {
          some: {
            // setidaknya ada satu entry data foto rental
          },
        },
      },
      select: {
        nama: true,
        noHp: true,
        alamat: true,
        fotoProfil: true,
        statusVerifikasi: true,
        fotoRental: {
          select: {
            url: true,
          },
        },
      },
    });

    // berikan response success
    return res.json({
      message:
        "berhasil mendapatkan data rental dengan status_verifikasi 'false'",
      data: rentals,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const approveVerificationRental = async (req, res) => {
  try {
    // ambil data (rentalId)
    const rentalId = req.body.rentalId;

    // validasi: jika data (rentalId) tidak ada
    if (!rentalId) {
      return res.status(400).json({
        message: "data (rentalId) tidak ada",
      });
    }

    // cek data rental berdasarkan (rentalId) dengan status 'false' dan terdapat setidaknya satu entry data pada tabel foto_rental
    const rental = await prisma.rental.findFirst({
      where: {
        id: rentalId,
        statusVerifikasi: false,
        fotoRental: {
          some: {
            // setidaknya ada satu entry data foto rental
          },
        },
      },
      select: {
        fotoRental: {
          select: {
            url: true,
          },
        },
      },
    });

    // validasi: jika data rental berdasarkan (rentalId) tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message:
          "data rental berdasarkan (rentalId) tidak ditemukan atau tidak valid",
      });
    }

    // update data rental berdasarkan data (rentalId)
    await prisma.rental.update({
      where: {
        id: rentalId,
      },
      data: {
        statusVerifikasi: true,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil menerima verifikasi rental",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectVerificationRental = async (req, res) => {
  try {
    // ambil data (rentalId)
    const rentalId = req.body.rentalId;

    // validasi: jika data (rentalId) tidak ada
    if (!rentalId) {
      return res.status(400).json({
        message: "data (rentalId) tidak ada",
      });
    }

    // cek data rental berdasarkan (rentalId) dengan status 'false' dan terdapat satu entry data pada tabel foto_rental
    const rental = await prisma.rental.findFirst({
      where: {
        id: rentalId,
        statusVerifikasi: false,
        fotoRental: {
          some: {
            // setidaknya ada satu entry data foto rental
          },
        },
      },
      select: {
        fotoRental: {
          select: {
            url: true,
          },
        },
      },
    });

    // validasi: jika data rental berdasarkan (rentalId) tidak ditemukan
    if (!rental) {
      return res.status(404).json({
        message:
          "data rental berdasarkan (rentaIid) tidak ditemukan atau tidak valid",
      });
    }

    // menghapus data foto_rental berdakarkan (rentalId)
    const fotoRentalDeletePromises = rental.fotoRental.map(async (e, index) => {
      // hapus file di supabase
      await deleteFile(e.url);
      console.log(`no.${index + 1} : ${e.url}`);
    });

    // menjalankan semua promise
    await Promise.all(fotoRentalDeletePromises);

    // menghapus foto_rental di database
    await prisma.fotoRental.deleteMany({
      where: {
        rentalId,
      },
    });

    // berikan response success
    return res.json({
      message: "berhasil menolak verifikasi rental",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
