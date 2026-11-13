import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon, YouTubeIcon, XIcon, FacebookIcon } from './SocialIcons';
import { FadeInUp, ParallaxWatermark } from './Parallax';

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] text-[#FAF7F2] pt-20 pb-12 border-t border-[#C8A27A]/40 overflow-hidden w-full max-w-full shadow-[0_-20px_50px_-20px_rgba(200,162,122,0.12)]">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="KOKARÉ" speed={60} className="!text-white/[0.025]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust & Heritage Markers (Luxury Hallmark Row) */}
        <FadeInUp className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-[#C8A27A]/20">
          <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[#C8A27A]/40 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] border border-[#C8A27A]/40 flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-[0_0_15px_rgba(200,162,122,0.15)] group-hover:border-[#C8A27A] group-hover:shadow-[0_0_22px_rgba(200,162,122,0.35)] transition-all">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A27A] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h5 className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal tracking-wide">
              Insured Express Courier
            </h5>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light mt-0.5 sm:mt-1">
              Complimentary across all Indian pin codes
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[#C8A27A]/40 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] border border-[#C8A27A]/40 flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-[0_0_15px_rgba(200,162,122,0.15)] group-hover:border-[#C8A27A] group-hover:shadow-[0_0_22px_rgba(200,162,122,0.35)] transition-all">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A27A] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h5 className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal tracking-wide">
              Authentic Handlooms
            </h5>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light mt-0.5 sm:mt-1">
              100% certified indigenous wild tussar silk
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[#C8A27A]/40 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] border border-[#C8A27A]/40 flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-[0_0_15px_rgba(200,162,122,0.15)] group-hover:border-[#C8A27A] group-hover:shadow-[0_0_22px_rgba(200,162,122,0.35)] transition-all">
              <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A27A] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h5 className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal tracking-wide">
              7-Day Keepsake Exchange
            </h5>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light mt-0.5 sm:mt-1">
              Hassle-free doorstep collection
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[#C8A27A]/40 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A1A] border border-[#C8A27A]/40 flex items-center justify-center mb-2.5 sm:mb-3.5 shadow-[0_0_15px_rgba(200,162,122,0.15)] group-hover:border-[#C8A27A] group-hover:shadow-[0_0_22px_rgba(200,162,122,0.35)] transition-all">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A27A] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h5 className="font-serif text-base sm:text-lg lg:text-xl text-white font-normal tracking-wide">
              Keepsake Luxury Box
            </h5>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light mt-0.5 sm:mt-1">
              Rigid gold-foiled preservation packaging
            </p>
          </div>
        </FadeInUp>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-7 xl:gap-10 pb-16 border-b border-[#C8A27A]/20">

          {/* Brand Info (2 Columns on large) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl font-normal tracking-[0.28em] text-white group-hover:text-[#C8A27A] transition-colors block">
                KOKARÉ
              </span>
              <span className="text-[15px] tracking-[0.2em] uppercase text-[#C8A27A] font-medium block mt-1.5">
              The Ethnic Edit · All Festival & Wedding Edition
              </span>
            </Link>

            <p className="text-[17px] text-[#FAF7F2]/80 max-w-sm leading-relaxed font-light">
              Your trusted local fashion boutique and design studio in Ranchi, crafting premium handloom silks, festive wear, and modern ethnic silhouettes for every special celebration.
            </p>

            <div className="space-y-3 text-[15px] text-[#FAF7F2]/75 pt-2 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                <span>Flagship Boutique, Circular Road, Ranchi, Jharkhand</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8A27A] shrink-0" />
                <span>+91 XXXXX XXXXX (10 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A27A] shrink-0" />
                <span>concierge@kokare.in</span>
              </div>
            </div>

            {/* Social Icons: Instagram, WhatsApp, YouTube, X, Facebook */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-[#FAF7F2]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-[#1C1C1C] border border-[#C8A27A]/30 hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#161616] transition-all duration-300 flex items-center justify-center shadow-xs group"
              >
                <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="w-11 h-11 rounded-full bg-[#1C1C1C] border border-[#C8A27A]/30 hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#161616] transition-all duration-300 flex items-center justify-center shadow-xs group"
              >
                <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-[#1C1C1C] border border-[#C8A27A]/30 hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#161616] transition-all duration-300 flex items-center justify-center shadow-xs group"
              >
                <YouTubeIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-11 h-11 rounded-full bg-[#1C1C1C] border border-[#C8A27A]/30 hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#161616] transition-all duration-300 flex items-center justify-center shadow-xs group"
              >
                <XIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-[#1C1C1C] border border-[#C8A27A]/30 hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#161616] transition-all duration-300 flex items-center justify-center shadow-xs group"
              >
                <FacebookIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Curated Silhouettes */}
          <div>
            <h5 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide">
              Curated Silhouettes
            </h5>
            <div className="w-10 h-[1.5px] bg-[#C8A27A]/80 mt-2.5 mb-5" />
            <ul className="space-y-3 text-[16px] text-[#FAF7F2]/75 font-light">
              <li>
                <Link to="/women" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Women's Atelier
                </Link>
              </li>
              <li>
                <Link to="/men" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Men's Atelier
                </Link>
              </li>
              <li>
                <Link to="/ethnic-wear" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Heritage Ethnic Wear
                </Link>
              </li>
              <li>
                <Link to="/western-wear" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Western Fusion
                </Link>
              </li>
              <li>
                <Link to="/festive-collection" className="hover:text-[#C8A27A] transition-colors text-[#C8A27A] block py-0.5 font-medium">
                  All Festival & Wedding Edit 2026
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Heritage */}
          <div>
            <h5 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide">
              Maison & Heritage
            </h5>
            <div className="w-10 h-[1.5px] bg-[#C8A27A]/80 mt-2.5 mb-5" />
            <ul className="space-y-3 text-[16px] text-[#FAF7F2]/75 font-light">
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Our Atelier Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Jharkhand Artisanal Guilds
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Wild Tussar Sustainability
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=wedding-stories" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Wedding Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Atelier Boutiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="font-serif text-xl sm:text-2xl text-white font-normal tracking-wide">
              Client Concierge
            </h5>
            <div className="w-10 h-[1.5px] bg-[#C8A27A]/80 mt-2.5 mb-5" />
            <ul className="space-y-3 text-[16px] text-[#FAF7F2]/75 font-light">
              <li>
                <Link to="/track-order" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Track Festive Consignment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Book Private Styling Session
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Saved Silhouettes (Wishlist)
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Your Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Complimentary Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors block py-0.5">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Centered Copyright */}
        <div className="pt-8 text-center text-sm text-[#FAF7F2]/65 font-light tracking-wide">
          <p>© 2026 KOKARÉ — The Ethnic Edit. All rights reserved. Developed By Nishant Kumar</p>
        </div>

      </div>
    </footer>
  );
}
