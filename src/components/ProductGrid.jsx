import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import { FadeInUp, ParallaxReveal, ParallaxWatermark } from './Parallax';

export default function ProductGrid({
  title = 'The Pieces Everyone Loves',
  subtitle = 'All Festival & Wedding Collection 2026',
  limit,
  showTabs = true,
  filterGender,
  filterCategory
}) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (filterGender) {
      list = list.filter((p) => p.gender === filterGender);
    }

    if (filterCategory) {
      list = list.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase());
    }

    if (showTabs && activeTab !== 'all') {
      if (activeTab === 'women') {
        list = list.filter((p) => p.gender === 'women');
      } else if (activeTab === 'men') {
        list = list.filter((p) => p.gender === 'men');
      } else if (activeTab === 'bestseller') {
        list = list.filter((p) => p.isBestseller);
      } else if (activeTab === 'festive') {
        list = list.filter((p) => p.collection === 'festive-edit');
      }
    }

    if (limit) {
      return list.slice(0, limit);
    }

    return list;
  }, [activeTab, filterGender, filterCategory, limit, showTabs]);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 pb-28 sm:pb-36 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Runway Watermark Parallax */}
      <ParallaxWatermark text="COUTURE" speed={80} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        
        {/* Section Header (Amrapali & Zoya Haute Joaillerie Presentation) */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[12px] sm:text-[14px] font-medium uppercase tracking-[0.26em] text-[#C8A27A] mb-2 sm:mb-2.5">
            <Sparkles className="w-4 h-4 text-[#C8A27A]" />
            <span>{subtitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-3">
            {title}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[15px] sm:text-[17px] text-[#736E66] tracking-normal font-light">
            Heirloom textiles sculpted with master precision. Each piece a timeless celebratory statement.
          </p>
        </FadeInUp>

        {/* Filter Tabs (Responsive Smooth Touch Strip for All Mobile & Tablet Devices) */}
        {showTabs && (
          <FadeInUp delay={0.1} className="w-full mb-10 sm:mb-12 border-b border-[#EAE4DC] pb-2">
            <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
              {[
                { id: 'all', label: 'All Curations' },
                { id: 'women', label: 'Women’s Edit' },
                { id: 'men', label: 'Men’s Atelier' },
                { id: 'festive', label: 'All Festival Edit' },
                { id: 'bestseller', label: 'Patron Favorites' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 text-[14px] sm:text-[15px] md:text-[16px] font-normal tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 relative cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#161616] font-medium'
                        : 'text-[#736E66] hover:text-[#161616]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="tabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#161616]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FadeInUp>
        )}

        {/* Product Cards Grid with Parallel Parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 xl:gap-8">
          {filteredProducts.map((product, idx) => (
            <ParallaxReveal
              key={product.id}
              delay={(idx % 4) * 0.05}
              speed={idx % 2 === 0 ? 16 : -16}
            >
              <ProductCard product={product} />
            </ParallaxReveal>
          ))}
        </div>

        {/* View Complete Collection CTA Button — Luxury High-Contrast Button */}
        {limit && (
          <FadeInUp delay={0.2} className="mt-12 sm:mt-16 text-center px-4 sm:px-0">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 bg-[#161616] text-[#FAF7F2] hover:bg-[#721C2B] hover:text-white border border-[#C8A27A]/50 text-xs sm:text-sm font-medium uppercase tracking-[0.24em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] group cursor-pointer"
            >
              <span>Explore All Silhouettes</span>
              <ArrowRight className="w-4 h-4 ml-2.5 text-[#C8A27A] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeInUp>
        )}

      </div>
    </section>
  );
}
