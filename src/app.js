import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

// konfigurasi
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json()); // baca data json dari body
// app.use(express.urlencoded({ extended: false })); // baca data dari form body

// upload.none(): menghandle pengiriman data dari form
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
