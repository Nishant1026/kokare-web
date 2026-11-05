import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Lock,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, subtotal, discount, shipping, total, appliedCoupon, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Nishant',
    lastName: 'Kumar',
    email: 'nishant@example.com',
    phone: '9876543210',
    address: '42, Heritage Enclave, Morabadi',
    city: 'Ranchi',
    state: 'Jharkhand',
    pincode: '834008',
    paymentMethod: 'upi',
    upiId: 'nishant@okhdfcbank'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `KOKARE-DWL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    clearCart();
  };

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center py-20 px-4 text-center text-[#161616]">
        <div className="max-w-md bg-white p-8 sm:p-12 border border-[#EAE4DC] shadow-2xs">
          <Package className="w-12 h-12 text-[#C8A27A] mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl mb-2 font-normal">No items in your bag</h2>
          <p className="text-[16px] text-[#736E66] mb-6 font-light">
            Please add silhouettes to your cart before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-[#161616] text-white text-xs font-normal uppercase tracking-[0.25em] hover:bg-[#C8A27A] transition-colors border border-[#161616] hover:border-[#C8A27A]"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 text-[#161616] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Order Confirmation Screen */}
        <AnimatePresence>
          {orderConfirmed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white border border-[#EAE4DC] p-8 sm:p-14 text-center shadow-2xs"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#C8A27A]/40 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#C8A27A]" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8A27A] font-medium block mb-1">
                Order Placed Successfully
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-3 text-[#161616]">
                Celebrate Your Story
              </h2>
              <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />

              <p className="text-[17px] text-[#736E66] max-w-md mx-auto mb-6 font-light">
                Thank you for welcoming KOKARÉ into your celebratory rituals. Your artisanal order has been registered at our Ranchi atelier.
              </p>

              <div className="p-4 bg-[#FAF7F2] border border-[#EAE4DC] max-w-sm mx-auto mb-8 text-left space-y-1.5 text-xs text-[#736E66] font-light">
                <div className="flex justify-between">
                  <span>Consignment ID:</span>
                  <strong className="font-mono text-[#161616] font-medium">{orderId}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Client Name:</span>
                  <span className="text-[#161616]">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="text-[#161616]">{formData.city}, {formData.pincode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="text-[#C8A27A] font-medium uppercase">Confirmed (UPI)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to={`/track-order?id=${orderId}`}
                  className="px-8 py-3.5 bg-[#161616] hover:bg-[#C8A27A] text-white text-xs font-normal uppercase tracking-[0.25em] transition-all border border-[#161616] hover:border-[#C8A27A]"
                >
                  Track Consignment
                </Link>
                <Link
                  to="/"
                  className="px-8 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#161616] border border-[#EAE4DC] text-xs font-normal uppercase tracking-[0.25em] transition-all"
                >
                  Return To Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Header */}
              <div className="border-b border-[#EAE4DC] pb-6 mb-10">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
                  <span>The Jharkhand Edit · Bespoke Order</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#161616]">
                  Atelier Checkout
                </h1>
                <p className="text-[17px] text-[#736E66] mt-1 font-light">
                  Please provide your dispatch details and preferred settlement channel.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Form Column (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Contact Information */}
                  <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] space-y-4 shadow-2xs">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-3">
                      1. Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] space-y-4 shadow-2xs">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-3">
                      2. Shipping Address
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] space-y-4 shadow-2xs">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-3">
                      3. Settlement Channel
                    </h3>

                    <div className="space-y-3">
                      {[
                        { id: 'upi', title: 'Instant UPI (Google Pay, PhonePe, Paytm)', desc: 'Zero surcharge · Instant confirmation' },
                        { id: 'card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Amex' },
                        { id: 'netbanking', title: 'Net Banking', desc: 'All leading Indian scheduled banks' },
                        { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Available for orders up to ₹25,000' }
                      ].map((p) => (
                        <label
                          key={p.id}
                          className={`flex items-start gap-3 p-4 border transition-all cursor-pointer ${
                            formData.paymentMethod === p.id
                              ? 'border-[#161616] bg-[#FAF7F2]'
                              : 'border-[#EAE4DC] hover:border-[#C8A27A]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={p.id}
                            checked={formData.paymentMethod === p.id}
                            onChange={handleChange}
                            className="mt-1 accent-[#161616]"
                          />
                          <div>
                            <span className="font-serif text-base font-normal text-[#161616] block">
                              {p.title}
                            </span>
                            <span className="text-xs text-[#736E66] font-light">{p.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {formData.paymentMethod === 'upi' && (
                      <div className="pt-2">
                        <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                          Enter UPI Virtual Payment Address (VPA)
                        </label>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleChange}
                          placeholder="username@okhdfcbank"
                          className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                        />
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Summary Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="bg-white p-6 sm:p-7 border border-[#EAE4DC] space-y-5 shadow-2xs">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-4">
                      Bag Summary ({cart.length})
                    </h3>

                    {/* Compact Item Review */}
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                      {cart.map((item, idx) => {
                        const itemId = item.id || item.product?.id || `item-${idx}`;
                        const itemName = item.name || item.product?.name || 'Silk Silhouette';
                        const itemImg = item.images?.[0] || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85';
                        const itemSize = item.selectedSize || item.size || 'Standard';
                        const itemPrice = Number(item.price || item.product?.price || 0);
                        const itemQty = Number(item.quantity || 1);

                        return (
                          <div
                            key={item.cartItemId || `${itemId}-${itemSize}-${idx}`}
                            className="flex gap-3 text-xs pb-3 border-b border-[#EAE4DC]"
                          >
                            <img
                              src={itemImg}
                              alt={itemName}
                              className="w-12 h-16 object-cover object-top border border-[#EAE4DC] shrink-0"
                            />
                            <div className="flex-1">
                              <p className="font-serif text-sm font-normal text-[#161616] line-clamp-1">
                                {itemName}
                              </p>
                              <p className="text-[#736E66] font-light">
                                Qty: {itemQty} · Size: {itemSize}
                              </p>
                              <p className="font-serif text-sm text-[#161616] mt-1 font-normal">
                                ₹{(itemPrice * itemQty).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 text-sm text-[#736E66] font-light pt-2">
                      <div className="flex justify-between">
                        <span>Bag Value</span>
                        <span className="text-[#161616]">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-[#C8A27A]">
                          <span>Festive Discount</span>
                          <span>-₹{discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Insured Courier</span>
                        <span className="text-[#C8A27A] uppercase text-xs tracking-wider">
                          {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                        </span>
                      </div>

                      <div className="border-t border-[#EAE4DC] pt-3 flex justify-between items-baseline text-[#161616]">
                        <span className="font-serif text-lg font-normal">Grand Total</span>
                        <span className="font-serif text-2xl font-normal">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#721C2B] hover:bg-[#581422] text-white font-normal text-xs uppercase tracking-[0.28em] transition-all flex items-center justify-center gap-2 border border-[#721C2B] hover:border-[#581422] shadow-sm cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Place Order</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#736E66] font-light text-center">
                      <ShieldCheck className="w-4 h-4 text-[#C8A27A]" />
                      <span>Encrypted SSL Atelier Security</span>
                    </div>

                  </div>

                </div>

              </form>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
