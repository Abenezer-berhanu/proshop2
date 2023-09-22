import fs from "fs";
import asyncHandler from "../middleware/asyncHandler.js";
import Fashion from '../model/fashionTrend.js'
import Product from "../model/productModel.js";
import path from "path";
import { count } from "console";

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageNumber = process.env.PAGINATION_PAGE;
  const page = Number(req.query.pageNumber) || 1;

  if(req.query.queryFashion){
    const countFashion = await Fashion.countDocuments({})
    const fashionImages = await Fashion.find()
    .limit(pageNumber)
    .skip(pageNumber * (page - 1))
    if(fashionImages){
      res.status(200).json({fashionImages, page, pages: Math.ceil(countFashion / pageNumber)})
    }else{
      res.status(404)
      throw new Error('Resource Not Found')
    }
  }else{
    const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : req.query.category
    ? { category: { $regex: req.query.category, $options: "i" } }
    : req.query.queryName && !req.query.filterName
    ? { name: { $regex: req.query.queryName, $options: "i" } }
    : req.query.categoryParam && req.query.filterName
    ? {
        $and: [
          { category: { $regex: req.query.categoryParam, $options: "i" } },
          { brand: { $regex: req.query.queryName, $options: "i" } },
          { name: { $regex: req.query.filterName, $options: "i" } },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageNumber)
    .sort({ createAt: -1 })
    .skip(pageNumber * (page - 1));
  res
    .status(200)
    .json({ products, page, pages: Math.ceil(count / pageNumber) });
  }
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

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
    const updatedProduct = await product.save();
    res.status(200).json(createProduct);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
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

export const addReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found ");
  }
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.status(200).json(products);
});
