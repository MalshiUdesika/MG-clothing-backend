import { Router } from "express";
import {
  getDashboardStats,
  getSalesReport
} from "../controllers/report.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", protect, getDashboardStats);
router.get("/sales", protect, allowRoles("admin", "manager"), getSalesReport);

export default router;
