import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) res.status(200).json({ product });
  if (!product) {
    res.status(404);
    throw new Error("Resource not Found");
  }
});
