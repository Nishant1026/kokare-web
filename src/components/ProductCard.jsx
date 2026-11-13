import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

// Category-tuned focal points for editorial balance:
// Preserves model headroom while revealing maximum garment silhouette & embroidery
const getObjectPosition = (product) => {
  if (product.imagePosition) return product.imagePosition;
  switch (product.category?.toLowerCase()) {
    case 'sarees':
      return 'center 12%';
    case 'lehengas':
      return 'center 18%';
    case 'sherwanis':
      return 'center 15%';
    case 'kurtas':
      return 'center 18%';
    case 'jackets':
      return 'center 22%';
    case 'dresses':
      return 'center 15%';
    default:
      return 'center 18%';
  }
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
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

  // Primary and secondary image for smooth couture swap
  const primaryImg = product.images?.[0] || '';
  const secondaryImg = product.images?.[1] || primaryImg;
  const objectPos = getObjectPosition(product);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInBag) {
      window.scrollTo(0, 0);
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

  return (
    <div
      className="group relative flex flex-col h-full bg-white border border-[#EAE4DC] hover:border-[#C8A27A]/80 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(22,22,22,0.06)] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. LUXURY PRODUCT IMAGE BOX (Strict Locked Aspect Ratio, shrink-0, Pure Absolute Floating Overlay) */}
      <div className="relative w-full aspect-[3/4] shrink-0 overflow-hidden bg-[#FAF7F2] border-b border-[#EAE4DC]/80">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative overflow-hidden">
          {/* Primary View */}
          <img
            src={primaryImg}
            alt={product.name}
            style={{ objectPosition: objectPos }}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.035] ${
              isHovered && secondaryImg !== primaryImg ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Alternate Angle Swap on Hover */}
          {secondaryImg && secondaryImg !== primaryImg && (
            <img
              src={secondaryImg}
              alt={`${product.name} alternate view`}
              style={{ objectPosition: objectPos }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.035] ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Minimal Couture Badges: Elegant Micro-Caps */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none max-w-[80%]">
          {isInBag && (
            <span className="bg-[#161616]/95 text-[#C8A27A] border border-[#C8A27A]/60 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] px-2.5 py-0.5 sm:py-1 shadow-2xs flex items-center gap-1.5 backdrop-blur-xs whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>In Bag ({totalInBag})</span>
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#161616]/90 text-[#FAF7F2] text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.18em] px-2.5 py-0.5 sm:py-1 shadow-2xs border border-[#C8A27A]/30 whitespace-nowrap">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="bg-white/95 text-[#161616] border border-[#EAE4DC] text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.18em] px-2.5 py-0.5 sm:py-1 shadow-2xs whitespace-nowrap">
              New Arrival
            </span>
          )}
          {discountVal > 0 && !product.isBestseller && !product.isNew && (
            <span className="bg-[#721C2B]/90 text-[#FAF7F2] border border-[#C8A27A]/30 text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.16em] px-2.5 py-0.5 sm:py-1 shadow-2xs backdrop-blur-xs flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-2.5 h-2.5 text-[#C8A27A] shrink-0" />
              <span>{discountVal}% Offer</span>
            </span>
          )}
        </div>

        {/* Wishlist Button (Refined Floating Pill) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#161616] hover:text-[#C8A27A] backdrop-blur-md border border-[#EAE4DC] hover:border-[#C8A27A] flex items-center justify-center transition-all duration-300 shadow-2xs cursor-pointer active:scale-90"
        >
          <motion.div whileTap={{ scale: 0.85 }}>
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorited ? 'fill-[#C8A27A] text-[#C8A27A]' : 'text-[#161616]'
              }`}
            />
          </motion.div>
        </button>

        {/* Mobile & Tablet Quick View Icon (Bottom Right of Image) */}
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name} Details`}
          title="View Details"
          className="lg:hidden absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 text-[#161616] hover:text-[#C8A27A] backdrop-blur-md border border-[#EAE4DC] flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-90"
        >
          <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
        </Link>

        {/* Desktop Floating Quick Actions Overlay (Pure Absolute — Zero Layout Shift) */}
        <div
          className={`hidden lg:flex absolute inset-x-3 bottom-3 z-20 items-center justify-between gap-1.5 p-1 bg-[#161616]/92 backdrop-blur-md border border-[#C8A27A]/60 shadow-lg transition-all duration-300 ease-out pointer-events-auto ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <Link
            to={`/product/${product.id}`}
            className="flex-1 py-1.5 px-2 text-[#FAF7F2] hover:text-[#C8A27A] text-[11px] font-normal uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-[#C8A27A] stroke-[1.5]" />
            <span>Details</span>
          </Link>
          <div className="w-[1px] h-3.5 bg-[#C8A27A]/30 shrink-0" />
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-1.5 px-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-[11px] font-normal uppercase tracking-[0.2em] whitespace-nowrap ${
              isInBag
                ? 'text-[#C8A27A] hover:text-white'
                : 'text-[#FAF7F2] hover:text-[#C8A27A]'
            }`}
            title={isInBag ? 'In Bag · Click to View Bag' : 'Add to Bag'}
          >
            {isInBag ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span className="text-emerald-400">In Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C8A27A] stroke-[1.5]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. REFINED PRODUCT INFORMATION SECTION */}
      <div className="p-3.5 sm:p-4.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category / Collection Tag */}
          <div className="flex items-center justify-between gap-1 mb-1 font-light">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#736E66] font-medium truncate">
              {product.category}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#C8A27A] font-semibold shrink-0 whitespace-nowrap">
              {product.collection === 'festive-edit' ? 'Festive Edit' : 'Signature'}
            </span>
          </div>

          {/* Product Name (Strict Editorial Typography) */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-[15px] sm:text-[16px] lg:text-[17px] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors duration-300 leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Fabric Tagline */}
          <p className="text-[12px] sm:text-[13px] text-[#736E66] font-light mt-0.5 sm:mt-1 line-clamp-1 leading-relaxed">
            {product.fabric || product.tagline}
          </p>
        </div>

        {/* Pricing & Offers Showcase */}
        <div className="mt-3 pt-2.5 border-t border-[#EAE4DC]/70 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="font-serif text-[15px] sm:text-[17px] text-[#161616] font-normal tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] sm:text-[13px] text-[#8C827A] line-through font-light">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountVal > 0 && (
              <span className="inline-flex items-center text-[10px] sm:text-[11px] uppercase tracking-wider text-[#721C2B] font-medium bg-[#721C2B]/5 border border-[#721C2B]/20 px-1.5 py-[1px] leading-tight shrink-0 whitespace-nowrap">
                {discountVal}% OFF
              </span>
            )}
          </div>

          {/* Color Swatch Previews */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 2).map((col) => (
                <span
                  key={col.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 2 && (
                <span className="text-[11px] text-[#736E66] font-mono leading-none">
                  +{product.colors.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mobile & Tablet Full-Width Action Button (Visible on screens < lg) */}
        <div className="lg:hidden mt-3 pt-2.5 border-t border-[#EAE4DC]/80">
          <button
            onClick={handleQuickAdd}
            className={`w-full h-9 sm:h-9.5 px-3 flex items-center justify-center gap-2 transition-all duration-300 shadow-2xs active:scale-[0.98] cursor-pointer ${
              isInBag
                ? 'bg-[#721C2B] text-white border border-[#C8A27A]/80'
                : 'bg-[#161616] hover:bg-[#721C2B] active:bg-[#721C2B] text-white border border-[#C8A27A]/30 hover:border-[#C8A27A]'
            }`}
          >
            {isInBag ? (
              <span className="text-[11px] sm:text-xs leading-none uppercase tracking-[0.16em] font-medium flex items-center gap-1.5 text-white whitespace-nowrap">
                <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#C8A27A]" />
                IN BAG
              </span>
            ) : (
              <span className="text-[11px] sm:text-xs leading-none uppercase tracking-[0.16em] font-medium flex items-center gap-1.5 text-[#FAF7F2] whitespace-nowrap">
                <ShoppingBag className="w-3.5 h-3.5 text-[#C8A27A] stroke-[1.5]" />
                ADD TO BAG
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
