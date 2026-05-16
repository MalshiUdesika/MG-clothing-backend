import { Router } from "express";
import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { requireAuth } from "../middleware/auth.js";
const r = Router();
r.get("/", requireAuth, async (_, res) => res.json(await Order.find().populate("cashier customer items.product")));
r.post("/", requireAuth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const order = await Order.create([{ ...req.body, cashier: req.user.id }], { session });
        for (const item of req.body.items)
            await Product.updateOne({ _id: item.product }, { $inc: { stock: -item.qty } }, { session });
        await session.commitTransaction();
        res.json(order[0]);
    }
    catch (e) {
        await session.abortTransaction();
        res.status(400).json({ error: e.message });
    }
    finally {
        session.endSession();
    }
});
export default r;
//# sourceMappingURL=orders.routes.js.map