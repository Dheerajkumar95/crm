import express from "express";
import {
  addProduct,
  getProducts,
  category,
  Updatestatus,
} from "../controllers/productController.js";

const router = express.Router();
router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/category", category);
router.put("/:id/status", Updatestatus);

export default router;
