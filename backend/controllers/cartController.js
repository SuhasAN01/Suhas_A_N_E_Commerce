import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Helper function to get or create cart
const getOrCreateCart = async () => {
  let cart = await Cart.findOne().sort({ createdAt: -1 });
  if (!cart) {
    cart = await Cart.create({ items: [], total: 0 });
  }
  return cart;
};

// @desc    Get cart items
// @route   GET /api/cart
// @access  Public
export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    
    // Populate product details
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { productId, quantity } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Get or create cart
    const cart = await getOrCreateCart();

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = product.price;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    }

    // Recalculate total and save
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
      error: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
export const removeFromCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart();

    const itemId = req.params.id;

    // Check if item exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Remove item from cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total and save
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart',
      error: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
export const updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const cart = await getOrCreateCart();
    const itemId = req.params.id;
    const { quantity } = req.body;

    // Find item in cart
    const item = cart.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Validate product stock
    const product = await Product.findById(item.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Update quantity
    item.quantity = quantity;

    // Recalculate total and save
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
      error: error.message,
    });
  }
};

