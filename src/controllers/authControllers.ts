import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
import { getUserByEmailService } from "../services/userModel";
import { createTokens, getUserFromDecodedInfo, handleResponse } from "./utils";
import { iLoginReqDTO, iLoginResDTO } from "./loginDTO";
import dotenv from "dotenv";
import { iUserServiceDTO } from "../services/userDTO";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { iUserDetails } from "../models/userModel";

dotenv.config();

export const logIn = async (
  req: Request<{}, iLoginResDTO, iLoginReqDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: iUserServiceDTO | null = await getUserByEmailService(
      req.body.email,
    );
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    const isValid = await argon2.verify(user.password, req.body.password);
    if (!isValid) {
      return handleResponse(res, 401, "Incorrect password");
    }
    const { password, ...userWithoutPassword } = user; // Exclude the password from the response
    const tokens = createTokens(userWithoutPassword);
    // ++++++add or update email, refresh token, device to database
    //there must be a cron job to remove refresh token after 10 days from database
    return handleResponse(res, 200, "Signed in successfully", {
      user: userWithoutPassword,
      ...tokens,
    });
  } catch (e) {
    next(e);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken: string = req.body.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (
      err: VerifyErrors | null,
      decoded: string | JwtPayload | undefined,
    ) => {
      if (err) {
        //update code
        next(err);
        return;
      }
      // ++++++check whether the refresh token is in the database
      const userFromDecodedInfo: {
        userWithoutPassword?: iUserDetails;
        error?: string;
      } = await getUserFromDecodedInfo(decoded);
      if (!userFromDecodedInfo.userWithoutPassword) {
        // next(new Error(userFromDecodedInfo.error));
        // return;
        return handleResponse(
          res,
          401,
          userFromDecodedInfo.error || "Authentication failed",
        );
      }
      const tokens = createTokens(userFromDecodedInfo.userWithoutPassword);
      // ++++++update email, refresh token, device to database
      return handleResponse(res, 200, "Success", tokens);
    },
  );
};

// ++++++Remove refresh token from db when logging our
