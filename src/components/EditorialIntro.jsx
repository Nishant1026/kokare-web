import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ParallaxImage, ParallaxContent, ParallaxWatermark, FadeInUp } from './Parallax';

export default function EditorialIntro() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Luxury Background Watermark drifting with Parallax */}
      <ParallaxWatermark text="ATELIER" speed={65} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Statement (7 cols) with Parallax Content Float */}
          <div className="lg:col-span-7">
            <ParallaxContent speed={26} reverse={false}>
              <FadeInUp className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs sm:text-[15px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#C8A27A] font-medium flex-wrap max-w-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A27A] shrink-0" />
                  <span>The House of KOKARÉ · Our Design Philosophy</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight leading-[1.15] break-words">
                  Handcrafted Fashion For <br />
                  <span className="block font-serif italic text-[#C8A27A] text-2xl sm:text-4xl lg:text-5xl tracking-normal mt-1.5 sm:mt-2">
                    Every Celebration
                  </span>
                </h2>

                {/* Slender champagne separator line */}
                <div className="w-16 h-[1.5px] bg-[#C8A27A]" />

                <p className="text-[17px] text-[#736E66] leading-relaxed font-light max-w-xl">
                  Where traditional Indian craftsmanship meets modern luxury style. Discover thoughtfully designed festive wear, royal sarees, elegant kurtas, and timeless outfits created for your most special moments.
                </p>

                <p className="text-[17px] text-[#736E66] leading-relaxed font-light max-w-lg">
                  From pure mulberry silks and delicate chanderi to structured raw silks, every piece is made with care and precision. Designed for wedding celebrations, festive gatherings, and unforgettable family occasions.
                </p>

                <div className="pt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white text-xs font-normal uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2.5" />
                  </Link>
                </div>
              </FadeInUp>
            </ParallaxContent>
          </div>

          {/* Right: Supporting Fashion Editorial Photograph (5 cols) with Deep Parallax Depth */}
          <div className="lg:col-span-5">
            <FadeInUp delay={0.15}>
              <div className="relative aspect-[4/5] border border-[#EAE4DC] bg-[#FAF7F2] group overflow-hidden shadow-xs">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85"
                  alt="Fine Indian textile embroidery and craftsmanship"
                  className="w-full h-full"
                  imgClassName="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  offset={35}
                  scale={1.1}
                />
                <div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="text-[15px] uppercase tracking-[0.2em] text-[#C8A27A] font-medium block mb-1">
                    Fine Craftsmanship
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-white font-light">
                    Hand-embroidered zardozi and delicate resham detailing
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
