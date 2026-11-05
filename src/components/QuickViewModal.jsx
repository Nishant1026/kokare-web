import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Check, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { cart, addToCart, getCartItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setJustAdded(false);
  }, [product?.id, selectedSize, selectedColor]);

  const inBagQty = getCartItemQuantity(product.id, selectedSize, selectedColor);
  const isInBag = inBagQty > 0 || justAdded;

  const handleAddToCart = () => {
    if (isInBag) {
      onClose();
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

  const isFavorited = isInWishlist(product.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="min-h-screen px-4 flex items-center justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-white border border-[#EAE4DC] shadow-2xl overflow-hidden z-10 text-[#161616]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close Preview"
                className="absolute top-4 right-4 z-20 p-2 bg-white text-[#736E66] hover:text-[#161616] transition-colors border border-[#EAE4DC] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Images Gallery */}
                <div className="p-6 bg-[#FAF7F2] flex flex-col justify-between border-r border-[#EAE4DC]">
                  <div className="relative aspect-[3/4] overflow-hidden border border-[#EAE4DC] mb-3 bg-white">
                    <img
                      src={product.images[activeImageIndex] || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-[#161616] text-white text-[10px] uppercase font-normal tracking-[0.2em] px-2.5 py-1 border border-[#C8A27A]/40">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-14 h-16 overflow-hidden border shrink-0 transition-all cursor-pointer ${
                          activeImageIndex === i ? 'border-[#161616]' : 'border-[#EAE4DC] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-white space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium block mb-1">
                      {product.category} · {product.gender.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#161616] mb-1 leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-serif italic text-sm text-[#736E66] font-light mb-3">
                      {product.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4 pb-3 border-b border-[#EAE4DC]">
                      <span className="font-serif text-2xl font-normal text-[#161616]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#736E66] line-through font-light">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Color Swatch */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-4">
                        <span className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Shade: <strong className="text-[#C8A27A] font-medium">{selectedColor}</strong>
                        </span>
                        <div className="flex gap-2">
                          {product.colors.map((c) => (
                            <button
                              key={c.name}
                              onClick={() => setSelectedColor(c.name)}
                              className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                                selectedColor === c.name
                                  ? 'border-[#C8A27A] ring-1 ring-[#C8A27A] scale-110'
                                  : 'border-[#EAE4DC]'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size Selector */}
                    {product.sizes && (
                      <div className="mb-4">
                        <span className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Size
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedSize(s)}
                              className={`px-3 py-1.5 text-xs font-normal border transition-colors cursor-pointer ${
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
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs uppercase tracking-wider text-[#161616] font-normal">
                        Quantity
                      </span>
                      <div className="flex items-center border border-[#EAE4DC] bg-white">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-2.5 py-1 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-normal text-[#161616]">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-2.5 py-1 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions & In-Bag Status */}
                  <div className="space-y-2.5 pt-2 border-t border-[#EAE4DC]">
                    
                    {/* In-Bag Interactive Pill Banner */}
                    {isInBag && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 bg-[#FAF7F2] border border-[#C8A27A]/50 flex items-center justify-between text-xs text-[#161616]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span className="text-[12px]">
                            <strong>{inBagQty || quantity} in Bag</strong> · {selectedColor}, {selectedSize}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            navigate('/cart');
                          }}
                          className="text-[11px] font-medium text-[#C8A27A] hover:text-[#161616] uppercase tracking-wider underline cursor-pointer"
                        >
                          View Bag →
                        </button>
                      </motion.div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-3.5 font-normal text-xs uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                          isInBag
                            ? 'bg-[#161616] hover:bg-[#222222] text-white border-[#C8A27A] shadow-md'
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
                          className="px-3.5 py-3.5 border border-[#EAE4DC] hover:border-[#C8A27A] bg-white hover:bg-[#FAF7F2] text-[#161616] text-xs font-normal transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#C8A27A]" />
                          <span className="hidden sm:inline uppercase text-[10px] tracking-wider">+1 More</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-3.5 border transition-colors cursor-pointer ${
                          isFavorited
                            ? 'bg-[#161616] border-[#161616] text-[#C8A27A]'
                            : 'bg-white border-[#EAE4DC] text-[#736E66] hover:border-[#C8A27A]'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="block text-center text-xs uppercase tracking-wider text-[#736E66] hover:text-[#161616] underline underline-offset-4 pt-1 font-light"
                    >
                      View Complete Product Specifications →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
