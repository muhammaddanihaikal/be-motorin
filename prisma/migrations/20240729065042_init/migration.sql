-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kota" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "kota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "no_hp" TEXT,
    "alamat" TEXT,
    "foto" TEXT,
    "no_rekening" TEXT,
    "kota_id" INTEGER,
    "bank_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penyewa" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "no_hp" TEXT,
    "foto" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "penyewa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motor" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,
    "rental_id" TEXT NOT NULL,

    CONSTRAINT "motor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jaminan" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "jaminan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesanan" (
    "id" TEXT NOT NULL,
    "totalHarga" INTEGER NOT NULL,
    "waktuPesan" TIMESTAMP(3) NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3) NOT NULL,
    "durasi" INTEGER NOT NULL,
    "lokasiAmbil" TEXT NOT NULL,
    "lokasiKembali" TEXT NOT NULL,
    "waktuAmbil" TEXT NOT NULL,
    "waktuKembali" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jaminanId" INTEGER NOT NULL,
    "penyewaId" TEXT NOT NULL,
    "motorId" TEXT NOT NULL,

    CONSTRAINT "pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" TEXT NOT NULL,
    "waktu_dibuat" TIMESTAMP(3),
    "waktu_dikonfirmasi" TIMESTAMP(3),
    "metode" TEXT,
    "status" TEXT,
    "url" TEXT,
    "pesanan_id" TEXT NOT NULL,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_id_key" ON "admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "rental_user_id_key" ON "rental"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "penyewa_user_id_key" ON "penyewa"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_pesanan_id_key" ON "pembayaran"("pesanan_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_kota_id_fkey" FOREIGN KEY ("kota_id") REFERENCES "kota"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental" ADD CONSTRAINT "rental_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penyewa" ADD CONSTRAINT "penyewa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "motor" ADD CONSTRAINT "motor_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_jaminanId_fkey" FOREIGN KEY ("jaminanId") REFERENCES "jaminan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_penyewaId_fkey" FOREIGN KEY ("penyewaId") REFERENCES "penyewa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesanan" ADD CONSTRAINT "pesanan_motorId_fkey" FOREIGN KEY ("motorId") REFERENCES "motor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_pesanan_id_fkey" FOREIGN KEY ("pesanan_id") REFERENCES "pesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
