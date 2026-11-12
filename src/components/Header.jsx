import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Sparkles,
  User,
  ArrowRight,
  Compass,
  MapPin,
  Mail,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchModal from './SearchModal';

const COLLECTIONS_DROPDOWN = [
  { name: 'The Festive Edit', path: '/festive-collection', desc: 'Diwali 2026: Royal brocades & antique zardozi rose-gold' },
  { name: 'Wild Tussar Handlooms', path: '/shop?collection=heritage-classics', desc: 'Indigenous wild tussar silks & organic tribal looms' },
  { name: 'Ceremonial Menswear', path: '/shop?gender=men', desc: 'Midnight bandhgalas & tailored raw silk kurtas' },
  { name: 'Wedding Stories', path: '/shop?collection=wedding-stories', desc: 'Heirloom bridal lehengas & architectural drapes' }
];

const CURRENCIES = [
  { code: 'INR', label: 'INR (₹)', flag: '🇮🇳' },
  { code: 'USD', label: 'USD ($)', flag: '🇺🇸' },
  { code: 'GBP', label: 'GBP (£)', flag: '🇬🇧' },
  { code: 'AED', label: 'AED (د.إ)', flag: '🇦🇪' },
  { code: 'EUR', label: 'EUR (€)', flag: '🇪🇺' }
];

