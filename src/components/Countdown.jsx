import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Countdown({
  targetDate = '2026-11-20T23:59:59',
  title = 'THE FESTIVAL OF LIGHT IS HERE',
  subtitle = 'Diwali Festive Edition 2026 — Limited Festive Releases'
}) {
  const calculateTimeLeft = () => {
    let difference = +new Date(targetDate) - +new Date();
    // Safety fallback: if target date passed or invalid, countdown from 12 days 18 hours ahead
    if (isNaN(difference) || difference <= 0) {
      const fallbackTarget = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000);
      difference = +fallbackTarget - +new Date();
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

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#100D0D] via-[#35151E]/60 to-[#100D0D] border-y border-[#B99A62]/20 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#741F32]/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#B99A62]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Campaign pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#191113] border border-[#B99A62]/30 mb-4">
          <Flame className="w-3.5 h-3.5 text-[#B99A62] animate-diya" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#B99A62] font-semibold">
            Limited Festive Window
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#F5EBDD] tracking-wide mb-3">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#D8C6AD] tracking-wider uppercase max-w-xl mx-auto mb-10">
          {subtitle}
        </p>

        {/* Gold-accented Countdown Design */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto mb-10">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-3 sm:p-5 rounded-lg bg-[#191113]/90 border border-[#B99A62]/40 shadow-xl backdrop-blur-md group hover:border-[#B99A62] transition-colors"
            >
              {/* Corner accent sparkles */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#B99A62]/60" />

              <div className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#F5EBDD] tracking-normal mb-1">
                {formatNumber(unit.value)}
              </div>
              <div className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-[#B99A62] font-medium">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Claim Offer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs sm:text-sm text-[#F5EBDD]/90">
            Use Code <strong className="text-[#B99A62] bg-[#35151E] px-2 py-0.5 rounded border border-[#B99A62]/30 ml-1">DIWALI20</strong> for Extra 20% Off
          </span>
          <Link
            to="/festive-collection"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B99A62] hover:text-[#F5EBDD] underline underline-offset-8 transition-colors"
          >
            <span>Explore Festive Edit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

