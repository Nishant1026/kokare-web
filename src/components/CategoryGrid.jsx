import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Amrapali & Zoya Haute Joaillerie Styling) */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-3">
            Shop By Category
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[17px] text-[#736E66] tracking-normal font-light">
            Conceived for milestone celebrations. From handloom tussar sarees to architectural bandhgalas.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat, idx) => {
            const linkTarget = `/shop?category=${encodeURIComponent(cat.category)}`;
            const exactCount = PRODUCTS.filter((p) => p.category.toLowerCase() === cat.category.toLowerCase()).length;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Link
                  to={linkTarget}
                  className="group relative block aspect-[3/4] sm:aspect-[4/5] overflow-hidden border border-[#EAE4DC] hover:border-[#C8A27A] bg-white transition-all duration-300 shadow-2xs"
                >
                  {/* Category Image with Subtle Hover Zoom */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Readable Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top-Right Circular Refined Arrow (Matches Hero Side Arrows) */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#161616] flex items-center justify-center group-hover:bg-[#161616] group-hover:text-white transition-all border border-[#EAE4DC] shadow-sm">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7 text-white">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium block mb-1">
                      {exactCount} Silhouettes
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal group-hover:text-[#C8A27A] transition-colors leading-tight text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-[15px] text-white/75 font-light mt-1 hidden sm:block line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
