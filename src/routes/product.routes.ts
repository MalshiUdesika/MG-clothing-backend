import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from "../controllers/product.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.post("/", protect, allowRoles("admin", "manager"), createProduct);
router.put("/:id", protect, allowRoles("admin", "manager"), updateProduct);
router.delete("/:id", protect, allowRoles("admin"), deleteProduct);

export default router;
