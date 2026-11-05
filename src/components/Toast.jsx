import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage: wishlistToast } = useWishlist();
  const { cartToast } = useCart();

  const isCart = Boolean(cartToast);
  const activeMessage = cartToast || wishlistToast;

  return (
    <AnimatePresence>
      {activeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto shadow-2xl"
        >
          <div className="bg-[#161616] border border-[#C8A27A] text-[#FAF7F2] px-5 py-3.5 shadow-2xl flex items-center gap-3.5 backdrop-blur-md">
            {isCart ? (
              <div className="relative shrink-0 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#C8A27A]" />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-[2px] shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
            ) : (
              <Heart className="w-4.5 h-4.5 text-[#C8A27A] shrink-0 fill-[#C8A27A]" />
            )}
            
            <div className="flex-1 pr-2">
              <span className="text-xs sm:text-sm font-normal tracking-wide block leading-snug">
                {activeMessage}
              </span>
            </div>

            {isCart ? (
              <Link
                to="/cart"
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#C8A27A] hover:text-white font-medium border-l border-[#C8A27A]/30 pl-3 shrink-0 transition-colors"
              >
                <span>Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                to="/wishlist"
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#C8A27A] hover:text-white font-medium border-l border-[#C8A27A]/30 pl-3 shrink-0 transition-colors"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
