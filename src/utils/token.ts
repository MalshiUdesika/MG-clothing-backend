import * as jwt from "jsonwebtoken";
import type { UserRole } from "../models/User.js";

type TokenPayload = {
  id: string;
  role: UserRole;
};

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    payload,
    secret,
    {
      expiresIn: "7d",
    }
  );
}