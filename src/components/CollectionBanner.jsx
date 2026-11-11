import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { ParallaxImage, ParallaxWatermark, FadeInUp } from './Parallax';

export default function CollectionBanner() {
  const [heroCol, col2, col3, col4] = COLLECTIONS;

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="COLLECTIONS" speed={60} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
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
        </FadeInUp>

        {/* Amrapali & Zoya Asymmetric Lookbook Grid Layout — 100% Clear Images, Zero Dark Overlays */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Large Featured Hero Card (Left 7 Cols, Tall) */}
          <FadeInUp className="lg:col-span-7 group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] min-h-[480px] lg:min-h-[560px] overflow-hidden shadow-xs transition-colors">
            {/* 100% Uncovered & Crystal Clear Image */}
            <ParallaxImage
              src={heroCol.image}
              alt={heroCol.title}
              className="absolute inset-0 w-full h-full"
              imgClassName="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              offset={15}
              mobileOffset={8}
              scale={1.03}
            />

            {/* Crisp Floating Atelier Caption Panel — No Dark Gradient */}
            <div className="relative z-10 m-4 sm:m-6 lg:m-8 p-5 sm:p-7 bg-white/95 backdrop-blur-md border border-[#EAE4DC] group-hover:border-[#C8A27A] shadow-md transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium">
                  {heroCol.subtitle} · {heroCol.accent}
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#736E66]">
                  Limited Edition
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#161616] mb-2 leading-tight">
                {heroCol.title}
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#736E66] font-light mb-4 hidden sm:block line-clamp-2">
                {heroCol.description}
              </p>
              <div>
                <Link
                  to={`/shop?collection=${heroCol.id}`}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#161616] hover:bg-[#721C2B] text-white text-xs font-normal uppercase tracking-[0.22em] transition-all duration-300 shadow-xs cursor-pointer"
                >
                  <span>Explore Curation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </div>
            </div>
          </FadeInUp>

          {/* Right Column: 3 Stacked Cards (5 Cols) — 100% Clear Images */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Card 2: Wild Tussar Silks */}
            <FadeInUp delay={0.1} className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[16/9] lg:aspect-[16/10] overflow-hidden shadow-xs transition-colors flex-1 min-h-[220px]">
              <ParallaxImage
                src={col2.image}
                alt={col2.title}
                className="absolute inset-0 w-full h-full"
                imgClassName="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                offset={15}
                mobileOffset={8}
                scale={1.03}
              />

              {/* Floating Atelier Caption — Clear and readable without darkening photo */}
              <div className="relative z-10 m-3 sm:m-4 p-3.5 sm:p-4 bg-white/95 backdrop-blur-md border border-[#EAE4DC] group-hover:border-[#C8A27A] shadow-sm transition-all duration-300 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium block">
                    {col2.subtitle}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-[#161616] leading-tight">
                    {col2.title}
                  </h4>
                </div>
                <Link
                  to={`/shop?collection=${col2.id}`}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161616] hover:bg-[#721C2B] text-white text-[10px] uppercase tracking-[0.2em] font-normal transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </FadeInUp>

            {/* Card 3 & 4: Contemporary Ethnic & Wedding Stories in 2-Col Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* Card 3: Contemporary Ethnic */}
              <FadeInUp delay={0.15} className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] overflow-hidden shadow-xs transition-colors min-h-[250px]">
                <ParallaxImage
                  src={col3.image}
                  alt={col3.title}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  offset={15}
                  mobileOffset={8}
                  scale={1.03}
                />

                <div className="relative z-10 m-3 p-3 bg-white/95 backdrop-blur-md border border-[#EAE4DC] group-hover:border-[#C8A27A] shadow-xs transition-all duration-300">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C8A27A] font-medium block">
                    {col3.subtitle}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-normal text-[#161616] mb-1 leading-tight">
                    {col3.title}
                  </h4>
                  <Link
                    to={`/shop?collection=${col3.id}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors"
                  >
                    <span>View Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeInUp>

              {/* Card 4: Wedding Stories */}
              <FadeInUp delay={0.2} className="group relative border border-[#EAE4DC] hover:border-[#C8A27A] bg-white flex flex-col justify-end aspect-[4/5] overflow-hidden shadow-xs transition-colors min-h-[250px]">
                <ParallaxImage
                  src={col4.image}
                  alt={col4.title}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  offset={15}
                  mobileOffset={8}
                  scale={1.03}
                />

                <div className="relative z-10 m-3 p-3 bg-white/95 backdrop-blur-md border border-[#EAE4DC] group-hover:border-[#C8A27A] shadow-xs transition-all duration-300">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C8A27A] font-medium block">
                    {col4.subtitle}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-normal text-[#161616] mb-1 leading-tight">
                    {col4.title}
                  </h4>
                  <Link
                    to={`/shop?collection=${col4.id}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors"
                  >
                    <span>View Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeInUp>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
