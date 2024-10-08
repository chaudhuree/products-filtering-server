const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

// create new product
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
});

//Get all products with pagination, search, filter, and sorting
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 6,
    search,
    category,
    brand,
    priceRange,
    sort,
  } = req.query;
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }
  if (priceRange) {
    const [start, end] = priceRange.split("-");
    query.price = { $gte: start, $lte: end };
  }
  // Apply sorting
  let sortBy = {};
  if (sort === "priceAsc") sortBy.price = 1;
  if (sort === "priceDesc") sortBy.price = -1;
  if (sort === "dateDesc") sortBy.createdAt = -1;
  if (sort === "dateAsc") sortBy.createdAt = 1;

  // Fetch products with pagination
  const products = await Product.find(query)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  // Get total count
  const total = await Product.countDocuments(query);

  res.status(StatusCodes.OK).json({ products, total });
});


// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }
  res.status(StatusCodes.OK).json(product);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id , req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }
  res.status(StatusCodes.OK).json(product);
}
);

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Product not found");
  }
  res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};