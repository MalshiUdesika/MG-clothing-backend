import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { Product } from "../models/Products.js";

const r = Router();

r.get("/", requireAuth, async (_, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch products" });
  }
});

r.post("/", requireAuth, requireRole("admin", "manager"), async (req, res) => {
  try {
    if (!req.body.name || !req.body.barcode || req.body.price === undefined) {
      return res.status(400).json({ error: "Missing required fields: name, barcode, price" });
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create product" });
  }
});

r.put("/:id", requireAuth, requireRole("admin", "manager"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update product" });
  }
});

r.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete product" });
  }
});

export default r;
