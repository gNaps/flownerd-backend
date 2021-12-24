import express from "express";
import { verifyPolicy, verifyToken } from "../../middlewares/authentication";
import { userController } from "./userController";

const router = express.Router();

router
  .route('/')
  .get(userController.getUsers)
  .post(verifyToken, verifyPolicy, userController.createUser)

router
  .route('/:id')
  .get(verifyToken, verifyPolicy, userController.getUserById)
  .put(verifyToken, verifyPolicy, userController.updateUser)
  .delete(verifyToken, verifyPolicy, userController.deleteUser)

export const userRouter = {
  router,
};
