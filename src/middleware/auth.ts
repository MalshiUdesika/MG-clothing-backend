import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch { res.status(401).json({ error: "Invalid token" }); }
}
export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: "User not authenticated" });
  return roles.includes(req.user.role) ? next() : res.status(403).json({ error: "Forbidden" });
};
