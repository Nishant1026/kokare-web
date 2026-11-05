import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { cart, addToCart, getProductTotalInCart } = useCart();

  const isFavorited = isInWishlist(product.id);
  const totalInBag = getProductTotalInCart(product.id);
  const isInBag = totalInBag > 0;

  // Primary and secondary image for swap
  const primaryImg = product.images[0];
  const secondaryImg = product.images[1] || product.images[0];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInBag) {
      navigate('/cart');
      return;
    }
    const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
    const defaultColor = product.colors ? product.colors[0]?.name : 'Original';
    addToCart(product, defaultSize, defaultColor, 1, false);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-white border border-[#EAE4DC] hover:border-[#C8A27A] transition-all duration-300 shadow-2xs hover:shadow-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Hover Swap */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2]">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={primaryImg}
              alt={product.name}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                isHovered && secondaryImg !== primaryImg ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {secondaryImg && secondaryImg !== primaryImg && (
              <img
                src={secondaryImg}
                alt={`${product.name} alternate view`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            )}
          </Link>

          {/* Badges: Bestseller / New / In Bag */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {isInBag && (
              <span className="bg-[#161616] text-[#C8A27A] border border-[#C8A27A]/80 text-[10px] font-medium uppercase tracking-[0.2em] px-2.5 py-0.5 shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Bag ({totalInBag})</span>
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#161616] text-white text-[10px] font-normal uppercase tracking-[0.22em] px-2.5 py-0.5 shadow-xs border border-[#C8A27A]/40">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="bg-white text-[#161616] border border-[#EAE4DC] text-[10px] font-normal uppercase tracking-[0.22em] px-2.5 py-0.5 shadow-xs">
                New Arrival
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/95 text-[#161616] hover:text-[#C8A27A] backdrop-blur-sm border border-[#EAE4DC] transition-colors shadow-2xs cursor-pointer"
          >
            <motion.div whileTap={{ scale: 0.85 }}>
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorited ? 'fill-[#C8A27A] text-[#C8A27A]' : 'text-[#161616]'
                }`}
              />
            </motion.div>
          </button>

          {/* Desktop Hover Action Bar */}
          <div
            className={`hidden sm:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent items-center justify-center gap-2 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <button
              onClick={handleOpenQuickView}
              className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#161616] text-[11px] font-normal uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleQuickAdd}
              className={`py-2.5 px-3.5 transition-colors flex items-center justify-center cursor-pointer shadow-xs ${
                isInBag
                  ? 'bg-[#161616] text-[#C8A27A] border border-[#C8A27A] hover:bg-[#C8A27A] hover:text-white'
                  : 'bg-[#161616] hover:bg-[#C8A27A] text-white'
              }`}
              title={isInBag ? 'In Bag · Click to View Bag' : 'Add to Bag'}
            >
              {isInBag ? (
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-[1px]">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Category / Collection Tag */}
            <div className="flex items-center justify-between text-[11px] text-[#736E66] uppercase tracking-[0.24em] mb-1 font-light">
              <span>{product.category}</span>
              {product.discountPercent && (
                <span className="text-[#721C2B] font-medium">{product.discountPercent}% OFF</span>
              )}
            </div>

            {/* Product Name (Strict 17px Display Typography) */}
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-serif text-[17px] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Fabric Tagline */}
            <p className="text-[13px] text-[#736E66] font-light mt-0.5 line-clamp-1">
              {product.fabric || product.tagline}
            </p>
          </div>

          {/* Pricing & Colors */}
          <div className="mt-3 pt-3 border-t border-[#EAE4DC] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-[17px] text-[#161616] font-normal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#736E66] line-through font-light">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Color Swatch Previews */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 3).map((col) => (
                  <span
                    key={col.name}
                    className="w-2.5 h-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[10px] text-[#736E66] font-mono">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mobile Tap Action Bar (Strictly touch-friendly on phone screens) */}
          <div className="sm:hidden mt-3 pt-2.5 border-t border-[#EAE4DC]/60 flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className={`flex-1 py-2 px-3 text-xs uppercase tracking-wider font-normal flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isInBag
                  ? 'bg-[#161616] text-[#C8A27A] border border-[#C8A27A]'
                  : 'bg-[#161616] text-white hover:bg-[#C8A27A]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isInBag ? 'In Bag' : 'Add to Bag'}</span>
            </button>
            <button
              onClick={handleOpenQuickView}
              className="py-2 px-2.5 border border-[#EAE4DC] text-[#161616] hover:bg-[#FAF7F2] transition-colors"
              aria-label="Quick View Silhouette"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
