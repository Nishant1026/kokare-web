import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#EAE4DC] overflow-hidden w-full max-w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Icon */}
        <div className="w-10 h-10 rounded-full border border-[#EAE4DC] bg-[#FAF7F2] flex items-center justify-center text-[#161616] mx-auto mb-4 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#C8A27A]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161616] tracking-tight mb-3">
          Enter The World of KOKARÉ
        </h2>
        <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
        
        {/* Description */}
        <p className="text-[17px] text-[#736E66] tracking-normal max-w-lg mx-auto mb-8 font-light leading-relaxed">
          Receive exclusive invitations to private ateliers, festive previews, and curated couture editions delivered directly to your inbox.
        </p>

        {/* Form / Success Feedback */}
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-[#FAF7F2] border border-[#C8A27A]/40 text-[#161616] flex flex-col items-center gap-2 shadow-2xs"
              >
                <CheckCircle2 className="w-6 h-6 text-[#C8A27A]" />
                <h4 className="font-serif text-xl font-normal">Welcome to the Maison</h4>
                <p className="text-[15px] text-[#736E66] font-light">
                  Your 10% welcome privilege token has been reserved.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] placeholder-[#736E66]/60 focus:outline-none focus:border-[#C8A27A] transition-colors font-light"
                  />
                  {error && (
                    <span className="text-[11px] text-red-500 absolute -bottom-5 left-0">
                      {error}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#161616] text-white hover:bg-[#C8A27A] text-xs font-normal uppercase tracking-[0.25em] transition-all duration-300 border border-[#161616] hover:border-[#C8A27A] cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle Fine Print */}
        <p className="text-xs text-[#736E66]/70 mt-6 font-light">
          We honor your privacy. Unsubscribe at any time with a single click.
        </p>

      </div>
    </section>
  );
}