export default function Header({ onOpenDrawer }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [isBagHovered, setIsBagHovered] = useState(false);
  const currencyDropdownRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const { totalItems, setIsCartOpen, cartBump, cart, subtotal } = useCart();
  const { wishlistCount } = useWishlist();

  // Scroll detection with hysteresis and RAF throttling to eliminate boundary oscillation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && currentY > 100) return true;
            if (prev && currentY < 30) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close currency dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(e.target)) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('DIWALI20');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  // Determine styling based on page and scroll status
  // On Home page when at top: Transparent with white text (exact to Amrapali Jewels screenshot 3)
  // When scrolled or on any subpage: Solid luxury pearl white with dark charcoal text
  const isTransparent = isHome && !isScrolled;

  const renderMicroBarContent = (transparent) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
      {/* Left: Store Location & Email */}
      <div className="flex items-center space-x-3 sm:space-x-6 text-[11px] sm:text-xs tracking-wider">
        <Link
          to="/contact"
          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
            transparent ? 'hover:text-[#C8A27A]' : 'hover:text-[#161616]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="hidden sm:inline">Store Location</span>
          <span className="sm:hidden">Ranchi, Jharkhand</span>
        </Link>
        <a
          href="mailto:concierge@kokare.in"
          className={`hidden md:flex items-center gap-1.5 transition-colors ${
            transparent ? 'hover:text-[#C8A27A]' : 'hover:text-[#161616]'
          }`}
        >
          <Mail className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>concierge@kokare.in</span>
        </a>
      </div>

      {/* Center: Diwali Festive Announcement */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium">
        <Sparkles className="w-3 h-3 text-[#C8A27A]" />
        <span>Diwali Festive Special — Extra 20% Off With Code</span>
        <button
          onClick={handleCopyCode}
          className="font-mono text-[#C8A27A] font-semibold underline underline-offset-2 hover:opacity-80 cursor-pointer ml-0.5 inline-flex items-center gap-1"
          title="Click to copy coupon code"
        >
          DIWALI20
          {copiedCoupon && <Check className="w-3 h-3 text-green-400" />}
        </button>
      </div>

      {/* Right: Currency Selector */}
      <div className="relative" ref={currencyDropdownRef}>
        <button
          onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
          className={`flex items-center gap-1 text-[11px] sm:text-xs uppercase tracking-wider py-0.5 px-2 rounded-xs border transition-colors cursor-pointer ${
            transparent
              ? 'border-white/30 hover:border-white text-white'
              : 'border-[#EAE4DC] hover:border-[#161616] text-[#161616]'
          }`}
          aria-label="Select Currency"
        >
          <span>{selectedCurrency.flag}</span>
          <span className="font-medium ml-1">{selectedCurrency.code}</span>
          <ChevronDown className="w-3 h-3 opacity-70 ml-0.5" />
        </button>

        {/* Currency Dropdown Menu */}
        {isCurrencyOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-[#EAE4DC] shadow-xl py-1 z-50 animate-fadeIn text-[#161616]">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setSelectedCurrency(curr);
                  setIsCurrencyOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#FAF7F2] transition-colors ${
                  selectedCurrency.code === curr.code ? 'font-semibold text-[#C8A27A]' : 'text-[#161616]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{curr.flag}</span>
                  <span>{curr.label}</span>
                </span>
                {selectedCurrency.code === curr.code && <Check className="w-3 h-3 text-[#C8A27A]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ============================================================ */}
      {/* 1. TOP UTILITY MICRO-BAR (On subpages: regular flow)         */}
      {/* Scrolls off naturally with page to prevent sticky oscillation*/}
      {/* ============================================================ */}
      {!isHome && (
        <div className="w-full max-w-full border-b border-[#EAE4DC] bg-[#FAF7F2] text-[#736E66] text-xs">
          {renderMicroBarContent(false)}
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. MAIN NAVIGATION HEADER (Rock-solid constant height)        */}
      {/* ============================================================ */}
      <header
        className={`w-full max-w-full z-40 transition-[background-color,border-color,color,box-shadow] duration-300 ${
          isHome
            ? isScrolled
              ? 'fixed top-0 left-0 bg-white/95 backdrop-blur-md border-b border-[#EAE4DC] shadow-sm text-[#161616]'
              : 'absolute top-0 left-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white border-transparent'
            : 'sticky top-0 bg-white border-b border-[#EAE4DC] shadow-xs text-[#161616]'
        }`}
      >
        {/* On Home page: Top micro-bar integrated inside transparent hero header */}
        {isHome && (
          <div
            className={`transition-opacity duration-300 border-b ${
              isScrolled
                ? 'hidden'
                : 'border-white/15 bg-black/25 text-white/90 text-xs'
            }`}
          >
            {renderMicroBarContent(isTransparent)}
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. MAIN NAVIGATION BAR                                       */}
        {/* Left: Brand Logo | Center: Links | Right: Icons             */}
        {/* ============================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Left: Brand Logo KOKARÉ — Perfectly balanced and aligned with content margin */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="group flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl lg:text-[27px] font-normal tracking-[0.2em] sm:tracking-[0.26em] transition-colors ${isTransparent ? 'text-white group-hover:text-[#C8A27A]' : 'text-[#161616] group-hover:text-[#C8A27A]'
                  }`}
              >
                KOKARÉ
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-[#C8A27A] font-medium -mt-0.5">
                The Jharkhand Edit
              </span>
            </Link>
          </div>

          {/* Desktop Center Navigation Links — Balanced separation from Logo */}
          <nav
            className={`hidden lg:flex items-center justify-center space-x-5 xl:space-x-7 text-[12px] xl:text-[13px] tracking-[0.16em] xl:tracking-[0.2em] uppercase font-normal transition-colors ml-8 lg:ml-10 xl:ml-14 ${isTransparent ? 'text-white' : 'text-[#161616]'
              }`}
          >
            <Link
              to="/"
              className={`py-2 transition-colors relative ${location.pathname === '/'
                  ? 'text-[#C8A27A] font-medium'
                  : isTransparent
                    ? 'text-white/90 hover:text-[#C8A27A]'
                    : 'text-[#161616]/80 hover:text-[#C8A27A]'
                }`}
            >
              <span>Home</span>
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A27A]" />
              )}
            </Link>

            <Link
              to="/women"
              className={`py-2 transition-colors relative ${location.pathname === '/women'
                  ? 'text-[#C8A27A] font-medium'
                  : isTransparent
                    ? 'text-white/90 hover:text-[#C8A27A]'
                    : 'text-[#161616]/80 hover:text-[#C8A27A]'
                }`}
            >
              <span>Women</span>
              {location.pathname === '/women' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A27A]" />
              )}
            </Link>

            <Link
              to="/men"
              className={`py-2 transition-colors relative ${location.pathname === '/men'
                  ? 'text-[#C8A27A] font-medium'
                  : isTransparent
                    ? 'text-white/90 hover:text-[#C8A27A]'
                    : 'text-[#161616]/80 hover:text-[#C8A27A]'
                }`}
            >
              <span>Men</span>
              {location.pathname === '/men' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A27A]" />
              )}
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${isCollectionsOpen || location.pathname.includes('collection')
                    ? 'text-[#C8A27A] font-medium'
                    : isTransparent
                      ? 'text-white/90 hover:text-[#C8A27A]'
                      : 'text-[#161616]/80 hover:text-[#C8A27A]'
                  }`}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Luxury Dropdown Menu */}
              {isCollectionsOpen && (
                <div className="absolute top-full left-0 w-84 bg-white border border-[#EAE4DC] shadow-2xl py-3 mt-1 animate-fadeIn z-50 text-[#161616]">
                  <div className="px-5 py-2 border-b border-[#EAE4DC]">
                    <span className="text-[10px] tracking-[0.28em] uppercase text-[#C8A27A] font-medium block">
                      Curated Editions
                    </span>
                  </div>
                  {COLLECTIONS_DROPDOWN.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsCollectionsOpen(false)}
                      className="block px-5 py-3 hover:bg-[#FAF7F2] transition-colors group"
                    >
                      <p className="text-xs font-normal text-[#161616] group-hover:text-[#C8A27A] tracking-[0.1em] uppercase">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#736E66] tracking-normal mt-0.5 font-light">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                  <div className="p-3 border-t border-[#EAE4DC] bg-[#FAF7F2]">
                    <Link
                      to="/shop"
                      onClick={() => setIsCollectionsOpen(false)}
                      className="flex items-center justify-between px-2 text-[11px] tracking-[0.2em] uppercase text-[#C8A27A] font-medium hover:text-[#161616]"
                    >
                      <span>Explore All Silhouettes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/festive-collection"
              className={`flex items-center gap-1.5 transition-colors py-2 font-medium ${isTransparent ? 'text-[#C8A27A] hover:text-white' : 'text-[#C8A27A] hover:text-[#721C2B]'
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>Festive Edit</span>
            </Link>

            <Link
              to="/about"
              className={`py-2 transition-colors relative ${location.pathname === '/about'
                  ? 'text-[#C8A27A] font-medium'
                  : isTransparent
                    ? 'text-white/90 hover:text-[#C8A27A]'
                    : 'text-[#161616]/80 hover:text-[#C8A27A]'
                }`}
            >
              <span>Our Story</span>
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A27A]" />
              )}
            </Link>

            <Link
              to="/contact"
              className={`py-2 transition-colors relative ${location.pathname === '/contact'
                  ? 'text-[#C8A27A] font-medium'
                  : isTransparent
                    ? 'text-white/90 hover:text-[#C8A27A]'
                    : 'text-[#161616]/80 hover:text-[#C8A27A]'
                }`}
            >
              <span>Contact</span>
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8A27A]" />
              )}
            </Link>
          </nav>

          {/* Right Action Icons: Strictly Icon-Only Buttons (Search, Account, Wishlist, Bag) */}
          <div
            className={`flex items-center gap-1 sm:gap-2 lg:gap-3 transition-colors ${isTransparent ? 'text-white' : 'text-[#161616]'
              }`}
          >
            {/* 1. Search (Icon-Only) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Collection"
              title="Search"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-inherit hover:text-[#C8A27A] transition-all cursor-pointer focus:outline-none"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* 2. Account / Track Order (Desktop icon-only; mobile is in drawer) */}
            <Link
              to="/track-order"
              aria-label="Account & Orders"
              title="Account & Orders"
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:bg-white/10 text-inherit hover:text-[#C8A27A] transition-all cursor-pointer focus:outline-none"
            >
              <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>

            {/* 3. Wishlist (Icon-Only as requested) */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              title={wishlistCount > 0 ? `Wishlist: ${wishlistCount} items` : 'Wishlist'}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-inherit hover:text-[#C8A27A] transition-all cursor-pointer focus:outline-none"
            >
              <Heart className={`w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5] ${wishlistCount > 0 ? 'fill-[#C8A27A] text-[#C8A27A]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#C8A27A] text-white text-[9px] sm:text-[10px] font-semibold rounded-full h-4 sm:h-4.5 min-w-[16px] sm:min-w-[18px] px-1 flex items-center justify-center border border-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 4. Shopping Bag (Icon-Only as requested) */}
            <div
              className="relative"
              onMouseEnter={() => setIsBagHovered(true)}
              onMouseLeave={() => setIsBagHovered(false)}
            >
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping Bag (${totalItems} items)`}
                className={`relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-inherit transition-all focus:outline-none cursor-pointer group ${cartBump ? 'text-[#C8A27A] scale-110' : 'hover:text-[#C8A27A]'
                  }`}
                title={totalItems > 0 ? `Shopping Bag: ${totalItems} items` : 'Shopping Bag'}
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag
                    className={`w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.5] transition-transform duration-300 ${cartBump ? 'animate-bounce text-[#C8A27A]' : 'group-hover:scale-105'
                      }`}
                  />
                  {totalItems > 0 && (
                    <span
                      className={`absolute -top-1 -right-1.5 bg-[#C8A27A] text-white text-[9px] sm:text-[10px] font-semibold rounded-full h-4 sm:h-4.5 min-w-[16px] sm:min-w-[18px] px-1 flex items-center justify-center border border-white shadow-xs transition-transform ${cartBump ? 'scale-125 ring-2 ring-[#C8A27A]/60 ring-offset-1' : ''
                        }`}
                    >
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>

              {/* Luxury Hover Mini-Bag Preview Popover (Desktop) */}
              {isBagHovered && (
                <div className="hidden lg:block absolute right-0 top-full mt-2 w-80 bg-white border border-[#EAE4DC] shadow-2xl p-4 z-50 text-[#161616] animate-fadeIn">
                  {cart.length === 0 ? (
                    <div className="text-center py-4">
                      <ShoppingBag className="w-8 h-8 text-[#C8A27A]/60 mx-auto mb-2" />
                      <p className="text-xs text-[#161616] font-serif">Your Bag is Empty</p>
                      <p className="text-[11px] text-[#736E66] mt-0.5">Explore our Diwali 2026 festive edit.</p>
                      <Link
                        to="/shop"
                        onClick={() => setIsBagHovered(false)}
                        className="inline-block mt-3 px-4 py-1.5 bg-[#161616] text-white text-[10px] uppercase tracking-wider hover:bg-[#C8A27A] transition-colors"
                      >
                        Explore Silhouettes
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE4DC] mb-3">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium">
                          Shopping Bag ({totalItems})
                        </span>
                        <span className="text-xs font-serif font-normal text-[#161616]">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Mini products list */}
                      <div className="max-h-48 overflow-y-auto space-y-2.5 divide-y divide-[#EAE4DC]/50">
                        {cart.slice(0, 3).map((item, idx) => {
                          const itemId = item.id || item.product?.id || `m-${idx}`;
                          const itemName = item.name || item.product?.name || 'Silk Silhouette';
                          const itemImg = item.images?.[0] || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';
                          const itemPrice = Number(item.price || item.product?.price || 0);
                          const itemQty = Number(item.quantity || 1);

                          return (
                            <div key={item.cartItemId || `${itemId}-${idx}`} className="flex gap-2.5 pt-2 first:pt-0">
                              <img
                                src={itemImg}
                                alt={itemName}
                                className="w-10 h-14 object-cover object-top border border-[#EAE4DC] shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-serif text-[#161616] truncate font-normal">
                                  {itemName}
                                </p>
                                <p className="text-[10px] text-[#736E66]">
                                  Qty: {itemQty} · {item.selectedSize || item.size || 'Standard'}
                                </p>
                                <p className="text-xs font-serif text-[#161616] mt-0.5">
                                  ₹{(itemPrice * itemQty).toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {cart.length > 3 && (
                        <p className="text-[10px] text-[#736E66] text-center pt-2 italic">
                          +{cart.length - 3} more silhouettes in bag
                        </p>
                      )}

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#EAE4DC]">
                        <Link
                          to="/cart"
                          onClick={() => setIsBagHovered(false)}
                          className="py-2 text-center bg-[#FAF7F2] hover:bg-[#EAE4DC] text-[#161616] text-[10px] uppercase tracking-wider font-normal border border-[#EAE4DC] transition-colors"
                        >
                          View Bag
                        </Link>
                        <button
                          onClick={() => {
                            setIsBagHovered(false);
                            setIsCartOpen(true);
                          }}
                          className="py-2 text-center bg-[#161616] hover:bg-[#C8A27A] text-white text-[10px] uppercase tracking-wider font-normal transition-colors cursor-pointer"
                        >
                          Slide Bag →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={onOpenDrawer}
              aria-label="Open Navigation Menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-[#C8A27A] transition-colors focus:outline-none cursor-pointer"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
