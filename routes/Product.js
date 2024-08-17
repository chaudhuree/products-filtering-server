const express = require('express');

const { createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct } = require('../controllers/Product');
const router = express.Router();

router.get('/products', getAllProducts);
router.post('/product', createProduct);
router.get('/product/:id', getProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


module.exports = router;