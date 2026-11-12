import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParallaxImage, ParallaxContent, ParallaxWatermark, FadeInUp } from './Parallax';

export default function DiwaliOfferSection({
  targetDate = '2026-11-20T23:59:59'
}) {
  const calculateTimeLeft = () => {
    let difference = +new Date(targetDate) - +new Date();
    if (isNaN(difference) || difference <= 0) {
      const fallback = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000);
      difference = +fallback - +new Date();
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="relative py-20 sm:py-28 bg-[#FFFFFF] text-[#161616] overflow-hidden border-b border-[#EAE4DC] w-full max-w-full">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="PRIVILEGE" speed={70} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image Card with Deep Parallax Depth (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <FadeInUp>
              <div className="relative aspect-[4/5] border border-[#C8A27A]/35 overflow-hidden bg-[#FAF7F2] shadow-md">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85"
                  alt="Festive Indian fashion offer"
                  className="w-full h-full"
                  imgClassName="object-cover object-top"
                  offset={35}
                  scale={1.1}
                />
                <div className="absolute top-4 left-4 bg-white/95 text-[#161616] px-3.5 py-1 text-[10px] font-medium tracking-[0.25em] uppercase border border-[#EAE4DC] shadow-2xs z-10 pointer-events-none">
                  Diwali Special 2026
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column: Promotion Details & Countdown (7 cols) with Parallax Content Float */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ParallaxContent speed={24}>
              <FadeInUp delay={0.15} className="space-y-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
                  <span>Limited Festive Privilege</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight leading-[1.12]">
                  A Little More Joy, <br />
                  <span className="italic text-[#C8A27A]">A Little More Style</span>
                </h2>

                <div className="w-16 h-[1.5px] bg-[#C8A27A]" />

                <p className="text-[17px] text-[#736E66] font-light leading-relaxed max-w-xl">
                  Enjoy an exclusive 20% festive privilege across our entire Diwali 2026 Haute Couture collection. Complimentary insured dispatch and luxury keepsake packaging included.
                </p>

                {/* Countdown Cards */}
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C8A27A] mb-3 font-light">
                    <Clock className="w-4 h-4" />
                    <span>Privilege Concludes In</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md">
                    {[
                      { label: 'Days', val: pad(timeLeft.days) },
                      { label: 'Hours', val: pad(timeLeft.hours) },
                      { label: 'Mins', val: pad(timeLeft.minutes) },
                      { label: 'Secs', val: pad(timeLeft.seconds) }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F2] border border-[#EAE4DC] p-3 text-center"
                      >
                        <span className="font-serif text-2xl sm:text-3xl text-[#161616] block leading-none">
                          {item.val}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#736E66] mt-1 block">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center gap-3 p-4 bg-[#FAF7F2] border border-[#C8A27A]/40 max-w-md">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#161616] font-medium">Use Code:</span>
                  <code className="font-mono text-sm sm:text-base font-semibold text-[#721C2B] tracking-wider px-2 py-0.5 bg-white border border-[#EAE4DC]">
                    DIWALI20
                  </code>
                  <span className="text-xs text-[#736E66] ml-auto">Extra 20% Off</span>
                </div>

                <div className="pt-2">
                  <Link
                    to="/festive-collection"
                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-[#161616] text-white hover:bg-[#C8A27A] text-xs font-normal uppercase tracking-[0.25em] transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <span>Claim Your Privilege</span>
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
