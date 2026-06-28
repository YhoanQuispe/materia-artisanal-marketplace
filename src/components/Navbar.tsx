/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, ChevronDown, Menu, X, ArrowRight, Star, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';

interface NavbarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenMobileFilters: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ filters, setFilters, onOpenMobileFilters }) => {
  const { cart, setIsCartOpen, subtotal } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'ceramics' | 'textiles' | 'woodwork' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalCartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close mega menu on scroll or click outside
  useEffect(() => {
    const handleScroll = () => setActiveMegaMenu(null);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategorySelect = (category: 'Ceramics' | 'Textiles' | 'Woodwork') => {
    setFilters((prev) => {
      const alreadySelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: [category], // Focus on this single category from the menu
      };
    });
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to catalog section
    const catalogEl = document.getElementById('catalog-anchor');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetAllFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      artisanOrigins: [],
      minPrice: 0,
      maxPrice: 350,
      sortBy: 'featured',
      inStockOnly: false,
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-brand-clay bg-brand-cream/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-toggle"
              type="button"
              className="p-2 text-brand-charcoal md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Brand Logo */}
            <div className="flex flex-col items-center md:items-start">
              <a href="#" className="group flex flex-col items-center md:items-start" onClick={resetAllFilters}>
                <span className="font-serif text-2xl font-bold tracking-[0.18em] text-brand-charcoal transition-colors group-hover:text-brand-terracotta md:text-3xl">
                  M A T É R I A
                </span>
                <span className="font-sans text-[9px] font-semibold tracking-[0.35em] text-brand-stone uppercase">
                  Artisanal Marketplace
                </span>
              </a>
            </div>

            {/* Desktop Navigation / Mega-Menu Trigger */}
            <nav className="hidden md:flex space-x-8 lg:space-x-12" aria-label="Main navigation">
              {/* Ceramics Item */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveMegaMenu('ceramics')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  id="nav-ceramics"
                  className={`flex items-center gap-1 font-sans text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-terracotta ${
                    filters.categories.includes('Ceramics') ? 'text-brand-terracotta font-semibold' : 'text-brand-charcoal'
                  }`}
                >
                  Ceramics
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeMegaMenu === 'ceramics' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Textiles Item */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveMegaMenu('textiles')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  id="nav-textiles"
                  className={`flex items-center gap-1 font-sans text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-terracotta ${
                    filters.categories.includes('Textiles') ? 'text-brand-terracotta font-semibold' : 'text-brand-charcoal'
                  }`}
                >
                  Textiles
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeMegaMenu === 'textiles' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Woodwork Item */}
              <div
                className="relative py-4"
                onMouseEnter={() => setActiveMegaMenu('woodwork')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  id="nav-woodwork"
                  className={`flex items-center gap-1 font-sans text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-terracotta ${
                    filters.categories.includes('Woodwork') ? 'text-brand-terracotta font-semibold' : 'text-brand-charcoal'
                  }`}
                >
                  Woodwork
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeMegaMenu === 'woodwork' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </nav>

            {/* Optimized Search Bar & Cart Trigger */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1 md:flex-initial">
              {/* Search Container */}
              <div
                className={`relative flex items-center rounded-full bg-brand-clay/40 px-3 py-1.5 transition-all duration-300 ${
                  isSearchFocused ? 'w-48 sm:w-64 bg-brand-clay/60 ring-1 ring-brand-terracotta/40' : 'w-36 sm:w-48'
                }`}
              >
                <Search className="h-4 w-4 text-brand-stone shrink-0" />
                <input
                  id="nav-search-bar"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search craft, origin, artisan..."
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="ml-2 w-full bg-transparent text-xs text-brand-charcoal placeholder-brand-stone/80 outline-none"
                  aria-label="Search the marketplace"
                />
                {filters.searchQuery && (
                  <button
                    id="clear-search-btn"
                    onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                    className="p-0.5 text-brand-stone hover:text-brand-charcoal"
                    aria-label="Clear search query"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Cart Drawer Trigger Button */}
              <button
                id="cart-trigger-btn"
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="group relative p-2.5 text-brand-charcoal transition-colors hover:text-brand-terracotta"
                aria-label={`Open shopping cart. ${totalCartQuantity} items currently in cart.`}
              >
                <ShoppingBag className="h-5.5 w-5.5 transition-transform duration-300 group-hover:scale-105" />
                
                {/* Animated counter indicator */}
                <AnimatePresence mode="popLayout">
                  {totalCartQuantity > 0 && (
                    <motion.span
                      id="cart-count-badge"
                      key={totalCartQuantity}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terracotta text-[10px] font-bold text-brand-cream"
                    >
                      {totalCartQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdowns (Desktop) */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              id="desktop-mega-menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute left-0 w-full border-b border-brand-clay bg-brand-cream py-8 shadow-lg hidden md:block"
            >
              <div className="mx-auto max-w-7xl px-8 grid grid-cols-12 gap-8">
                {/* Category Spotlight */}
                <div className="col-span-4 border-r border-brand-clay/60 pr-8 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-brand-terracotta">
                      Featured Collection
                    </span>
                    <h3 className="mt-2 font-serif text-2xl text-brand-charcoal font-medium leading-tight">
                      {activeMegaMenu === 'ceramics' && 'Clay & Claywares'}
                      {activeMegaMenu === 'textiles' && 'Weaves & Fibers'}
                      {activeMegaMenu === 'woodwork' && 'Forest Heritage'}
                    </h3>
                    <p className="mt-3 text-xs text-brand-stone leading-relaxed">
                      {activeMegaMenu === 'ceramics' && 'Explore exceptional hand-thrown functional pottery crafted by heritage masters using volcanic clay, river stone burnishing, and open-pit earthen firing.'}
                      {activeMegaMenu === 'textiles' && 'Delve into heirloom weaves woven on backstrap and hand looms. Sourced with organic raw flax and baby alpaca fibers, colored with native botanical dyes.'}
                      {activeMegaMenu === 'woodwork' && 'Functional art carved with precision from reclaimed Vermont oak, Oregon walnut, and live-edge maple burls. Hand axes, chisels, and natural oils.'}
                    </p>
                  </div>
                  <button
                    id={`view-all-${activeMegaMenu}-btn`}
                    onClick={() => handleCategorySelect(
                      activeMegaMenu === 'ceramics' ? 'Ceramics' : activeMegaMenu === 'textiles' ? 'Textiles' : 'Woodwork'
                    )}
                    className="mt-6 flex items-center gap-2 font-sans text-xs font-bold tracking-wider text-brand-terracotta hover:text-brand-charcoal uppercase transition-colors"
                  >
                    Explore all {activeMegaMenu} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Specific items listing */}
                <div className="col-span-8 grid grid-cols-3 gap-6">
                  {activeMegaMenu === 'ceramics' && (
                    <>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Ceramics')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://lolomercadito.com/cdn/shop/files/OLLA-3.jpg?v=1767205717&width=2279"
                            alt="Oaxaca Terracotta Vase"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Terracotta Vases</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Burnished with river stone, Oaxaca heritage</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Ceramics')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://www.tezumi.com/cdn/shop/products/il_fullxfull.2489530007_no31.jpg?v=1602496213&width=2820"
                            alt="Shigaraki Bowl"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Shigaraki Matchas</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Wabi-sabi textures from Japan</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Ceramics')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://i.etsystatic.com/34083548/r/il/cb9fb8/7515203219/il_1140xN.7515203219_q6fn.jpg"
                            alt="Stoneware Pitchers"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Stoneware Pitchers</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Contemporary English farmhouse jugs</p>
                      </div>
                    </>
                  )}

                  {activeMegaMenu === 'textiles' && (
                    <>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Textiles')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://images.squarespace-cdn.com/content/v1/5905340e1b631b489217d165/1703299607317-TL68TN8NX2RPAK8NAP8Q/Linen_Throw_Indigo.jpg?format=500w"
                            alt="Indigo Shibori Throw"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Indigo Shibori Throws</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Naturally fermented live indigo vat</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Textiles')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://campoalpaca.com/cdn/shop/files/inca-design-alpaca-throw-blanket-percy-red-rainbow.jpg?v=1771983469&width=540"
                            alt="Alpaca Blankets"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Alpaca Blankets</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Hand-spun organic Sacred Valley wool</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Textiles')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://i.etsystatic.com/59676068/r/il/cda8a3/7365746075/il_1140xN.7365746075_spsr.jpg"
                            alt="Linen Table Runners"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Nordic Linen Runners</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Raw unbleached crisp Gotland flax</p>
                      </div>
                    </>
                  )}

                  {activeMegaMenu === 'woodwork' && (
                    <>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Woodwork')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://buffalowoodturningproducts.com/cdn/shop/products/213998144_1180932742419616_4452099988119556395_n_1024x1024@2x.jpg?v=1626293981"
                            alt="Oak Serving Boards"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Serving Boards</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Century-old reclaimed Vermont oak</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Woodwork')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://jadcreations.net/cdn/shop/files/A5F57FD8-80B9-4089-86BF-BE56C2E096CD_1_105_c.jpg?v=1734678200"
                            alt="Walnut Spoons"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Walnut Spoons</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Traditional hand-carved Oregon sets</p>
                      </div>
                      <div className="group cursor-pointer" onClick={() => handleCategorySelect('Woodwork')}>
                        <div className="overflow-hidden bg-stone-100 rounded aspect-video">
                          <img
                            src="https://myamericancrafts.com/cdn/shop/products/91346580_2861360230622720_5804585615496314880_o_1024x1024@2x.jpg?v=1585520608"
                            alt="Live Edge Bowls"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="mt-3 font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-terracotta">Live Edge Bowls</h4>
                        <p className="text-[11px] text-brand-stone mt-1">Lathe-turned single maple burls</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation (Side Menu) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              id="mobile-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black md:hidden"
            />
            <motion.div
              id="mobile-nav-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-brand-cream p-6 shadow-2xl flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold tracking-widest text-brand-charcoal">
                      M A T É R I A
                    </span>
                    <span className="text-[8px] font-semibold tracking-[0.2em] text-brand-stone uppercase">
                      Artisanal Marketplace
                    </span>
                  </div>
                  <button
                    id="close-mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-brand-charcoal"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-12 space-y-6">
                  <div>
                    <h3 className="font-sans text-[10px] font-bold tracking-widest text-brand-stone uppercase">Shop Crafts</h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <button
                          id="mobile-nav-ceramics"
                          onClick={() => handleCategorySelect('Ceramics')}
                          className="flex w-full items-center justify-between font-serif text-lg text-brand-charcoal"
                        >
                          Ceramics <ChevronDown className="h-4 w-4 -rotate-90 text-brand-stone" />
                        </button>
                      </li>
                      <li>
                        <button
                          id="mobile-nav-textiles"
                          onClick={() => handleCategorySelect('Textiles')}
                          className="flex w-full items-center justify-between font-serif text-lg text-brand-charcoal"
                        >
                          Textiles <ChevronDown className="h-4 w-4 -rotate-90 text-brand-stone" />
                        </button>
                      </li>
                      <li>
                        <button
                          id="mobile-nav-woodwork"
                          onClick={() => handleCategorySelect('Woodwork')}
                          className="flex w-full items-center justify-between font-serif text-lg text-brand-charcoal"
                        >
                          Woodwork <ChevronDown className="h-4 w-4 -rotate-90 text-brand-stone" />
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-brand-clay">
                    <button
                      id="mobile-reset-filters-btn"
                      onClick={resetAllFilters}
                      className="flex w-full items-center gap-2 font-sans text-xs font-bold text-brand-terracotta uppercase"
                    >
                      Clear All Search / Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-clay pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-brand-clay/50 p-2 text-brand-terracotta">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-brand-charcoal">Radically Ethical</h4>
                    <p className="text-[11px] text-brand-stone mt-0.5">100% of profits go back to rural artisan guilds.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
