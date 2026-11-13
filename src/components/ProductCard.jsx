import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const ProductCard = memo(function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, getProductTotalInCart } = useCart();

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
              decoding="async"
              width="400"
              height="533"
            />
            {secondaryImg && secondaryImg !== primaryImg && (
              <img
                src={secondaryImg}
                alt={`${product.name} alternate view`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                decoding="async"
                width="400"
                height="533"
              />
            )}
          </Link>

          {/* Badges: Bestseller / New / In Bag / Festive Privilege */}
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none max-w-[85%]">
            {isInBag && (
              <span className="bg-[#161616] text-[#C8A27A] border border-[#C8A27A]/80 text-[11px] sm:text-xs font-medium uppercase tracking-[0.14em] px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-xs flex items-center gap-1 backdrop-blur-xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>In Bag ({totalInBag})</span>
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#161616] text-white text-[11px] sm:text-xs font-normal uppercase tracking-[0.14em] px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-xs border border-[#C8A27A]/40 whitespace-nowrap">
                Bestseller
              </span>
            )}
            {product.isNew && !product.isBestseller && (
              <span className="bg-white text-[#161616] border border-[#EAE4DC] text-[11px] sm:text-xs font-normal uppercase tracking-[0.14em] px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-xs whitespace-nowrap">
                New Arrival
              </span>
            )}
            {discountVal > 0 && !product.isBestseller && !product.isNew && (
              <span className="bg-[#721C2B] text-[#FAF7F2] border border-[#C8A27A]/40 text-[11px] sm:text-xs font-normal uppercase tracking-[0.14em] px-2 py-0.5 sm:px-2.5 sm:py-1 shadow-xs backdrop-blur-xs flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-[#C8A27A] shrink-0" />
                <span>{discountVal}% Offer</span>
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/95 text-[#161616] hover:text-[#C8A27A] backdrop-blur-sm border border-[#C8A27A]/30 hover:border-[#C8A27A] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90"
          >
            <motion.div whileTap={{ scale: 0.85 }}>
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  isFavorited ? 'fill-[#C8A27A] text-[#C8A27A]' : 'text-[#161616]'
                }`}
              />
            </motion.div>
          </button>

          {/* Mobile & Tablet View Details Icon (Bottom Right of Image) */}
          <Link
            to={`/product/${product.id}`}
            aria-label={`View ${product.name} Details`}
            title="View Details"
            className="xl:hidden absolute bottom-2 right-2 z-10 w-8.5 h-8.5 rounded-full bg-white/95 text-[#161616] hover:text-[#C8A27A] backdrop-blur-sm border border-[#C8A27A]/30 hover:border-[#C8A27A] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
          </Link>

          {/* Desktop Hover Action Bar (Visible on xl screens with mouse hover) */}
          <div
            className={`hidden xl:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent items-center justify-center gap-2 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <Link
              to={`/product/${product.id}`}
              className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#161616] text-[12px] sm:text-[13px] font-normal uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Link>
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
        <div className="p-3 sm:p-4.5 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Category / Collection Tag — Balanced single line with zero awkward breaking */}
            <div className="flex items-center justify-between gap-1 mb-1 font-light">
              <span className="text-xs sm:text-[14px] uppercase tracking-[0.12em] text-[#161616] font-medium truncate">
                {product.category}
              </span>
              <span className="text-xs sm:text-[14px] uppercase tracking-[0.12em] text-[#C8A27A] font-medium shrink-0 whitespace-nowrap">
                {product.collection === 'festive-edit' ? 'Festive' : 'Fashion'}
              </span>
            </div>

            {/* Product Name (Strict 15px - 17px Editorial Typography) */}
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-serif text-[15px] sm:text-[17px] font-normal text-[#161616] group-hover:text-[#C8A27A] transition-colors leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Fabric Tagline */}
            <p className="text-[13px] sm:text-[15px] text-[#736E66] font-light mt-0.5 sm:mt-1 line-clamp-1">
              {product.fabric || product.tagline}
            </p>
          </div>

          {/* Pricing & Offers Showcase */}
          <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-3 border-t border-[#EAE4DC] flex items-center justify-between gap-1">
            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
              <span className="font-serif text-[15px] sm:text-[17px] text-[#161616] font-normal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[15px] text-[#736E66] line-through font-light">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountVal > 0 && (
                <span className="inline-flex items-center text-[15px] uppercase tracking-wider text-[#721C2B] font-medium bg-[#FBF1F2] border border-[#721C2B]/25 px-1.5 py-[1px] leading-tight shrink-0 whitespace-nowrap">
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
                  <span className="text-[15px] text-[#736E66] font-mono leading-none">
                    +{product.colors.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mobile & Tablet Full-Width Action Button — Sleek Luxury Atelier Styling */}
          <div className="xl:hidden mt-3 pt-2.5 border-t border-[#EAE4DC]/80">
            <button
              onClick={handleQuickAdd}
              className={`w-full h-9 sm:h-10 px-3 flex items-center justify-center gap-2 transition-all duration-300 shadow-xs active:scale-[0.98] cursor-pointer ${
                isInBag
                  ? 'bg-[#721C2B] text-white border border-[#C8A27A]/80 shadow-[0_0_12px_rgba(200,162,122,0.25)]'
                  : 'bg-[#161616] hover:bg-[#721C2B] active:bg-[#721C2B] text-white border border-[#C8A27A]/40 hover:border-[#C8A27A]'
              }`}
            >
              {isInBag ? (
                <span className="text-xs sm:text-[13px] leading-none uppercase tracking-[0.14em] font-medium flex items-center gap-1.5 text-white whitespace-nowrap">
                  <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#C8A27A]" />
                  IN BAG
                </span>
              ) : (
                <span className="text-xs sm:text-[13px] leading-none uppercase tracking-[0.14em] font-medium flex items-center gap-1.5 text-[#FAF7F2] whitespace-nowrap">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C8A27A] stroke-[1.5]" />
                  ADD TO BAG
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
  );
});

export default ProductCard;
