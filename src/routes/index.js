import express from "express";
import { authRouter } from "./authRoutes.js";
import { motorRouter } from "./motorRoutes.js";
import { rentalRouter } from "./rentalRoutes.js";
import { penyewaRouter } from "./penyewaRoutes.js";
import { adminRouter } from "./adminRoutes.js";
import { pesananRouter } from "./pesananRoutes.js";
import { pembayaranRouter } from "./pembayaranRoutes.js";

const router = express.Router();

// route '/'
router.get("/", (req, res) => {
  res.send("hello world");
});

// pakai route
router.use(authRouter);
router.use(motorRouter);
router.use(rentalRouter);
router.use(penyewaRouter);
router.use(adminRouter);
router.use(pesananRouter);
router.use(pembayaranRouter);

export default router;
