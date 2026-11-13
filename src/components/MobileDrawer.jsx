import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Sparkles,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  WhatsAppIcon
} from './SocialIcons';

// Exactly mirrors the desktop header navigation collections dropdown
const COLLECTIONS_SUBITEMS = [
  { name: 'All Collections', path: '/collections' },
  { name: 'The Festive Edit', path: '/festive-collection' },
  { name: 'Wild Tussar Handlooms', path: '/shop?collection=heritage-classics' },
  { name: 'Ceremonial Menswear', path: '/shop?gender=men' },
  { name: 'Wedding Stories', path: '/shop?collection=wedding-stories' },
];

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Women', path: '/women' },
  { name: 'Men', path: '/men' },
  {
    name: 'Collections',
    path: '/collections',
    hasSubmenu: true,
    subItems: COLLECTIONS_SUBITEMS
  },
  { name: 'Festive Edit', path: '/festive-collection', isFestive: true },
  { name: 'Our Story', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const drawerRef = useRef(null);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Automatically expand Collections submenu if user is on a collections subpage
  useEffect(() => {
    if (
      location.pathname.includes('collection') ||
      location.search.includes('collection=')
    ) {
      setIsCollectionsOpen(true);
    }
  }, [location.pathname, location.search]);

  // Lock body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Support ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reliable navigation handler that closes the drawer and guarantees instant scroll-to-top
  const handleNavigate = (path) => {
    onClose();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
    if (window.lenis) {
      try {
        window.lenis.scrollTo(0, { immediate: true, force: true });
        window.lenis.resize?.();
      } catch {
        // ignore
      }
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 14 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Silk Dark Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-[3px] transition-opacity"
            aria-hidden="true"
          />

          {/* Right-side Luxury Sliding Drawer — Warm Ivory Silk Atelier Aesthetic */}
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] sm:w-[340px] max-w-[85vw] bg-[#FAF8F5] border-l border-[#EAE4DC] text-[#161616] shadow-[-16px_0_48px_rgba(22,22,22,0.12)] flex flex-col h-full overflow-hidden"
            >
              {/* 1. Drawer Header: Editorial Brand Wordmark & Refined Close */}
              <div className="px-6 py-4.5 border-b border-[#EAE4DC] flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0">
                <Link
                  to="/"
                  onClick={() => handleNavigate('/')}
                  className="group flex flex-col"
                >
                  <span className="font-serif text-2xl tracking-[0.24em] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors block">
                    KOKARÉ
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#C8A27A] font-medium -mt-0.5">
                    The Ethnic Edit
                  </span>
                </Link>

                {/* Minimalist Circular Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close Navigation Menu"
                  className="w-8.5 h-8.5 rounded-full bg-white border border-[#EAE4DC] text-[#736E66] hover:text-[#161616] hover:border-[#C8A27A] shadow-2xs flex items-center justify-center transition-all cursor-pointer focus:outline-none active:scale-95"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              {/* 2. Navigation Links — Prominent Haute Editorial Typography */}
              <motion.div
                data-lenis-prevent
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="px-5 py-4 space-y-1.5 flex-1 overflow-y-auto"
              >
                {MENU_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;

                  // Collections Accordion Item
                  if (item.hasSubmenu) {
                    const isAnySubActive =
                      isActive ||
                      location.pathname === '/collections' ||
                      item.subItems.some((s) => location.pathname === s.path);

                    return (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        className="border-b border-[#EAE4DC]/50 last:border-b-0 pb-1.5"
                      >
                        <div
                          className={`flex items-center justify-between py-3 px-3.5 rounded-xs transition-all duration-200 ${
                            isAnySubActive || isCollectionsOpen
                              ? 'bg-white shadow-2xs'
                              : 'hover:bg-white/60'
                          }`}
                        >
                          <Link
                            to={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className="flex items-center flex-1 group"
                          >
                            <span
                              className={`font-serif text-[21px] sm:text-[22px] tracking-wide transition-colors ${
                                isAnySubActive
                                  ? 'text-[#C8A27A] font-medium'
                                  : 'text-[#161616] group-hover:text-[#C8A27A]'
                              }`}
                            >
                              {item.name}
                            </span>
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsCollectionsOpen((prev) => !prev);
                            }}
                            aria-label="Toggle collections menu"
                            className="p-1.5 text-[#736E66] hover:text-[#C8A27A] transition-colors cursor-pointer"
                          >
                            <ChevronDown
                              className={`w-4.5 h-4.5 stroke-[1.5] transition-transform duration-250 ${
                                isCollectionsOpen ? 'rotate-180 text-[#C8A27A]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Expandable Collections Submenu */}
                        <AnimatePresence>
                          {isCollectionsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden bg-white/90 border-l border-[#C8A27A]/40 ml-3.5 my-1.5 pl-4 pr-2 py-2 space-y-1 shadow-2xs"
                            >
                              {item.subItems.map((sub) => {
                                const isSubActive = location.pathname === sub.path;
                                return (
                                  <Link
                                    key={sub.name}
                                    to={sub.path}
                                    onClick={() => handleNavigate(sub.path)}
                                    className={`group flex items-center justify-between py-2 px-2.5 text-[15px] sm:text-[15.5px] rounded-xs transition-all duration-200 ${
                                      isSubActive
                                        ? 'text-[#C8A27A] font-medium bg-[#FAF8F5]'
                                        : 'text-[#736E66] hover:text-[#161616] hover:bg-[#FAF8F5]'
                                    }`}
                                  >
                                    <span className="font-light tracking-wide">
                                      {sub.name}
                                    </span>
                                    <ArrowRight
                                      className={`w-3.5 h-3.5 text-[#C8A27A] transition-all duration-200 ${
                                        isSubActive
                                          ? 'opacity-100 translate-x-0'
                                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                      }`}
                                    />
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  // Festive Edit Special Item
                  if (item.isFestive) {
                    return (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        className="border-b border-[#EAE4DC]/50 last:border-b-0 pb-1.5"
                      >
                        <Link
                          to={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className={`group flex items-center justify-between py-3 px-3.5 rounded-xs transition-all duration-200 ${
                            isActive
                              ? 'bg-white shadow-2xs text-[#721C2B]'
                              : 'hover:bg-white/60 text-[#721C2B]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#C8A27A] shrink-0" />
                            <span className="font-serif text-[21px] sm:text-[22px] tracking-wide font-medium">
                              Festive Edit
                            </span>
                          </div>
                          <span className="text-[9.5px] uppercase tracking-[0.2em] font-sans font-semibold text-[#721C2B] bg-[#FBF1F2] border border-[#721C2B]/25 px-2 py-0.5 rounded-xs shadow-2xs">
                            Curated
                          </span>
                        </Link>
                      </motion.div>
                    );
                  }

                  // Standard Editorial Menu Item
                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      className="border-b border-[#EAE4DC]/50 last:border-b-0 pb-1.5"
                    >
                      <Link
                        to={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`group flex items-center justify-between py-3 px-3.5 rounded-xs transition-all duration-200 ${
                          isActive
                            ? 'bg-white shadow-2xs'
                            : 'hover:bg-white/60'
                        }`}
                      >
                        <span
                          className={`font-serif text-[21px] sm:text-[22px] tracking-wide transition-colors ${
                            isActive
                              ? 'text-[#C8A27A] font-medium'
                              : 'text-[#161616] group-hover:text-[#C8A27A]'
                          }`}
                        >
                          {item.name}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 text-[#C8A27A] transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* 3. Pure Aesthetic Maison Signature with Refined Social Icons */}
              <div className="px-6 py-5 border-t border-[#EAE4DC] bg-white/70 backdrop-blur-xs shrink-0 space-y-3">
                {/* Champagne Gold Haute Emblem Divider */}
                <div className="flex items-center justify-center gap-2.5 text-[#C8A27A]/60">
                  <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C8A27A]/50 to-transparent" />
                  <span className="text-[9px] tracking-widest text-[#C8A27A]">✦</span>
                  <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C8A27A]/50 to-transparent" />
                </div>

                {/* Poetic Maison Sign-Off */}
                <div className="text-center space-y-0.5">
                  <p className="font-serif text-[12.5px] tracking-[0.24em] uppercase text-[#161616] font-normal">
                    KOKARÉ ATELIER
                  </p>
                  <p className="font-serif italic text-[11px] text-[#736E66] font-light leading-snug">
                    "Centuries of Indian handloom & bridal zari artistry."
                  </p>
                </div>

                {/* Refined Circular Social Icons */}
                <div className="flex items-center justify-center gap-2.5 pt-1">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-white border border-[#EAE4DC] hover:border-[#C8A27A] text-[#736E66] hover:text-[#C8A27A] flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-white border border-[#EAE4DC] hover:border-[#C8A27A] text-[#736E66] hover:text-[#C8A27A] flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="w-8 h-8 rounded-full bg-white border border-[#EAE4DC] hover:border-[#C8A27A] text-[#736E66] hover:text-[#C8A27A] flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <PinterestIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Concierge"
                    className="w-8 h-8 rounded-full bg-white border border-[#EAE4DC] hover:border-[#C8A27A] text-[#736E66] hover:text-[#C8A27A] flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Discreet Concierge Line */}
                <div className="text-center pt-1.5 border-t border-[#EAE4DC]/50">
                  <a
                    href="mailto:concierge@kokare.in"
                    className="text-[10px] tracking-[0.2em] uppercase text-[#736E66] hover:text-[#C8A27A] transition-colors font-light"
                  >
                    concierge@kokare.in
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
