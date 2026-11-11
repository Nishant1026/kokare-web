import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.gender.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase())
      );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative min-h-screen flex items-start justify-center pt-20 px-4 pb-12">
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white border border-[#EAE4DC] shadow-2xl p-6 text-[#161616] overflow-hidden"
            >
              {/* Header with Search Input */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
                <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3">
                  <Search className="w-5 h-5 text-[#C8A27A]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search wild tussar sarees, kurtas, bandhgalas, lehengas..."
                    className="w-full bg-transparent text-[#161616] placeholder-[#736E66]/60 focus:outline-none text-[17px] font-light"
                  />
                </form>
                <button
                  onClick={onClose}
                  className="p-1.5 border border-[#EAE4DC] hover:bg-[#FAF7F2] text-[#736E66] hover:text-[#161616] transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Popular Suggested Searches */}
              {query.trim() === '' && (
                <div className="pt-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#C8A27A] font-medium mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
                    <span>Popular Festive Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Silk Saree', 'Embroidered Kurta', 'Bandhgala', 'Nehru Jacket', 'Diwali 2026', 'Lehenga'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 bg-[#FAF7F2] border border-[#EAE4DC] text-xs uppercase tracking-wider text-[#161616] hover:border-[#C8A27A] hover:text-[#C8A27A] transition-colors font-light cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {query.trim() !== '' && (
                <div className="pt-4 max-h-96 overflow-y-auto divide-y divide-[#EAE4DC]">
                  {filteredProducts.length === 0 ? (
                    <div className="py-8 text-center text-sm text-[#736E66] font-light">
                      No silhouettes found matching "{query}".
                    </div>
                  ) : (
                    filteredProducts.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="py-3 flex items-center justify-between gap-4 hover:bg-[#FAF7F2] px-2 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-12 h-16 object-cover object-top border border-[#EAE4DC]"
                          />
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#C8A27A] block font-light">
                              {product.category}
                            </span>
                            <h4 className="font-serif text-[17px] sm:text-[18px] text-[#161616] font-normal">
                              {product.name}
                            </h4>
                            <p className="font-serif text-[15px] sm:text-[16px] text-[#736E66] font-light">
                              ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-[#736E66]" />
                      </div>
                    ))
                  )}

                  {filteredProducts.length > 0 && (
                    <div className="pt-3 text-center">
                      <button
                        onClick={handleSubmit}
                        className="text-xs uppercase tracking-wider text-[#C8A27A] hover:text-[#161616] font-medium"
                      >
                        View all {filteredProducts.length} results →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
