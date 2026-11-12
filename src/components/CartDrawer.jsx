import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponInput('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    window.scrollTo(0, 0);
    navigate('/checkout');
  };

  const freeShippingThreshold = 2999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-8">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="w-[90vw] sm:w-[420px] max-w-md bg-white border-l border-[#EAE4DC] text-[#161616] shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[#EAE4DC] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#C8A27A]" />
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161616]">
                    Shopping Bag ({totalItems})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#736E66] hover:text-[#161616] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  aria-label="Close Bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FAF7F2] border-b border-[#EAE4DC]">
                <div className="flex items-center justify-between text-xs text-[#161616] mb-1 font-light">
                  <span>
                    {amountNeededForFreeShipping === 0 ? (
                      <strong className="text-[#C8A27A] font-medium uppercase tracking-wider">
                        Complimentary Insured Delivery Unlocked
                      </strong>
                    ) : (
                      <span>
                        Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} for Complimentary Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[15px] font-mono text-[#736E66]">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-[#EAE4DC] h-1.5 overflow-hidden">
                  <div
                    className="bg-[#C8A27A] h-1.5 transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 divide-y divide-[#EAE4DC]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-[#C8A27A]/60 mb-3" />
                    <h4 className="font-serif text-xl font-normal text-[#161616]">Your bag is empty</h4>
                    <p className="text-sm text-[#736E66] max-w-xs mt-1 mb-6 font-light">
                      Discover our latest festive & wedding collections for your celebrations.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="px-8 py-3 bg-[#161616] text-white text-xs font-normal uppercase tracking-[0.2em] hover:bg-[#C8A27A] transition-colors border border-[#161616] hover:border-[#C8A27A] cursor-pointer"
                    >
                      Explore Curations
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => {
                    const itemId = item.id || item.product?.id || `item-${idx}`;
                    const itemName = item.name || item.product?.name || 'Silk Silhouette';
                    const itemImg = item.images?.[0] || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';
                    const itemSize = item.selectedSize || item.size || 'Standard';
                    const itemColor = item.selectedColor || item.color || '';
                    const itemPrice = Number(item.price || item.product?.price || 0);
                    const itemQty = Number(item.quantity || 1);

                    return (
                      <div
                        key={item.cartItemId || `${itemId}-${itemSize}-${itemColor}-${idx}`}
                        className="py-4 flex gap-4"
                      >
                        <Link
                          to={`/product/${itemId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="w-16 h-22 bg-[#FAF7F2] shrink-0 border border-[#EAE4DC] overflow-hidden"
                        >
                          <img
                            src={itemImg}
                            alt={itemName}
                            className="w-full h-full object-cover object-top"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <Link
                                to={`/product/${itemId}`}
                                onClick={() => setIsCartOpen(false)}
                                className="font-serif text-sm font-normal text-[#161616] hover:text-[#C8A27A] transition-colors line-clamp-1"
                              >
                                {itemName}
                              </Link>
                              <button
                                onClick={() => removeFromCart(item.cartItemId || itemId, itemSize, itemColor)}
                                className="text-[#736E66] hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-[15px] text-[#736E66] space-y-0.5 mt-0.5 font-light">
                              <p>
                                Size: <span className="font-normal text-[#161616]">{itemSize}</span>
                                {itemColor && (
                                  <span className="ml-2">
                                    Shade: <span className="font-normal text-[#161616]">{itemColor}</span>
                                  </span>
                                )}
                              </p>
                              <p className="font-serif italic text-[#C8A27A]">{item.fabric || item.category || item.product?.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center border border-[#EAE4DC] bg-[#FAF7F2]">
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId || itemId, itemSize, itemColor, itemQty - 1)
                                }
                                className="px-2 py-0.5 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="px-2.5 text-xs font-normal text-[#161616]">
                                {itemQty}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartItemId || itemId, itemSize, itemColor, itemQty + 1)
                                }
                                className="px-2 py-0.5 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            <span className="font-serif text-sm font-normal text-[#161616]">
                              ₹{(itemPrice * itemQty).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-[#EAE4DC] bg-[#FAF7F2] space-y-3 sm:space-y-4">
                  
                  {/* Coupon Box */}
                  <div>
                    {appliedCoupon ? (
                      <div className="p-2.5 bg-white border border-[#C8A27A]/40 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-[#161616]">
                          <Tag className="w-4 h-4 text-[#C8A27A]" />
                          <span>
                            Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)
                          </span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-[#736E66] hover:text-red-500 text-xs underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon (e.g. FESTIVE20)"
                          className="flex-1 bg-white border border-[#EAE4DC] px-3.5 py-2 text-xs text-[#161616] placeholder-[#736E66]/60 focus:border-[#C8A27A] focus:outline-none uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#161616] text-white text-xs font-normal uppercase tracking-wider hover:bg-[#C8A27A] transition-colors border border-[#161616] hover:border-[#C8A27A] cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && (
                      <p className="text-[15px] text-red-500 mt-1">{couponError}</p>
                    )}
                    {couponSuccess && (
                      <p className="text-[15px] text-[#C8A27A] font-medium mt-1">{couponSuccess}</p>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-sm text-[#736E66] font-light">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#161616]">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#C8A27A]">
                        <span>Festive Discount</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[#161616]">
                        {shipping === 0 ? <span className="text-[#C8A27A] uppercase font-normal text-[15px] tracking-wider">Free</span> : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-normal text-[#161616] pt-2 border-t border-[#EAE4DC]">
                      <span>Total</span>
                      <span className="text-[#161616] font-serif text-xl font-normal">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 sm:py-4 bg-[#721C2B] hover:bg-[#581422] text-white font-normal text-xs tracking-[0.22em] sm:tracking-[0.28em] uppercase transition-all flex items-center justify-center gap-2 border border-[#721C2B] hover:border-[#581422] shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="block text-center text-xs text-[#736E66] hover:text-[#161616] transition-colors py-1 font-light"
                    >
                      View Full Bag & Delivery Details
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[15px] text-[#736E66] pt-1 uppercase tracking-wider font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C8A27A]" />
                    <span>100% Certified Authentic Handcrafted Haute Couture</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
