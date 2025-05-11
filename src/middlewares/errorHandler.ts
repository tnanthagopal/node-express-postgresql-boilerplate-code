import { Request, Response, NextFunction } from "express";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) {
    return next(new Error("Name is required"));
  }
  next(); // proceed to next middleware if no error
};

export const errorHandler = (
  err: Error & { statusCode?: number; status?: number }, //got this code from chatGPT
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if (someCondition) {
  //   return next(err); // delegate to another error handler
  // }
  const statusCode = err.statusCode || err.status || 500;
  console.error(
    `[${req.method}] ${req.originalUrl} → ${statusCode}: ${err.message}`,
  );
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
