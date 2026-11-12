import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ParallaxImage, ParallaxWatermark, ParallaxColumn, FadeInUp } from './Parallax';

export default function CategoryGrid() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="SILHOUETTES" speed={75} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInUp className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-3">
            Shop By Category
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[16px] sm:text-[18px] text-[#2C2723] tracking-normal font-normal">
            Conceived for milestone celebrations. From handloom tussar sarees to architectural bandhgalas.
          </p>
        </FadeInUp>

        {/* Responsive Grid with Alternating Parallax Speeds */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat, idx) => {
            const linkTarget = `/shop?category=${encodeURIComponent(cat.category)}`;
            const exactCount = PRODUCTS.filter((p) => p.category.toLowerCase() === cat.category.toLowerCase()).length;
            const isEven = idx % 2 === 0;

            return (
              <ParallaxColumn key={cat.id} offset={24} isEven={isEven}>
                <FadeInUp
                  delay={idx * 0.06}
                  yOffset={20}
                >
                  <Link
                    to={linkTarget}
                    className="group relative block aspect-[3/4] sm:aspect-[4/5] overflow-hidden border border-[#EAE4DC] hover:border-[#C8A27A] bg-white transition-all duration-300 shadow-2xs"
                  >
                    {/* Category Image with Silky Parallax Window */}
                    <ParallaxImage
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full"
                      imgClassName="object-top object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      offset={30}
                      scale={1.1}
                    />

                    {/* Gradient Overlay strictly at bottom for readable text while keeping images bright */}
                    <div className="absolute bottom-0 inset-x-0 h-[62%] sm:h-[54%] bg-gradient-to-t from-black/95 via-black/80 via-40% to-transparent pointer-events-none" />

                    {/* Top-Right Circular Refined Arrow */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#161616] flex items-center justify-center group-hover:bg-[#161616] group-hover:text-white transition-all border border-[#EAE4DC] shadow-sm">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    {/* Bottom Text Content */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white z-10">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#F3E5D4] font-medium block mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {exactCount} Silhouettes
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-normal group-hover:text-[#C8A27A] transition-colors leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {cat.name}
                      </h3>
                      <p className="text-[13px] sm:text-[15px] lg:text-[16px] text-white font-normal mt-1 leading-snug line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                </FadeInUp>
              </ParallaxColumn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
