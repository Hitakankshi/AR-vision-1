import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Tag,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Gift,
  CheckCircle2,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    bogoSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setActiveCategory,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const freeShippingThreshold = 999;
  const currentNet = cartSubtotal - cartDiscount;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - currentNet);
  const freeShippingProgress = Math.min(100, Math.round((currentNet / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Cart Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-heading">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-indigo-50/70 border-b border-indigo-100 p-3 text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-indigo-950 font-medium mb-1.5 flex items-center justify-between">
              <span>Add <strong className="font-bold text-indigo-700">₹{amountToFreeShipping}</strong> more for Free Shipping!</span>
              <span className="text-[10px] text-indigo-500 font-bold">{freeShippingProgress}%</span>
            </p>
          ) : (
            <p className="text-emerald-700 font-bold mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              You unlocked Free Shipping!
            </p>
          )}
          <div className="w-full h-1.5 bg-indigo-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Your cart is currently empty
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our Buy 1 Get 1 Free festival offer or try on frames with our 3D AR camera mirror.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveCategory('BOGO');
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition"
              >
                <span>Browse BOGO Deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* BOGO Savings Callout if active */}
              {bogoSavings > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center gap-2.5 text-xs">
                  <Gift className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">Buy 1 Get 1 Free Applied! </span>
                    <span>You saved ₹{bogoSavings} on your 2nd frame.</span>
                  </div>
                </div>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 text-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.selectedVariant.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-200 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-indigo-700">
                          {item.product.brand}
                        </span>
                        <h5 className="font-bold text-slate-900 text-xs line-clamp-1">
                          {item.product.name}
                        </h5>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Color: {item.selectedVariant.colorName} • Size: {item.product.size}
                    </div>

                    {/* Lens configuration tag */}
                    {item.lensSelection ? (
                      <div className="mt-1.5 p-1.5 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-700 space-y-0.5">
                        <div className="font-semibold text-indigo-800">
                          Lenses: {item.lensSelection.visionTypeName}
                        </div>
                        <div className="text-slate-500">
                          {item.lensSelection.lensTypeName} ({item.lensSelection.lensIndexName})
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400 mt-1">
                        Frame with demo anti-glare lenses
                      </div>
                    )}

                    {/* Pricing and Quantity Buttons */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold font-mono text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm text-slate-900 font-heading">
                          ₹{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Cart Bottom: Coupon, Totals & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon (DIWALI40 / BOGOVISION)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-100 rounded-xl text-xs font-mono uppercase focus:bg-white border border-transparent focus:border-indigo-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Pill */}
            {appliedCoupon && (
              <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  Code: {appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-emerald-900 text-[10px] underline font-semibold"
                >
                  Remove
                </button>
              </div>
            )}

            {couponFeedback && !appliedCoupon && (
              <div className="text-[11px] text-rose-600 font-medium">
                {couponFeedback.message}
              </div>
            )}

            {/* Bill Itemization */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promotional & BOGO Discounts</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (18% Optical Goods)</span>
                <span>₹{cartTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>{cartShipping === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${cartShipping}`}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span className="text-base font-heading">Total Payable</span>
                <span className="text-lg font-extrabold font-heading text-indigo-700">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
