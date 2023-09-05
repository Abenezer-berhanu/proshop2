import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ products });
})

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) res.status(200).json({ product });
    if (!product) {
      res.status(404);
      throw new Error("Resource not Found");
    }
  })

