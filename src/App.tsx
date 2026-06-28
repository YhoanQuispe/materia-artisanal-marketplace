/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FilterState, Product } from './types';
import { SlidersHorizontal, ArrowDown, MapPin, Sparkles, CheckCircle2, Shield, Heart, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Inner App component that consumes Cart Context
const MainApp: React.FC = () => {
  const { isCartOpen, setIsCartOpen, toasts, removeToast, addToast, clearCart } = useCart();
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Default filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    artisanOrigins: [],
    minPrice: 0,
    maxPrice: 350,
    sortBy: 'featured',
    inStockOnly: false,
  });

  // Watch for successful Stripe checkouts in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout_success') === 'true') {
      clearCart();
      addToast('Stripe Payment Secured! Thank you for supporting heritage artisans.', 'success');
      // Clean query parameters from URL without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('checkout_cancel') === 'true') {
      addToast('Checkout was cancelled. Your selected works remain secured in your bag.', 'info');
      setIsCartOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleOpenDetails = (product: Product) => {
    setActiveDetailProduct(product);
  };

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog-anchor');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-terracotta/20 selection:text-brand-terracotta">
      
      {/* Editorial Announcement Banner */}
      <div className="bg-[#1C1B1A] text-brand-cream text-[10px] sm:text-[11px] font-sans tracking-[0.18em] uppercase py-3 px-4 text-center border-b border-brand-clay/20 font-normal">
        <span className="opacity-90">Radical transparency: 100% of net profits go directly back to rural artisan guilds. Enjoy free shipping on curated bundles above $150.</span>
      </div>

      {/* Sleek, Sticky Header / Navbar */}
      <Navbar
        filters={filters}
        setFilters={setFilters}
        onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* Hero Masterpiece Section */}
      <section className="relative overflow-hidden bg-brand-clay/35 py-16 sm:py-24 lg:py-32">
        {/* Subtle decorative background textures */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#1c1c1c 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }} />

        {/* High-End Organic Noise/Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Beautiful Ambient Lighting Glow Effects */}
        <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-[#F4EBE1] opacity-70 blur-[120px] pointer-events-none mix-blend-multiply" />
        <div className="absolute right-[-10%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-brand-terracotta/5 opacity-40 blur-[100px] pointer-events-none mix-blend-multiply" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left: Large display headings */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-terracotta/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-terracotta"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Preserving Heritage Guilds
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-brand-charcoal"
              >
                Functional Art, <br />
                <span className="font-serif italic text-brand-terracotta">Sourced Directly</span> from the Maker.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-xl mx-auto lg:mx-0 font-sans text-sm sm:text-base text-brand-stone leading-relaxed"
              >
                Materia is an ultra-curated, high-performance marketplace connecting heritage weavers, master potters, and raw timber woodcarvers with conscious collectors globally. No agents, absolute traceability.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  id="hero-explore-btn"
                  onClick={scrollToCatalog}
                  className="w-full sm:w-auto bg-brand-charcoal hover:bg-brand-stone text-white font-sans text-xs font-bold py-4 px-8 uppercase tracking-wider rounded shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explore the Crafts
                  <svg 
                    className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-y-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
                <button
                  id="hero-story-btn"
                  onClick={() => {
                    const el = document.getElementById('values-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto border border-brand-clay hover:bg-brand-clay/30 text-brand-charcoal font-sans text-xs font-bold py-4 px-8 uppercase tracking-wider rounded transition-all"
                >
                  Our Philosophy
                </button>
              </motion.div>
            </div>

            {/* Hero Right: Premium Visual Image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer decorative card frame */}
              <div className="absolute -inset-2 rounded border border-brand-clay/55 pointer-events-none" />
              
              <div className="overflow-hidden bg-stone-100 rounded shadow-2xl aspect-4/5 relative group">
                <img
                  src="https://lolomercadito.com/cdn/shop/files/OLLA-3.jpg?v=1767205717&width=2279"
                  alt="Elegant handmade terracotta pots being glazed"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Embedded dynamic location tag */}
                <div className="absolute bottom-4 right-4 bg-brand-cream/95 backdrop-blur-md p-3.5 rounded shadow-lg max-w-xs border border-brand-clay/30">
                  <p className="font-sans text-[9px] font-bold text-brand-terracotta uppercase tracking-widest">Atelier Spotlight</p>
                  <p className="font-serif text-sm font-semibold text-brand-charcoal mt-1">Terracotta Olla Vase</p>
                  <p className="font-sans text-[10px] text-brand-stone flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    San Marcos Tlapazola, Oaxaca
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values / Trust Badges Segment */}
      <section id="values-anchor" className="bg-brand-cream py-16 border-b border-brand-clay/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="rounded bg-brand-clay/35 p-3 text-brand-terracotta w-fit">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-brand-charcoal">Museum-Grade Preservation</h3>
              <p className="font-sans text-xs text-brand-stone leading-relaxed">
                We currate only certified heritage masters. Every piece is an archival-quality heirloom that preserves dying generational crafts.
              </p>
            </div>
            <div className="space-y-2">
              <div className="rounded bg-brand-clay/35 p-3 text-brand-terracotta w-fit">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-brand-charcoal">Radically Direct Trade</h3>
              <p className="font-sans text-xs text-brand-stone leading-relaxed">
                By bypassing distributors and retailers, we return 100% of profit margins directly to rural community-owned guilds.
              </p>
            </div>
            <div className="space-y-2">
              <div className="rounded bg-brand-clay/35 p-3 text-brand-terracotta w-fit">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-brand-charcoal">Immutable Authentication</h3>
              <p className="font-sans text-xs text-brand-stone leading-relaxed">
                Each product is signed, numbered, and shipped with a physical certificate detailing the materials, process, and artisan biography.
              </p>
            </div>
            <div className="space-y-2">
              <div className="rounded bg-brand-clay/35 p-3 text-brand-terracotta w-fit">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-brand-charcoal">Conscious Ecology</h3>
              <p className="font-sans text-xs text-brand-stone leading-relaxed">
                Crafted using 100% locally gathered clays, organic flax, and fallen burls. Delivered in plastic-free biodegradable packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main id="catalog-anchor" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Mobile Filter Action Panel */}
        <div className="flex md:hidden items-center justify-between gap-4 mb-6 bg-brand-clay/30 p-3 rounded border border-brand-clay/40">
          <span className="font-sans text-xs text-brand-stone">Curate your view:</span>
          <button
            id="mobile-filters-trigger"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-brand-charcoal text-white text-xs font-bold py-2.5 px-4 rounded uppercase tracking-wider shadow"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters / Sort
          </button>
        </div>

        {/* Content Layout split container */}
        <div className="flex gap-10">
          
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
          />

          {/* Active catalog product grid */}
          <ProductGrid
            filters={filters}
            setFilters={setFilters}
            onOpenDetails={handleOpenDetails}
          />
        </div>
      </main>

      {/* Narrative Editorial Quote */}
      <section className="bg-brand-clay/20 py-20 border-t border-brand-clay/40 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="font-sans text-[10px] font-bold text-brand-terracotta uppercase tracking-[0.25em]">Our Manifesto</span>
          <blockquote className="mt-6 font-serif text-2xl italic leading-relaxed text-brand-charcoal/90">
            "In a world of mass plastic replication, the handcrafted object is a quiet act of resistance. It carries the weight of the hand, the history of the soil, and the breath of the maker."
          </blockquote>
          <cite className="block mt-4 font-sans text-xs font-semibold tracking-wider text-brand-stone uppercase">
            — MATERIA HERITAGE FOUNDATION
          </cite>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="bg-brand-charcoal text-brand-clay py-12 px-6 border-t border-brand-clay/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-clay/70">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif text-lg font-bold tracking-[0.18em] text-white">M A T É R I A</span>
            <span>Supporting rural artisans since 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Stripe Payment Security</a>
            <a href="#" className="hover:text-white transition-colors">Traceability Standards</a>
          </div>
          <div>
            &copy; 2026 Materia Inc. High-Performance Artisanal Marketplace.
          </div>
        </div>
      </footer>

      {/* Mobile Drawer Slide-over Filter Panel */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              id="mobile-filters-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black md:hidden"
            />
            <motion.div
              id="mobile-filters-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-brand-cream shadow-2xl md:hidden"
            >
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Slide-over interactive Shopping Cart Drawer */}
      <CartDrawer />

      {/* Detailed Product Showcase Modal */}
      <AnimatePresence>
        {activeDetailProduct && (
          <ProductDetailModal
            product={activeDetailProduct}
            onClose={() => setActiveDetailProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Tactile, interactive toast alert overlays */}
      <div id="toast-notifications-container" className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none w-full max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              id={`toast-${toast.id}`}
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              layout
              className={`pointer-events-auto rounded p-4 shadow-xl border flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wider ${
                toast.type === 'error'
                  ? 'bg-red-900 border-red-700 text-red-50'
                  : toast.type === 'info'
                  ? 'bg-brand-charcoal border-brand-stone text-white'
                  : 'bg-emerald-900 border-emerald-700 text-emerald-50'
              }`}
            >
              <span>{toast.message}</span>
              <button
                id={`close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="opacity-75 hover:opacity-100 p-0.5 text-current shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
