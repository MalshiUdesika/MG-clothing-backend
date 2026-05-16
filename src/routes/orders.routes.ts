import { Router } from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Products.js";

const r = Router();

r.get("/", requireAuth, async (_, res) => {
  try {
    const orders = await Order.find().populate("cashier customer items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch orders" });
  }
});
r.post("/", requireAuth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.body.invoiceNo || !req.body.items || req.body.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Missing invoiceNo or items" });
    }
    const order = await Order.create([{ ...req.body, cashier: new mongoose.Types.ObjectId(req.user.id) }], { session });
    for (const item of req.body.items) {
      await Product.updateOne({ _id: item.product }, { $inc: { stock: -item.qty } }, { session });
    }
    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (e) {
    await session.abortTransaction();
    res.status(500).json({ error: e instanceof Error ? e.message : "Failed to create order" });
  } finally {
    session.endSession();
  }
});

export default r;
