import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ParallaxWatermark, ParallaxReveal, FadeInUp } from '../components/Parallax';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    const size = product.sizes ? product.sizes[0] : 'Standard';
    const color = product.colors ? product.colors[0]?.name : 'Original';
    addToCart(product, size, color, 1, true);
    removeFromWishlist(product.id);
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen py-12 text-[#161616] overflow-x-clip">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="VAULT" speed={65} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE4DC] pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[15px] font-medium uppercase tracking-[0.2em] text-[#C8A27A] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>Personal Vault · The Jharkhand Edit</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#161616]">
              Your Festive Wishlist
            </h1>
            <p className="text-[17px] text-[#736E66] mt-1 font-light">
              {wishlist.length} {wishlist.length === 1 ? 'piece saved' : 'pieces saved'} for your celebrations
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 text-xs text-[#736E66] hover:text-red-500 underline underline-offset-4 transition-colors font-light cursor-pointer"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto bg-white border border-[#EAE4DC] p-8 sm:p-12 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EAE4DC] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-[#C8A27A]" />
            </div>
            <h3 className="font-serif text-2xl mb-2 text-[#161616] font-normal">Your wishlist is empty</h3>
            <p className="text-[17px] text-[#736E66] leading-relaxed mb-6 font-light">
              Bookmark your favorite royal silks, festive sarees, and tailored bandhgalas to revisit them anytime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#161616] text-white font-normal text-xs uppercase tracking-[0.25em] hover:bg-[#C8A27A] transition-all border border-[#161616] hover:border-[#C8A27A]"
            >
              <span>Explore Festive Collection</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white overflow-hidden border border-[#EAE4DC] hover:border-[#C8A27A] transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2]">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from Wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#736E66] hover:text-red-500 transition-colors border border-[#EAE4DC] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-[15px] text-[#736E66] uppercase tracking-[0.16em] font-light block mb-1">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-serif text-[17px] font-normal text-[#161616] hover:text-[#C8A27A] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-serif text-[17px] text-[#161616] mt-2 font-normal">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#EAE4DC]">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-3 bg-[#161616] hover:bg-[#721C2B] text-white text-xs font-normal uppercase tracking-[0.24em] transition-colors flex items-center justify-center gap-2 border border-[#161616] hover:border-[#721C2B] cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
