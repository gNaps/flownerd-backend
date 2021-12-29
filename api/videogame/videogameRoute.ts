import express from "express";
import { verifyPolicy, verifyToken } from "../../middlewares/authentication";
import { videogameController } from "./videogameController";

const router = express.Router();

router
  .route("/search")
  .get(verifyToken, verifyPolicy, videogameController.searchVideogames);

router
  .route("/search/:id")
  .get(verifyToken, verifyPolicy, videogameController.searchVideogameById);

router
  .route("/")
  .get(verifyToken, verifyPolicy, videogameController.getVideogames);

router
  .route("/:id")
  .get(verifyToken, verifyPolicy, videogameController.getVideogameById)
  .post(verifyToken, verifyPolicy, videogameController.addVideogame)
  .put(verifyToken, verifyPolicy, videogameController.updateVideogame)
  .delete(verifyToken, verifyPolicy, videogameController.removeVideogame);

router
  .route("/user/:id")
  .get(verifyToken, verifyPolicy, videogameController.getVideogamesByUser);

export const videogameRouter = {
  router,
};
