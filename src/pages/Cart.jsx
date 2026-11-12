import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
  Heart,
  RotateCcw,
  Check,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const {
    cart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    addToCart
  } = useCart();

  const { addToWishlist } = useWishlist();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
      window.lenis.resize?.();
    }
  }, []);

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponCode;
    if (!code.trim()) return;
    const res = applyCoupon(code);
    setCouponMsg(res);
    if (res.success) setCouponCode('');
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  const freeShippingThreshold = 2999;
  const needForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Curated recommendations (Complete The Look)
  const cartIds = cart.map((item) => item.id);
  const recommendations = PRODUCTS.filter((p) => !cartIds.includes(p.id)).slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 text-[#161616] w-full max-w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-[#736E66] mb-6 flex items-center gap-2 font-light">
          <Link to="/" className="hover:text-[#C8A27A]">Home</Link>
          <span>/</span>
          <span className="text-[#161616] font-normal">Shopping Bag</span>
        </div>

        {/* Page Header */}
        <div className="border-b border-[#EAE4DC] pb-6 mb-10 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>The House of KOKARÉ · Festive Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#161616]">
              Shopping Bag
            </h1>
            <p className="text-[17px] text-[#736E66] mt-1 font-light">
              {totalItems} {totalItems === 1 ? 'handcrafted silhouette' : 'handcrafted silhouettes'} selected for Diwali 2026
            </p>
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-4 text-xs font-light">
              <Link
                to="/shop"
                className="text-[#161616] hover:text-[#C8A27A] underline underline-offset-4 transition-colors uppercase tracking-wider"
              >
                Continue Shopping
              </Link>
              <span className="text-[#EAE4DC]">|</span>
              <button
                onClick={clearCart}
                className="text-[#736E66] hover:text-red-500 underline underline-offset-4 transition-colors cursor-pointer"
              >
                Empty Bag
              </button>
            </div>
          )}
        </div>

        {/* Empty Bag State */}
        {cart.length === 0 ? (
          <div className="py-20 text-center max-w-xl mx-auto bg-white border border-[#EAE4DC] p-8 sm:p-14 shadow-2xs mb-20">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EAE4DC] flex items-center justify-center mx-auto mb-5 text-[#C8A27A]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl mb-2 text-[#161616] font-normal">
              Your Festive Bag is Empty
            </h2>
            <div className="w-12 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
            <p className="text-[17px] text-[#736E66] leading-relaxed mb-8 font-light max-w-md mx-auto">
              You haven’t added any celebratory silhouettes yet. Explore our handcrafted wild tussar silks, brocade sarees, and tailored ceremonial sherwanis.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/festive-collection"
                className="px-8 py-3.5 bg-[#161616] text-white hover:bg-[#C8A27A] text-xs font-normal uppercase tracking-[0.25em] transition-all border border-[#161616] hover:border-[#C8A27A]"
              >
                Diwali Festive Edit
              </Link>
              <Link
                to="/women"
                className="px-8 py-3.5 bg-white text-[#161616] hover:bg-[#FAF7F2] text-xs font-normal uppercase tracking-[0.25em] transition-all border border-[#EAE4DC]"
              >
                Women's Collection
              </Link>
              <Link
                to="/men"
                className="px-8 py-3.5 bg-white text-[#161616] hover:bg-[#FAF7F2] text-xs font-normal uppercase tracking-[0.25em] transition-all border border-[#EAE4DC]"
              >
                Men's Atelier
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
            
            {/* Left Items Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 sm:p-5 bg-white border border-[#EAE4DC] space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-light">
                  <div className="flex items-center gap-2 text-[#161616]">
                    <Truck className="w-4 h-4 text-[#C8A27A]" />
                    {needForFreeShipping === 0 ? (
                      <span className="font-medium text-[#C8A27A] uppercase tracking-wider">
                        Complimentary Insured Delivery Unlocked
                      </span>
                    ) : (
                      <span>
                        Add <strong className="font-medium text-[#161616]">₹{needForFreeShipping.toLocaleString('en-IN')}</strong> for Complimentary Express Air Shipping
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#736E66]">{shippingPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAF7F2] overflow-hidden">
                  <div
                    className="h-full bg-[#C8A27A] transition-all duration-500"
                    style={{ width: `${shippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item, idx) => {
                  const itemId = item.id || item.product?.id || `item-${idx}`;
                  const itemName = item.name || item.product?.name || 'Silk Silhouette';
                  const itemImg = item.images?.[0] || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';
                  const itemSize = item.selectedSize || item.size || 'Standard';
                  const itemColor = item.selectedColor || item.color || '';
                  const itemPrice = Number(item.price || item.product?.price || 0);
                  const itemQty = Number(item.quantity || 1);
                  const itemCategory = item.category || item.product?.category || 'Silks';
                  const itemGender = item.gender || item.product?.gender || 'women';

                  return (
                    <div
                      key={item.cartItemId || `${itemId}-${itemSize}-${itemColor}-${idx}`}
                      className="p-3.5 sm:p-6 bg-white border border-[#EAE4DC] flex flex-row gap-3.5 sm:gap-6 shadow-2xs group"
                    >
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${itemId}`}
                        className="w-20 h-28 sm:w-28 sm:h-36 bg-[#FAF7F2] shrink-0 border border-[#EAE4DC] overflow-hidden block"
                      >
                        <img
                          src={itemImg}
                          alt={itemName}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium block mb-1">
                                {itemCategory} · {itemGender.toUpperCase()}
                              </span>
                              <Link to={`/product/${itemId}`}>
                                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#161616] hover:text-[#C8A27A] transition-colors leading-tight">
                                  {itemName}
                                </h3>
                              </Link>
                            </div>

                            <span className="font-serif text-lg sm:text-xl text-[#161616] font-normal shrink-0">
                              ₹{(itemPrice * itemQty).toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Selected Specs */}
                          <div className="text-xs text-[#736E66] space-y-1 mt-2 font-light">
                            <p>
                              Size: <span className="font-normal text-[#161616]">{itemSize}</span>
                              {itemColor && (
                                <span className="ml-3">
                                  Shade: <span className="font-normal text-[#161616]">{itemColor}</span>
                                </span>
                              )}
                            </p>
                            <p className="font-serif italic text-[#C8A27A] text-[13px]">
                              {item.fabric || item.tagline || item.product?.fabric || item.product?.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Controls Row: Stepper, Move to Wishlist, Remove */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#EAE4DC] mt-3">
                          <div className="flex items-center border border-[#EAE4DC] bg-[#FAF7F2]">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartItemId || itemId, itemSize, itemColor, itemQty - 1)
                              }
                              className="px-3 py-1 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3.5 text-xs font-normal text-[#161616]">
                              {itemQty}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartItemId || itemId, itemSize, itemColor, itemQty + 1)
                              }
                              className="px-3 py-1 text-xs text-[#736E66] hover:text-[#161616] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-light">
                            <button
                              onClick={() => handleMoveToWishlist(item)}
                              className="flex items-center gap-1.5 text-[#736E66] hover:text-[#C8A27A] transition-colors cursor-pointer"
                              title="Move to Wishlist"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Save to Wishlist</span>
                            </button>

                            <button
                              onClick={() => removeFromCart(item.cartItemId || itemId, itemSize, itemColor)}
                              className="flex items-center gap-1.5 text-[#736E66] hover:text-red-500 transition-colors cursor-pointer"
                              title="Remove silhouette"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Summary Column (5 cols) — Sticky pinned on desktop so it stops while cart items scroll */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28 lg:self-start">
              
              {/* Order Summary Box */}
              <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] space-y-6 shadow-2xs">
                <h3 className="font-serif text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-4">
                  Order Summary
                </h3>

                {/* Subtotals */}
                <div className="space-y-3 text-sm text-[#736E66] font-light">
                  <div className="flex justify-between">
                    <span>Bag Value ({totalItems} items)</span>
                    <span className="text-[#161616] font-normal">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#C8A27A]">
                      <span>Festive Privilege Discount</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Courier Delivery</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-[#C8A27A] uppercase text-xs tracking-wider font-normal">
                          Complimentary
                        </span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-[#EAE4DC] pt-4 flex justify-between items-baseline text-[#161616]">
                    <span className="font-serif text-xl font-normal">Grand Total</span>
                    <span className="font-serif text-3xl font-normal">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#736E66] text-right font-light">
                    Inclusive of all central & state Goods & Services Tax (GST)
                  </p>
                </div>

                {/* Coupon Box & One-Click Pills */}
                <div className="pt-2 border-t border-[#EAE4DC] space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#161616] block font-normal">
                    Festive Privilege Codes
                  </span>

                  {/* One-click quick apply pills */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApplyCoupon('DIWALI20')}
                      className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                        appliedCoupon?.code === 'DIWALI20'
                          ? 'border-[#C8A27A] bg-[#C8A27A] text-white'
                          : 'border-[#EAE4DC] bg-[#FAF7F2] hover:border-[#C8A27A] text-[#161616]'
                      }`}
                    >
                      DIWALI20 (20% OFF)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('KOKARE10')}
                      className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                        appliedCoupon?.code === 'KOKARE10'
                          ? 'border-[#C8A27A] bg-[#C8A27A] text-white'
                          : 'border-[#EAE4DC] bg-[#FAF7F2] hover:border-[#C8A27A] text-[#161616]'
                      }`}
                    >
                      KOKARE10 (10% OFF)
                    </button>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3 bg-[#FAF7F2] border border-[#C8A27A]/40 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#C8A27A]" />
                        <span className="font-mono uppercase font-semibold text-[#161616]">
                          {appliedCoupon.code} applied ({appliedCoupon.discountPercent}% OFF)
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[11px] text-[#736E66] hover:text-red-500 uppercase tracking-wider underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleApplyCoupon(couponCode);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-xs font-mono uppercase text-[#161616] placeholder-[#736E66]/60 focus:outline-none focus:border-[#C8A27A]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#161616] text-white text-xs font-normal uppercase tracking-wider hover:bg-[#C8A27A] transition-colors border border-[#161616] hover:border-[#C8A27A] cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponMsg && (
                    <p
                      className={`text-xs mt-1.5 ${
                        couponMsg.success ? 'text-emerald-700' : 'text-red-500'
                      }`}
                    >
                      {couponMsg.message}
                    </p>
                  )}
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate('/checkout');
                    }}
                    className="w-full py-4 bg-[#721C2B] hover:bg-[#581422] text-white font-normal text-xs uppercase tracking-[0.28em] transition-all flex items-center justify-center gap-2 border border-[#721C2B] hover:border-[#581422] shadow-sm cursor-pointer"
                  >
                    <span>Proceed To Atelier Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <Link
                    to="/shop"
                    className="w-full py-3.5 bg-transparent hover:bg-[#FAF7F2] text-[#161616] font-normal text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center border border-[#EAE4DC]"
                  >
                    <span>Continue Exploring Collections</span>
                  </Link>
                </div>
              </div>

              {/* Delivery Guarantee Info */}
              <div className="p-4 sm:p-5 bg-white border border-[#EAE4DC] space-y-3 text-xs text-[#736E66] font-light">
                <div className="flex items-center gap-2.5 text-[#161616]">
                  <ShieldCheck className="w-4 h-4 text-[#C8A27A] shrink-0" />
                  <span className="font-normal">100% Certified Handloom Mark & Ahimsa Silk</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#161616]">
                  <Package className="w-4 h-4 text-[#C8A27A] shrink-0" />
                  <span className="font-normal">Shipped in Rigid Gold-Foiled Keepsake Preservation Box</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#161616]">
                  <RotateCcw className="w-4 h-4 text-[#C8A27A] shrink-0" />
                  <span className="font-normal">7-Day Complimentary Doorstep Exchange Available</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Curated Recommendations ("Complete Your Festive Look") */}
        {recommendations.length > 0 && (
          <div className="border-t border-[#EAE4DC] pt-16">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8A27A] font-medium block mb-1">
                Curated Pairings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#161616]">
                You May Also Admire
              </h2>
              <div className="w-12 h-[1.5px] bg-[#C8A27A] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
