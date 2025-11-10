import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation rules for creating product
const productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image').notEmpty().withMessage('Product image URL is required'),
  body('category').notEmpty().withMessage('Product category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

router.route('/').get(getProducts).post(productValidation, createProduct);
router.route('/:id').get(getProductById);

export default router;

