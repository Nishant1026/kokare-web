import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { InstagramIcon, FacebookIcon, PinterestIcon } from './SocialIcons';
import { FadeInUp, ParallaxWatermark } from './Parallax';

export default function Footer() {
  return (
    <footer className="relative bg-[#161616] text-[#FAF7F2] pt-16 pb-12 border-t border-[#C8A27A]/30 overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="KOKARÉ" speed={60} className="!text-white/[0.025]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust & Heritage Markers (Amrapali & Zoya Hallmark Row) */}
        <FadeInUp className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-white/10 text-center">
          <div className="flex flex-col items-center p-3">
            <Truck className="w-6 h-6 text-[#C8A27A] mb-2" />
            <h5 className="font-serif text-base text-white font-normal">Insured Express Courier</h5>
            <p className="text-xs text-[#FAF7F2]/60 font-light mt-0.5">Complimentary across all Indian pin codes</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <Award className="w-6 h-6 text-[#C8A27A] mb-2" />
            <h5 className="font-serif text-base text-white font-normal">Authentic Handlooms</h5>
            <p className="text-xs text-[#FAF7F2]/60 font-light mt-0.5">100% certified indigenous wild tussar silk</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <RefreshCw className="w-6 h-6 text-[#C8A27A] mb-2" />
            <h5 className="font-serif text-base text-white font-normal">7-Day Keepsake Exchange</h5>
            <p className="text-xs text-[#FAF7F2]/60 font-light mt-0.5">Hassle-free doorstep collection</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <ShieldCheck className="w-6 h-6 text-[#C8A27A] mb-2" />
            <h5 className="font-serif text-base text-white font-normal">Keepsake Luxury Box</h5>
            <p className="text-xs text-[#FAF7F2]/60 font-light mt-0.5">Rigid gold-foiled preservation packaging</p>
          </div>
        </FadeInUp>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 Columns on large) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl font-normal tracking-[0.28em] text-white group-hover:text-[#C8A27A] transition-colors">
                KOKARÉ
              </span>
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#C8A27A] font-medium block mt-0.5">
                The Jharkhand Edit · Diwali Festive Edition
              </span>
            </Link>

            <p className="text-[17px] text-[#FAF7F2]/75 max-w-sm leading-relaxed font-light">
              An Indian designer fashion atelier translating the wild cocoon silks and ancestral weaving traditions of Jharkhand into wearable works of contemporary art.
            </p>

            <div className="space-y-2 text-sm text-[#FAF7F2]/65 pt-2 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A27A] shrink-0" />
                <span>Flagship Atelier, Circular Road, Ranchi, Jharkhand</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A27A] shrink-0" />
                <span>+91 98765 43210 (10 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A27A] shrink-0" />
                <span>concierge@kokare.in</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#FAF7F2]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#222222] border border-white/10 hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors flex items-center justify-center text-xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#222222] border border-white/10 hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors flex items-center justify-center text-xs"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#222222] border border-white/10 hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors flex items-center justify-center text-xs"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Curated Silhouettes */}
          <div>
            <h5 className="font-serif text-lg text-white font-normal mb-4 tracking-wider uppercase text-xs">
              Curated Silhouettes
            </h5>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/70 font-light">
              <li>
                <Link to="/women" className="hover:text-[#C8A27A] transition-colors">
                  Women's Atelier
                </Link>
              </li>
              <li>
                <Link to="/men" className="hover:text-[#C8A27A] transition-colors">
                  Men's Atelier
                </Link>
              </li>
              <li>
                <Link to="/ethnic-wear" className="hover:text-[#C8A27A] transition-colors">
                  Heritage Ethnic Wear
                </Link>
              </li>
              <li>
                <Link to="/western-wear" className="hover:text-[#C8A27A] transition-colors">
                  Western Fusion
                </Link>
              </li>
              <li>
                <Link to="/festive-collection" className="hover:text-[#C8A27A] transition-colors text-[#C8A27A]">
                  Diwali Festive Edit 2026
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-[#C8A27A] transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Maison & Heritage */}
          <div>
            <h5 className="font-serif text-lg text-white font-normal mb-4 tracking-wider uppercase text-xs">
              Maison & Heritage
            </h5>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/70 font-light">
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors">
                  Our Atelier Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors">
                  Jharkhand Artisanal Guilds
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8A27A] transition-colors">
                  Wild Tussar Sustainability
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=wedding-stories" className="hover:text-[#C8A27A] transition-colors">
                  Wedding Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors">
                  Atelier Boutiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="font-serif text-lg text-white font-normal mb-4 tracking-wider uppercase text-xs">
              Client Concierge
            </h5>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/70 font-light">
              <li>
                <Link to="/track-order" className="hover:text-[#C8A27A] transition-colors">
                  Track Festive Consignment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors">
                  Book Private Styling Session
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#C8A27A] transition-colors">
                  Saved Silhouettes (Wishlist)
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#C8A27A] transition-colors">
                  Your Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors">
                  Complimentary Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C8A27A] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50 font-light gap-4 text-center sm:text-left">
          <p>© 2026 KOKARÉ — The Jharkhand Edit. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-wider">
            <span>UPI Instant</span>
            <span className="hidden sm:inline">·</span>
            <span>Visa / Mastercard</span>
            <span className="hidden sm:inline">·</span>
            <span>Net Banking</span>
            <span className="hidden sm:inline">·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
