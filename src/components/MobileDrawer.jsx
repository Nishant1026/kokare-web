import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Sparkles,
  Heart,
  ShoppingBag,
  Phone,
  Mail,
  ArrowRight,
  Compass
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, PinterestIcon } from './SocialIcons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const DRAWER_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop All Silhouettes', path: '/shop' },
  { name: 'Women’s Atelier', path: '/women' },
  { name: 'Men’s Atelier', path: '/men' },
  { name: 'Heritage Ethnic Wear', path: '/ethnic-wear' },
  { name: 'Western Fusion', path: '/western-wear' },
  { name: 'Diwali Festive Edit 2026', path: '/festive-collection', featured: true },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Best Sellers', path: '/best-sellers' },
  { name: 'Track Order & Account', path: '/track-order' },
  { name: 'The Maison Story', path: '/about' },
  { name: 'Atelier & Contact', path: '/contact' }
];

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const drawerRef = useRef(null);
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();

  // Lock body scrolling when open
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

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 16 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark translucent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Right-side Sliding Drawer — Zoya Clean Haute Joaillerie Silhouette */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-8">
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="w-[86vw] max-w-[390px] bg-[#FFFFFF] border-l border-[#EAE4DC] text-[#161616] shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-[#EAE4DC] flex items-center justify-between bg-white sticky top-0 z-10">
                <Link
                  to="/"
                  onClick={onClose}
                  className="group flex flex-col"
                >
                  <span className="font-serif text-2xl tracking-[0.24em] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors block">
                    KOKARÉ
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8A27A] font-medium -mt-0.5">
                    The Jharkhand Edit
                  </span>
                </Link>

                {/* Refined Circular Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close Navigation Menu"
                  className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EAE4DC] text-[#736E66] hover:text-[#161616] hover:border-[#C8A27A] flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Campaign Welcome Gilded Strip */}
              <div className="px-6 py-3.5 bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] border-b border-[#EAE4DC] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C8A27A] shrink-0" />
                  <div>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-[#C8A27A] font-medium block">
                      Diwali Edition 2026
                    </span>
                    <p className="font-serif italic text-xs text-[#161616]/90 mt-0.5">
                      "Where artistry meets the soul of Jharkhand."
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links — Strict 17px Editorial Typography */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="px-5 py-5 space-y-1 flex-1 overflow-y-auto divide-y divide-[#FAF7F2]"
              >
                {DRAWER_LINKS.map((link) => {
                  const isActive = location.pathname === link.path;

                  if (link.featured) {
                    return (
                      <motion.div key={link.name} variants={itemVariants} className="pt-2 pb-2">
                        <Link
                          to={link.path}
                          onClick={onClose}
                          className="group relative flex items-center justify-between p-3.5 bg-gradient-to-r from-[#161616] via-[#221C16] to-[#161616] text-white border border-[#C8A27A]/40 shadow-sm transition-all duration-300 hover:border-[#C8A27A]"
                        >
                          <div className="flex items-center gap-2.5">
                            <Sparkles className="w-4 h-4 text-[#C8A27A] shrink-0" />
                            <span className="font-serif text-[17px] font-normal tracking-wide text-white">
                              {link.name}
                            </span>
                          </div>
                          <span className="text-[10px] tracking-[0.2em] uppercase bg-[#C8A27A] text-white px-2 py-0.5 font-medium shadow-xs">
                            Special
                          </span>
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={link.name} variants={itemVariants} className="pt-1 first:pt-0">
                      <Link
                        to={link.path}
                        onClick={onClose}
                        className={`group flex items-center justify-between py-2.5 px-3 transition-all duration-200 border-l-2 ${
                          isActive
                            ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                            : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                        }`}
                      >
                        <span className="font-serif text-[17px] font-normal tracking-wide">
                          {link.name}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isActive
                              ? 'text-[#C8A27A] opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-[#EAE4DC] bg-[#FAF7F2] space-y-4">
                
                {/* Wishlist & Bag: ICONS ONLY (No name labels as requested) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* 1. Wishlist Icon-Only Button */}
                  <Link
                    to="/wishlist"
                    onClick={onClose}
                    aria-label={`Wishlist (${wishlistCount} items)`}
                    title="Wishlist"
                    className="relative flex items-center justify-center h-12 bg-white border border-[#EAE4DC] hover:border-[#C8A27A] transition-all duration-300 shadow-2xs group cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <Heart
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                          wishlistCount > 0
                            ? 'text-[#C8A27A] fill-[#C8A27A]'
                            : 'text-[#161616] group-hover:text-[#C8A27A]'
                        }`}
                      />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2.5 -right-3.5 bg-[#C8A27A] text-white text-[10px] font-semibold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center border border-white shadow-xs">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* 2. Bag Icon-Only Button */}
                  <Link
                    to="/cart"
                    onClick={onClose}
                    aria-label={`Shopping Bag (${totalItems} items)`}
                    title="Shopping Bag"
                    className="relative flex items-center justify-center h-12 bg-[#161616] hover:bg-[#C8A27A] text-white border border-[#161616] hover:border-[#C8A27A] transition-all duration-300 shadow-2xs group cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
                      {totalItems > 0 && (
                        <span className="absolute -top-2.5 -right-3.5 bg-[#C8A27A] text-white text-[10px] font-semibold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center border border-white shadow-xs">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Atelier Contact Assistance */}
                <div className="pt-1 text-[13px] text-[#736E66] space-y-1.5 font-light">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 hover:text-[#C8A27A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
                    <span>+91 98765 43210 (10 AM - 8 PM IST)</span>
                  </a>
                  <a
                    href="mailto:concierge@kokare.in"
                    className="flex items-center gap-2 hover:text-[#C8A27A] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
                    <span>concierge@kokare.in</span>
                  </a>
                </div>

                {/* Social Channels */}
                <div className="flex items-center justify-between pt-1 border-t border-[#EAE4DC]/60 text-[#736E66]">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium">
                    Follow Atelier
                  </span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-7 h-7 rounded-full bg-white border border-[#EAE4DC] flex items-center justify-center hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-7 h-7 rounded-full bg-white border border-[#EAE4DC] flex items-center justify-center hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                      className="w-7 h-7 rounded-full bg-white border border-[#EAE4DC] flex items-center justify-center hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors"
                    >
                      <PinterestIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
