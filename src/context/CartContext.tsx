/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ToastMessage } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage if present
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('artisanal_cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart changes
  useEffect(() => {
    localStorage.setItem('artisanal_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast utilities
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock === 0) {
      addToast(`Sorry, "${product.title}" is currently out of stock.`, 'error');
      return;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const newQty = currentQty + quantity;

      if (newQty > product.stock) {
        addToast(`Cannot add more. Only ${product.stock} items available in stock.`, 'error');
        return;
      }

      setCart((prevCart) => {
        const index = prevCart.findIndex((item) => item.product.id === product.id);
        if (index === -1) return prevCart;
        const newCart = [...prevCart];
        newCart[index] = {
          ...newCart[index],
          quantity: newQty,
        };
        return newCart;
      });
      addToast(`Updated quantity of "${product.title}" in cart.`, 'success');
    } else {
      if (quantity > product.stock) {
        addToast(`Cannot add that many. Only ${product.stock} items available in stock.`, 'error');
        return;
      }

      setCart((prevCart) => [...prevCart, { product, quantity }]);
      addToast(`Added "${product.title}" to cart!`, 'success');
    }
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      setCart((prevCart) => prevCart.filter((i) => i.product.id !== productId));
      addToast(`Removed "${item.product.title}" from cart.`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;

    const product = item.product;
    if (quantity > product.stock) {
      addToast(`Only ${product.stock} items available in stock.`, 'error');
      return;
    }

    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.product.id === productId);
      if (index === -1) return prevCart;

      const newCart = [...prevCart];
      newCart[index] = { ...newCart[index], quantity };
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    addToast('Cart cleared.', 'info');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping above $150, else flat $15. If cart is empty, shipping is 0.
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 15.00;
  
  // Estimated taxes (8%)
  const taxes = subtotal * 0.08;
  
  const total = subtotal + shipping + taxes;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        shipping,
        taxes,
        total,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
