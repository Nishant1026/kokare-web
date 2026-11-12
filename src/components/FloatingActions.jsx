import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle, X, Sparkles, Phone, Compass, Package, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppRedirect = (customText) => {
    const text = customText || conciergeMsg || 'Hello Kokaré Atelier, I would like personal styling assistance with the Diwali 2026 Collection.';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    setIsConciergeOpen(false);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('DIWALI20');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2200);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* FLOATING ACTION BUTTONS (Exact to Reference Screenshot 3)     */}
      {/* Bottom Right: Circular Scroll-to-Top (Black) & Chat (Red)    */}
      {/* ============================================================ */}
      <div className="fixed bottom-3 sm:bottom-5 lg:bottom-6 right-2.5 sm:right-4 lg:right-6 z-40 flex flex-col items-center gap-2 sm:gap-3">
        {/* 1. Circular Scroll-to-Top Button (Amrapali black circle with white up arrow) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-[#161616]/95 hover:bg-[#C8A27A] text-white shadow-xl flex items-center justify-center transition-all duration-300 border border-white/20 cursor-pointer group"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-[2] group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 2. Circular Concierge / Chat Button (Haute Couture Burgundy circle with white chat icon) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsConciergeOpen(!isConciergeOpen)}
          aria-label="Atelier Concierge & Stylist Assistance"
          className="w-10 h-10 sm:w-11 sm:h-11 lg:w-13 lg:h-13 rounded-full bg-[#721C2B] hover:bg-[#581422] text-white shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer relative group border-2 border-[#C8A27A]/40"
          title="Atelier Concierge"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#721C2B]/30 animate-ping pointer-events-none" />
          {isConciergeOpen ? (
            <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 stroke-[2]" />
          ) : (
            <MessageCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-white stroke-[1.5]" />
          )}
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* ATELIER CONCIERGE DRAWER / MODAL                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isConciergeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[92vw] max-w-sm bg-white border border-[#EAE4DC] shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#161616] text-white p-5 border-b border-[#C8A27A]/30 relative">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A27A] font-medium block">
                    Bespoke Service
                  </span>
                  <h3 className="font-serif text-xl text-white font-normal tracking-wide mt-0.5">
                    KOKARÉ Atelier Concierge
                  </h3>
                </div>
                <button
                  onClick={() => setIsConciergeOpen(false)}
                  className="text-white/70 hover:text-white p-1"
                  aria-label="Close Concierge"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-2 font-light">
                Our master stylists are available for Diwali sizing, bespoke silhouettes, and express atelier shipping.
              </p>
            </div>

            {/* Festive Coupon Quick Copy */}
            <div className="p-3.5 bg-[#FAF7F2] border-b border-[#EAE4DC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
                <span className="text-xs uppercase tracking-wider text-[#161616]">
                  Code: <strong className="font-mono text-[#C8A27A] ml-1">DIWALI20</strong>
                </span>
              </div>
              <button
                onClick={handleCopyCoupon}
                className="text-[11px] uppercase tracking-widest px-2.5 py-1 border border-[#C8A27A] text-[#161616] hover:bg-[#C8A27A] hover:text-white transition-all cursor-pointer font-medium"
              >
                {copiedCoupon ? 'Copied!' : 'Copy 20%'}
              </button>
            </div>

            {/* Quick Consultation Actions */}
            <div className="p-4 space-y-2.5">
              <button
                onClick={() => handleWhatsAppRedirect('Hello Kokaré Atelier, I need help selecting the right size and silhouette for Diwali 2026.')}
                className="w-full flex items-center justify-between p-3 border border-[#EAE4DC] hover:border-[#161616] hover:bg-[#FAF7F2] transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#161616] uppercase tracking-wider">
                      WhatsApp Live Stylist
                    </p>
                    <p className="text-[11px] text-[#736E66]">Instant response in ~5 mins</p>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 text-[#C8A27A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <Link
                to="/contact"
                onClick={() => setIsConciergeOpen(false)}
                className="w-full flex items-center justify-between p-3 border border-[#EAE4DC] hover:border-[#161616] hover:bg-[#FAF7F2] transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C8A27A]/15 text-[#C8A27A] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#161616] uppercase tracking-wider">
                      Book Atelier Appointment
                    </p>
                    <p className="text-[11px] text-[#736E66]">Ranchi · New Delhi · Mumbai</p>
                  </div>
                </div>
                <Compass className="w-3.5 h-3.5 text-[#C8A27A] group-hover:rotate-45 transition-transform" />
              </Link>

              <Link
                to="/track-order"
                onClick={() => setIsConciergeOpen(false)}
                className="w-full flex items-center justify-between p-3 border border-[#EAE4DC] hover:border-[#161616] hover:bg-[#FAF7F2] transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#161616]/10 text-[#161616] flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#161616] uppercase tracking-wider">
                      Track Festive Order
                    </p>
                    <p className="text-[11px] text-[#736E66]">Live dispatch status & PIN check</p>
                  </div>
                </div>
                <Package className="w-3.5 h-3.5 text-[#C8A27A]" />
              </Link>
            </div>

            {/* Quick Text Input */}
            <div className="p-4 pt-1 border-t border-[#EAE4DC] bg-[#FAF7F2]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (conciergeMsg.trim()) handleWhatsAppRedirect(conciergeMsg);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={conciergeMsg}
                  onChange={(e) => setConciergeMsg(e.target.value)}
                  className="flex-1 bg-white border border-[#EAE4DC] px-3 py-2 text-xs text-[#161616] placeholder:text-[#9B958B] focus:outline-none focus:border-[#C8A27A]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#161616] hover:bg-[#C8A27A] text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send
                </button>
              </form>
              <div className="flex items-center justify-between mt-2.5 text-[10px] text-[#9B958B]">
                <span className="flex items-center gap-1">
                  <Phone className="w-2.5 h-2.5" /> +91 651 291 2026
                </span>
                <span>Mon-Sat 10:00 - 20:00 IST</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

