import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { iUserDetails } from "../models/userModel";
import { iUserServiceDTO } from "../services/userDTO";
import { getUserByEmailService } from "../services/userModel";

//Standardized response function
export const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: unknown = null,
) => {
  res.status(status).json({ status, message, data });
};

export const createTokens = (userWithoutPassword: iUserDetails) => {
  const accessToken: string = jwt.sign(
    userWithoutPassword,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "2h" },
  );
  const refreshToken: string = jwt.sign(
    userWithoutPassword,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "10d" },
  );
  return {
    accessToken,
    expirationTimeStamp: new Date().setHours(new Date().getHours() + 2),
    refreshToken,
  };
};

export const getUserFromDecodedInfo = async (
  decoded: string | JwtPayload | undefined,
) => {
  if (!decoded || typeof decoded !== "object") {
    return { error: "Invalid token payload" };
  }
  const email = decoded.email; // type-safe: JwtPayload is a Record<string, any>
  if (!email) {
    return { error: "Email not found in token" };
  }
  const user: iUserServiceDTO | null = await getUserByEmailService(email);
  if (!user) {
    return { error: "User not found" };
  }
  const { password, ...userWithoutPassword } = user; // Exclude the password from the response
  return { userWithoutPassword };
};
