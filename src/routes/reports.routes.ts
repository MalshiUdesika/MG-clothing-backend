import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { Order } from "../models/Order.js";

const r = Router();

r.get("/sales", requireAuth, requireRole("admin", "manager"), async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: "Start and end dates are required" });
    }
    const orders = await Order.find({
      createdAt: { $gte: new Date(start as string), $lte: new Date(end as string) }
    }).populate("cashier customer items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch sales report" });
  }
});

export default r;