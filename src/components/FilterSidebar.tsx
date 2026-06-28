/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterState } from '../types';
import { SlidersHorizontal, RotateCcw, Check, X } from 'lucide-react';
import { products } from '../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const craftCategories = ['Ceramics', 'Textiles', 'Woodwork'];

  // Dynamically extract all unique artisan communities from the product database
  const communities = Array.from(new Set(products.map((p) => p.origin)));

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      const updated = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: updated };
    });
  };

  const handleCommunityToggle = (origin: string) => {
    setFilters((prev) => {
      const updated = prev.artisanOrigins.includes(origin)
        ? prev.artisanOrigins.filter((o) => o !== origin)
        : [...prev.artisanOrigins, origin];
      return { ...prev, artisanOrigins: updated };
    });
  };

  const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value as FilterState['sortBy'],
    }));
  };

  const handleStockToggle = () => {
    setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

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

  const isFiltersDirty =
    filters.searchQuery !== '' ||
    filters.categories.length > 0 ||
    filters.artisanOrigins.length > 0 ||
    filters.maxPrice < 350 ||
    filters.inStockOnly ||
    filters.sortBy !== 'featured';

  const sidebarContent = (
    <div className="space-y-8 pr-1">
      {/* Sidebar Header */}
      {!isMobileDrawer && (
        <div className="flex items-center justify-between border-b border-brand-clay pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-brand-charcoal" />
            <h2 className="font-display text-sm font-semibold tracking-wider text-brand-charcoal uppercase">
              Filter By
            </h2>
          </div>
          {isFiltersDirty && (
            <button
              id="clear-filters-btn-sidebar"
              onClick={handleClearFilters}
              className="flex items-center gap-1 font-sans text-xs font-medium text-brand-terracotta hover:text-brand-charcoal transition-colors uppercase"
              aria-label="Clear all current filters"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      )}

      {/* Sorting Segment */}
      <div className="space-y-3">
        <label htmlFor="sort-dropdown" className="font-display text-xs font-semibold tracking-wider text-brand-stone uppercase">
          Sort Marketplace
        </label>
        <select
          id="sort-dropdown"
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full border-b border-brand-clay py-2 font-sans text-sm text-brand-charcoal bg-transparent outline-none focus:border-brand-terracotta transition-colors"
        >
          <option value="featured">Featured Curations</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highly Rated</option>
        </select>
      </div>

      {/* Categories Segment */}
      <div className="space-y-3">
        <h3 className="font-display text-xs font-semibold tracking-wider text-brand-stone uppercase">
          Craft Categories
        </h3>
        <div className="space-y-2">
          {craftCategories.map((cat) => {
            const isChecked = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group text-sm text-brand-charcoal"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="sr-only"
                    id={`filter-cat-${cat}`}
                  />
                  <div className={`h-5.5 w-5.5 rounded border transition-colors ${
                    isChecked
                      ? 'border-brand-terracotta bg-brand-terracotta'
                      : 'border-brand-stone/40 bg-transparent group-hover:border-brand-terracotta'
                  } flex items-center justify-center`}>
                    {isChecked && <Check className="h-3.5 w-3.5 text-brand-cream" />}
                  </div>
                </div>
                <span className={`font-sans tracking-wide transition-colors ${
                  isChecked ? 'text-brand-terracotta font-medium' : 'text-brand-charcoal/80 group-hover:text-brand-charcoal'
                }`}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Segment */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-display text-xs font-semibold tracking-wider text-brand-stone uppercase">
            Max Budget
          </h3>
          <span className="font-sans text-sm font-bold text-brand-terracotta">
            ${filters.maxPrice}
          </span>
        </div>
        <div className="space-y-2">
          <input
            id="price-range-slider"
            type="range"
            min="0"
            max="350"
            step="10"
            value={filters.maxPrice}
            onChange={handlePriceSliderChange}
            className="w-full accent-brand-terracotta cursor-pointer h-1.5 bg-brand-clay/60 rounded-full outline-none"
            aria-label="Filter products by maximum price"
          />
          <div className="flex justify-between font-sans text-[11px] text-brand-stone">
            <span>$0</span>
            <span>$150</span>
            <span>$350+</span>
          </div>
        </div>
      </div>

      {/* Artisan Community Segment */}
      <div className="space-y-3">
        <h3 className="font-display text-xs font-semibold tracking-wider text-brand-stone uppercase">
          Artisan Origins
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {communities.map((origin) => {
            const isChecked = filters.artisanOrigins.includes(origin);
            return (
              <label
                key={origin}
                className="flex items-center gap-3 cursor-pointer group text-sm text-brand-charcoal"
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCommunityToggle(origin)}
                    className="sr-only"
                    id={`filter-origin-${origin.replace(/\s+/g, '-')}`}
                  />
                  <div className={`h-5.5 w-5.5 rounded border transition-colors ${
                    isChecked
                      ? 'border-brand-terracotta bg-brand-terracotta'
                      : 'border-brand-stone/40 bg-transparent group-hover:border-brand-terracotta'
                  } flex items-center justify-center`}>
                    {isChecked && <Check className="h-3.5 w-3.5 text-brand-cream" />}
                  </div>
                </div>
                <span className={`font-sans text-xs tracking-wide transition-colors ${
                  isChecked ? 'text-brand-terracotta font-medium' : 'text-brand-charcoal/80 group-hover:text-brand-charcoal'
                }`}>
                  {origin}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Stock Availability Toggle */}
      <div className="pt-4 border-t border-brand-clay/60">
        <label className="flex items-center gap-3 cursor-pointer group text-sm text-brand-charcoal">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={handleStockToggle}
              className="sr-only"
              id="filter-instock-checkbox"
            />
            <div className={`h-5.5 w-5.5 rounded border transition-colors ${
              filters.inStockOnly
                ? 'border-brand-terracotta bg-brand-terracotta'
                : 'border-brand-stone/40 bg-transparent group-hover:border-brand-terracotta'
            } flex items-center justify-center`}>
              {filters.inStockOnly && <Check className="h-3.5 w-3.5 text-brand-cream" />}
            </div>
          </div>
          <span className={`font-sans tracking-wide transition-colors ${
            filters.inStockOnly ? 'text-brand-terracotta font-medium' : 'text-brand-charcoal/80 group-hover:text-brand-charcoal'
          }`}>
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="flex flex-col h-full bg-brand-cream p-6">
        <div className="flex items-center justify-between border-b border-brand-clay pb-4 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-brand-charcoal" />
            <h2 className="font-display text-sm font-semibold tracking-wider text-brand-charcoal uppercase">
              Filter Selection
            </h2>
          </div>
          <button
            id="close-filters-mobile-drawer"
            onClick={onCloseMobileDrawer}
            className="p-1 text-brand-charcoal hover:text-brand-terracotta"
            aria-label="Close filters panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarContent}
        </div>

        <div className="border-t border-brand-clay pt-4 mt-6 flex gap-4">
          <button
            id="mobile-filters-apply-btn"
            onClick={onCloseMobileDrawer}
            className="flex-1 bg-brand-charcoal text-white font-sans text-xs font-bold py-3 uppercase tracking-wider rounded transition-all hover:bg-brand-stone"
          >
            Apply Filters
          </button>
          {isFiltersDirty && (
            <button
              id="mobile-filters-reset-btn"
              onClick={() => {
                handleClearFilters();
                if (onCloseMobileDrawer) onCloseMobileDrawer();
              }}
              className="px-4 border border-brand-clay text-brand-charcoal font-sans text-xs font-bold py-3 uppercase tracking-wider rounded hover:bg-brand-clay/30"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      {sidebarContent}
    </aside>
  );
};
