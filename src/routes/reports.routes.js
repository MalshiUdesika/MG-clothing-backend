import { Router } from "express";
import { Order } from "../models/Order.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
const r = Router();
r.get("/sales", requireAuth, requireRole("admin", "manager"), async (req, res) => {
    const { start, end } = req.query;
    const orders = await Order.find({
        createdAt: { $gte: new Date(start), $lte: new Date(end) }
    }).populate("cashier customer items.product");
    res.json(orders);
});
export default r;
//# sourceMappingURL=reports.routes.js.map