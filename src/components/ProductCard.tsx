/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { MapPin, ShoppingBag, Check, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [addingState, setAddingState] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the details modal
    if (product.stock === 0) return;

    setAddingState('adding');
    
    // Mimic API delay before adding to cart
    setTimeout(() => {
      addToCart(product, 1);
      setAddingState('added');
      
      setTimeout(() => {
        setAddingState('idle');
      }, 1500);
    }, 450);
  };

  // Dynamic stock indicators
  const getStockIndicator = () => {
    if (product.stock === 0) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          Out of stock
        </span>
      );
    }
    if (product.stock <= 3) {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10">
          Only {product.stock} left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/10">
        In stock
      </span>
    );
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col justify-between overflow-hidden rounded bg-transparent cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-stone-100 rounded">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 border border-brand-clay/30" />
        
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-[0.25,1,0.5,1] group-hover:scale-105"
        />

        {/* Hover overlay with a luxurious 'Quick View' indicator */}
        <div className="absolute inset-0 bg-brand-charcoal/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="rounded-full bg-brand-cream px-4 py-2.5 shadow-lg flex items-center gap-2 text-brand-charcoal text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Eye className="h-4 w-4" />
            View Story
          </motion.div>
        </div>

        {/* Stock Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          {getStockIndicator()}
        </div>

        {/* Category Tag Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center rounded bg-brand-cream/80 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-stone">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Artisan Label */}
          <p className="flex items-center gap-1 font-sans text-xs font-semibold text-brand-terracotta uppercase tracking-wider">
            {product.artisan}
          </p>

          {/* Location / Origin */}
          <p className="mt-1 flex items-center gap-1 font-sans text-[11px] text-brand-stone">
            <MapPin className="h-3 w-3 shrink-0" />
            {product.origin}
          </p>

          {/* Product Title */}
          <h3 className="mt-2.5 font-serif text-sm sm:text-base md:text-lg font-semibold leading-snug text-brand-charcoal group-hover:text-brand-terracotta transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-[3rem]">
            {product.title}
          </h3>

          {/* Core description preview */}
          <p className="mt-1.5 font-sans text-[11px] leading-relaxed text-brand-stone line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-brand-clay/30 pt-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="font-sans text-[10px] font-semibold text-brand-stone uppercase tracking-widest">Price</span>
            <span className="font-display text-lg font-bold text-brand-charcoal">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Cart Trigger / Action Button */}
          <button
            id={`add-to-cart-${product.id}`}
            type="button"
            disabled={product.stock === 0 || addingState === 'adding'}
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 ${
              product.stock === 0
                ? 'bg-brand-clay/50 text-brand-stone cursor-not-allowed border border-brand-clay/30'
                : addingState === 'added'
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-charcoal text-white hover:bg-brand-stone hover:shadow-md'
            }`}
            aria-label={
              product.stock === 0
                ? `${product.title} is out of stock`
                : `Add ${product.title} to cart`
            }
          >
            {addingState === 'idle' && (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Add To Cart
              </>
            )}
            {addingState === 'adding' && (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Securing...
              </span>
            )}
            {addingState === 'added' && (
              <>
                <Check className="h-3.5 w-3.5" />
                Added!
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
