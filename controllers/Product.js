const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

// create new product
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
});
