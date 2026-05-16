import { Router } from "express";
import { Product } from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const r = Router();
r.get("/", requireAuth, async (_, res) => res.json(await Product.find()));
r.post("/", requireAuth, requireRole("admin", "manager"), async (req, res) => res.json(await Product.create(req.body)));
r.put("/:id", requireAuth, requireRole("admin", "manager"), async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })));
r.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => res.json(await Product.findByIdAndDelete(req.params.id)));
export default r;
//# sourceMappingURL=products.routes.js.map