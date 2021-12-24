import express from "express";
import { authRouter } from "./auth/authRouter";
import { userRouter } from "./user/userRoute";

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/login", authRouter.router);

export const appRouter = {
  router,
};
