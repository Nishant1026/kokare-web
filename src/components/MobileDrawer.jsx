import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Sparkles,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

// Exactly mirrors the desktop header navigation collections dropdown
const COLLECTIONS_SUBITEMS = [
  { name: 'All Collections', path: '/collections' },
  { name: 'The Festive Edit', path: '/festive-collection' },
  { name: 'Wild Tussar Handlooms', path: '/shop?collection=heritage-classics' },
  { name: 'Ceremonial Menswear', path: '/shop?gender=men' },
  { name: 'Wedding Stories', path: '/shop?collection=wedding-stories' },
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
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 12 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
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
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Right-side Sliding Drawer — Increased width with clean luxury layout */}
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] sm:w-[340px] max-w-[85vw] bg-white border-l border-[#EAE4DC] text-[#161616] shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header: Brand Logo & Close */}
              <div className="px-5 py-4 border-b border-[#EAE4DC] flex items-center justify-between bg-white shrink-0">
                <Link
                  to="/"
                  onClick={() => handleNavigate('/')}
                  className="group flex flex-col"
                >
                  <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors block">
                    KOKARÉ
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[#C8A27A] font-medium -mt-0.5">
                    The Ethnic Edit
                  </span>
                </Link>

                {/* Circular Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close Navigation Menu"
                  className="w-8.5 h-8.5 rounded-full bg-[#FAF7F2] border border-[#EAE4DC] text-[#736E66] hover:text-[#161616] hover:border-[#C8A27A] flex items-center justify-center transition-all cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links — Strictly identical to Desktop Header Navigation */}
              <motion.div
                data-lenis-prevent
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="px-4 py-4 space-y-1.5 flex-1 overflow-y-auto"
              >
                {/* 1. Home */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/"
                    onClick={() => handleNavigate('/')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <span className="font-serif text-[16px] tracking-wide">
                      Home
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* 2. Women */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/women"
                    onClick={() => handleNavigate('/women')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/women'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <span className="font-serif text-[16px] tracking-wide">
                      Women
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/women'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* 3. Men */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/men"
                    onClick={() => handleNavigate('/men')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/men'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <span className="font-serif text-[16px] tracking-wide">
                      Men
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/men'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* 4. Collections (Accordion with curated sub-collections) */}
                <motion.div variants={itemVariants}>
                  <div>
                    <div
                      className={`flex items-center justify-between px-3.5 border-l-2 transition-all duration-200 ${
                        location.pathname === '/collections' || isCollectionsOpen
                          ? 'border-[#C8A27A] bg-[#FAF7F2]'
                          : 'border-transparent hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <Link
                        to="/collections"
                        onClick={() => handleNavigate('/collections')}
                        className={`flex-1 py-2.5 font-serif text-[16px] tracking-wide transition-colors ${
                          location.pathname === '/collections'
                            ? 'text-[#C8A27A] font-medium'
                            : 'text-[#161616]/85 hover:text-[#C8A27A]'
                        }`}
                      >
                        Collections
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsCollectionsOpen((prev) => !prev);
                        }}
                        aria-label="Toggle collections menu"
                        className="p-2 text-[#736E66] hover:text-[#C8A27A] transition-colors cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-[#FAF7F2]/60 pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-[#C8A27A]/30 ml-3.5 my-0.5"
                        >
                          {COLLECTIONS_SUBITEMS.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => handleNavigate(sub.path)}
                              className="block py-1.5 px-2 text-[13.5px] text-[#736E66] hover:text-[#C8A27A] transition-colors rounded-xs hover:bg-white/80"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* 5. Festive Edit */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/festive-collection"
                    onClick={() => handleNavigate('/festive-collection')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/festive-collection'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#C8A27A] hover:text-[#721C2B] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
                      <span className="font-serif text-[16px] tracking-wide font-medium">
                        Festive Edit
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/festive-collection'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* 6. Our Story */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/about"
                    onClick={() => handleNavigate('/about')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/about'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <span className="font-serif text-[16px] tracking-wide">
                      Our Story
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/about'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>

                {/* 7. Contact */}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/contact"
                    onClick={() => handleNavigate('/contact')}
                    className={`group flex items-center justify-between py-2.5 px-3.5 transition-all duration-200 border-l-2 ${
                      location.pathname === '/contact'
                        ? 'border-[#C8A27A] text-[#C8A27A] font-medium bg-[#FAF7F2]'
                        : 'border-transparent text-[#161616]/85 hover:text-[#C8A27A] hover:bg-[#FAF7F2] hover:border-[#C8A27A]/50'
                    }`}
                  >
                    <span className="font-serif text-[16px] tracking-wide">
                      Contact
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        location.pathname === '/contact'
                          ? 'text-[#C8A27A] opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#C8A27A]'
                      }`}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
