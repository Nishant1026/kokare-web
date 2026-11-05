import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check } from 'lucide-react';

const CATEGORIES_LIST = ['All', 'Sarees', 'Kurtas', 'Lehengas', 'Sherwanis', 'Dresses', 'Jackets'];
const GENDERS_LIST = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' }
];
const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const COLORS_LIST = [
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Cashmere Alabaster', hex: '#FAF7F2' },
  { name: 'Champagne Rose Gold', hex: '#C8A27A' },
  { name: 'Deep Onyx', hex: '#161616' },
  { name: 'Royal Ruby', hex: '#721C2B' }
];

export default function FilterSidebar({
  filters,
  setFilters,
  resetFilters,
  isOpen,
  onClose,
  totalResults
}) {
  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? 'All' : cat
    }));
  };

  const handleGenderChange = (gen) => {
    setFilters((prev) => ({
      ...prev,
      gender: gen
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleColorToggle = (colorName) => {
    setFilters((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== colorName) : [...prev.colors, colorName]
      };
    });
  };

  const content = (
    <div className="space-y-6 text-[#161616]">
      {/* Active Filter Clear Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#161616]">
          Filters ({totalResults} Results)
        </span>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-[#736E66] hover:text-[#C8A27A] transition-colors font-light cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Gender Filter */}
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#161616] block mb-3">
          Gender
        </label>
        <div className="grid grid-cols-3 gap-2">
          {GENDERS_LIST.map((gen) => (
            <button
              key={gen.value}
              onClick={() => handleGenderChange(gen.value)}
              className={`py-2 px-3 text-xs tracking-wider uppercase transition-colors border cursor-pointer ${
                filters.gender === gen.value
                  ? 'bg-[#161616] text-white border-[#161616] font-normal'
                  : 'bg-white text-[#736E66] border-[#EAE4DC] hover:border-[#C8A27A]'
              }`}
            >
              {gen.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#161616] block mb-3">
          Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer border ${
                filters.category === cat
                  ? 'bg-[#161616] text-white border-[#161616] font-normal'
                  : 'bg-white text-[#736E66] border-[#EAE4DC] hover:border-[#C8A27A]'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#161616]">
            Price Range
          </label>
          <span className="font-serif text-sm font-normal text-[#161616]">
            Up to ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={15000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-[#161616] bg-[#EAE4DC] h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#736E66] font-mono mt-1 font-light">
          <span>₹2,000</span>
          <span>₹15,000</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#161616] block mb-2.5">
          Sizes
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SIZES_LIST.map((sz) => {
            const isSelected = filters.sizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => handleSizeToggle(sz)}
                className={`px-3 py-1.5 text-xs uppercase border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#161616] text-white border-[#161616]'
                    : 'bg-white text-[#736E66] border-[#EAE4DC] hover:border-[#C8A27A]'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shades */}
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#161616] block mb-2.5">
          Atelier Color Palette
        </label>
        <div className="space-y-1.5">
          {COLORS_LIST.map((col) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => handleColorToggle(col.name)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs border transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#161616] bg-[#FAF7F2]'
                    : 'border-[#EAE4DC] hover:border-[#C8A27A] bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-[#161616] font-light">{col.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#161616]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock & Minimum Discount */}
      <div className="pt-2 border-t border-[#EAE4DC] space-y-3">
        <label className="flex items-center gap-2.5 text-xs text-[#161616] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-[#161616]"
          />
          <span>In Stock Ready For Diwali Dispatch</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white p-6 border border-[#EAE4DC] shadow-2xs self-start sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer Filter */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 left-0 max-w-full flex">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="w-screen max-w-xs bg-white text-[#161616] shadow-2xl flex flex-col h-full border-r border-[#EAE4DC]"
              >
                <div className="px-5 py-4 border-b border-[#EAE4DC] flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#161616]">
                    Refine Silhouettes
                  </h3>
                  <button onClick={onClose} className="p-1 text-[#736E66]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5 flex-1 overflow-y-auto">{content}</div>
                <div className="p-4 border-t border-[#EAE4DC] bg-[#FAF7F2]">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-[#161616] text-white text-xs font-normal uppercase tracking-[0.2em] hover:bg-[#C8A27A] transition-colors"
                  >
                    View Results ({totalResults})
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
