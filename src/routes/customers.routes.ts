import { Router } from "express";
import { Customer } from "../models/Customer.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.get("/", requireAuth, async (_, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch customers" });
  }
});

r.post("/", requireAuth, async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: "Customer name is required" });
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create customer" });
  }
});

r.put("/:id", requireAuth, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update customer" });
  }
});

r.delete("/:id", requireAuth, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete customer" });
  }
});

export default r;