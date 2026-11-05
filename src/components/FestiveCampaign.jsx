import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FestiveCampaign() {
  return (
    <section className="relative bg-gradient-to-r from-[#161616] via-[#2A0E15] to-[#161616] text-white overflow-hidden py-24 sm:py-32 border-y border-[#C8A27A]/35 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Content (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>Diwali Festive Gala 2026</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08] text-white">
              Celebrate <br />
              <span className="italic text-[#C8A27A]">In Timeless Grace</span>
            </h2>

            {/* Subtle champagne divider */}
            <div className="w-16 h-[1.5px] bg-[#C8A27A]" />

            <p className="text-[17px] text-white/90 font-light leading-relaxed max-w-lg">
              Make every celebratory gathering memorable with our thoughtfully tailored Haute Couture festive collection.
            </p>

            <p className="text-[17px] text-white/70 font-light leading-relaxed max-w-md">
              From the delicate shimmer of champagne tissue to deep jewel-toned mulberry silks and royal brocades, each garment is woven to catch the luminous warmth of festive gatherings.
            </p>

            <div className="pt-4">
              <Link
                to="/festive-collection"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-[#721C2B] hover:border-[#721C2B] hover:text-white font-normal text-xs uppercase tracking-[0.28em] transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Shop The Festive Edit</span>
                <ArrowRight className="w-4 h-4 ml-2.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image Composition (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/5] max-h-[580px] border border-[#C8A27A]/35 bg-[#181818] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Festive Campaign Indian Haute Couture"
                className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/75 backdrop-blur-md border border-[#C8A27A]/30">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium block">
                  The Diwali Gala Edit
                </span>
                <p className="font-serif italic text-base text-white mt-0.5">
                  Hand-spun Gold Tissue & Tussar Saree with Antique Zari Borders
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
