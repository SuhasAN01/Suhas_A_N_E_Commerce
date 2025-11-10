import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart`);
      setCart(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/cart`, {
        productId,
        quantity,
      });
      setCart(response.data.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error adding item to cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/cart/${itemId}`);
      setCart(response.data.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error removing item from cart';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/cart/${itemId}`, {
        quantity,
      });
      setCart(response.data.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error updating cart item';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  // Calculate total items in cart
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

