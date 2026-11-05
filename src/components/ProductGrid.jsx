import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

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
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Amrapali & Zoya Haute Joaillerie Presentation) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>{subtitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-3">
            {title}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[17px] text-[#736E66] tracking-normal font-light">
            Heirloom textiles sculpted with master precision. Each piece a timeless celebratory statement.
          </p>
        </div>

        {/* Filter Tabs (Minimalist Hairline Tabs) */}
        {showTabs && (
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-12 border-b border-[#EAE4DC] pb-4">
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
                  className={`px-5 py-2.5 text-xs font-normal tracking-[0.22em] uppercase transition-all duration-300 relative cursor-pointer ${
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
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Complete Collection CTA Button (Clean Rectangular Outline Button) */}
        {limit && (
          <div className="mt-14 sm:mt-16 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white text-xs font-normal uppercase tracking-[0.28em] transition-all duration-300 shadow-xs cursor-pointer"
            >
              <span>Explore All Silhouettes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
