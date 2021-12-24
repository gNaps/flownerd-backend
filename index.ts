import express from "express";
import { userController } from "./api/user/userController";
import * as dotenv from "dotenv";
import { authController } from "./api/auth/authController";
import { verifyToken, verifyPolicy } from "./middlewares/authentication";
import cors from "cors";
import { appRouter } from "./api/router";

const app = express();
const PORT = 8000;

dotenv.config({ path: __dirname + "/.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(appRouter.router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
