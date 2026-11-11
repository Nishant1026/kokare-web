import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { FadeInUp, ParallaxWatermark, ParallaxContent } from './Parallax';

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DC] relative overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="PATRONS" speed={65} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Curated Patron Voices) */}
        <FadeInUp className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>Patron Voices</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-2">
            Words From Our Circle
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-3" />
          <p className="text-[17px] text-[#736E66] tracking-normal font-light">
            Cherished across celebratory gatherings from Ranchi to Mumbai, Bengaluru, and New Delhi.
          </p>
        </FadeInUp>

        {/* Carousel Card (Architectural Geometry) */}
        <FadeInUp delay={0.15} className="relative bg-[#FAF7F2] border border-[#EAE4DC] p-8 sm:p-14 shadow-2xs">
          <Quote className="w-12 h-12 text-[#EAE4DC] absolute top-6 left-6 -scale-x-100" />

          <div className="min-h-[200px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Rating in Champagne Rose Gold */}
                <div className="flex items-center gap-1 text-[#C8A27A]">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Title & Comment */}
                <h3 className="font-serif text-xl sm:text-3xl text-[#161616] font-normal italic">
                  "{activeReview.title}"
                </h3>

                <p className="text-[17px] text-[#736E66] leading-relaxed font-light">
                  {activeReview.comment}
                </p>

                {/* Patron Metadata */}
                <div className="pt-4 border-t border-[#EAE4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-base sm:text-lg font-normal text-[#161616]">
                        {activeReview.name}
                      </span>
                      {activeReview.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#C8A27A] font-medium tracking-wider uppercase ml-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A27A]" />
                          Verified Patron
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#736E66] block font-light mt-0.5">
                      {activeReview.location} · Purchased{' '}
                      <span className="text-[#C8A27A] italic">{activeReview.product}</span>
                    </span>
                  </div>

                  <span className="text-xs text-[#736E66] font-mono">
                    {activeReview.date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Arrows & Counter (Matches Hero Section Circular Arrows) */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#EAE4DC]">
            <span className="text-xs font-mono text-[#736E66] tracking-widest">
              0{currentIndex + 1} / 0{REVIEWS.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous Review"
                className="w-10 h-10 rounded-full border border-[#161616]/30 bg-white hover:bg-[#161616] hover:text-white text-[#161616] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                onClick={nextReview}
                aria-label="Next Review"
                className="w-10 h-10 rounded-full border border-[#161616]/30 bg-white hover:bg-[#161616] hover:text-white text-[#161616] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </FadeInUp>

      </div>
    </section>
  );
}
