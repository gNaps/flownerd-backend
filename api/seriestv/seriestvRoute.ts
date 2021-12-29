import express from "express";
import { verifyPolicy, verifyToken } from "../../middlewares/authentication";
import { seriesTvController } from "./seriestvController";

const router = express.Router();

router
  .route("/search")
  .get(verifyToken, verifyPolicy, seriesTvController.searchSeriesTv);

router
  .route("/search/:id")
  .get(verifyToken, verifyPolicy, seriesTvController.searchSeriesTvById);

router
  .route("/")
  .get(verifyToken, verifyPolicy, seriesTvController.getSeriestv);

router
  .route("/:id")
  //.get(verifyToken, verifyPolicy, seriesTvController.getVideogameById)
  .post(verifyToken, verifyPolicy, seriesTvController.addSerietv)
  .put(verifyToken, verifyPolicy, seriesTvController.updateSerietv)
  .delete(verifyToken, verifyPolicy, seriesTvController.removeSerietv);

router
  .route("/user/:id")
  .get(verifyToken, verifyPolicy, seriesTvController.getSeriestvByUser);

export const seriesTvRouter = {
  router,
};
