import express from "express";
import { authRouter } from "./authRoutes.js";
import { motorRouter } from "./motorRoutes.js";
import { rentalRouter } from "./rentalRoutes.js";
import { penyewaRouter } from "./penyewaRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { pesananRouter } from "./pesananRoutes.js";
import { pembayaranRouter } from "./pembayaranRoutes.js";

const router = express.Router();

// pakai route
router.use(authRouter);
router.use(motorRouter);
router.use(rentalRouter);
router.use(penyewaRouter);
router.use(adminRouter);
router.use(pesananRouter);
router.use(pembayaranRouter);

export default router;
