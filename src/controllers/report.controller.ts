import type { Request, Response } from "express";
import { Order } from "../models/Order.js";
import { Customer } from "../models/Customer.js";
import { Product } from "../models/Products.js";

export async function getDashboardStats(_req: Request, res: Response) {
  const orders = await Order.find({ status: "paid" });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = await Product.countDocuments({ isActive: true });
  const totalCustomers = await Customer.countDocuments();

  return res.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    totalCustomers
  });
}

export async function getSalesReport(_req: Request, res: Response) {
  const orders = await Order.find({ status: "paid" }).sort({ createdAt: -1 });

  return res.json({
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    orders
  });
}
