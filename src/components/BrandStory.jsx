import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrandStory() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Craftsmanship Photograph (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] border border-[#EAE4DC] bg-white overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                alt="Jharkhand handloom textile craftsmanship"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium block mb-1">
                  Maison Philosophy
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-white font-light">
                  "Where ancestral texture meets the pinnacle of Indian fine tailoring."
                </p>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -top-3 -right-3 p-4 bg-white border border-[#EAE4DC] shadow-xs flex-col items-center justify-center text-center">
              <Sparkles className="w-4 h-4 text-[#C8A27A] mb-1" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#161616] font-medium">
                Est. 2026
              </span>
              <span className="text-xs text-[#736E66] font-light">The Jharkhand Edit</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A]">
              <Feather className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>Cultural Heritage & Atelier Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight leading-[1.12]">
              Rooted In Jharkhand. <br />
              <span className="italic text-[#C8A27A]">Made For The World.</span>
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C8A27A]" />

            <p className="text-[17px] text-[#736E66] leading-relaxed font-light">
              KOKARÉ is born from the forested valleys and indigenous handloom communities of Jharkhand. We bring together wild tussar cocoons, organic vegetable dyes, and royal embroidery traditions into contemporary haute couture.
            </p>

            <p className="text-[17px] text-[#736E66] leading-relaxed font-light">
              Each garment honours centuries-old generational weaving guilds. We partner directly with master weavers, providing fair trade dignity while translating ancient techniques into wearable poetry for modern Indian connoisseurs.
            </p>

            {/* Dual Pillar Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 bg-white border border-[#EAE4DC] shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#161616] block mb-1">
                  100%
                </span>
                <span className="text-xs uppercase tracking-wider text-[#C8A27A] font-medium block">
                  Wild Indigenous Tussar
                </span>
                <span className="text-xs text-[#736E66] font-light mt-1 block">
                  Sourced ethically from non-mulberry natural cocoons.
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#EAE4DC] shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-normal text-[#161616] block mb-1">
                  450+
                </span>
                <span className="text-xs uppercase tracking-wider text-[#C8A27A] font-medium block">
                  Artisans Empowered
                </span>
                <span className="text-xs text-[#736E66] font-light mt-1 block">
                  Reviving ancestral pit looms across Jharkhand.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white font-normal text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xs cursor-pointer"
              >
                <span>Read The Complete Memoir</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2.5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
