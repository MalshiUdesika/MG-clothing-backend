import type { Request, Response } from "express";
import { z } from "zod";
import { Customer } from "../models/Customer.js";

const customerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional()
});

export async function getCustomers(_req: Request, res: Response) {
  const customers = await Customer.find().sort({ createdAt: -1 });
  return res.json(customers);
}

export async function createCustomer(req: Request, res: Response) {
  const parsed = customerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid customer data",
      errors: parsed.error.flatten()
    });
  }

  const customer = await Customer.create(parsed.data);

  return res.status(201).json(customer);
}

export async function updateCustomer(req: Request, res: Response) {
  const parsed = customerSchema.partial().safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid customer data",
      errors: parsed.error.flatten()
    });
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true
  });

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found"
    });
  }

  return res.json(customer);
}

export async function deleteCustomer(req: Request, res: Response) {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found"
    });
  }

  return res.json({
    message: "Customer deleted successfully"
  });
}
