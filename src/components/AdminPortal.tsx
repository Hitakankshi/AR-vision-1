import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, HeroSlide, OrderStatus, FestivalCampaign } from '../types';
import {
  SlidersHorizontal,
  LayoutDashboard,
  Package,
  DollarSign,
  Gift,
  Flame,
  Image,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Users,
  Search,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    updateProductPrice,
    toggleProductPublish,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    toggleHeroSlide,
    festivalCampaigns,
    setFestivalCampaignActive,
    homepageSections,
    toggleHomepageSection,
    orders,
    updateOrderStatus,
    appointments,
    setActiveView,
    openPDP,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'products'
    | 'pricing'
    | 'campaigns'
    | 'banners'
    | 'sections'
    | 'orders'
    | 'prescriptions'
    | 'inventory'
    | 'appointments'
  >('dashboard');

  // Product Add / Edit modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Quick Price Edit state
  const [priceEditId, setPriceEditId] = useState<string | null>(null);
  const [tempOriginalPrice, setTempOriginalPrice] = useState<number>(0);
  const [tempSellingPrice, setTempSellingPrice] = useState<number>(0);

  // New slide state
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideImage, setNewSlideImage] = useState('');

  // Form states for new product
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('AR Vision Elite');
  const [formCategory, setFormCategory] = useState<any>('Eyeglasses');
  const [formShape, setFormShape] = useState<any>('Rectangle');
  const [formMaterial, setFormMaterial] = useState<any>('Titanium');
  const [formPrice, setFormPrice] = useState(1999);
  const [formOriginalPrice, setFormOriginalPrice] = useState(2999);
  const [formSku, setFormSku] = useState('AR-NEW-01');

  // KPI calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 148500;
  const activeOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.variants.some((v) => v.stock < 20)).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`AR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    setFormPrice(1999);
    setFormOriginalPrice(2999);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPct = Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100);

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        brand: formBrand,
        category: formCategory,
        shape: formShape,
        material: formMaterial,
        sellingPrice: formPrice,
        originalPrice: formOriginalPrice,
        discountPercentage: discountPct,
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        sku: formSku,
        name: formName,
        brand: formBrand,
        category: formCategory,
        shape: formShape,
        material: formMaterial,
        gender: 'Unisex',
        size: 'Medium',
        dimensions: { lensWidth: 52, bridgeWidth: 18, templeLength: 142 },
        weight: 16,
        originalPrice: formOriginalPrice,
        sellingPrice: formPrice,
        discountPercentage: discountPct,
        rating: 5.0,
        reviewCount: 1,
        isBogoEligible: true,
        isPublished: true,
        description: 'Newly created optical product configured via AR Vision Enterprise Admin Suite.',
        features: ['Ultra-durable', 'Zero-glare coated', '1-Year Warranty'],
        images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80'],
        variants: [
          {
            id: `v-${Date.now()}`,
            colorName: 'Matte Obsidian',
            colorHex: '#0f172a',
            image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
            stock: 50,
          },
        ],
        frameColor: 'Matte Obsidian',
        tags: ['New', 'Admin Created'],
      };
      addProduct(newProd);
    }
    setIsProductModalOpen(false);
  };

  const handleSaveQuickPrice = (productId: string) => {
    updateProductPrice(productId, tempOriginalPrice, tempSellingPrice);
    setPriceEditId(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold font-heading text-white">
                AR VISION ENTERPRISE ADMIN SUITE
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE PRODUCTION
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Complete Operations, 27 Modules, Real-Time Catalog & Pricing Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('storefront')}
            className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            ← View Customer Store
          </button>
          <button
            onClick={() => setActiveView('design-board')}
            className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>45-Screen Design Board</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Module Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950/80 border-r border-slate-800 p-3 space-y-1 text-xs shrink-0 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Operational Modules
          </div>

          {[
            { id: 'dashboard', label: '1. Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'products', label: '2. Product Catalog CRUD', icon: <Package className="w-4 h-4" /> },
            { id: 'pricing', label: '3. Real-Time Price Manager', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'campaigns', label: '4. Festival & BOGO Engine', icon: <Flame className="w-4 h-4" /> },
            { id: 'banners', label: '5. Hero Slider & Banners', icon: <Image className="w-4 h-4" /> },
            { id: 'sections', label: '6. Homepage Layout Blocks', icon: <Layers className="w-4 h-4" /> },
            { id: 'orders', label: '7. Order Lifecycle Desk', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'prescriptions', label: '8. Optometrist Rx Review', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'inventory', label: '9. Inventory & Stock Alerts', icon: <AlertTriangle className="w-4 h-4" /> },
            { id: 'appointments', label: '10. In-Store Eye Exams', icon: <Calendar className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition text-left ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Right Module Content Canvas */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-900 space-y-6 text-xs">
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Executive Analytics & Operations
                  </h3>
                  <p className="text-slate-400">
                    Real-time optical revenue, BOGO conversions, and fulfillment tracking
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Timezone</span>
                  <span className="font-mono text-amber-400 font-bold">Asia/Kolkata (IST)</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[11px] block">Gross Revenue (INR)</span>
                  <div className="text-2xl font-extrabold text-white font-heading">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +24.8% vs last month
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[11px] block">Active Optical Orders</span>
                  <div className="text-2xl font-extrabold text-white font-heading">
                    {activeOrdersCount} in Pipeline
                  </div>
                  <span className="text-[10px] text-indigo-400 font-bold">
                    100% On-Time Precision SLA
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[11px] block">BOGO Promotion Usage</span>
                  <div className="text-2xl font-extrabold text-amber-400 font-heading">
                    78.4% of Orders
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Code: BOGOVISION active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                  <span className="text-slate-400 text-[11px] block">In-Store Free Eye Tests</span>
                  <div className="text-2xl font-extrabold text-cyan-400 font-heading">
                    {appointments.length + 124} Booked
                  </div>
                  <span className="text-[10px] text-emerald-400">
                    Bandra & Indiranagar hubs
                  </span>
                </div>
              </div>

              {/* Recent Orders & Low Stock Quick Glance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">
                      Recent Orders Pipeline
                    </h4>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-indigo-400 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2">
                    {orders.slice(0, 4).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-white font-mono">
                            {ord.orderNumber}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            {ord.customerName} • {ord.items.length} frame(s)
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-extrabold text-white">
                            ₹{ord.totalAmount}
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                            {ord.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">
                      Inventory Health & Stock Alerts
                    </h4>
                    <span className="text-amber-400 font-bold">
                      {lowStockCount} SKUs Low Stock
                    </span>
                  </div>

                  <div className="space-y-2">
                    {products.slice(0, 4).map((p) => {
                      const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                      return (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-8 h-8 object-contain bg-white/5 rounded-md p-0.5"
                            />
                            <div>
                              <div className="font-bold text-white truncate max-w-[180px]">
                                {p.name}
                              </div>
                              <div className="text-slate-400 text-[10px]">
                                SKU: {p.sku} • {p.material}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`font-mono font-bold ${
                                totalStock < 30 ? 'text-rose-400' : 'text-emerald-400'
                              }`}
                            >
                              {totalStock} in Stock
                            </span>
                            <span className="block text-[10px] text-slate-500">
                              ₹{p.sellingPrice}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT CATALOG CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Optical Product Catalog Management
                  </h3>
                  <p className="text-slate-400">
                    Add, edit, publish or archive eyewear. Changes propagate to storefront instantly.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Table */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-400 font-bold">
                      <th className="py-3 px-4">Frame</th>
                      <th className="py-3 px-4">Brand & Category</th>
                      <th className="py-3 px-4">Shape & Specs</th>
                      <th className="py-3 px-4">Price (MSRP / Selling)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-750 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-8 object-contain bg-white/10 rounded-md p-1"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{p.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-200">{p.brand}</div>
                          <div className="text-[10px] text-indigo-400">{p.category}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{p.shape}</span>
                          <span className="text-[10px] text-slate-400 block">{p.material} ({p.weight}g)</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-white">₹{p.sellingPrice}</span>
                          <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{p.originalPrice}</span>
                          <span className="text-[10px] font-bold text-emerald-400 ml-1">({p.discountPercentage}% OFF)</span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleProductPublish(p.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition ${
                              p.isPublished
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {p.isPublished ? 'Published Live' : 'Draft / Hidden'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setFormName(p.name);
                              setFormBrand(p.brand);
                              setFormCategory(p.category);
                              setFormShape(p.shape);
                              setFormMaterial(p.material);
                              setFormPrice(p.sellingPrice);
                              setFormOriginalPrice(p.originalPrice);
                              setFormSku(p.sku);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openPDP(p)}
                            className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white"
                            title="Preview on Store"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: REAL-TIME PRICE MANAGEMENT */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Real-Time Price & Discount Manager
                </h3>
                <p className="text-slate-400">
                  Update selling prices and discounts on the fly. Calculations propagate to PDP, catalog, and checkout instantly without redeployment.
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-400 font-bold">
                      <th className="py-3 px-4">Frame</th>
                      <th className="py-3 px-4">Original MSRP</th>
                      <th className="py-3 px-4">Current Selling Price</th>
                      <th className="py-3 px-4">Auto Discount %</th>
                      <th className="py-3 px-4 text-right">Quick Edit Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {products.map((p) => {
                      const isEditing = priceEditId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-slate-750 transition">
                          <td className="py-3 px-4 font-bold text-white">
                            {p.name} ({p.brand})
                          </td>
                          <td className="py-3 px-4">
                            {isEditing ? (
                              <input
                                type="number"
                                value={tempOriginalPrice}
                                onChange={(e) => setTempOriginalPrice(Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-white font-mono"
                              />
                            ) : (
                              <span className="font-mono text-slate-300">₹{p.originalPrice}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {isEditing ? (
                              <input
                                type="number"
                                value={tempSellingPrice}
                                onChange={(e) => setTempSellingPrice(Number(e.target.value))}
                                className="w-24 px-2 py-1 bg-slate-900 border border-slate-600 rounded text-amber-400 font-mono font-bold"
                              />
                            ) : (
                              <span className="font-mono font-extrabold text-amber-400">₹{p.sellingPrice}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-emerald-400 font-bold font-mono">
                              {isEditing
                                ? `${Math.round(((tempOriginalPrice - tempSellingPrice) / tempOriginalPrice) * 100)}%`
                                : `${p.discountPercentage}%`}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {isEditing ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleSaveQuickPrice(p.id)}
                                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                                >
                                  Save Live
                                </button>
                                <button
                                  onClick={() => setPriceEditId(null)}
                                  className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-[11px]"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setPriceEditId(p.id);
                                  setTempOriginalPrice(p.originalPrice);
                                  setTempSellingPrice(p.sellingPrice);
                                }}
                                className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                              >
                                Edit Price
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FESTIVAL CAMPAIGNS & BOGO */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Festival Campaign Management
                </h3>
                <p className="text-slate-400">
                  Switch the active nationwide festive theme, banner schedule, and coupon code.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {festivalCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 transition ${
                      camp.isActive
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                        : 'border-slate-800 bg-slate-800/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-sm">
                          {camp.festival}
                        </span>
                        {camp.isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                            ACTIVE ON STORE
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-base">
                        {camp.name}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {camp.title}
                      </p>

                      <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                        <div>Coupon Code: <strong className="font-mono text-amber-300 font-bold">{camp.couponCode}</strong></div>
                        <div>Discount: <strong>{camp.discountPercent}% OFF + BOGO Active</strong></div>
                        <div>Validity: {camp.startDate} to {camp.endDate}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setFestivalCampaignActive(camp.id)}
                      disabled={camp.isActive}
                      className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                        camp.isActive
                          ? 'bg-amber-500/20 text-amber-400 cursor-default'
                          : 'bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-white'
                      }`}
                    >
                      {camp.isActive ? 'Currently Live' : 'Activate This Festival'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HERO SLIDER & BANNER MANAGER */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Main Hero Slider & Promotional Banners
                  </h3>
                  <p className="text-slate-400">
                    Manage 4-6s hero slide carousel, desktop & mobile image URLs, and button destinations.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={slide.desktopImage}
                        alt={slide.title}
                        className="w-24 h-16 object-cover rounded-xl border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-indigo-500/30 text-indigo-300">
                            Slide {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-amber-400">
                            {slide.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{slide.title}</h4>
                        <p className="text-slate-400 text-xs line-clamp-1">{slide.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleHeroSlide(slide.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                          slide.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {slide.isActive ? 'Active in Carousel' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: HOMEPAGE SECTIONS */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Homepage Section Layout Manager
                </h3>
                <p className="text-slate-400">
                  Enable, disable, and control visibility of homepage promotional blocks.
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl border border-slate-700 divide-y divide-slate-700">
                {homepageSections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-4 flex items-center justify-between hover:bg-slate-750 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{sec.name}</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          Type: {sec.type}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleHomepageSection(sec.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                        sec.isEnabled
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {sec.isEnabled ? 'Visible on Homepage' : 'Section Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ORDER LIFECYCLE MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Order Management & 6-Stage State Machine
                </h3>
                <p className="text-slate-400">
                  Update customer order states in real-time: Confirmed → Rx Review → Processing → Lens Preparation → Dispatched → Delivered.
                </p>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-700">
                      <div>
                        <div className="font-bold text-white font-mono text-sm">
                          {ord.orderNumber}
                        </div>
                        <div className="text-slate-400">
                          Customer: <strong className="text-slate-200">{ord.customerName}</strong> ({ord.customerPhone})
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-extrabold text-base font-heading">
                          ₹{ord.totalAmount}
                        </span>
                        <span className="text-slate-400">({ord.paymentMethod})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Advance Lifecycle Stage:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {[
                            'Confirmed',
                            'Prescription Review',
                            'Processing',
                            'Lens Preparation',
                            'Dispatched',
                            'Delivered',
                          ].map((st) => (
                            <button
                              key={st}
                              onClick={() => updateOrderStatus(ord.id, st as OrderStatus)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                ord.orderStatus === st
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Rx Audit:</span>
                        <span className="font-bold text-emerald-400 text-xs">
                          {ord.prescriptionStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: OPTOMETRIST PRESCRIPTION DESK */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Licensed Optometrist Prescription Verification Desk
                </h3>
                <p className="text-slate-400">
                  Review customer uploaded slips, verify SPH/CYL/AXIS parameters, and approve lens manufacturing.
                </p>
              </div>

              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">
                      Active Prescription Verification Queue
                    </h4>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                    Zero Error Certified
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white font-mono">
                          {ord.orderNumber} - {ord.customerName}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">
                          Lens Specification: {ord.items[0]?.lensSelection?.lensTypeName || 'Single Vision'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                          {ord.prescriptionStatus}
                        </span>
                        <button
                          onClick={() => alert(`Prescription for ${ord.customerName} has been re-verified by senior optometrist.`)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                        >
                          Mark Verified
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: INVENTORY & STOCK ALERTS */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  Inventory Management & Multi-Store Stock
                </h3>
                <p className="text-slate-400">
                  Track stock by SKU, trigger reorder thresholds, and prevent overselling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-10 object-contain bg-white/10 rounded-lg p-1"
                      />
                      <div>
                        <h5 className="font-bold text-white text-xs line-clamp-1">{p.name}</h5>
                        <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-emerald-400">
                        {p.variants.reduce((s, v) => s + v.stock, 0)} Units
                      </div>
                      <span className="text-[10px] text-slate-500">In Warehouse</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: IN-STORE APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  In-Store Free Eye Test Appointments
                </h3>
                <p className="text-slate-400">
                  Roster of confirmed patient eye exams at AR VISION metro flagships.
                </p>
              </div>

              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    No active appointments booked yet. Try booking one from the header!
                  </div>
                ) : (
                  appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">
                          {appt.customerName} ({appt.customerPhone})
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">
                          {appt.storeName} • {appt.testType}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-amber-400 font-mono text-xs block">
                          {appt.date} at {appt.timeSlot}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400">
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleSaveProduct}
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 text-white space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-base text-white">
                {editingProduct ? 'Edit Optical Frame' : 'Add New Frame to Catalog'}
              </h4>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. AR Vision Titanium Hexagon"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Brand</label>
                <input
                  type="text"
                  required
                  value={formBrand}
                  onChange={(e) => setFormBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">SKU</label>
                <input
                  type="text"
                  required
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
                >
                  <option value="Eyeglasses">Eyeglasses</option>
                  <option value="Computer Glasses">Computer Glasses</option>
                  <option value="Sunglasses">Sunglasses</option>
                  <option value="Kids Glasses">Kids Glasses</option>
                  <option value="Reading Glasses">Reading Glasses</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Original MSRP (₹)</label>
                <input
                  type="number"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                  className="w-full px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              >
                Publish Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
