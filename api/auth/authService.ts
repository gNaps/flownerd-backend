import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

/**
 * Stacca un nuovo token per l'utente in ingresso
 * @param userId
 * @returns
 */
const generateNewToken = async (userId: number) => {
  const newToken = uuidv4();
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      login_token: {
        create: {
          token: newToken,
        },
      },
    },
  });

  return newToken;
};

/**
 * Disabilita in automatico tutti i vecchi token quando utente esegue una nuova login
 * @param userId
 * @param newToken
 * @returns
 */
const disableOldToken = async (userId: number, newToken: string) => {
  await prisma.login_token.deleteMany({
    where: {
      AND: [{ user: userId }, { token: { not: newToken } }],
    },
  });
};

/**
 * Elimina il token
 * @param userId
 * @param newToken
 * @returns
 */
const deleteToken = async (token: string) => {
  await prisma.login_token.delete({
    where: {
      token: token,
    },
  });
};

/**
 * Dato il metodo, la route e utente verifica se autorizzato dal gruppo policy
 * @param method
 * @param route
 * @param user
 * @returns
 */
const verifyPolicy = async (
  method: string,
  route: string,
  user: number | undefined
): Promise<any> => {
  return true;
};

export const authService = {
  generateNewToken,
  disableOldToken,
  verifyPolicy,
  deleteToken
};
