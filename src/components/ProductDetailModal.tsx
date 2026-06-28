/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, MapPin, Plus, Minus, ShoppingBag, Check, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [addingState, setAddingState] = useState<'idle' | 'adding' | 'added'>('idle');

  if (!product) return null;

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const handleAdd = () => {
    if (product.stock === 0) return;
    setAddingState('adding');

    setTimeout(() => {
      addToCart(product, qty);
      setAddingState('added');
      
      setTimeout(() => {
        setAddingState('idle');
      }, 1500);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop overlay */}
        <motion.div
          id="detail-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          id={`detail-modal-container-${product.id}`}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-brand-cream text-brand-charcoal shadow-2xl flex flex-col md:flex-row border border-brand-clay/40"
        >
          {/* Close button inside modal */}
          <button
            id="close-detail-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full bg-brand-cream/80 backdrop-blur p-2 text-brand-charcoal hover:text-brand-terracotta hover:scale-105 transition-all shadow border border-brand-clay/30"
            aria-label="Close product details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 relative bg-stone-100 aspect-square md:aspect-auto md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            {/* Origin indicator overlay on image */}
            <div className="absolute bottom-4 left-4 bg-brand-cream/90 backdrop-blur px-3 py-1.5 rounded flex items-center gap-1.5 shadow border border-brand-clay/20">
              <Compass className="h-4 w-4 text-brand-terracotta animate-pulse" />
              <span className="font-serif text-[11px] font-bold text-brand-charcoal uppercase tracking-widest">
                Heritage Verified
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Story & Specs */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category tag & stock info */}
              <div className="flex items-center justify-between gap-4">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-stone">
                  {product.category}
                </span>
                <div>
                  {product.stock === 0 ? (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Out of stock
                    </span>
                  ) : product.stock <= 3 ? (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/10">
                      Rare: Only {product.stock} available
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/10">
                      Available
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Artisan Header */}
              <h1 className="mt-3 font-serif text-2xl font-bold leading-tight text-brand-charcoal lg:text-3xl">
                {product.title}
              </h1>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="font-sans text-xs font-bold text-brand-terracotta uppercase tracking-widest">
                  BY {product.artisan}
                </p>
                <span className="text-brand-stone/60 hidden sm:inline">|</span>
                <p className="flex items-center gap-1 font-sans text-xs text-brand-stone">
                  <MapPin className="h-3.5 w-3.5 text-brand-stone/80" />
                  {product.origin}
                </p>
              </div>

              {/* Price Tag */}
              <p className="mt-4 font-display text-2xl font-extrabold text-brand-charcoal border-b border-brand-clay pb-4">
                ${product.price.toFixed(2)}
              </p>

              {/* Narrative Biography of Product */}
              <div className="mt-5 space-y-4">
                <h3 className="font-display text-xs font-bold tracking-widest text-brand-stone uppercase">
                  The Story
                </h3>
                <p className="font-sans text-xs leading-relaxed text-brand-stone/90">
                  {product.description}
                </p>
              </div>

              {/* Crafting Details */}
              <div className="mt-5 space-y-2">
                <h3 className="font-display text-xs font-bold tracking-widest text-brand-stone uppercase mb-3">
                  Crafting Signature
                </h3>
                <ul className="space-y-1.5">
                  {product.details.map((detail, index) => (
                    <li key={`${product.id}-detail-${index}`} className="flex items-start gap-2 text-xs text-brand-stone">
                      <Sparkles className="h-3.5 w-3.5 text-brand-terracotta shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Block */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-brand-clay/40 pt-4 text-xs">
                <div>
                  <span className="block font-semibold text-brand-stone uppercase tracking-wide text-[10px]">Dimensions</span>
                  <span className="block text-brand-charcoal font-medium mt-1">{product.dimensions}</span>
                </div>
                <div>
                  <span className="block font-semibold text-brand-stone uppercase tracking-wide text-[10px]">Primary Material</span>
                  <span className="block text-brand-charcoal font-medium mt-1">{product.material}</span>
                </div>
                <div className="col-span-2 border-t border-brand-clay/30 pt-3">
                  <span className="block font-semibold text-brand-stone uppercase tracking-wide text-[10px]">Care Instructions</span>
                  <span className="block text-brand-stone text-[11px] leading-relaxed mt-1">{product.care}</span>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Add To Cart action */}
            <div className="mt-8 border-t border-brand-clay pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-3 bg-brand-clay/35 p-1 rounded border border-brand-clay/40 shrink-0 self-start sm:self-auto">
                <button
                  id="modal-qty-minus"
                  onClick={handleDecrease}
                  disabled={qty <= 1}
                  className="p-1 px-3 text-brand-stone hover:text-brand-charcoal transition-colors disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="font-sans text-xs font-bold px-3 text-brand-charcoal min-w-[20px] text-center">
                  {qty}
                </span>
                <button
                  id="modal-qty-plus"
                  onClick={handleIncrease}
                  disabled={qty >= product.stock}
                  className="p-1 px-3 text-brand-stone hover:text-brand-charcoal transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              <button
                id="modal-add-to-cart-btn"
                type="button"
                disabled={product.stock === 0 || addingState === 'adding'}
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-brand-clay/50 text-brand-stone cursor-not-allowed'
                    : addingState === 'added'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-charcoal text-white hover:bg-brand-stone hover:shadow-lg'
                }`}
                aria-label={`Add ${qty} ${product.title} to cart`}
              >
                {addingState === 'idle' && (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Secure Handcrafted Work — ${(product.price * qty).toFixed(2)}
                  </>
                )}
                {addingState === 'adding' && (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding to Bag...
                  </span>
                )}
                {addingState === 'added' && (
                  <>
                    <Check className="h-4 w-4" />
                    Piece Secured!
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
