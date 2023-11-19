// src/middleware/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header("Authorization")?.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return response.status(403).json({ message: "Invalid token." });
    }

    request.user = user;
    next();
  });
}
