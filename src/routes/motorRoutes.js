import express from "express";
import * as motorController from "../controllers/motorController.js";
import { verifyToken } from "../middleware/authorization.js";
import { upload } from "../middleware/upload.js";

const motorRouter = express.Router();

motorRouter.post(
  "/motor",
  upload.single("foto"),
  motorController.addMotorByUserId
);
motorRouter.get("/motors", upload.none(), motorController.getMotors);
motorRouter.get("/motor", upload.none(), motorController.getMotorByMotorId);
motorRouter.put(
  "/motor",
  upload.single("foto"),
  motorController.updateMotorByMotorId
);
motorRouter.delete(
  "/motor",
  upload.none(),
  motorController.deleteMotorByMotorId
);

export { motorRouter };
