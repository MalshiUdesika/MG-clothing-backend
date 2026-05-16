import { Schema, model } from "mongoose";

const inventoryLogSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantityChanged: { type: Number, required: true },
  type: { type: String, enum: ["in", "out", "adjustment"], required: true },
  reason: String,
  reference: { type: Schema.Types.ObjectId, refPath: "referenceModel" },
  referenceModel: { type: String, enum: ["Order", "Purchase"] },
  createdAt: { type: Date, default: Date.now },
});

export const InventoryLog = model("InventoryLog", inventoryLogSchema);
