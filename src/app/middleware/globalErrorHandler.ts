import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(400).json( {
    success: false,
    message: err.message,
    mongooseErr: err,
  })
};
