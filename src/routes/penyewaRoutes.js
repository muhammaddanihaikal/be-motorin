import express from "express";
import * as penyewaController from "../controllers/penyewaController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const penyewaRouter = express.Router();
penyewaRouter.put(
  "/penyewa",
  upload.single("foto"),
  penyewaController.updatePenyewaByUserId
);
penyewaRouter.get(
  "/penyewa",
  upload.none(),
  penyewaController.getProfilPenyewaByUserId
);

export { penyewaRouter };
