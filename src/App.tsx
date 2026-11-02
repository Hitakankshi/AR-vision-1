import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FestivalBanner } from './components/FestivalBanner';
import { HomepagePromotions } from './components/HomepagePromotions';
import { ProductCatalog } from './components/ProductCatalog';
import { Footer } from './components/Footer';

// Modals & Alternative Views
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LensCustomizerModal } from './components/LensCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { PrescriptionVaultModal } from './components/PrescriptionVaultModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { AdminPortal } from './components/AdminPortal';
import { DesignBoardModal } from './components/DesignBoardModal';

const MainAppContent: React.FC = () => {
  const { activeView, homepageSections } = useStore();

  if (activeView === 'design-board') {
    return <DesignBoardModal />;
  }

  if (activeView === 'admin-portal') {
    return <AdminPortal />;
  }

  // Check section visibility from store context
  const isHeroEnabled = homepageSections.find((s) => s.type === 'hero')?.isEnabled ?? true;
  const isFestivalEnabled = homepageSections.find((s) => s.type === 'festival')?.isEnabled ?? true;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Header with announcement bar & search */}
      <Header />

      {/* 2. Hero Slider (if enabled) */}
      {isHeroEnabled && <HeroSlider />}

      {/* 3. Festival Campaign Banner (if enabled) */}
      {isFestivalEnabled && <FestivalBanner />}

      {/* 4. Category Grid, BOGO Spotlight, 3D AR Banner & Reviews */}
      <HomepagePromotions />

      {/* 5. Complete Product Catalog & Advanced Faceted Discovery */}
      <ProductCatalog />

      {/* 6. Footer & Trust Guarantees */}
      <Footer />

      {/* Interactive Optical Modals */}
      <VirtualTryOnModal />
      <ProductDetailModal />
      <LensCustomizerModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <StoreLocatorModal />
      <PrescriptionVaultModal />
      <ProductCompareModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
