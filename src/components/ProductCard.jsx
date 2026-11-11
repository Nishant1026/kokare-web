import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';
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

  // Exact discount percentage for luxury offer showcase
  const discountVal =
    product.discountPercent ||
    product.discount ||
    (product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0);

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

          {/* Badges: Bestseller / New / In Bag / Festive Privilege */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {isInBag && (
              <span className="bg-[#161616] text-[#C8A27A] border border-[#C8A27A]/80 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Bag ({totalInBag})</span>
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#161616] text-white text-[11px] sm:text-[12px] font-normal uppercase tracking-[0.22em] px-2.5 py-1 shadow-xs border border-[#C8A27A]/40">
                Bestseller
              </span>
            )}
            {product.isNew && !product.isBestseller && (
              <span className="bg-white text-[#161616] border border-[#EAE4DC] text-[11px] sm:text-[12px] font-normal uppercase tracking-[0.22em] px-2.5 py-1 shadow-xs">
                New Arrival
              </span>
            )}
            {discountVal > 0 && !product.isBestseller && !product.isNew && (
              <span className="bg-[#721C2B] text-[#FAF7F2] border border-[#C8A27A]/40 text-[11px] sm:text-[12px] font-normal uppercase tracking-[0.2em] px-2.5 py-1 shadow-xs backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C8A27A] shrink-0" />
                <span>{discountVal}% Privilege</span>
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
              className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#161616] text-[12px] sm:text-[13px] font-normal uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs shadow-xs"
            >
              <Eye className="w-4 h-4" />
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
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-[1px]">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Category / Collection Tag */}
            <div className="flex items-center justify-between text-[13px] sm:text-[14px] text-[#736E66] uppercase tracking-[0.18em] mb-1.5 font-light">
              <span className="text-[#161616] font-normal tracking-[0.16em]">{product.category}</span>
              <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-[#C8A27A] font-medium">
                {product.collection === 'festive-edit' ? 'Diwali 2026' : 'Atelier Edit'}
              </span>
            </div>

            {/* Product Name (Strict 16px - 17px Editorial Typography) */}
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-serif text-[16px] sm:text-[17px] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Fabric Tagline */}
            <p className="text-[15px] sm:text-[17px] text-[#736E66] font-light mt-1 line-clamp-1">
              {product.fabric || product.tagline}
            </p>
          </div>

          {/* Pricing & Offers Showcase */}
          <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-[#EAE4DC] flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-serif text-[16px] sm:text-[17px] text-[#161616] font-normal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[13px] sm:text-[14px] text-[#736E66] line-through font-light">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountVal > 0 && (
                <span className="inline-flex items-center text-[12px] uppercase tracking-wider text-[#721C2B] font-medium bg-[#FBF1F2] border border-[#721C2B]/25 px-2 py-[2px] leading-tight shrink-0 whitespace-nowrap">
                  Save {discountVal}%
                </span>
              )}
            </div>

            {/* Color Swatch Previews */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                {product.colors.slice(0, 3).map((col) => (
                  <span
                    key={col.name}
                    className="w-2.5 h-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[11px] text-[#736E66] font-mono">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mobile Tap Action Bar (Refined Atelier Architectural Segmented Bar) */}
          <div className="sm:hidden mt-3 pt-2.5 border-t border-[#EAE4DC]/60">
            <div
              className={`flex items-stretch border transition-all duration-300 shadow-2xs ${
                isInBag
                  ? 'border-[#721C2B] bg-[#721C2B]'
                  : 'border-[#161616] bg-white hover:border-[#C8A27A]'
              }`}
            >
              {/* Add To Bag Primary Touch Action */}
              <button
                onClick={handleQuickAdd}
                className={`flex-1 h-9 px-2.5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                  isInBag
                    ? 'text-white'
                    : 'text-[#161616] hover:text-[#C8A27A] active:bg-[#FAF7F2]'
                }`}
              >
                {isInBag ? (
                  <span className="text-[11px] leading-none uppercase tracking-[0.18em] font-medium flex items-center gap-1.5 text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3] text-[#C8A27A]" />
                    IN BAG
                  </span>
                ) : (
                  <span className="text-[11px] leading-none uppercase tracking-[0.2em] font-normal flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#161616] stroke-[1.5]" />
                    ADD TO BAG
                  </span>
                )}
              </button>

              {/* Slender Vertical Divider */}
              <div className={`w-[1px] ${isInBag ? 'bg-white/20' : 'bg-[#EAE4DC]'}`} />

              {/* Quick View End-cap */}
              <button
                onClick={handleOpenQuickView}
                className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  isInBag
                    ? 'text-white/80 hover:text-white'
                    : 'bg-[#FAF7F2] hover:bg-white text-[#736E66] hover:text-[#161616]'
                }`}
                aria-label="Quick View Silhouette"
                title="Quick View"
              >
                <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
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
