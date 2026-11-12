import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  // On Home page, the top micro-bar inside Header handles the announcement
  if (!isVisible || location.pathname === '/') return null;

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('FESTIVE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <aside
      aria-label="Festive Announcement"
      className="relative bg-gradient-to-r from-[#161616] via-[#3B1119] to-[#161616] text-white border-b border-[#C8A27A]/35 z-40 transition-colors w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Left Maison Identifier */}
        <div className="hidden lg:flex items-center gap-2 text-[#C8A27A] text-[15px] uppercase tracking-[0.2em] font-light">
          <span>The House of KOKARÉ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A27A]" />
          <span>Local Fashion Studio</span>
        </div>

        {/* Center Festive Invitation */}
        <div className="flex-1 flex justify-center items-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
          <span className="text-[#FAF7F2] text-[15px] font-normal tracking-[0.16em] uppercase">
            ALL FESTIVAL OFFERS — EXTRA 20% OFF ON ORDERS OVER ₹5,000 WITH CODE
            <button
              onClick={handleCopy}
              className="text-[#C8A27A] font-mono tracking-widest font-semibold ml-1.5 underline underline-offset-2 hover:text-[#E8D3BD] cursor-pointer inline-flex items-center gap-1"
              title="Click to copy coupon code"
            >
              <span>FESTIVE20</span>
              {copied && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </span>
          <Link
            to="/festive-collection"
            className="hidden md:inline-flex items-center gap-1 text-[#C8A27A] hover:text-[#E8D3BD] font-medium text-[15px] uppercase tracking-[0.16em] underline underline-offset-4 ml-2 transition-colors"
          >
            <span>Shop Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="p-1 text-[#C8A27A]/75 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
