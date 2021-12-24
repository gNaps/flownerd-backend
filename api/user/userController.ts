import { Request, Response } from "express";
import { userService } from "./userService";

const getUsers = async (request: Request, response: Response) => {
  const { email } = request.query;

  if (!email) {
    const rows = await userService.getAll();
    response.status(200).json(rows);
  } else {
    const rows = await userService.getByEmail(email.toString());
    response.status(200).json(rows);
  }
};

const getUserById = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const rows = await userService.getById(id);
  response.status(200).json(rows);
};

const createUser = async (request: Request, response: Response) => {
  const user = request.body;
  const userCreated = await userService.createUser(user);
  response.status(200).json(userCreated);
};

const updateUser = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const user = { ...request.body };
  const userUpdated = await userService.updateUser(user, id);
  response.status(200).json(userUpdated);
};

const deleteUser = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const userDeleted = await userService.deleteUser(id);
  response.status(200).json(userDeleted);
};

export const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
