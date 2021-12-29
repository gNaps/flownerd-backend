import express from "express";
import { authRouter } from "./auth/authRouter";
import { userRouter } from "./user/userRoute";
import { videogameRouter } from "./videogame/videogameRoute";

const router = express.Router();

router.use("/login", authRouter.router);

router.use("/users", userRouter.router);
router.use("/videogames", videogameRouter.router);

export const appRouter = {
  router,
};
