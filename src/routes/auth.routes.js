import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
const r = Router();
r.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role });
    res.json({ id: user._id, email: user.email });
});
r.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
        return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "1h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
export default r;
//# sourceMappingURL=auth.routes.js.map