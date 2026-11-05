import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // On Home page, the Amrapali & Zoya top micro-bar inside Header handles the announcement
  // transparently directly over the hero slider (as shown in reference screenshot 3).
  // On all other catalog pages, this slim festive banner appears at the top.
  if (!isVisible || location.pathname === '/') return null;

  return (
    <div className="relative bg-[#161616] text-white border-b border-[#C8A27A]/30 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Left minimal label */}
        <div className="hidden lg:flex items-center gap-2 text-[#C8A27A] text-[11px] uppercase tracking-[0.28em] font-light">
          <span>The House of KOKARÉ</span>
          <span className="w-1 h-1 rounded-full bg-[#C8A27A]" />
          <span>The Jharkhand Edit</span>
        </div>

        {/* Center message */}
        <div className="flex-1 flex justify-center items-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
          <span className="text-[#FAF7F2] text-[11px] sm:text-xs font-normal tracking-[0.22em] uppercase">
            DIWALI FESTIVE SPECIAL — EXTRA 20% OFF ON ORDERS OVER ₹5,000 WITH CODE <strong className="text-[#C8A27A] font-mono tracking-widest font-semibold ml-1">DIWALI20</strong>
          </span>
          <Link
            to="/festive-collection"
            className="hidden sm:inline-flex items-center gap-1 text-[#C8A27A] hover:text-[#E8D3BD] font-medium text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 ml-1.5 transition-colors"
          >
            <span>Explore Edit</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close Announcement Bar"
          className="p-1 text-[#C8A27A]/75 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
