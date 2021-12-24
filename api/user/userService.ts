import { PrismaClient } from "@prisma/client";
import { UserPrisma } from "../../model/User";

const prisma = new PrismaClient();

/** Recupera tutti gli utenti */
const getAll = async (): Promise<Array<UserPrisma>> => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

/** Recupera un solo utente data la mail */
const getByEmail = async (email: string): Promise<UserPrisma> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user!;
};

/** Recupera un solo utente dato l'id */
const getById = async (id: number): Promise<UserPrisma> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user!;
};

/** Recupera un solo utente dato un token attivo su di esso */
const getUserByToken = async (
  token: string
): Promise<UserPrisma> => {
  const user = await prisma.user.findFirst({
    where: {
      login_token: {
        some: {
          token: token,
        },
      },
    },
  });

  return user!;
};

/** Crea un nuovo utente */
const createUser = async (
  user: UserPrisma
): Promise<UserPrisma> => {
  const userCreated = await prisma.user.create({
    data: {
      ...user,
    },
  });

  return userCreated;
};

/** Aggiorna i dati di un utente */
const updateUser = async (
  user: UserPrisma,
  id: number
): Promise<UserPrisma> => {
  const userUpdated = await prisma.user.update({
    where: { id: id },
    data: { ...user },
  });

  return userUpdated;
};

/** Elimina un utente dato l'id */
const deleteUser = async (id: number): Promise<UserPrisma> => {
  const userDeleted = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return userDeleted!;
};

export const userService = {
  getAll,
  getByEmail,
  getById,
  createUser,
  updateUser,
  deleteUser,
  getUserByToken,
};
