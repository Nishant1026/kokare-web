import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ParallaxContent, ParallaxWatermark, FadeInUp } from './Parallax';

export default function FestiveCampaign() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="festive-parallax-section relative text-white py-24 sm:py-32 border-y border-[#C8A27A]/40 w-full max-w-full overflow-hidden shadow-[0_0_60px_-15px_rgba(200,162,122,0.18)]">
      {/* ============================================================ */}
      {/* 1. BALANCED LIGHTING OVER STATIONARY FIXED BACKDROP          */}
      {/* Reduced dark overlay so the royal palace architecture shines */}
      {/* through clearly with rich golden festive illumination        */}
      {/* ============================================================ */}
      {/* Ultra-light base tint (down from 35% to 15%) */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />

      {/* Soft directional gradient for text legibility without obscuring palace details */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 pointer-events-none z-0" />

      {/* Gentle vertical border vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none z-0" />

      {/* Warm Golden Festive Radiance & Lighting Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_35%,rgba(216,178,138,0.25)_0%,transparent_60%)] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_65%,rgba(200,162,122,0.2)_0%,transparent_50%)] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#C8A27A]/15 via-transparent to-transparent pointer-events-none z-0" />

      {/* Floating Gentle Festive Golden Sparkle / Ember Motifs with warm golden glow */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#E8D3BD] blur-[0.4px]"
              style={{
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                left: `${10 + i * 11}%`,
                top: `${18 + (i % 5) * 16}%`,
                boxShadow: '0 0 12px rgba(232, 211, 189, 0.95), 0 0 24px rgba(200, 162, 122, 0.6)'
              }}
              animate={{
                y: [-15, -70, -15],
                x: [-12, 12, -12],
                opacity: [0.3, 0.85, 0.3],
                scale: [0.9, 1.25, 0.9]
              }}
              transition={{
                duration: 6.5 + i * 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Background Watermark Parallax */}
      <ParallaxWatermark text="DIWALI" speed={75} className="!text-white/[0.035] z-[2]" />

      {/* ============================================================ */}
      {/* 2. FOREGROUND CONTENT THAT SCROLLS UP OVER FIXED BACKGROUND  */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Content (6 cols) with Soft Reveal & Enhanced Legibility */}
          <div className="lg:col-span-6 relative">
            {/* Subtle localized shadow aura behind text to guarantee effortless contrast over lit arches */}
            <div className="absolute -left-8 -top-10 -bottom-10 w-[115%] bg-black/30 blur-2xl -z-10 rounded-3xl pointer-events-none" />

            <ParallaxContent speed={20}>
              <FadeInUp className="space-y-6">
                {/* Festive Tag with Golden Glow */}
                <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-[#E8D3BD] bg-black/45 border border-[#C8A27A]/60 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(200,162,122,0.4)] backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8D3BD] animate-pulse drop-shadow-[0_0_8px_rgba(216,178,138,0.95)]" />
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Diwali Festive Gala 2026</span>
                </div>

                {/* Primary Headline with Rich Depth and Glowing Subtitle */}
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
                  Celebrate <br />
                  <span className="italic text-[#E8D3BD] drop-shadow-[0_0_25px_rgba(200,162,122,0.65)]">
                    In Timeless Grace
                  </span>
                </h2>

                {/* Glowing Champagne Gold Divider */}
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#E8D3BD] via-[#C8A27A] to-transparent shadow-[0_0_14px_rgba(200,162,122,0.9)]" />

                {/* High-Contrast Crisp Body Paragraphs */}
                <p className="text-[17px] text-white font-normal leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Make every celebratory gathering memorable with our thoughtfully tailored Haute Couture festive collection.
                </p>

                <p className="text-[17px] text-white/95 font-light leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  From the delicate shimmer of champagne tissue to deep jewel-toned mulberry silks and royal brocades, each garment is woven to catch the luminous warmth of festive gatherings.
                </p>

                {/* Call to Action with Festive Golden Halo */}
                <div className="pt-4">
                  <Link
                    to="/festive-collection"
                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-[#C8A27A]/80 bg-black/45 backdrop-blur-sm text-white hover:bg-[#721C2B] hover:border-[#E8D3BD] hover:text-white font-normal text-xs uppercase tracking-[0.28em] transition-all duration-300 shadow-[0_0_22px_rgba(200,162,122,0.35)] hover:shadow-[0_0_35px_rgba(200,162,122,0.7)] cursor-pointer group/btn"
                  >
                    <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Shop The Festive Edit</span>
                    <ArrowRight className="w-4 h-4 ml-2.5 text-[#E8D3BD] transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </FadeInUp>
            </ParallaxContent>
          </div>

          {/* Right Image Composition (6 cols) with Balanced Ambient Glow */}
          <div className="lg:col-span-6 relative">
            {/* Luxury festive ambient backlight to seamlessly balance red card with dark background */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#C8A27A]/30 via-[#721C2B]/35 to-[#D8B28A]/25 blur-2xl rounded-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <FadeInUp delay={0.15}>
              <div className="relative aspect-[4/5] max-h-[580px] border border-[#C8A27A]/60 ring-1 ring-black/40 bg-[#181818] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_35px_rgba(200,162,122,0.22)] group rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                  alt="Festive Campaign Indian Haute Couture"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Floating Atelier Caption Bar with Festive Golden Accents */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/85 backdrop-blur-md border border-[#C8A27A]/50 shadow-[0_0_25px_rgba(200,162,122,0.25)] pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#E8D3BD] font-medium block drop-shadow-[0_0_8px_rgba(200,162,122,0.7)]">
                    The Diwali Gala Edit
                  </span>
                  <p className="font-serif italic text-base text-white mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    Hand-spun Gold Tissue & Tussar Saree with Antique Zari Borders
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>

        </div>
      </div>
    </section>
  );
}
