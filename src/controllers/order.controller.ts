import type { Response } from "express";
import { z } from "zod";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const orderSchema = z.object({
  customerId: z.string().optional(),
  customerName: z.string().optional(),
  paymentMethod: z.enum(["cash", "card", "mobile"]),
  discount: z.number().min(0).default(0),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1)
      })
    )
    .min(1)
});

function generateInvoiceNumber() {
  return `INV-${Date.now()}`;
}

export async function getOrders(_req: AuthRequest, res: Response) {
  const orders = await Order.find()
    .populate("customer", "name phone email")
    .populate("cashier", "name email")
    .sort({ createdAt: -1 });

  return res.json(orders);
}

export async function createOrder(req: AuthRequest, res: Response) {
  const parsed = orderSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid order data",
      errors: parsed.error.flatten()
    });
  }

  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const { customerId, customerName, paymentMethod, discount, items } = parsed.data;

  let subtotal = 0;

  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        message: `Product not found: ${item.productId}`
      });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`
      });
    }

    const itemSubtotal = product.price * item.quantity;
    subtotal += itemSubtotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      quantity: item.quantity,
      subtotal: itemSubtotal
    });

    product.stock -= item.quantity;
    await product.save();
  }

  const tax = subtotal * 0.05;
  const total = Math.max(0, subtotal - discount + tax);

  const order = await Order.create({
    invoiceNumber: generateInvoiceNumber(),
    customer: customerId || undefined,
    customerName: customerName || "Walk-in",
    cashier: req.user.id,
    items: orderItems,
    subtotal,
    discount,
    tax,
    total,
    paymentMethod,
    status: "paid"
  });

  if (customerId) {
    await Customer.findByIdAndUpdate(customerId, {
      $inc: {
        totalSpent: total,
        totalOrders: 1
      }
    });
  }

  return res.status(201).json(order);
}

export async function refundOrder(req: AuthRequest, res: Response) {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found"
    });
  }

  if (order.status === "refunded") {
    return res.status(400).json({
      message: "Order already refunded"
    });
  }

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: item.quantity
      }
    });
  }

  order.status = "refunded";
  await order.save();

  return res.json({
    message: "Order refunded successfully",
    order
  });
}
