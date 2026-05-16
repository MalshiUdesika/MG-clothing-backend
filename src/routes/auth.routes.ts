import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const r = Router();

r.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing required fields" });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role: role || "cashier" });
    res.json({ id: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Registration failed" });
  }
});

r.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES || "7d" } as any);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Login failed" });
  }
});

export default r;
