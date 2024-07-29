import express from "express";
import * as rentalController from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const adminRouter = express.Router();

adminRouter.get("/rental/unverified", rentalController.getUnverifiedRental);
adminRouter.post(
  "/rental/approve-verification",
  upload.none(),
  rentalController.approveVerificationRental
);
adminRouter.post(
  "/rental/reject-verification",
  upload.none(),
  rentalController.rejectVerificationRental
);

export { adminRouter };
