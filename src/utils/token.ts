import jwt from "jsonwebtoken";
import type { UserRole } from "../models/User.js";

type TokenPayload = {
  id: string;
  role: UserRole;
};

export function generateToken(payload: TokenPayload) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing in .env");
  }

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}
