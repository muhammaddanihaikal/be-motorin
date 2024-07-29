import express from "express";
import * as rentalController from "../controllers/rentalController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const rentalRouter = express.Router();

// profile
rentalRouter.put(
  "/rental",
  upload.single("foto"),
  rentalController.updateRentalByUserId
);

rentalRouter.get("/rental", upload.none(), rentalController.getRentalByUserId);

// serarch
rentalRouter.get(
  "/rentals",
  upload.none(),
  rentalController.getRentalsByKotaId
);

// kota
rentalRouter.get("/kotas", rentalController.getKotas);

//=======================================================================

// bank
rentalRouter.get("/banks", rentalController.getBanks);

rentalRouter.post(
  "/rental/bank",
  upload.none(),
  rentalController.saveRentalBankByUserId
);

rentalRouter.get(
  "/rental/bank",
  upload.none(),
  rentalController.getRentalBankByUserId
);

// verifikasi
rentalRouter.post(
  "/rental/create-verification",
  upload.array("fotoRental"),
  rentalController.createVerification
);

export { rentalRouter };
