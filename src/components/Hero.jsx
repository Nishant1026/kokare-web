import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import festiveHeroImg from '../assets/festive-hero.jpg';

// Amrapali Jewels & Zoya Couture Full-Bleed Masterpiece Hero Slider
// Matches reference screenshot 3 exactly:
// 1. Full-bleed cinematic background image slider
// 2. Left-aligned display serif: "Masterpieces"
// 3. Rectangular thin white outline button: "EXPLORE NOW"
// 4. Circular outline side arrows (← / →) on left and right edges
// 5. Horizontal pagination dots (○ ● ○ ○) at the bottom center

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Masterpieces',
    subtitle: 'DIWALI FESTIVE COLLECTION · 2026',
    tagline: 'A celebration of Indian elegance and wearable art.',
    ctaText: 'EXPLORE NOW',
    ctaLink: '/festive-collection',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 2,
    title: 'Royal Brocades',
    subtitle: 'THE JHARKHAND EDIT · HANDLOOM WEAVES',
    tagline: 'Hand-woven mulberry silks and antique gold zari.',
    ctaText: 'EXPLORE WOMEN',
    ctaLink: '/women',
    image: festiveHeroImg,
  },
  {
    id: 3,
    title: 'Ceremonial Silks',
    subtitle: "MEN'S FESTIVE ATELIER · 2026",
    tagline: 'Midnight obsidian bandhgalas and structured raw silk.',
    ctaText: 'EXPLORE MEN',
    ctaLink: '/men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 4,
    title: 'Heirloom Stories',
    subtitle: 'BRIDAL & CELEBRATION COUTURE',
    tagline: 'Intricate zardozi and antique rose-gold resham craftsmanship.',
    ctaText: 'VIEW HEIRLOOMS',
    ctaLink: '/shop?collection=wedding-stories',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2400&q=85',
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const active = HERO_SLIDES[currentSlide];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  }, []);

  const handleDotClick = (idx) => {
    setCurrentSlide(idx);
  };

  // Auto-slide every 6.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, handleNext]);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      className="relative w-full max-w-full h-[80vh] sm:h-screen sm:min-h-[640px] max-h-[1080px] overflow-hidden bg-[#161616] text-white select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="KOKARÉ Masterpieces Festive Slider"
    >
      {/* ============================================================ */}
      {/* 1. FULL-BLEED CINEMATIC SLIDE BACKGROUND                      */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Overlays for Crystal-Clear Text & Royal Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />

      {/* ============================================================ */}
      {/* 2. LEFT-ALIGNED HERO CONTENT (Aligned to Header Logo Margin)  */}
      {/* ============================================================ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start pt-16 sm:pt-32 lg:pt-36 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl text-left pointer-events-auto"
          >
            {/* Minimal Festive Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#C8A27A] font-medium mb-2.5 sm:mb-3 max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
              <span className="break-words">{active.subtitle}</span>
            </div>

            {/* Main Grand Serif Display Heading (Exact "Masterpieces" Style) */}
            <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-normal tracking-tight leading-[1.08] mb-2.5 sm:mb-5 drop-shadow-lg break-words max-w-full">
              {active.title}
            </h1>

            {/* Poetic Tagline */}
            <p className="font-serif italic text-xs sm:text-xl lg:text-2xl text-white/90 font-light mb-5 sm:mb-8 max-w-xl break-words line-clamp-2 sm:line-clamp-none">
              "{active.tagline}"
            </p>

            {/* Clean Rectangular Outline Button (Exact to Reference) */}
            <div>
              <Link
                to={active.ctaLink}
                className="inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 border border-white text-white font-normal text-xs uppercase tracking-[0.22em] sm:tracking-[0.28em] hover:bg-white hover:text-[#161616] transition-all duration-300 shadow-md backdrop-blur-xs cursor-pointer"
              >
                <span>{active.ctaText}</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* 3. CIRCULAR OUTLINE SIDE ARROWS (Exact to Reference)          */}
      {/* ============================================================ */}
      {/* Left Circular Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/60 bg-black/30 hover:bg-white/20 hover:border-white text-white items-center justify-center transition-all backdrop-blur-xs cursor-pointer shadow-md"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      {/* Right Circular Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/60 bg-black/30 hover:bg-white/20 hover:border-white text-white items-center justify-center transition-all backdrop-blur-xs cursor-pointer shadow-md"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
      </button>

      {/* ============================================================ */}
      {/* 4. BOTTOM CENTER PAGINATION DOTS (Exact to Reference)         */}
      {/* ============================================================ */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 sm:gap-3.5">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="sm:hidden p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>

        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = currentSlide === idx;
          return (
            <button
              key={slide.id}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className={`transition-all duration-300 cursor-pointer ${
                isCurrent
                  ? 'w-3 h-3 rounded-full bg-white ring-2 ring-white/50 scale-110 shadow-sm'
                  : 'w-2.5 h-2.5 rounded-full border border-white/80 bg-transparent hover:bg-white/40'
              }`}
            />
          );
        })}

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="sm:hidden p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}
