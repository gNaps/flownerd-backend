import express from "express";
import { authController } from "./authController";

const router = express.Router();

router.post("/getMagicLink", authController.sendTokenForLogin);
router.post("/me", authController.getLoggedUserByToken);

export const authRouter = {
  router,
};
