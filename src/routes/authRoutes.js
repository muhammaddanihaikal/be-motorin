import express from "express";
import * as authController from "../controllers/authController.js";
import { upload } from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register", upload.none(), authController.register);
authRouter.post("/login", upload.none(), authController.login);

export { authRouter };
