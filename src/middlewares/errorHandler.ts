import { NextFunction, Request, Response } from "express";
import { LogService } from "../services/logService";
import { Messages } from "../utils/constants";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = Messages.INTERNAL_SERVER_ERROR_MESSAGE;

  if (error.status) {
    statusCode = error.status;
    errorMessage = error.message;
    LogService("errorHandler", error.message);
  }

  res.status(statusCode).json({ error: errorMessage });
};
