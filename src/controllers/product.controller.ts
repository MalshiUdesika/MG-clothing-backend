import type { Request, Response } from "express";
import { z } from "zod";
import { Product } from "../models/Products.js";

const productSchema = z.object({
  name: z.string().min(1),
  barcode: z.string().min(1),
  category: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  image: z.string().optional()
});

export async function getProducts(req: Request, res: Response) {
  const search = String(req.query.search || "");
  const category = String(req.query.category || "");

  const filter: Record<string, unknown> = {
    isActive: true
  };

  if (category && category !== "All") {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { barcode: { $regex: search, $options: "i" } }
    ];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });

  return res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  return res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid product data",
      errors: parsed.error.flatten()
    });
  }

  const existing = await Product.findOne({
    barcode: parsed.data.barcode
  });

  if (existing) {
    return res.status(409).json({
      message: "Barcode already exists"
    });
  }

  const product = await Product.create(parsed.data);

  return res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const parsed = productSchema.partial().safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid product data",
      errors: parsed.error.flatten()
    });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, parsed.data, {
    new: true
  });

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  return res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  return res.json({
    message: "Product deleted successfully"
  });
}
