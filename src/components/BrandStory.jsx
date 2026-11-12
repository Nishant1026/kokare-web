import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParallaxImage, ParallaxContent, ParallaxWatermark, FadeInUp } from './Parallax';

export default function BrandStory() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="HERITAGE" speed={75} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Craftsmanship Photograph with Deep Parallax Window (6 cols) */}
          <div className="lg:col-span-6 relative">
            <FadeInUp>
              <div className="relative aspect-[4/5] border border-[#EAE4DC] bg-white overflow-hidden shadow-sm">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                  alt="Jharkhand handloom textile craftsmanship"
                  className="w-full h-full"
                  imgClassName="object-cover object-top"
                  offset={35}
                  scale={1.1}
                />
                <div className="absolute bottom-0 inset-x-0 h-[38%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="text-[15px] uppercase tracking-[0.2em] text-[#C8A27A] font-medium block mb-1">
                    Boutique Philosophy
                  </span>
                  <p className="font-serif italic text-lg sm:text-xl text-white font-light">
                    "Where ancestral texture meets the pinnacle of Indian fine tailoring."
                  </p>
                </div>
              </div>

              {/* Floating badge with Parallax Float across all screens */}
              <div className="flex absolute -top-2 -right-2 sm:-top-3 sm:-right-3 p-3 sm:p-4 bg-white border border-[#EAE4DC] shadow-xs flex-col items-center justify-center text-center z-10">
                <Sparkles className="w-4 h-4 text-[#C8A27A] mb-1" />
                <span className="text-[15px] uppercase tracking-[0.2em] text-[#161616] font-medium">
                  Est. 2026
                </span>
                <span className="text-xs text-[#736E66] font-light">The Jharkhand Edit</span>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column: Narrative (6 cols) with Parallax Content Float */}
          <div className="lg:col-span-6">
            <ParallaxContent speed={26}>
              <FadeInUp delay={0.15} className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.2em] text-[#C8A27A]">
                  <Feather className="w-3.5 h-3.5 text-[#C8A27A]" />
                  <span>Our Heritage & Local Fashion Story</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight leading-[1.15]">
                  Rooted In Jharkhand. <br />
                  <span className="block font-serif italic text-[#C8A27A] text-2xl sm:text-4xl lg:text-5xl tracking-normal mt-1.5 sm:mt-2">
                    Made For The World.
                  </span>
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
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white text-xs font-normal uppercase tracking-[0.18em] sm:tracking-[0.25em] transition-all duration-300 cursor-pointer text-center"
                  >
                    <span>Read Atelier Chronicle</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2.5" />
                  </Link>
                </div>
              </FadeInUp>
            </ParallaxContent>
          </div>

        </div>
      </div>
    </section>
  );
}
