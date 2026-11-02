import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Glasses,
  Camera,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Flame,
  CheckCircle2,
  Calendar,
  Gift,
  Eye,
  Tv,
  Sun,
  Smile,
  BookOpen,
} from 'lucide-react';
import { MOCK_REVIEWS } from '../data/mockData';

export const HomepagePromotions: React.FC = () => {
  const {
    setActiveCategory,
    setIsBookAppointmentOpen,
    openPDP,
    products,
  } = useStore();

  const categories = [
    {
      id: 'Eyeglasses',
      title: 'Eyeglasses',
      sub: 'Titanium & Acetate',
      badge: 'BOGO FREE',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=80',
      icon: <Glasses className="w-5 h-5 text-indigo-600" />,
    },
    {
      id: 'Computer Glasses',
      title: 'Computer Glasses',
      sub: 'Zero Glare & Blue Cut',
      badge: 'TOP SELLER',
      image: 'https://images.unsplash.com/photo-1582142839970-2b9da1d2f59f?auto=format&fit=crop&w=500&q=80',
      icon: <Tv className="w-5 h-5 text-cyan-600" />,
    },
    {
      id: 'Sunglasses',
      title: 'Sunglasses',
      sub: '100% UV Polarized',
      badge: 'TRENDING',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
    },
    {
      id: 'Kids Glasses',
      title: 'Kids & Teens',
      sub: 'Unbreakable Flexible',
      badge: 'SAFETY TR90',
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=500&q=80',
      icon: <Smile className="w-5 h-5 text-rose-600" />,
    },
    {
      id: 'Reading Glasses',
      title: 'Reading Glasses',
      sub: 'Pocket Foldable',
      badge: 'POWERS +1 TO +3.5',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=80',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 'Contact Lenses',
      title: 'Contact Lenses',
      sub: 'Moisture Silicone',
      badge: 'ACUVUE & MORE',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500&q=80',
      icon: <Eye className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Category Visual Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Explore Collections
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Shop By Eyewear Purpose
            </h3>
          </div>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="group p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition cursor-pointer flex flex-col justify-between text-center"
            >
              <div className="relative aspect-square rounded-xl bg-slate-50 flex items-center justify-center p-2 mb-3 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-slate-900 text-white shadow-xs">
                  {cat.badge}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs group-hover:text-indigo-600 transition">
                  {cat.title}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {cat.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Buy 1 Get 1 Free Spotlight Mid-Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-10 text-white overflow-hidden shadow-xl">
          {/* Subtle background graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
            <Gift className="w-96 h-96" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              DOUBLE THE CLARITY • BUY 1 GET 1 FREE
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              Buy 1 Eyeglass, Get 2nd Pair Absolutely Free!
            </h3>

            <p className="text-orange-50 text-xs sm:text-sm leading-relaxed">
              Mix and match any frames across sunglasses, titanium eyeglasses, and computer glasses. Get free anti-glare lenses on both pairs. Use code <strong>BOGOVISION</strong> during checkout.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveCategory('BOGO')}
                className="py-3 px-6 rounded-xl bg-slate-950 hover:bg-black text-amber-300 font-extrabold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Shop BOGO Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsBookAppointmentOpen(true)}
                className="py-3 px-5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition cursor-pointer"
              >
                Book Free Eye Exam
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. German CNC Optical Precision & Glazing Lab Showcase */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Certified Optical Precision Lab
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              German CNC Robotic Glazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                0.01 Diopter Precision Tolerances
              </span>
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every prescription lens is precision-edged using state-of-the-art five-axis computerized edgers. Audited with laser lensometers to guarantee zero optical distortion and perfect pupillary distance alignment.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <strong className="text-cyan-300 block mb-0.5">Laser PD Centration</strong>
                <span className="text-slate-400 text-[11px]">Calibrated to exact optical center of your eyes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <strong className="text-cyan-300 block mb-0.5">Doctor Verified</strong>
                <span className="text-slate-400 text-[11px]">Senior optometrist verification on every order</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory('Computer Glasses')}
                className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Glasses className="w-4 h-4" />
                <span>Explore Computer Lenses</span>
              </button>
              <button
                onClick={() => setIsBookAppointmentOpen(true)}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                Book Free In-Store Exam
              </button>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
              alt="Optical Precision Glazing Lab"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ISO 9001 Certified Optical Glazing
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Quality Checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Customer Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
            Real Optical Experiences
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
            Trusted by 50,000+ Eyewear Wearers
          </h3>
          <p className="text-xs text-slate-500">
            Read verified reviews from customers across Mumbai, Delhi, Bengaluru, and Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition flex flex-col justify-between space-y-4 text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified Buyer
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  "{rev.headline}"
                </h4>

                <p className="text-slate-600 leading-relaxed text-xs">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <strong className="text-slate-800 font-semibold">{rev.customerName}</strong>
                <span>Fit: <strong className="text-indigo-600">{rev.fitRating}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. In-Store Certified 12-Step Eye Test CTA Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold text-[10px] uppercase">
              100% FREE CLINICAL EXAM
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Book a Certified 12-Step Vision Checkup at Our Metro Studios
            </h3>
            <p className="text-indigo-200 text-xs max-w-xl">
              Equipped with autorefractors, slit lamps, and digital pupil analyzers. Zero purchase obligation.
            </p>
          </div>

          <button
            onClick={() => setIsBookAppointmentOpen(true)}
            className="py-3 px-6 rounded-xl bg-white hover:bg-slate-100 text-indigo-950 font-extrabold text-xs shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4 text-indigo-700" />
            <span>Book In-Store Eye Test</span>
          </button>
        </div>
      </section>
    </div>
  );
};
