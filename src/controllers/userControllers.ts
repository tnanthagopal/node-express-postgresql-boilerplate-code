import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/userModel";

//Standardized response function
const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: unknown = null,
) => {
  res.status(status).json({ status, message, data });
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await createUserService(req.body);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (e) {
    next(e); //NextFunction is the type provided by Express for the next middleware handler, used to pass control or errors down the middleware chain.
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await getAllUsersService();
    handleResponse(res, 200, "All users retrieved successfully", allUsers);
  } catch (e) {
    next(e);
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserByIdService(req.params.id);
    handleResponse(res, 200, "User retrieved successfully", user);
  } catch (e) {
    next(e);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (e) {
    next(e);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (e) {
    next(e);
  }
};
