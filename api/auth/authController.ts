import { Request, Response } from "express";
import { sendMail } from "../../services/mailService";
import { userService } from "../user/userService";
import { authService } from "./authService";
import { UserPrisma } from "../../model/User";
import { generateAccessToken } from "../../utils/utils";

/**
 * Stacca il token da inviare via mail all'utente per effettuare la login
 * @param req
 * @param res
 */
const sendTokenForLogin = async (req: Request, res: Response) => {
  const user = req.body;
  const userExist = await userService.getByEmail(user.email);

  if (!userExist) {
    const newId = await userService.createUser(user);
    user.id = newId;
  } else {
    user.id = userExist.id;
  }

  const token = await authService.generateNewToken(user.id);
  await authService.disableOldToken(user.id, token);

  const emailSubject = `Ciao, per eseguire la login utilizza il magic link : ${process.env.FRONT_END_URL}?token=${token}`;
  sendMail(userExist.email, "Magic Link!", emailSubject, emailSubject, "");

  res.status(200).send(true);
};

/**
 * Se il token di riferimento è corretto allora utente si logga
 * @param req
 * @param res
 */
const getLoggedUserByToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
  const checkUuid = regex.test(token);

  if (!checkUuid) {
    res.status(400).send();
    return;
  }

  const user: UserPrisma = await userService.getUserByToken(token);

  if (!user) {
    res.status(400).send();
    return;
  }

  await authService.deleteToken(token);
  const jwtToken = generateAccessToken(user.email);

  res.status(200).json({ ...user, jwt: jwtToken });
};

export const authController = {
  sendTokenForLogin,
  getLoggedUserByToken,
};
