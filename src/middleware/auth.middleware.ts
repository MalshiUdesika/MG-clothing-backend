import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, type UserRole } from "../models/User.js";

type JwtPayload = {
  id: string;
  role: UserRole;
};

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  };
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured"
      });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "User not found or inactive"
      });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Not authorized, invalid token"
    });
  }
}

export function allowRoles(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
}
