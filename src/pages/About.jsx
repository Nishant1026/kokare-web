import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Feather, Compass, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParallaxImage, ParallaxWatermark, FadeInUp } from '../components/Parallax';

export default function About() {
  return (
    <div className="relative bg-[#FAF7F2] min-h-screen py-16 text-[#161616] overflow-x-clip">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="CHRONICLE" speed={70} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Hero Header */}
        <FadeInUp className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#EAE4DC] bg-white mb-4 shadow-2xs">
            <Feather className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#161616]">
              The Brand Memoir · Diwali Festive Edition
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight mb-4 leading-tight text-[#161616]">
            Rooted In Jharkhand. <br />
            <span className="italic text-[#C8A27A]">Made For The World.</span>
          </h1>

          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-6" />

          <p className="font-serif italic text-xl sm:text-2xl text-[#736E66] font-light leading-relaxed">
            "A luxury Indian fine fashion atelier inspired by wearable art, ancestral wild tussar silks, and the celebratory elegance of Diwali."
          </p>
        </FadeInUp>

        {/* Campaign Imagery Grid — Architectural Lookbook Silhouettes with Differential Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <FadeInUp delay={0.05} className="aspect-[3/4] overflow-hidden border border-[#EAE4DC] bg-white shadow-2xs">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85"
              alt="Mulberry silk saree"
              className="w-full h-full"
              offset={55}
              mobileOffset={24}
              scale={1.22}
            />
          </FadeInUp>
          <FadeInUp delay={0.15} className="aspect-[3/4] overflow-hidden border border-[#C8A27A]/50 bg-white md:-translate-y-6 shadow-lg">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85"
              alt="Midnight sherwani tailoring"
              className="w-full h-full"
              offset={80}
              mobileOffset={32}
              scale={1.24}
            />
          </FadeInUp>
          <FadeInUp delay={0.25} className="aspect-[3/4] overflow-hidden border border-[#EAE4DC] bg-white shadow-2xs">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85"
              alt="Festive lehenga embroidery"
              className="w-full h-full"
              offset={55}
              mobileOffset={24}
              scale={1.22}
            />
          </FadeInUp>
        </div>

        {/* Narrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <FadeInUp className="space-y-6">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] block">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#161616]">
              Honoring Jharkhand Craft & Wearable Art
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C8A27A]" />
            <p className="text-[17px] text-[#736E66] leading-relaxed font-light">
              <strong className="text-[#161616] font-normal">KOKARÉ</strong> was conceived as a creative tribute to Jharkhand’s timeless textile landscapes and India's heritage royalty. From the dense Sal forests where wild tussar cocoons have thrived for centuries, to the refined metallic ornamentation inspired by ancient jewelry traditions, our aesthetic captures the quiet strength of unbleached weaves and translates it into high-fashion festive couture.
            </p>
            <p className="text-[17px] text-[#736E66] leading-relaxed font-light">
              KOKARÉ anchors itself in our signature luxury palette: <strong className="text-[#161616] font-medium">Deep Onyx</strong>, <strong className="text-[#C8A27A] font-medium">Champagne Rose Gold</strong>, <strong className="text-[#FAF7F2] font-medium">Cashmere Alabaster</strong>, and <strong className="text-[#FFFFFF] font-medium">Pure Pearl White</strong>.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.15} className="p-8 bg-white border border-[#EAE4DC] space-y-6 shadow-2xs">
            <h3 className="font-serif text-2xl text-[#161616] font-normal border-b border-[#EAE4DC] pb-3">
              Design Pillars of KOKARÉ
            </h3>

            <div className="space-y-5 text-sm sm:text-base text-[#736E66]">
              <div className="flex gap-3.5">
                <Sparkles className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] block text-xs uppercase tracking-wider mb-1 font-normal">Wearable Artistry</strong>
                  <p className="text-[17px] font-light">Translating historic indigenous motifs into minimal, contemporary sculptural silhouettes.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <Compass className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] block text-xs uppercase tracking-wider mb-1 font-normal">Generational Weaving Guilds</strong>
                  <p className="text-[17px] font-light">Sustaining 450+ master craft families across pit looms in rural Jharkhand.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <Heart className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] block text-xs uppercase tracking-wider mb-1 font-normal">Ethical Wild Silk Harvesting</strong>
                  <p className="text-[17px] font-light">Certified non-mulberry Ahimsa tussar silk gathered in harmony with forest flora.</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Closing CTA */}
        <FadeInUp className="p-8 sm:p-14 bg-[#161616] text-white text-center border border-[#C8A27A]/30">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] block mb-2">
            Diwali Festive Collection 2026
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-normal mb-4 text-white">
            Wear The Light. Celebrate Your Story.
          </h3>
          <p className="text-[17px] text-white/80 max-w-xl mx-auto mb-8 font-light">
            Step into the festive season wrapped in the timeless grace of Jharkhand’s finest artisanal silks.
          </p>
          <Link
            to="/festive-collection"
            className="inline-flex items-center justify-center px-10 py-4 border border-white text-white hover:bg-white hover:text-[#161616] text-xs font-normal uppercase tracking-[0.28em] transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Explore The Festive Edit</span>
            <ArrowRight className="w-4 h-4 ml-2.5" />
          </Link>
        </FadeInUp>

      </div>
    </div>
  );
}
