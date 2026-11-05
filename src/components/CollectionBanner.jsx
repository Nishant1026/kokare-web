import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/products';

export default function CollectionBanner() {
  const [heroCol, col2, col3, col4] = COLLECTIONS;

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>Curated Editions · The Jharkhand Edit</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight">
              Explore The Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-normal text-[#161616] hover:text-[#C8A27A] border-b border-[#161616] pb-1 hover:border-[#C8A27A] transition-colors"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Amrapali & Zoya Asymmetric Lookbook Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Large Featured Hero Card (Left 7 Cols, Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] min-h-[480px] overflow-hidden shadow-xs transition-colors"
          >
            <img
              src={heroCol.image}
              alt={heroCol.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Atmospheric gradient matching hero */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="relative p-6 sm:p-10 text-white z-10">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium block mb-2">
                {heroCol.subtitle} · {heroCol.accent}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-3 leading-tight text-white">
                {heroCol.title}
              </h3>
              <p className="text-[17px] text-white/85 font-light max-w-xl mb-6 hidden sm:block">
                {heroCol.description}
              </p>
              <div>
                <Link
                  to={`/shop?collection=${heroCol.id}`}
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-[#161616] text-xs font-normal uppercase tracking-[0.25em] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Explore Curation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Stacked Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Card 2: Wild Tussar Silks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[16/9] lg:aspect-[16/10] overflow-hidden shadow-xs transition-colors flex-1"
            >
              <img
                src={col2.image}
                alt={col2.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="relative p-5 sm:p-6 text-white z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium block mb-1">
                  {col2.subtitle}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-normal mb-1 text-white">
                  {col2.title}
                </h4>
                <p className="text-xs text-white/75 font-light mb-3 line-clamp-1">
                  {col2.description}
                </p>
                <Link
                  to={`/shop?collection=${col2.id}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-normal text-white hover:text-[#C8A27A] transition-colors"
                >
                  <span>Discover Silks</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Ceremonial Menswear & Wedding Stories in 2-Col Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] overflow-hidden shadow-xs transition-colors"
              >
                <img
                  src={col3.image}
                  alt={col3.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative p-4 sm:p-5 text-white z-10">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8A27A] font-medium block mb-1">
                    {col3.subtitle}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal mb-2 text-white">
                    {col3.title}
                  </h4>
                  <Link
                    to={`/shop?gender=men`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-normal text-white hover:text-[#C8A27A] transition-colors"
                  >
                    <span>View Men</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] overflow-hidden shadow-xs transition-colors"
              >
                <img
                  src={col4.image}
                  alt={col4.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative p-4 sm:p-5 text-white z-10">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8A27A] font-medium block mb-1">
                    {col4.subtitle}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal mb-2 text-white">
                    {col4.title}
                  </h4>
                  <Link
                    to={`/shop?collection=${col4.id}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-normal text-white hover:text-[#C8A27A] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
