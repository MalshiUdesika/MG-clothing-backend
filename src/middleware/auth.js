import jwt from "jsonwebtoken";
export function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid token" });
    }
}
export const requireRole = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ error: "Forbidden" });
//# sourceMappingURL=auth.js.map