import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import { FadeInUp, ParallaxReveal, ParallaxWatermark } from './Parallax';

export default function ProductGrid({
  title = 'The Pieces Everyone Loves',
  subtitle = 'Diwali Festive Collection 2026',
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
    <section className="relative py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Runway Watermark Parallax */}
      <ParallaxWatermark text="COUTURE" speed={80} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Amrapali & Zoya Haute Joaillerie Presentation) */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.26em] text-[#C8A27A] mb-2.5">
            <Sparkles className="w-4 h-4 text-[#C8A27A]" />
            <span>{subtitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-3">
            {title}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[16px] sm:text-[17px] text-[#736E66] tracking-normal font-light">
            Heirloom textiles sculpted with master precision. Each piece a timeless celebratory statement.
          </p>
        </FadeInUp>

        {/* Filter Tabs (Strict 16px Luxury Editorial Typography) */}
        {showTabs && (
          <FadeInUp delay={0.1} className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-12 border-b border-[#EAE4DC] pb-4">
            {[
              { id: 'all', label: 'All Curations' },
              { id: 'women', label: 'Women’s Edit' },
              { id: 'men', label: 'Men’s Atelier' },
              { id: 'festive', label: 'Diwali Festive' },
              { id: 'bestseller', label: 'Patron Favorites' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 text-[16px] font-normal tracking-[0.16em] uppercase transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'text-[#161616] font-medium'
                      : 'text-[#736E66] hover:text-[#161616]'
                  }`}
                >
                  <span className="text-[16px] leading-snug tracking-[0.16em] uppercase">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#161616]"
                    />
                  )}
                </button>
              );
            })}
          </FadeInUp>
        )}

        {/* Product Cards Grid with Parallel Parallax */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

        {/* View Complete Collection CTA Button (Clean Rectangular Outline Button) */}
        {limit && (
          <FadeInUp delay={0.2} className="mt-14 sm:mt-16 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white text-[15px] sm:text-[16px] font-normal uppercase tracking-[0.22em] transition-all duration-300 shadow-xs cursor-pointer"
            >
              <span className="text-[15px] sm:text-[16px]">Explore All Silhouettes</span>
              <ArrowRight className="w-4 h-4 ml-2.5" />
            </Link>
          </FadeInUp>
        )}

      </div>
    </section>
  );
}
