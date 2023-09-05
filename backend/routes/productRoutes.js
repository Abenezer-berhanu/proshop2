import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../model/productModel.js'
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ products });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if(product) res.status(200).json({ product });
    if(!product) {
      res.status(404);
      throw new Error('Resource not Found')
    }
  })
);

export default router;
