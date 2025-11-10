import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cartController.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation rules for adding to cart
const addToCartValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

// Validation rules for updating cart item
const updateCartValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
];

router.route('/').get(getCart).post(addToCartValidation, addToCart);
router.route('/:id').delete(removeFromCart).put(updateCartValidation, updateCartItem);

export default router;

