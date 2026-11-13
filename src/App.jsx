import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Toast from './components/Toast';
import FloatingActions from './components/FloatingActions';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderTracking from './pages/OrderTracking';
import SmoothScroll from './components/SmoothScroll';

// Bulletproof Scroll-to-Top on every route change (instant pre-paint, RAF, and post-mount ticks)
function ScrollToTop() {
  const { pathname, search, key } = useLocation();

  useLayoutEffect(() => {
    // 1. Enforce manual scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const forceScrollToTop = () => {
      // Direct window and DOM document reset
      window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }

      // Lenis smooth scroll engine synchronization (desktop)
      if (window.lenis) {
        try {
          window.lenis.velocity = 0;
          window.lenis.targetScroll = 0;
          window.lenis.animatedScroll = 0;
          window.lenis.actualScroll = 0;
          window.lenis.scrollTo(0, { immediate: true, force: true, lock: false });
          window.lenis.resize?.();
        } catch {
          // ignore
        }
      }
    };

    // 1. Synchronously execute immediately BEFORE paint
    forceScrollToTop();

    // 2. Next animation frame (after React commits DOM for new route)
    const raf1 = requestAnimationFrame(() => {
      forceScrollToTop();
    });

    const raf2 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        forceScrollToTop();
      });
    });

    // 3. Guards for asynchronously loaded components / images
    const t1 = setTimeout(forceScrollToTop, 20);
    const t2 = setTimeout(forceScrollToTop, 60);
    const t3 = setTimeout(forceScrollToTop, 150);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, search, key]);

  return null;
}

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FAF7F2] text-[#100D0D] selection:bg-[#741F32] selection:text-white font-sans relative">
        <ScrollToTop />

        {/* 1. Festive Top Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Premium Sticky Header */}
        <Header onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* 3. RIGHT-SIDE SLIDING NAVIGATION DRAWER */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* 4. Slide-in Cart Drawer */}
      <CartDrawer />

      {/* 5. Main Route View */}
      <main className="flex-1 w-full max-w-full">
        <Routes>
          {/* 1. Home */}
          <Route path="/" element={<Home />} />

          {/* 2. Shop All */}
          <Route path="/shop" element={<Shop />} />

          {/* 3. Men */}
          <Route
            path="/men"
            element={
              <Shop
                defaultGender="men"
                pageTitle="Men's Designer Collection"
                pageSubtitle="Handcrafted Raw Silk Sherwanis, Kurtas & Velvet Nehru Jackets"
              />
            }
          />

          {/* 4. Women */}
          <Route
            path="/women"
            element={
              <Shop
                defaultGender="women"
                pageTitle="Women's Designer Collection"
                pageSubtitle="Heirloom Zari Sarees, Bridal Lehengas & Festive Anarkalis"
              />
            }
          />

          {/* 5. Ethnic Wear */}
          <Route
            path="/ethnic-wear"
            element={
              <Shop
                defaultType="ethnic"
                pageTitle="Ethnic Silhouettes & Heritage Weaves"
                pageSubtitle="Centuries of Indian Textile Craftsmanship"
              />
            }
          />

          {/* 6. Western Wear */}
          <Route
            path="/western-wear"
            element={
              <Shop
                defaultType="western"
                pageTitle="Contemporary Fusion & Modern Tailoring"
                pageSubtitle="Modern Silhouettes with Subtle Heritage Textures"
              />
            }
          />

          {/* 7. Festive Collection */}
          <Route
            path="/festive-collection"
            element={
              <Shop
                defaultCollection="festive-edit"
                pageTitle="The Festive Edit 2026"
                pageSubtitle="Tradition, Reimagined."
              />
            }
          />

          {/* Curated Collections */}
          <Route
            path="/collections"
            element={
              <Shop
                pageTitle="Curated Collections"
                pageSubtitle="Explore our exclusive festive, bridal & heritage editions"
              />
            }
          />

          {/* 8. New Arrivals */}
          <Route
            path="/new-arrivals"
            element={
              <Shop
                isNewArrivals={true}
                pageTitle="New Festive Arrivals"
                pageSubtitle="Latest Styles for All Festival & Wedding Celebrations"
              />
            }
          />

          {/* 9. Best Sellers */}
          <Route
            path="/best-sellers"
            element={
              <Shop
                isBestSellers={true}
                pageTitle="KOKARÉ Bestsellers"
                pageSubtitle="Most Celebrated and Cherished Silhouettes"
              />
            }
          />

          {/* 10. Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* 11. Wishlist */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* 12. Shopping Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* 13. Checkout UI */}
          <Route path="/checkout" element={<Checkout />} />

          {/* 14. About Us */}
          <Route path="/about" element={<About />} />

          {/* 15. Contact Us */}
          <Route path="/contact" element={<Contact />} />

          {/* 16. Order Tracking */}
          <Route path="/track-order" element={<OrderTracking />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* 6. Global Luxury Footer */}
      <Footer />

      {/* 7. Global Floating Toast Notifications */}
      <Toast />

      {/* 8. Amrapali-Style Floating Actions: Circular Back-to-Top (Black) & Concierge Chat (Red) */}
      <FloatingActions />
    </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <MainLayout />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}
