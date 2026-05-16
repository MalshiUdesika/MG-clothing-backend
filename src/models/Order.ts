
import { Schema, model } from "mongoose";

const orderSchema = new Schema({

  invoiceNo: { type: String, required: true, unique: true },
  cashier: { type: Schema.Types.ObjectId, ref: "User", required: true },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    qty: Number,
  }],
  subtotal: Number,
  discount: { type: Number, default: 0 },
  tax: Number,
  total: Number,
  payment: { type: String, enum: ["cash", "card", "mobile"] },
  status: { type: String, enum: ["paid", "refunded"], default: "paid" },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model("Order", orderSchema);
