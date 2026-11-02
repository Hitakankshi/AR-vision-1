import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  CartItem,
  LensSelection,
  Order,
  OrderStatus,
  FestivalCampaign,
  HeroSlide,
  HomepageSection,
  StoreLocation,
  EyeTestAppointment,
  ProductCategory,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_HERO_SLIDES,
  INITIAL_FESTIVAL_CAMPAIGNS,
  INITIAL_HOMEPAGE_SECTIONS,
  MOCK_STORES,
} from '../data/mockData';

interface CouponInfo {
  code: string;
  discountPercent: number;
}

interface StoreContextType {
  // Storefront Data
  products: Product[];
  heroSlides: HeroSlide[];
  festivalCampaigns: FestivalCampaign[];
  activeCampaign: FestivalCampaign | undefined;
  homepageSections: HomepageSection[];
  stores: StoreLocation[];
  orders: Order[];
  appointments: EyeTestAppointment[];
  wishlist: string[];
  recentlyViewed: string[];
  comparisonList: string[];
  savedPrescriptions: any[];

  // Navigation & View
  activeView: 'storefront' | 'design-board' | 'admin-portal';
  setActiveView: (view: 'storefront' | 'design-board' | 'admin-portal') => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Triggers
  selectedProductForPDP: Product | null;
  setSelectedProductForPDP: (p: Product | null) => void;
  isLensCustomizerOpen: boolean;
  setIsLensCustomizerOpen: (open: boolean) => void;
  productForLensCustomizer: Product | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (o: Order | null) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
  isPrescriptionVaultOpen: boolean;
  setIsPrescriptionVaultOpen: (open: boolean) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  isBookAppointmentOpen: boolean;
  setIsBookAppointmentOpen: (open: boolean) => void;
  selectedStoreForBooking: StoreLocation | null;
  setSelectedStoreForBooking: (store: StoreLocation | null) => void;
  designBoardInitialSlide: number | null;
  setDesignBoardInitialSlide: (slideNum: number | null) => void;

