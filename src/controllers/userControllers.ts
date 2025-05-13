import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/userModel";
import {
  iCreateUserBodyDTO,
  iUpdateUserBodyDTO,
  iIdParamsDTO,
} from "./userDTO";
import { handleResponse } from "./utils";
import { iUserDetails } from "../models/userModel";

export const createUser = async (
  req: Request<{}, iUserDetails, iCreateUserBodyDTO>,
  res: Response,
  next: NextFunction,
) => {
  const hashedPw = await argon2.hash(req.body.password, {
    type: argon2.argon2id,
  });
  try {
    const newUser = await createUserService(
      req.body.name,
      req.body.email,
      hashedPw,
    );
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (e) {
    next(e); //NextFunction is the type provided by Express for the next middleware handler, used to pass control or errors down the middleware chain.
  }
};
export const getAllUsers = async (
  req: Request<{}, iUserDetails, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("test", res.locals.user);
    const allUsers = await getAllUsersService();
    handleResponse(res, 200, "All users retrieved successfully", allUsers);
  } catch (e) {
    next(e);
  }
};
export const getUserById = async (
  req: Request<iIdParamsDTO, iUserDetails, {}>,
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
  req: Request<iIdParamsDTO, iUserDetails, iUpdateUserBodyDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await updateUserService(
      req.params.id,
      req.body.name,
      req.body.email,
    );
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (e) {
    next(e);
  }
};
export const deleteUser = async (
  req: Request<iIdParamsDTO, iUserDetails, {}>,
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
