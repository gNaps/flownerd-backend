import { NextFunction, Request, Response } from "express";
import { authService } from "../api/auth/authService";
import jwt from "jsonwebtoken";
import { userService } from "../api/user/userService";

/**
 * Funzione di supporto che verifica se il token è valido per la chiamata in corso
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const verifyToken = async (
  req: Request & { CurrentUser?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.CurrentUser = await userService.getByEmail(user.email);
      next();
    }
  );
};

/** Verifica che l'utente che sta eseguendo la chiamata sia autorizzato su questa route */
export const verifyPolicy = async (
  req: Request & { CurrentUser?: any },
  res: Response,
  next: NextFunction
) => {
  const {
    method,
    route: { path: route },
    CurrentUser,
  } = req;
  console.log(`${method} => ${route}, user: ${CurrentUser.id}`);
  const result = await authService.verifyPolicy(method, route, CurrentUser);

  // if (!result || result.length == 0) {
  //   return res.sendStatus(401);
  // } else {
  //   console.log("Appartieni al gruppo: ", result[0].group_name);
  // }

  next();
};