  // Cart & Pricing
  cart: CartItem[];
  appliedCoupon: CouponInfo | null;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  bogoSavings: number;
  addToCart: (product: Product, variant: ProductVariant, lens?: LensSelection) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Checkout & Orders
  createOrder: (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory' | 'orderStatus' | 'prescriptionStatus'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;

  // Features
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  bookAppointment: (appointment: Omit<EyeTestAppointment, 'id' | 'createdAt'>) => EyeTestAppointment;
  openPDP: (product: Product) => void;
  openLensCustomizer: (product: Product) => void;
  jumpToDesignSlide: (slideNumber: number) => void;

  // Admin Controls
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateProductPrice: (productId: string, originalPrice: number, sellingPrice: number) => void;
  toggleProductPublish: (productId: string) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  toggleHeroSlide: (slideId: string) => void;
  setFestivalCampaignActive: (campaignId: string) => void;
  toggleHomepageSection: (sectionId: string) => void;
  reorderHomepageSections: (sections: HomepageSection[]) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initial defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_heroslides');
      return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
    } catch {
      return INITIAL_HERO_SLIDES;
    }
  });

  const [festivalCampaigns, setFestivalCampaigns] = useState<FestivalCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_FESTIVAL_CAMPAIGNS;
    } catch {
      return INITIAL_FESTIVAL_CAMPAIGNS;
    }
  });

  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_sections');
      return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_SECTIONS;
    } catch {
      return INITIAL_HOMEPAGE_SECTIONS;
    }
  });

  const [stores] = useState<StoreLocation[]>(MOCK_STORES);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Seed initial realistic order for demo tracking
    return [
      {
        id: 'ord-demo-1',
        orderNumber: 'ARV-2026-8849',
        createdAt: '2026-10-30T14:32:00Z',
        customerName: 'Priya Sharma',
        customerEmail: 'priya.sharma@example.com',
        customerPhone: '+91 98765 43210',
        shippingAddress: {
          addressLine: 'Apt 402, Sea Green Heights, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
        },
        items: [
          {
            id: 'item-demo-1',
            product: INITIAL_PRODUCTS[0],
            selectedVariant: INITIAL_PRODUCTS[0].variants[0],
            quantity: 1,
            unitPrice: 2299,
            totalPrice: 2299,
            lensSelection: {
              visionType: 'single_vision',
              visionTypeName: 'Single Vision Distance',
              lensType: 'blue_shield',
              lensTypeName: 'AR Blue Shield Pro',
              lensIndex: '1.60_thin',
              lensIndexName: 'Thin 1.60 Hi-Index (+₹890)',
              price: 890,
              prescriptionDetails: {
                method: 'manual',
                odSph: '-1.50',
                odCyl: '-0.50',
                odAxis: '90',
                osSph: '-1.75',
                osCyl: '-0.25',
                osAxis: '85',
                pd: '63',
              },
            },
          },
        ],
        subtotal: 3189,
        discount: 400,
        tax: 502,
        shipping: 0,
        totalAmount: 3291,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Lens Preparation',
        statusHistory: [
          { status: 'Confirmed', timestamp: '30 Oct 2026, 02:32 PM', note: 'Payment verified via UPI' },
          { status: 'Prescription Review', timestamp: '30 Oct 2026, 04:15 PM', note: 'Prescription verified by Senior Optometrist Dr. K. Mehta' },
          { status: 'Processing', timestamp: '31 Oct 2026, 10:00 AM', note: 'Titanium frame picked from central inventory' },
          { status: 'Lens Preparation', timestamp: '01 Nov 2026, 09:30 AM', note: 'High-index 1.60 blue cut lenses precision edged on German CNC machine' },
        ],
        trackingNumber: 'BLUEDART-ARV98234',
        prescriptionStatus: 'Verified',
      },
    ];
  });

  const [appointments, setAppointments] = useState<EyeTestAppointment[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_appointments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<CouponInfo | null>(() => {
    try {
      const saved = localStorage.getItem('arvision_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('arvision_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-4'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['prod-1', 'prod-2', 'prod-3']);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [savedPrescriptions] = useState<any[]>([
    {
      id: 'rx-self',
      label: 'Self (Distance Work)',
      doctorName: 'Dr. Ramesh Rao (Vision Care Clinic)',
      date: '15 Oct 2026',
      od: { sph: '-1.50', cyl: '-0.50', axis: '90' },
      os: { sph: '-1.75', cyl: '-0.25', axis: '85' },
      pd: '63mm',
    },
    {
      id: 'rx-reading',
      label: 'Mother (Reading & Craft)',
      doctorName: 'Dr. Anita Desai (Eye Institute)',
      date: '02 Sep 2026',
      od: { sph: '+2.00', cyl: '0.00', axis: '0' },
      os: { sph: '+2.25', cyl: '0.00', axis: '0' },
      pd: '60mm',
    },
  ]);

  // View & UI Navigation States
  const [activeView, setActiveView] = useState<'storefront' | 'design-board' | 'admin-portal'>('storefront');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedProductForPDP, setSelectedProductForPDP] = useState<Product | null>(null);
  const [isLensCustomizerOpen, setIsLensCustomizerOpen] = useState<boolean>(false);
  const [productForLensCustomizer, setProductForLensCustomizer] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState<boolean>(false);
  const [isPrescriptionVaultOpen, setIsPrescriptionVaultOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState<boolean>(false);
  const [selectedStoreForBooking, setSelectedStoreForBooking] = useState<StoreLocation | null>(null);
  const [designBoardInitialSlide, setDesignBoardInitialSlide] = useState<number | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('arvision_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('arvision_heroslides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('arvision_campaigns', JSON.stringify(festivalCampaigns));
  }, [festivalCampaigns]);

  useEffect(() => {
    localStorage.setItem('arvision_sections', JSON.stringify(homepageSections));
  }, [homepageSections]);

  useEffect(() => {
    localStorage.setItem('arvision_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('arvision_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('arvision_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('arvision_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const activeCampaign = festivalCampaigns.find((c) => c.isActive);

  // Dynamic BOGO & Pricing Calculation
  // In BOGO: If customer buys 2 BOGO-eligible items, the 2nd (lower or equal priced) frame gets 100% off frame price!
  let cartSubtotal = 0;
  let bogoSavings = 0;
  const bogoEligibleItems: { index: number; framePrice: number }[] = [];

  cart.forEach((item, index) => {
    const itemTotal = (item.unitPrice + (item.lensSelection?.price || 0)) * item.quantity;
    cartSubtotal += itemTotal;
    if (item.product.isBogoEligible) {
      for (let q = 0; q < item.quantity; q++) {
        bogoEligibleItems.push({ index, framePrice: item.unitPrice });
      }
    }
  });

  // Calculate pairs for BOGO: for every 2 items, discount the cheaper one's frame price
  if (bogoEligibleItems.length >= 2) {
    bogoEligibleItems.sort((a, b) => a.framePrice - b.framePrice);
    const freePairsCount = Math.floor(bogoEligibleItems.length / 2);
    for (let i = 0; i < freePairsCount; i++) {
      bogoSavings += bogoEligibleItems[i].framePrice;
    }
  }

  // Coupon discount
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    couponDiscountAmount = Math.round(((cartSubtotal - bogoSavings) * appliedCoupon.discountPercent) / 100);
  }

  const cartDiscount = bogoSavings + couponDiscountAmount;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Math.round(taxableAmount * 0.18); // 18% GST for optical products
  const cartShipping = taxableAmount > 999 || taxableAmount === 0 ? 0 : 99; // Free above ₹999
  const cartTotal = taxableAmount + cartTax + cartShipping;

  // Cart operations
  const addToCart = (product: Product, variant: ProductVariant, lens?: LensSelection) => {
    setCart((prev) => {
      // Find if exact same product + variant + lens exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant.id === variant.id &&
          item.lensSelection?.lensIndex === lens?.lensIndex &&
          item.lensSelection?.lensType === lens?.lensType &&
          item.lensSelection?.visionType === lens?.visionType
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
          totalPrice: (next[existingIndex].unitPrice + (lens?.price || 0)) * (next[existingIndex].quantity + 1),
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          selectedVariant: variant,
          lensSelection: lens,
          quantity: 1,
          unitPrice: product.sellingPrice,
          totalPrice: product.sellingPrice + (lens?.price || 0),
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: (item.unitPrice + (item.lensSelection?.price || 0)) * nextQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'BOGOVISION' || trimmed === 'BOGO') {
      setAppliedCoupon({ code: 'BOGOVISION', discountPercent: 10 });
      return { success: true, message: 'BOGOVISION applied! Extra 10% OFF on BOGO bundle!' };
    }
    if (trimmed === 'DIWALI40') {
      setAppliedCoupon({ code: 'DIWALI40', discountPercent: 40 });
      return { success: true, message: 'DIWALI40 applied! Flat 40% OFF festival discount!' };
    }
    if (trimmed === 'FIRSTBUY') {
      setAppliedCoupon({ code: 'FIRSTBUY', discountPercent: 20 });
      return { success: true, message: 'FIRSTBUY applied! 20% OFF Welcome Bonus!' };
    }
    if (trimmed === 'VISION50') {
      setAppliedCoupon({ code: 'VISION50', discountPercent: 50 });
      return { success: true, message: 'VISION50 applied! 50% VIP discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try DIWALI40 or FIRSTBUY' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const createOrder = (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory' | 'orderStatus' | 'prescriptionStatus'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      orderNumber: `ARV-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'Confirmed',
      statusHistory: [
        {
          status: 'Confirmed',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          note: `Payment verified via ${orderPayload.paymentMethod}. Order received.`,
        },
      ],
      trackingNumber: `BD-ARV${randomNum}`,
      prescriptionStatus: orderPayload.items.some((i) => i.lensSelection?.prescriptionDetails)
        ? 'Uploaded - Pending Review'
        : 'Not Required',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: newStatus,
            statusHistory: [
              ...ord.statusHistory,
              {
                status: newStatus,
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                note: note || `Status updated to ${newStatus}`,
              },
            ],
          };
        }
        return ord;
      })
    );
  };

  const bookAppointment = (appointmentData: Omit<EyeTestAppointment, 'id' | 'createdAt'>): EyeTestAppointment => {
    const newAppt: EyeTestAppointment = {
      ...appointmentData,
      id: `appt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppt, ...prev]);
    return newAppt;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  };

  const toggleCompare = (productId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 frames at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => {
    setComparisonList([]);
  };

  const openPDP = (product: Product) => {
    setSelectedProductForPDP(product);
    addToRecentlyViewed(product.id);
  };

  const openLensCustomizer = (product: Product) => {
    setProductForLensCustomizer(product);
    setIsLensCustomizerOpen(true);
  };

  const jumpToDesignSlide = (slideNumber: number) => {
    setDesignBoardInitialSlide(slideNumber);
    setActiveView('design-board');
  };

  // Admin mutation functions (Instant Real-Time store sync!)
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProductForPDP?.id === updated.id) {
      setSelectedProductForPDP(updated);
    }
  };

  const updateProductPrice = (productId: string, originalPrice: number, sellingPrice: number) => {
    const discountPct = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            originalPrice,
            sellingPrice,
            discountPercentage: discountPct,
          };
        }
        return p;
      })
    );
  };

  const toggleProductPublish = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === slide.id ? slide : s)));
  };

  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => [...prev, slide]);
  };

  const toggleHeroSlide = (slideId: string) => {
    setHeroSlides((prev) =>
      prev.map((s) => (s.id === slideId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const setFestivalCampaignActive = (campaignId: string) => {
    setFestivalCampaigns((prev) =>
      prev.map((c) => ({
        ...c,
        isActive: c.id === campaignId,
      }))
    );
  };

  const toggleHomepageSection = (sectionId: string) => {
    setHomepageSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, isEnabled: !sec.isEnabled } : sec))
    );
  };

  const reorderHomepageSections = (sections: HomepageSection[]) => {
    setHomepageSections(sections);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        heroSlides,
        festivalCampaigns,
        activeCampaign,
        homepageSections,
        stores,
        orders,
        appointments,
        wishlist,
        recentlyViewed,
        comparisonList,
        savedPrescriptions,
        activeView,
        setActiveView,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProductForPDP,
        setSelectedProductForPDP,
        isLensCustomizerOpen,
        setIsLensCustomizerOpen,
        productForLensCustomizer,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        activeTrackingOrder,
        setActiveTrackingOrder,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isPrescriptionVaultOpen,
        setIsPrescriptionVaultOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isBookAppointmentOpen,
        setIsBookAppointmentOpen,
        selectedStoreForBooking,
        setSelectedStoreForBooking,
        designBoardInitialSlide,
        setDesignBoardInitialSlide,
        cart,
        appliedCoupon,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartTotal,
        bogoSavings,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        toggleWishlist,
        addToRecentlyViewed,
        toggleCompare,
        clearCompare,
        bookAppointment,
        openPDP,
        openLensCustomizer,
        jumpToDesignSlide,
        addProduct,
        updateProduct,
        updateProductPrice,
        toggleProductPublish,
        updateHeroSlide,
        addHeroSlide,
        toggleHeroSlide,
        setFestivalCampaignActive,
        toggleHomepageSection,
        reorderHomepageSections,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
