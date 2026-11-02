import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Ruler,
  Check,
  Glasses,
  Truck,
  Share2,
} from 'lucide-react';
import { MOCK_REVIEWS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForPDP,
    setSelectedProductForPDP,
    openLensCustomizer,
    wishlist,
    toggleWishlist,
    comparisonList,
    toggleCompare,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  if (!selectedProductForPDP) return null;

  const product = selectedProductForPDP;
  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparisonList.includes(product.id);

  // Reviews for this product or fallback
  const productReviews = MOCK_REVIEWS.filter((r) => r.productId === product.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - AR VISION Eye Care`,
        text: `Check out ${product.name} with 3D Virtual Try-On!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-mono">
              SKU: {product.sku}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProductForPDP(null)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Left Column: Image Showcase, Angles & 360 viewer */}
          <div className="space-y-4">
            <div className="relative aspect-4/3 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden p-6">
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
                {product.isBogoEligible && (
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-xs">
                    BUY 1 GET 1 FREE
                  </span>
                )}
                <span className="bg-slate-900 text-white font-semibold text-[10px] px-2 py-0.5 rounded-md">
                  {product.material} ({product.weight}g)
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition ${
                  isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              {/* Main Image with 360 Degree rotation simulation if active */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-300"
                style={{
                  transform: is360Active ? `rotate(${rotationDegree}deg)` : 'none',
                }}
              >
                <img
                  src={
                    activeImageIndex === 0 && currentVariant?.image
                      ? currentVariant.image
                      : product.images[activeImageIndex] || product.images[0]
                  }
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>

              {/* 360 View Indicator & Control */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() => setIs360Active(!is360Active)}
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-black text-white text-[11px] font-semibold backdrop-blur-md transition"
                >
                  <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>{is360Active ? 'Stop 360°' : '360° Angle View'}</span>
                </button>

                {is360Active && (
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={rotationDegree}
                    onChange={(e) => setRotationDegree(Number(e.target.value))}
                    className="pointer-events-auto accent-cyan-400 w-32"
                  />
                )}
              </div>
            </div>

            {/* Thumbnail Angle Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImageIndex(i);
                    setIs360Active(false);
                  }}
                  className={`w-16 h-14 rounded-xl border p-1 bg-slate-50 transition shrink-0 ${
                    activeImageIndex === i
                      ? 'border-indigo-600 ring-2 ring-indigo-100 bg-white'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Precision Optical Standards Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border border-indigo-800/40 shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  German CNC Precision Optical Lab
                </span>
                <h5 className="font-bold text-sm text-white">
                  Custom Glazed with 0.01D Tolerance
                </h5>
                <p className="text-[11px] text-slate-300">
                  Audited by certified senior optometrists before doorstep dispatch.
                </p>
              </div>

              <div className="py-2 px-3 rounded-xl bg-white/10 border border-white/20 text-indigo-200 font-bold text-xs shrink-0 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified Lab</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Prices, Optical Specs & Customizer Trigger */}
          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Product Headline */}
              <div>
                <div className="flex items-center gap-2 text-indigo-700 font-bold uppercase tracking-wider mb-1">
                  <span>{product.brand}</span>
                  <span>•</span>
                  <span>{product.category}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold text-xs">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  </div>
                  <span className="text-slate-500">
                    {product.reviewCount} Verified Customer Ratings
                  </span>
                </div>
              </div>

              {/* Pricing Block */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    ₹{product.sellingPrice}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Price includes 18% GST + Free Anti-Glare Demo Lenses + Hard Travel Case
                </p>
              </div>

              {/* Color Swatches */}
              {product.variants.length > 1 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-800">
                    Frame Color: <span className="font-semibold text-slate-600">{currentVariant.colorName}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(i)}
                        style={{ backgroundColor: v.colorHex }}
                        className={`w-7 h-7 rounded-full border-2 transition ${
                          selectedVariantIndex === i
                            ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110'
                            : 'border-slate-300 hover:scale-105'
                        }`}
                        title={v.colorName}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Optical Millimeter Dimensions */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-indigo-600" />
                  Frame Dimensions & Fit Breakdown:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                    <span className="text-[10px] text-slate-400 block uppercase">Lens Width</span>
                    <strong className="text-sm text-slate-900 font-bold">{product.dimensions.lensWidth} mm</strong>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                    <span className="text-[10px] text-slate-400 block uppercase">Bridge Width</span>
                    <strong className="text-sm text-slate-900 font-bold">{product.dimensions.bridgeWidth} mm</strong>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                    <span className="text-[10px] text-slate-400 block uppercase">Temple Length</span>
                    <strong className="text-sm text-slate-900 font-bold">{product.dimensions.templeLength} mm</strong>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  Recommended for: <strong className="text-indigo-700">Oval, Square & Heart face shapes</strong> with medium pupillary distance.
                </div>
              </div>

              {/* Description & Key Specs */}
              <div className="space-y-2">
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setSelectedProductForPDP(null);
                  openLensCustomizer(product);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Glasses className="w-5 h-5" />
                <span>Select Lenses & Buy Now (₹{product.sellingPrice})</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  1-Year Hinge & Coating Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  Free 14-Day Exchanges
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
