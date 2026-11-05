import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Sparkles,
  Ruler,
  Check,
  MapPin,
  ZoomIn,
  ShieldCheck
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, getCartItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [justAdded, setJustAdded] = useState(false);

  // PIN code checker state
  const [pincode, setPincode] = useState('');
  const [pinStatus, setPinStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(product.colors?.[0]?.name || 'Standard');
    setQuantity(1);
    setPinStatus(null);
    setJustAdded(false);
  }, [id, product]);

  const inBagQty = getCartItemQuantity(product.id, selectedSize, selectedColor);
  const isInBag = inBagQty > 0 || justAdded;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPinStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    setPinStatus({
      valid: true,
      message: `Delivering to PIN ${pincode} in 2–3 business days. Free Festive Delivery available.`
    });
  };

  const handleAddToCart = () => {
    if (isInBag) {
      navigate('/cart');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity, false);
    setJustAdded(true);
  };

  const handleAddAnother = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1, false);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity, false);
    navigate('/checkout');
  };

  const isFavorited = isInWishlist(product.id);

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 text-[#161616] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-[#736E66] mb-8 flex items-center gap-2 font-light">
          <Link to="/" className="hover:text-[#C8A27A]">Home</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#C8A27A]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#161616] font-normal truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all cursor-pointer ${
                    activeImage === idx
                      ? 'border-[#161616] ring-1 ring-[#161616]'
                      : 'border-[#EAE4DC] hover:border-[#C8A27A] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom */}
            <div
              className="relative flex-1 aspect-[3/4] bg-white border border-[#EAE4DC] overflow-hidden cursor-crosshair group shadow-sm"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-300"
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: isZoomed ? 'scale(1.8)' : 'scale(1)'
                }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.isBestseller && (
                  <span className="bg-[#161616] text-white text-[10px] font-normal uppercase tracking-[0.25em] px-3 py-1 border border-[#C8A27A]/40 shadow-xs">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-white text-[#161616] border border-[#EAE4DC] text-[10px] font-normal uppercase tracking-[0.25em] px-3 py-1 shadow-xs">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Zoom Instruction */}
              <div className="absolute bottom-4 right-4 bg-white/90 text-[#161616] p-2 text-xs flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity border border-[#EAE4DC] pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="text-[11px] uppercase tracking-wider hidden sm:inline">Hover to inspect silk weave</span>
              </div>
            </div>

          </div>

          {/* Right Column: Silhouette Details & Buy Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#C8A27A] font-medium mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
                <span>The Jharkhand Edit · Diwali 2026</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161616] tracking-tight leading-tight mb-2">
                {product.name}
              </h1>

              <p className="font-serif italic text-lg text-[#736E66] font-light">
                {product.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-[#EAE4DC] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-[#161616]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#736E66] line-through font-light">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] text-[#C8A27A] font-medium bg-[#FAF7F2] border border-[#EAE4DC] px-2.5 py-0.5 tracking-wider uppercase ml-auto">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-wider text-[#161616] block mb-2 font-normal">
                  Selected Shade: <strong className="text-[#C8A27A] font-medium">{selectedColor}</strong>
                </label>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#C8A27A] scale-110 shadow-xs ring-1 ring-[#C8A27A]'
                          : 'border-[#EAE4DC] hover:border-[#C8A27A]'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' || c.hex === '#FAF7F2' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes & Size Guide Button */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-[#161616] font-normal">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs text-[#161616] hover:text-[#C8A27A] underline underline-offset-4 font-light cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#C8A27A]" />
                  <span>Size Measurement Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-normal border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#161616] text-white border-[#161616]'
                        : 'bg-white text-[#161616] border-[#EAE4DC] hover:border-[#C8A27A]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs uppercase tracking-wider text-[#161616] font-normal">
                Quantity
              </label>
              <div className="flex items-center border border-[#EAE4DC] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-sm text-[#736E66] hover:text-[#161616] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3.5 text-sm font-normal text-[#161616]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-sm text-[#736E66] hover:text-[#161616] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag, Buy Now, Wishlist */}
            <div className="space-y-3 pt-2">
              
              {/* In-Bag Interactive Status Banner */}
              {isInBag && (
                <div className="p-3 bg-[#FAF7F2] border border-[#C8A27A]/50 flex items-center justify-between text-xs text-[#161616]">
                  <div className="flex items-center gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-[12px]">
                      <strong>{inBagQty || quantity} in Bag</strong> · {selectedColor}, {selectedSize}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/cart')}
                    className="text-[11px] font-medium text-[#C8A27A] hover:text-[#161616] uppercase tracking-wider underline cursor-pointer"
                  >
                    View Bag →
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 font-normal text-xs tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 border shadow-xs cursor-pointer ${
                    isInBag
                      ? 'bg-[#161616] hover:bg-[#222222] text-white border-[#C8A27A]'
                      : 'bg-[#161616] hover:bg-[#721C2B] text-white border-[#161616] hover:border-[#721C2B]'
                  }`}
                >
                  {isInBag ? (
                    <div className="flex items-center justify-center gap-2.5">
                      <div className="relative flex items-center justify-center">
                        <ShoppingBag className="w-4.5 h-4.5 text-[#C8A27A]" />
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-[2px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      </div>
                      <span className="font-medium text-[#FAF7F2] tracking-[0.22em]">
                        IN BAG ({inBagQty || quantity}) · VIEW BAG →
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag</span>
                    </div>
                  )}
                </button>

                {isInBag && (
                  <button
                    onClick={handleAddAnother}
                    title="Add another piece of this size/shade to bag"
                    className="px-4 py-4 border border-[#EAE4DC] hover:border-[#C8A27A] bg-white hover:bg-[#FAF7F2] text-[#161616] text-xs font-normal transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span className="text-[#C8A27A] font-bold text-sm">+</span>
                    <span className="hidden sm:inline uppercase text-[10px] tracking-wider">1 More</span>
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-colors cursor-pointer ${
                    isFavorited
                      ? 'bg-[#161616] border-[#161616] text-[#C8A27A]'
                      : 'bg-white border-[#EAE4DC] text-[#736E66] hover:text-[#C8A27A] hover:border-[#C8A27A]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#721C2B] hover:bg-[#581422] text-white border border-[#721C2B] hover:border-[#581422] font-normal text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer shadow-xs"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Delivery Pincode Checker UI */}
            <div className="p-4 sm:p-5 bg-white border border-[#EAE4DC] space-y-2">
              <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-[#161616]">
                <Truck className="w-4 h-4 text-[#C8A27A]" />
                <span>Festive Delivery Estimate</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#736E66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code (e.g. 834001)"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] placeholder-[#736E66]/60 focus:outline-none focus:border-[#C8A27A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#161616] text-white text-xs font-normal uppercase tracking-wider hover:bg-[#C8A27A] transition-colors border border-[#161616] hover:border-[#C8A27A] cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pinStatus && (
                <p
                  className={`text-xs mt-1.5 ${
                    pinStatus.valid ? 'text-[#161616]' : 'text-red-500'
                  }`}
                >
                  {pinStatus.message}
                </p>
              )}
            </div>

            {/* Atelier Trust Features */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#736E66] font-light">
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#EAE4DC]">
                <ShieldCheck className="w-4 h-4 text-[#C8A27A]" />
                <span>100% Certified Silk Mark</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#EAE4DC]">
                <RotateCcw className="w-4 h-4 text-[#C8A27A]" />
                <span>7-Day Keepsake Exchange</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Fabric & Craft Specifications */}
        <div className="mb-20 bg-white border border-[#EAE4DC] p-6 sm:p-10 shadow-2xs">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#161616] font-normal mb-6 border-b border-[#EAE4DC] pb-4">
            Fabric & Textile Craftsmanship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#736E66]">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#161616] font-normal mb-2">Weave & Origin</h4>
              <p className="text-sm font-light leading-relaxed">
                Hand-woven on traditional pit looms in Jharkhand using 100% pure wild tussar and mulberry silk yarns. The fabric undergoes natural washing to yield an organic, luminous drape.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#161616] font-normal mb-2">Ornamentation</h4>
              <p className="text-sm font-light leading-relaxed">
                Intricate zardozi and antique champagne-gold zari borders sculpted with floral bel motifs. Created by hereditary master artisans over 40+ hours of hand embroidery.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#161616] font-normal mb-2">Atelier Care Instructions</h4>
              <p className="text-sm font-light leading-relaxed">
                Dry clean only. Store in the complimentary KOKARÉ breathable cotton keepsake cover. Preserve with dry neem leaves and avoid direct sunlight exposure.
              </p>
            </div>
          </div>
        </div>

        {/* Related Silhouettes */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium block mb-1">
                Complementary Curations
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#161616]">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
