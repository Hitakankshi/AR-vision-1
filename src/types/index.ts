export type FrameShape = 'Aviator' | 'Round' | 'Rectangle' | 'Square' | 'Cat Eye' | 'Wayfarer' | 'Geometric' | 'Clubmaster' | 'Oval';
export type FrameMaterial = 'Titanium' | 'Acetate' | 'Ultem TR90' | 'Stainless Steel' | 'Polycarbonate' | 'Wood Finish';
export type Gender = 'Men' | 'Women' | 'Unisex' | 'Kids';
export type FrameSize = 'Narrow' | 'Medium' | 'Wide';
export type ProductCategory = 'Eyeglasses' | 'Sunglasses' | 'Computer Glasses' | 'Reading Glasses' | 'Kids Glasses' | 'Contact Lenses';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  image: string;
  modelImage?: string;
  stock: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  shape: FrameShape;
  material: FrameMaterial;
  gender: Gender;
  size: FrameSize;
  dimensions: {
    lensWidth: number; // in mm, e.g. 52
    bridgeWidth: number; // in mm, e.g. 18
    templeLength: number; // in mm, e.g. 142
  };
  weight: number; // grams, e.g. 16g
  originalPrice: number;
  sellingPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isBogoEligible: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isPublished: boolean;
  description: string;
  features: string[];
  images: string[];
  variants: ProductVariant[];
  selectedVariantId?: string;
  frameColor: string;
  tags: string[];
}

export interface LensSelection {
  visionType: 'single_vision' | 'bifocal' | 'progressive' | 'zero_power';
  visionTypeName: string;
  lensType: 'blue_shield' | 'anti_reflective' | 'photochromic' | 'polarized';
  lensTypeName: string;
  lensIndex: '1.56_standard' | '1.60_thin' | '1.67_ultrathin';
  lensIndexName: string;
  price: number;
  prescriptionDetails?: {
    method: 'manual' | 'upload' | 'later';
    odSph?: string;
    odCyl?: string;
    odAxis?: string;
    odAdd?: string;
    osSph?: string;
    osCyl?: string;
    osAxis?: string;
    osAdd?: string;
    pd?: string;
    fileName?: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: ProductVariant;
  lensSelection?: LensSelection;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isBogoFreeItem?: boolean;
}

export type OrderStatus =
  | 'Pending Payment'
  | 'Confirmed'
  | 'Prescription Review'
  | 'Processing'
  | 'Lens Preparation'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  trackingNumber?: string;
  prescriptionStatus: 'Not Required' | 'Uploaded - Pending Review' | 'Verified' | 'Clarification Needed';
}

export interface FestivalCampaign {
  id: string;
  name: string;
  festival: 'Diwali' | 'Holi' | 'Dussehra' | 'Christmas' | 'New Year' | 'Valentine' | 'Summer Sale' | 'Independence Day' | 'Monsoon Flash';
  badgeText: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  mobileBannerImage: string;
  couponCode: string;
  discountPercent: number;
  bogoActive: boolean;
  startDate: string;
  endDate: string;
  isActive: boolean;
  themeColor: string;
  accentColor: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: string;
  mobileImage: string;
  badge: string;
  bgColor: string;
  textColor: string;
  isActive: boolean;
  order: number;
}

export interface HomepageSection {
  id: string;
  name: string;
  type: 'announcement' | 'hero' | 'festival' | 'categories' | 'bogo_spotlight' | 'trending' | 'try_on_banner' | 'new_arrivals' | 'stores' | 'reviews' | 'bottom_promo';
  isEnabled: boolean;
  order: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  timing: string;
  services: string[];
  rating: number;
  mapCoordinates: { lat: number; lng: number };
}

export interface EyeTestAppointment {
  id: string;
  storeId: string;
  storeName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  timeSlot: string;
  optometrist: string;
  testType: 'Comprehensive 12-Step Vision Test' | 'Contact Lens Fitting' | 'Computer Vision Screening' | 'Kids Eye Checkup';
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verifiedPurchase: boolean;
  fitRating: 'Tight' | 'True to Size' | 'Loose';
}

export interface DesignSlide {
  slideNumber: number;
  id: string;
  category: 'Storefront & Hero' | 'Catalog & Discovery' | 'PDP & 360 Showcase' | '360° Inspection & Fit Guide' | 'Lens Customization' | 'Prescriptions' | 'Cart & Checkout' | 'Customer Account' | 'Enterprise Admin';
  title: string;
  screenCode: string;
  uxGoal: string;
  keyFeatures: string[];
  techStack: string[];
  responsiveBreakpoints: string;
  previewImage?: string;
  liveScreenTarget: string; // Action / view to launch
}
