import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send("Not authorized");
    return;
  }
  const token = authHeader.split(" ")?.[1] as string;
  if (!token) {
    res.status(401).send("Not authorized");
    return;
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.user = decoded;
      next();
    },
  );
};
