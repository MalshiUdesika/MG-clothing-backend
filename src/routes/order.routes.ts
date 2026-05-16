import { Router } from "express";
import {
  createOrder,
  getOrders,
  refundOrder
} from "../controllers/order.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getOrders);
router.post("/", protect, createOrder);
router.patch("/:id/refund", protect, allowRoles("admin", "manager"), refundOrder);

export default router;
