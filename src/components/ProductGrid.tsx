/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Product, FilterState } from '../types';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { SearchX, RotateCcw, Award, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductGridProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ filters, setFilters, onOpenDetails }) => {
  // Apply filtering and sorting dynamically
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.artisan.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Artisan origin filter
    if (filters.artisanOrigins.length > 0) {
      result = result.filter((p) => filters.artisanOrigins.includes(p.origin));
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // In stock only filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting logic
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      artisanOrigins: [],
      minPrice: 0,
      maxPrice: 350,
      sortBy: 'featured',
      inStockOnly: false,
    });
  };

  return (
    <div className="flex-1">
      {/* Grid Header and Stats */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-clay/50 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
            {filters.categories.length === 1 ? filters.categories[0] : 'The Curated Collection'}
          </h2>
          <p className="font-sans text-xs text-brand-stone mt-1">
            Showing <strong className="text-brand-charcoal">{filteredProducts.length}</strong> of{' '}
            {products.length} rare, masterwork pieces
          </p>
        </div>

        {/* High-end attributes banner for trust building */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-brand-stone font-sans text-[11px] font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-brand-terracotta" />
            Direct To Artisan
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-terracotta" />
            Museum Quality
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-brand-terracotta" />
            Radically Traceable
          </span>
        </div>
      </div>

      {/* Main Grid Render */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length > 0 ? (
          <motion.div
            id="product-cards-grid"
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            id="empty-state-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-clay py-20 px-4 text-center bg-brand-cream/50"
          >
            <div className="rounded-full bg-brand-clay/30 p-4 text-brand-stone">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold text-brand-charcoal">
              No Masterpieces Found
            </h3>
            <p className="mt-2 max-w-sm font-sans text-xs text-brand-stone leading-relaxed">
              We couldn't find any artisanal works matching your current criteria. Every piece is handmade in single, rare batches.
            </p>
            <button
              id="empty-state-reset-btn"
              onClick={handleClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded bg-brand-charcoal px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-stone transition-all shadow"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
