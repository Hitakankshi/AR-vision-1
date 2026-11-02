import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Glasses,
  Search,
  Camera,
  ShoppingBag,
  Heart,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Tag,
  ChevronRight,
  SlidersHorizontal,
  X,
  Sparkles,
  Truck,
  CheckCircle2,
  Copy,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    products,
    cart,
    wishlist,
    setIsCartOpen,
    setIsStoreLocatorOpen,
    setIsBookAppointmentOpen,
    setIsOrderTrackingOpen,
    activeCampaign,
    openPDP,
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products for autocomplete dropdown
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const navCategories = [
    { id: 'All', label: 'All Eyewear' },
    { id: 'Eyeglasses', label: 'Eyeglasses' },
    { id: 'Computer Glasses', label: 'Screen / Computer' },
    { id: 'Sunglasses', label: 'Sunglasses' },
    { id: 'Kids Glasses', label: 'Kids & Teens' },
    { id: 'Reading Glasses', label: 'Reading' },
    { id: 'Contact Lenses', label: 'Contact Lenses' },
    { id: 'BOGO', label: 'Buy 1 Get 1 Free', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* 1. Dynamic Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-medium border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {activeCampaign?.badgeText || 'SPECIAL OFFER'}
            </span>
            <span className="font-medium tracking-wide">
              {activeCampaign ? activeCampaign.title : 'Free Anti-Glare Lenses + Free Shipping on Orders above ₹999!'}
            </span>
            {activeCampaign && (
              <button
                onClick={() => handleCopyCode(activeCampaign.couponCode)}
                className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-amber-200 px-2 py-0.5 rounded text-[11px] font-mono transition"
                title="Click to copy coupon code"
              >
                <Tag className="w-2.5 h-2.5" />
                {activeCampaign.couponCode}
                {copiedCoupon ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => setIsBookAppointmentOpen(true)}
              className="hover:text-white flex items-center gap-1 transition"
            >
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span className="hidden md:inline">Book Free Eye Test</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setIsStoreLocatorOpen(true)}
              className="hover:text-white flex items-center gap-1 transition"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="hidden md:inline">Find Store</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-white flex items-center gap-1 transition"
            >
              <Truck className="w-3 h-3 text-amber-400" />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => {
              setActiveView('storefront');
              setActiveCategory('All');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
              <Glasses className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-heading">
                  AR VISION
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  EYE CARE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                Precision Optics • 3D Fit
              </p>
            </div>
          </div>

          {/* Search Autocomplete Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search titanium, wayfarer, blue cut, Ray-Ban, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-10 pr-9 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-indigo-500 rounded-full text-sm outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Top Product Matches
                </div>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      openPDP(product);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {product.brand} • {product.shape} • ₹{product.sellingPrice}
                      </div>
                    </div>
                    <span className="text-xs text-indigo-600 font-semibold">View</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions & Navigation Toggles */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setActiveView('storefront')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                  activeView === 'storefront'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Storefront
              </button>
              <button
                onClick={() => setActiveView('design-board')}
                className={`px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition ${
                  activeView === 'design-board'
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">45-Screen Slides</span>
                <span className="inline-flex items-center justify-center px-1 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[9px] font-extrabold">
                  45
                </span>
              </button>
              <button
                onClick={() => setActiveView('admin-portal')}
                className={`px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1 transition ${
                  activeView === 'admin-portal'
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Admin Portal</span>
              </button>
            </div>

            {/* Cart Icon Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Optical Category Navigator Bar */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pt-3 border-t border-slate-100 no-scrollbar text-xs">
          {navCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (activeView !== 'storefront') setActiveView('storefront');
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  cat.highlight
                    ? isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold hover:bg-amber-100'
                    : isSelected
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.highlight && <Sparkles className="w-3 h-3 text-amber-500" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
