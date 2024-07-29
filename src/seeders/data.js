export const role = [
  {
    id: 1,
    nama: "admin",
  },
  {
    id: 2,
    nama: "rental",
  },
  {
    id: 3,
    nama: "penyewa",
  },
];

export const user = [
  // admin
  {
    id: "u1hxu",
    email: "admin1@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 1,
  },
  {
    id: "u1sf8",
    email: "admin2@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 1,
  },
  {
    id: "u1aeu",
    email: "admin3@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 1,
  },

  // rental
  // jakarta
  {
    id: "u2khf",
    email: "rental1@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2pg7",
    email: "rental2@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2lvz",
    email: "rental3@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2szi",
    email: "rental4@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },

  // yogyakarta
  {
    id: "u2mj1",
    email: "rental5@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2gh9",
    email: "rental6@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2tj3",
    email: "rental7@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2bx5",
    email: "rental8@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },

  // tegal
  {
    id: "u2wr8",
    email: "rental9@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },
  {
    id: "u2nd2",
    email: "rental10@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 2,
  },

  // penyewa
  {
    id: "u3nsq",
    email: "penyewa1@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 3,
  },
  {
    id: "u3jht",
    email: "penyewa2@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 3,
  },
  {
    id: "u3juu",
    email: "penyewa3@gmail.com",
    password: "$2b$10$SmwA0aH2ZaPjcodMRkS/dust3WHX5YVjvIa7350FeXzd4rKaZcpiW",
    roleId: 3,
  },
];

export const admin = [
  {
    id: "asgi8",
    nama: "Admin Satu",
    userId: "u1hxu",
  },
  {
    id: "adjkz",
    nama: "Admin Dua",
    userId: "u1sf8",
  },
  {
    id: "adih9",
    nama: "Admin Tiga",
    userId: "u1aeu",
  },
];

export const kota = [
  {
    id: 1,
    nama: "Jakarta",
  },
  {
    id: 2,
    nama: "Yogyakarta",
  },
  {
    id: 3,
    nama: "Tegal",
  },
];

export const rental = [
  // jakarta
  {
    id: "rkalo",
    nama: "Sewa Motor Id",
    noHp: "081234567891",
    alamat:
      "Jl. Medan Merdeka Selatan No. 3, Gambir, Jakarta Pusat, DKI Jakarta 10110, Indonesia",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/jakarta-1.png",
    noRekening: "1234567890",
    kotaId: 1,
    bankId: "bca",
    userId: "u2khf",
  },
  {
    id: "rkhko",
    nama: "Jennete",
    noHp: "082345678912",
    alamat:
      "Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat, DKI Jakarta 10310, Indonesia",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/jakarta-2.png",
    noRekening: "2345678901",
    kotaId: 1,
    bankId: "bni",
    userId: "u2pg7",
  },
  {
    id: "rkh42",
    nama: "Jakarta Bike",
    noHp: "083456789123",
    alamat: "Jalan Kebon Sirih No. 17-19, Jakarta Pusat, DKI Jakarta, 10340",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/jakarta-3.png",
    noRekening: "3456789012",
    kotaId: 1,
    bankId: "bni",
    userId: "u2lvz",
  },
  {
    id: "ranja",
    nama: "Baik",
    noHp: "083456789123",
    alamat: "Jalan Menteng Raya No. 58, Jakarta Pusat, DKI Jakarta, 10310",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/jakarta-4.png",
    noRekening: "3456789012",
    kotaId: 1,
    bankId: "bri",
    userId: "u2szi",
  },

  // yogyakarta
  {
    id: "r1fr4",
    nama: "FRent",
    noHp: "081234567890",
    alamat: "Jalan Malioboro No. 15, Yogyakarta, 55213",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yogyakarta-1.png",
    noRekening: "3456789012",
    kotaId: 2,
    bankId: "bri",
    userId: "u2mj1",
  },
  {
    id: "rd44t",
    nama: "Ay Rent",
    noHp: "081234567890",
    alamat:
      "Jl. Kaliurang KM 7, No. 9, Kelurahan Caturtunggal, Kecamatan Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta, 55281",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yogyakarta-2.png",
    noRekening: "3456789012",
    kotaId: 2,
    bankId: "bri",
    userId: "u2gh9",
  },
  {
    id: "re6ti",
    nama: "Jogja Sewa Motor",
    noHp: "081234567890",
    alamat:
      "Jl. Parangtritis No. 123, Kelurahan Brontokusuman, Kecamatan Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta, 55153",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yogyakarta-3.png",
    noRekening: "3456789012",
    kotaId: 2,
    bankId: "bri",
    userId: "u2tj3",
  },

  // tegal
  {
    id: "rf4r4",
    nama: "Ale Motor",
    noHp: "081234567890",
    alamat:
      "Jl. Ahmad Yani No. 45, Kelurahan Margadana, Kecamatan Margadana, Kota Tegal, Jawa Tengah, 52147",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/tegal-1.png",
    noRekening: "3456789012",
    kotaId: 3,
    bankId: "bri",
    userId: "u2wr8",
  },
  {
    id: "rdstt",
    nama: "Balakosa Motor",
    noHp: "081234567890",
    alamat:
      "Jl. Sultan Agung No. 22, Kelurahan Panggung, Kecamatan Tegal Timur, Kota Tegal, Jawa Tengah, 52123",
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/tegal-2.png",
    noRekening: "3456789012",
    kotaId: 3,
    bankId: "bri",
    userId: "u2nd2",
  },
];

export const penyewa = [
  {
    id: "pfpod",
    nama: "Penyewa Satu",
    noHp: "081234567891",
    foto: "https://i.pinimg.com/736x/29/3a/3a/293a3aa55bddcf83400176649d4230b3.jpg",
    userId: "u3nsq",
  },
  {
    id: "pdtrs",
    nama: "Penyewa Dua",
    noHp: "082345678912",
    foto: "https://i.pinimg.com/564x/75/2d/e5/752de50fbb8e1cb28b4e13a9c49ee771.jpg",
    userId: "u3jht",
  },
  {
    id: "pjfk9",
    nama: "Penyewa Tiga",
    noHp: "083456789123",
    foto: "https://i.pinimg.com/736x/47/7b/ae/477baeffdbebb0b01a18f60fa4b9e0ed.jpg",
    userId: "u3juu",
  },
];

export const motor = [
  // 1.rkalo
  {
    id: "meqbh",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rkalo",
  },
  {
    id: "m73wc",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rkalo",
  },
  {
    id: "mfilh",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rkalo",
  },
  {
    id: "msqzp",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rkalo",
  },
  {
    id: "m3osh",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rkalo",
  },

  // 2.rkhko
  {
    id: "ml4sy",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rkhko",
  },
  {
    id: "mr4ty",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rkhko",
  },
  {
    id: "mmqhy",
    nama: "Honda Beat 125",
    harga: 10,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rkhko",
  },
  {
    id: "ml8y9",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rkhko",
  },
  {
    id: "mzvrn",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rkhko",
  },

  // 3.rkh42
  {
    id: "m5i0d",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rkh42",
  },
  {
    id: "mpeqg",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rkh42",
  },
  {
    id: "mjf6v",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rkh42",
  },
  {
    id: "mghws",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rkh42",
  },
  {
    id: "mkwq6",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rkh42",
  },

  // 4.ranja
  {
    id: "m6ijd",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "ranja",
  },
  {
    id: "msejg",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "ranja",
  },
  {
    id: "mbf99",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "ranja",
  },
  {
    id: "mghhh",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "ranja",
  },
  {
    id: "mpwa6",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "ranja",
  },

  // 5.r1fr4
  {
    id: "m1idd",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "r1fr4",
  },
  {
    id: "mssfg",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "r1fr4",
  },
  {
    id: "m0fl9",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "r1fr4",
  },
  {
    id: "mg4h2",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "r1fr4",
  },
  {
    id: "mpda2",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "r1fr4",
  },

  // 6.rd44t
  {
    id: "m8x9r",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rd44t",
  },
  {
    id: "mfj7p",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rd44t",
  },
  {
    id: "mlw2k",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rd44t",
  },
  {
    id: "mz4qf",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rd44t",
  },
  {
    id: "m3ejd",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rd44t",
  },

  // 7.re6ti
  {
    id: "m1b3x",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "re6ti",
  },
  {
    id: "m9v4p",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "re6ti",
  },
  {
    id: "m7k6q",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "re6ti",
  },
  {
    id: "mj2wl",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "re6ti",
  },
  {
    id: "mr5ys",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "re6ti",
  },

  // 8.rf4r4
  {
    id: "m4u7x",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rf4r4",
  },
  {
    id: "m3k9p",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rf4r4",
  },
  {
    id: "m6q2z",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rf4r4",
  },
  {
    id: "m8n5v",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rf4r4",
  },
  {
    id: "m1y4j",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rf4r4",
  },

  // 9.rdstt
  {
    id: "m4z8t",
    nama: "Honda Scoopy 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-scoopy-125.png",
    rentalId: "rdstt",
  },
  {
    id: "m7k5y",
    nama: "Honda Vario 160",
    harga: 110000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-vario-160.png",
    rentalId: "rdstt",
  },
  {
    id: "m9w2n",
    nama: "Honda Beat 125",
    harga: 90000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-beat-125.png",
    rentalId: "rdstt",
  },
  {
    id: "mj3qv",
    nama: "Honda PCX 160",
    harga: 115000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/honda-pcx-160.png",
    rentalId: "rdstt",
  },
  {
    id: "m8n4s",
    nama: "Yamaha Fazio 125",
    harga: 100000,
    foto: "https://xoravptyifdtjtpojagh.supabase.co/storage/v1/object/public/images/contohrentaldanmotor/yamaha-fazio-125.png",
    rentalId: "rdstt",
  },
];

export const jaminan = [
  {
    id: 1,
    nama: "Buku Nikah",
  },
  {
    id: 2,
    nama: "SIM A/B",
  },
  {
    id: 3,
    nama: "STNK",
  },
  {
    id: 4,
    nama: "BPKP",
  },
  {
    id: 5,
    nama: "NPWP",
  },
  {
    id: 6,
    nama: "Paspor",
  },
  {
    id: 7,
    nama: "Kartu Pegawai PNS",
  },
  {
    id: 8,
    nama: "Kartu Anggota (TNI/Polri)",
  },
];

export const pesanan = [
  {
    id: "ps4f1gfu",
    totalHarga: 162000,
    waktuPesan: "2024-08-01T18:32:33.161Z",
    tanggalMulai: "2024-08-30T00:00:00Z",
    tanggalSelesai: "2024-08-30T00:00:00Z",
    durasi: 1,
    lokasiAmbil: "tugu",
    lokasiKembali: "stasiun",
    waktuAmbil: "05:00",
    waktuKembali: "21:00",
    status: "success",
    jaminanId: 2,
    penyewaId: "pfpod",
    motorId: "meqbh",
  },
  {
    id: "ps5g1gfu",
    totalHarga: 125000,
    waktuPesan: "2024-08-01T18:32:33.161Z",
    tanggalMulai: "2024-08-30T00:00:00Z",
    tanggalSelesai: "2024-08-30T00:00:00Z",
    durasi: 1,
    lokasiAmbil: "tugu",
    lokasiKembali: "stasiun",
    waktuAmbil: "05:00",
    waktuKembali: "21:00",
    status: "success",
    jaminanId: 2,
    penyewaId: "pfpod",
    motorId: "meqbh",
  },
  {
    id: "ps3e7sfu",
    totalHarga: 95000,
    waktuPesan: "2024-08-01T18:32:33.161Z",
    tanggalMulai: "2024-08-30T00:00:00Z",
    tanggalSelesai: "2024-08-30T00:00:00Z",
    durasi: 2,
    lokasiAmbil: "tugu",
    lokasiKembali: "stasiun",
    waktuAmbil: "05:00",
    waktuKembali: "21:00",
    status: "success",
    jaminanId: 2,
    penyewaId: "pfpod",
    motorId: "meqbh",
  },
];

export const pembayaran = [
  {
    id: "pm1mf9zx",
    waktuDibuat: "2024-07-01T18:33:12.488Z",
    waktuDikonfirmasi: "2024-07-01T18:33:55Z",
    metode: "bank_transfer",
    status: "settlement",
    pesananId: "ps4f1gfu",
  },
  {
    id: "pmu6z6g5",
    waktuDibuat: "2024-07-01T18:41:20.021Z",
    waktuDikonfirmasi: "2024-07-01T18:46:56Z",
    metode: "qris",
    status: "settlement",
    pesananId: "ps5g1gfu",
  },
  {
    id: "pmzegog4",
    waktuDibuat: "2024-07-01T18:41:20.021Z",
    waktuDikonfirmasi: "2024-07-01T18:46:56Z",
    metode: "qris",
    status: "settlement",
    pesananId: "ps3e7sfu",
  },
];

export const bank = [
  { id: "bca", nama: "BCA" },
  { id: "bni", nama: "BNI" },
  { id: "bri", nama: "BRI" },
  { id: "mandiri", nama: "MANDIRI" },
  { id: "cimb", nama: "CIMB NIAGA" },
  { id: "btn", nama: "BTN" },
  { id: "bsi", nama: "BSI" },
  { id: "permata", nama: "PERMATA" },
  { id: "ocbc", nama: "OCBC NISP" },
  { id: "panin", nama: "PANIN" },
];
