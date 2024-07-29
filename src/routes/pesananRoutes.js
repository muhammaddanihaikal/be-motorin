import express from "express";
import * as pesananController from "../controllers/pesananController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const pesananRouter = express.Router();

pesananRouter.post("/pesanan", upload.none(), pesananController.createPesanan);

pesananRouter.get(
  "/pesanan",
  upload.none(),
  pesananController.getPesananByPesananId
);

pesananRouter.get(
  "/pesanan/penyewa",
  upload.none(),
  pesananController.getPesananPenyewaByUserId
);

pesananRouter.get(
  "/pesanan/rental",
  upload.none(),
  pesananController.getPesananRentalByUserId
);

pesananRouter.get(
  "/pesanan/laporan",
  upload.none(),
  pesananController.getPesananByStatusPembayaran
);

pesananRouter.get("/jaminans", upload.none(), pesananController.getJaminans);

export { pesananRouter };
