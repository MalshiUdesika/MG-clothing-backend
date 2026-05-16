import type { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/User.js";
import { generateToken } from "../utils/token.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "cashier"]).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten()
    });
  }

  const { name, email, password, role } = parsed.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already exists"
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "cashier"
  });

  const token = generateToken({
    id: user._id.toString(),
    role: user.role
  });

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid email or password"
    });
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });

  if (!user || !user.isActive) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role
  });

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}

export async function getMe(req: AuthRequest, res: Response) {
  return res.json({
    user: req.user
  });
}
