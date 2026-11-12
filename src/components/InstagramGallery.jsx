import React from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon } from './SocialIcons';
import { ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';
import { ParallaxImage, ParallaxWatermark, ParallaxColumn, FadeInUp } from './Parallax';

export default function InstagramGallery() {
  return (
    <section className="relative py-20 bg-[#FAF7F2] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="JOURNAL" speed={65} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeInUp className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@kokare.official</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161616] tracking-tight mb-2">
            The World of KOKARÉ
          </h2>
          <p className="text-[17px] text-[#736E66] font-light">
            Share your celebratory moments to be welcomed into our patron circle.
          </p>
        </FadeInUp>

        {/* 4 Photo Editorial Grid — Lookbook Gallery with Silky Parallax */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <ParallaxColumn key={post.id} offset={20} isEven={isEven}>
                <FadeInUp
                  delay={idx * 0.08}
                  yOffset={18}
                >
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[1/1] overflow-hidden border border-[#EAE4DC] hover:border-[#C8A27A] bg-white block transition-colors shadow-2xs"
                  >
                    <ParallaxImage
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                      offset={45}
                      scale={1.2}
                    />
                    <div className="absolute inset-0 bg-[#161616]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white z-10 pointer-events-none">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-[#E8D3BD] text-xs uppercase tracking-wider">{post.handle}</span>
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                      <p className="text-xs sm:text-[14px] font-light line-clamp-2">
                        {post.caption}
                      </p>
                    </div>
                  </a>
                </FadeInUp>
              </ParallaxColumn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
