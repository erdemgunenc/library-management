import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { Messages } from "../utils/constants";
export const rateLimiter = rateLimit({
  windowMs: Messages.BAN_FOR_SEC,
  max: Messages.MAX_REQUEST,
  handler: (req: Request, res: Response) => {
    res.status(429).json(Messages.TOO_MANY_REQUEST);
  },
});
