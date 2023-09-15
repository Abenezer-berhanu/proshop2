import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct
} from "../controllers/productController.js";
import{ protect , admin}from '../middleware/authMiddleware.js'
const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct)
router.route("/:id").get(getProductById).put(protect, admin, updateProduct)


export default router;
