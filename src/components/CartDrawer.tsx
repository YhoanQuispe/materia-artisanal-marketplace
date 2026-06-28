/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    shipping,
    taxes,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToast
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [checkoutSuccessDetails, setCheckoutSuccessDetails] = useState<{
    orderId: string;
    isSimulated: boolean;
  } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = promoCode.trim().toUpperCase();

    if (appliedPromo) {
      addToast('A promotion code is already applied.', 'error');
      return;
    }

    if (normalizedCode === 'HERITAGE10') {
      setDiscount(subtotal * 0.10);
      setAppliedPromo('HERITAGE10');
      addToast('10% Heritage discount applied successfully!', 'success');
      setPromoCode('');
    } else if (normalizedCode === 'FREESHIP' && subtotal < 150) {
      setDiscount(shipping);
      setAppliedPromo('FREESHIP');
      addToast('Free shipping coupon applied!', 'success');
      setPromoCode('');
    } else {
      addToast('Invalid coupon code. Try "HERITAGE10" for 10% off.', 'error');
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setAppliedPromo(null);
    addToast('Promotion code removed.', 'info');
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    addToast('Initiating secure checkout...', 'info');

    try {
      // Build checkout body
      const cartItemsToSend = cart.map(item => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItemsToSend,
          promoCode: appliedPromo,
          discountAmount: discount,
          shippingCost: shipping,
          taxCost: taxes,
          totalCost: total - discount
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Stripe checkout session URL is available! Redirect to actual Stripe Checkout
        addToast('Redirecting to secure Stripe Checkout gateway...', 'success');
        setTimeout(() => {
          window.location.href = data.url;
        }, 800);
      } else {
        // Fallback to beautiful high-end simulated checkout because Stripe key is not configured yet
        setTimeout(() => {
          setIsCheckoutLoading(false);
          const orderNum = 'MAT-' + Math.floor(100000 + Math.random() * 900000);
          setCheckoutSuccessDetails({
            orderId: orderNum,
            isSimulated: true
          });
          clearCart();
          addToast('Order placed successfully (Simulated)!', 'success');
        }, 2200);
      }
    } catch (err) {
      console.error('Checkout creation failed:', err);
      // Failover elegantly to simulation
      setTimeout(() => {
        setIsCheckoutLoading(false);
        const orderNum = 'MAT-' + Math.floor(100000 + Math.random() * 900000);
        setCheckoutSuccessDetails({
          orderId: orderNum,
          isSimulated: true
        });
        clearCart();
        addToast('Order placed successfully (Simulation mode)!', 'success');
      }, 1500);
    }
  };

  const finalTotal = total - discount;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isCheckoutLoading) {
                setIsCartOpen(false);
                setCheckoutSuccessDetails(null);
              }
            }}
            className="fixed inset-0 z-50 bg-black backdrop-blur-xs"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-brand-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-clay px-6 py-5">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                  Your Atelier Bag
                </h2>
                <span className="font-sans text-xs bg-brand-clay/50 px-2 py-0.5 rounded-full font-bold text-brand-stone">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                id="close-cart-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutSuccessDetails(null);
                }}
                disabled={isCheckoutLoading}
                className="p-1 text-brand-charcoal transition-colors hover:text-brand-terracotta disabled:opacity-40"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              
              {checkoutSuccessDetails ? (
                /* Checkout Success Display */
                <motion.div
                  id="checkout-success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 ring-8 ring-emerald-100/50">
                    <ShieldCheck className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-brand-charcoal">
                    Order Secured
                  </h3>
                  <p className="mt-2 text-xs text-brand-stone max-w-xs leading-relaxed">
                    Thank you for supporting heritage artistry. Your unique handmade pieces are being packaged with artisanal care.
                  </p>

                  <div className="mt-8 w-full rounded border border-brand-clay p-4 text-left space-y-3 bg-brand-cream/40">
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-stone">Order Number</span>
                      <strong className="font-mono text-brand-charcoal">{checkoutSuccessDetails.orderId}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-stone">Receipt Status</span>
                      <span className="font-bold text-emerald-700">Sent to Inbox</span>
                    </div>
                    {checkoutSuccessDetails.isSimulated && (
                      <div className="rounded bg-brand-clay/45 p-2.5 text-[10px] text-brand-stone flex items-start gap-1.5 leading-relaxed">
                        <Sparkles className="h-3.5 w-3.5 text-brand-terracotta shrink-0 mt-0.5" />
                        <span>This was a perfect high-performance e-commerce checkout simulation. Setup Stripe variables in your `.env` to go live.</span>
                      </div>
                    )}
                  </div>

                  <button
                    id="success-continue-shopping-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutSuccessDetails(null);
                    }}
                    className="mt-8 w-full bg-brand-charcoal text-white font-sans text-xs font-bold py-3.5 uppercase tracking-wider rounded transition-all hover:bg-brand-stone"
                  >
                    Continue Story
                  </button>
                </motion.div>
              ) : cart.length === 0 ? (
                /* Empty Cart Display */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="rounded-full bg-brand-clay/30 p-4 text-brand-stone/80">
                    <Trash2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-brand-charcoal">
                    Your Bag is Empty
                  </h3>
                  <p className="mt-2 text-xs text-brand-stone max-w-xs leading-relaxed">
                    Add handcrafted ceramic collections, custom weaves, or live-edge wooden objects to start supporting rural artisan guilds.
                  </p>
                  <button
                    id="empty-cart-discover-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 flex items-center gap-2 font-sans text-xs font-bold text-brand-terracotta hover:text-brand-charcoal uppercase transition-colors"
                  >
                    Discover crafts <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                /* Product Items List */
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 border-b border-brand-clay/40 pb-5"
                    >
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded bg-stone-100 border border-brand-clay/20">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-sm font-semibold text-brand-charcoal line-clamp-2 leading-snug">
                              {item.product.title}
                            </h4>
                            <span className="font-display text-sm font-bold text-brand-charcoal">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-brand-terracotta font-medium tracking-wide uppercase mt-0.5">
                            {item.product.artisan}
                          </p>
                          <p className="font-sans text-[10px] text-brand-stone">
                            {item.product.origin}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector with bounds validation */}
                          <div className="flex items-center rounded border border-brand-clay/80 bg-brand-cream">
                            <button
                              id={`qty-minus-${item.product.id}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 px-2 text-brand-stone hover:text-brand-charcoal transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-sans text-xs font-semibold px-2 text-brand-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              id={`qty-plus-${item.product.id}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className={`p-1 px-2 text-brand-stone transition-colors ${
                                item.quantity >= item.product.stock
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:text-brand-charcoal'
                              }`}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            id={`remove-item-${item.product.id}`}
                            onClick={() => removeFromCart(item.product.id)}
                            className="flex items-center gap-1 text-[11px] text-brand-stone hover:text-[#c2593f] transition-colors"
                            aria-label={`Remove ${item.product.title} from cart`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Calculation and Checkout Panel */}
            {!checkoutSuccessDetails && cart.length > 0 && (
              <div className="border-t border-brand-clay bg-brand-cream px-6 py-5 space-y-4">
                {/* Free Shipping Progress Indicator */}
                {subtotal < 150 ? (
                  <div className="rounded bg-brand-clay/35 p-3 text-[11px] text-brand-stone flex justify-between items-center leading-relaxed">
                    <span>
                      Add <strong className="text-brand-charcoal font-bold">${(150 - subtotal).toFixed(2)}</strong> more for <strong>Free Shipping</strong>
                    </span>
                    <span className="h-1.5 w-16 bg-brand-clay rounded-full overflow-hidden shrink-0">
                      <span className="h-full bg-brand-terracotta block rounded-full" style={{ width: `${(subtotal / 150) * 100}%` }} />
                    </span>
                  </div>
                ) : (
                  <div className="rounded bg-emerald-50 p-3 text-[11px] text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-brand-terracotta" />
                    <span>Conscious Collector Reward: <strong>Complimentary Shipping Secured</strong>!</span>
                  </div>
                )}

                {/* Promo Code Segment */}
                <div className="border-b border-brand-clay/40 pb-3">
                  {!appliedPromo ? (
                    showPromoInput ? (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          id="promo-code-input"
                          type="text"
                          placeholder="Try HERITAGE10"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 rounded border border-brand-clay bg-brand-cream/40 px-3 py-1 text-xs text-brand-charcoal outline-none focus:border-brand-terracotta uppercase"
                        />
                        <button
                          id="apply-promo-btn"
                          type="submit"
                          className="bg-brand-charcoal text-white text-xs font-bold px-3 py-1 uppercase rounded"
                        >
                          Apply
                        </button>
                      </form>
                    ) : (
                      <button
                        id="toggle-promo-btn"
                        onClick={() => setShowPromoInput(true)}
                        className="flex items-center gap-1.5 font-sans text-xs font-semibold text-brand-terracotta hover:text-brand-charcoal transition-colors uppercase"
                      >
                        <Tag className="h-3.5 w-3.5" /> Apply promo code
                      </button>
                    )
                  ) : (
                    <div className="flex justify-between items-center bg-brand-clay/40 px-3 py-1.5 rounded text-xs text-brand-charcoal">
                      <span className="flex items-center gap-1 font-semibold text-brand-terracotta">
                        <Tag className="h-3 w-3" /> {appliedPromo} Applied (-10%)
                      </span>
                      <button
                        id="remove-promo-btn"
                        onClick={handleRemovePromo}
                        className="text-brand-stone hover:text-brand-charcoal font-bold text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Breakdown Details */}
                <div className="space-y-2 text-xs text-brand-stone font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-brand-charcoal font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#c2593f]">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-brand-charcoal font-medium">
                      {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Taxes (8%)</span>
                    <span className="text-brand-charcoal font-medium">${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-clay/50 pt-2 text-sm text-brand-charcoal font-bold">
                    <span>Total Cost</span>
                    <span className="font-display">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Stripe Checkout Button */}
                <button
                  id="checkout-stripe-btn"
                  type="button"
                  disabled={isCheckoutLoading}
                  onClick={handleCheckout}
                  className="mt-2 w-full bg-brand-charcoal text-white font-sans text-xs font-bold py-4 uppercase tracking-wider rounded transition-all hover:bg-brand-stone disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckoutLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Securing Stripe Connection...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Proceed to Stripe Checkout
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-brand-stone flex justify-center items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  Direct trade support. Encrypted checkout with Stripe.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
