import { Router } from "express";
import { Customer } from "../models/Customer.js";
import { requireAuth } from "../middleware/auth.js";
const r = Router();
r.get("/", requireAuth, async (_, res) => res.json(await Customer.find()));
r.post("/", requireAuth, async (req, res) => res.json(await Customer.create(req.body)));
r.put("/:id", requireAuth, async (req, res) => res.json(await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })));
r.delete("/:id", requireAuth, async (req, res) => res.json(await Customer.findByIdAndDelete(req.params.id)));
export default r;
//# sourceMappingURL=customers.routes.js.map