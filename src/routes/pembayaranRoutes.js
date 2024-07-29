import express from "express";
import * as pembayaranController from "../controllers/pembayaranController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const pembayaranRouter = express.Router();

pembayaranRouter.put(
  "/pembayaran/bukti",
  upload.single("bukti"),
  pembayaranController.updateBuktiPembayaranByPesananId
);

pembayaranRouter.put(
  "/pembayaran/accept",
  upload.none(),
  pembayaranController.acceptStatusPembayaranByPesananId
);

pembayaranRouter.put(
  "/pembayaran/reject",
  upload.none(),
  pembayaranController.rejectStatusPembayaranByPesananId
);

//====================

pembayaranRouter.post(
  "/pembayaran",
  upload.none(),
  pembayaranController.createTransaction
);

pembayaranRouter.get(
  "/pembayaran",
  upload.none(),
  pembayaranController.checkPaymentStatus
);

pembayaranRouter.post(
  "/notifikasi-pembayaran",
  upload.none(),
  pembayaranController.notificationTransaction
);

export { pembayaranRouter };
