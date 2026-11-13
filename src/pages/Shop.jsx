import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { FadeInUp, ParallaxReveal, ParallaxWatermark } from '../components/Parallax';

export default function Shop({ defaultCategory, defaultGender, defaultType, defaultCollection, isNewArrivals, isBestSellers, pageTitle, pageSubtitle }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // URL parameters
  const paramSearch = searchParams.get('search') || '';
  const paramCategory = searchParams.get('category') || defaultCategory || 'All';
  const paramGender = searchParams.get('gender') || defaultGender || 'all';
  const paramCollection = searchParams.get('collection') || defaultCollection || 'all';
  const paramType = searchParams.get('type') || defaultType || 'all';

  const [filters, setFilters] = useState({
    category: paramCategory,
    gender: paramGender,
    collection: paramCollection,
    type: paramType,
    maxPrice: 15000,
    sizes: [],
    colors: [],
    inStockOnly: false,
    minDiscount: 0
  });

  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
      window.lenis.resize?.();
    }
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || defaultCategory || 'All',
      gender: searchParams.get('gender') || defaultGender || 'all',
      collection: searchParams.get('collection') || defaultCollection || 'all',
      type: searchParams.get('type') || defaultType || 'all'
    }));
  }, [searchParams, defaultCategory, defaultGender, defaultCollection, defaultType]);

  const resetFilters = () => {
    setFilters({
      category: 'All',
      gender: 'all',
      collection: 'all',
      type: 'all',
      maxPrice: 15000,
      sizes: [],
      colors: [],
      inStockOnly: false,
      minDiscount: 0
    });
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query
    if (paramSearch.trim()) {
      const q = paramSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Gender
    if (filters.gender !== 'all') {
      list = list.filter((p) => p.gender.toLowerCase() === filters.gender.toLowerCase());
    }

    // Category
    if (filters.category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Collection
    if (filters.collection !== 'all') {
      if (filters.collection === 'festive-edit' || filters.collection === 'diwali') {
        list = list.filter((p) => p.collection === 'festive-edit');
      } else {
        list = list.filter((p) => p.collection === filters.collection);
      }
    }

    // Type (Ethnic / Western)
    if (filters.type !== 'all') {
      list = list.filter((p) => p.type === filters.type);
    }

    // New Arrivals page flag
    if (isNewArrivals) {
      list = list.filter((p) => p.isNew);
    }

    // Best Sellers page flag
    if (isBestSellers) {
      list = list.filter((p) => p.isBestseller);
    }

    // Price
    list = list.filter((p) => p.price <= filters.maxPrice);

    // Sizes
    if (filters.sizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }

    // Colors
    if (filters.colors.length > 0) {
      list = list.filter((p) => p.colors?.some((c) => filters.colors.includes(c.name)));
    }

    // In Stock
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Min Discount
    if (filters.minDiscount > 0) {
      list = list.filter((p) => (p.discountPercent || 0) >= filters.minDiscount);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bestseller':
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        // recommended
        break;
    }

    return list;
  }, [filters, sortBy, paramSearch, isNewArrivals, isBestSellers]);

  const title =
    pageTitle ||
    (paramSearch
      ? `Search results for "${paramSearch}"`
      : filters.category !== 'All'
      ? `${filters.category}`
      : filters.gender === 'women'
      ? "Women's Collection"
      : filters.gender === 'men'
      ? "Men's Collection"
      : filters.type === 'ethnic'
      ? 'Ethnic Wear Collection'
      : filters.type === 'western'
      ? 'Western Fusion Edit'
      : filters.collection === 'festive-edit' || filters.collection === 'diwali'
      ? 'The All Festival & Wedding Edit 2026'
      : 'All Fashion Collections');

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen py-10 text-[#161616] w-full max-w-full overflow-x-clip">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="ATELIER" speed={65} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title Banner */}
        <FadeInUp className="mb-10 text-center sm:text-left border-b border-[#EAE4DC] pb-8">
          <div className="inline-flex items-center gap-1.5 text-[15px] font-medium uppercase tracking-[0.2em] text-[#C8A27A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>{pageSubtitle || 'The Ethnic Edit · All Festival & Wedding Fashion'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#161616] tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-[17px] text-[#736E66] tracking-normal font-light max-w-xl">
            Showing {filteredAndSortedProducts.length} curated pieces crafted in rich mulberry silks, wild tussar weaves, and antique rose-gold zari borders.
          </p>
        </FadeInUp>

        {/* Filter Controls Bar (Single row on mobile & desktop) */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3 sm:p-4 border border-[#EAE4DC] shadow-2xs">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-[#161616] text-white text-[15px] font-normal uppercase tracking-[0.16em] hover:bg-[#721C2B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span className="text-[15px] leading-none uppercase tracking-[0.14em]">
              Filters ({filteredAndSortedProducts.length})
            </span>
          </button>

          {/* Desktop Product Count */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-[#736E66] font-light">
            <span>Displaying</span>
            <strong className="text-[#C8A27A] font-medium">{filteredAndSortedProducts.length}</strong>
            <span>silhouettes</span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs uppercase tracking-wider text-[#736E66] font-light hidden sm:inline">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF7F2] text-[#161616] border border-[#EAE4DC] px-3 py-2 text-xs focus:outline-none focus:border-[#C8A27A] cursor-pointer appearance-none pr-7 font-light"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
                <option value="bestseller">Best Selling</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#C8A27A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar (Sticky on Left) + Products Grid (Scrolling on Right) */}
        <div className="flex gap-8 items-start relative">
          {/* Sticky Left Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            totalResults={filteredAndSortedProducts.length}
          />

          {/* Scrolling Right Products Grid */}
          <div className="flex-1 min-w-0">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-[#EAE4DC] p-8 shadow-2xs">
                <Sparkles className="w-8 h-8 text-[#C8A27A] mx-auto mb-3 opacity-60" />
                <h3 className="font-serif text-2xl text-[#161616] mb-2 font-normal">No matching silhouettes found</h3>
                <p className="text-[17px] text-[#736E66] max-w-sm mx-auto mb-6 font-light leading-relaxed">
                  Try broadening your filter criteria or clear selected filters to explore our full collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-8 py-3.5 bg-[#161616] hover:bg-[#721C2B] text-white text-xs font-normal uppercase tracking-[0.25em] transition-colors cursor-pointer border border-[#161616] hover:border-[#721C2B]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredAndSortedProducts.map((p, idx) => (
                  <ParallaxReveal
                    key={p.id}
                    delay={(idx % 3) * 0.05}
                    speed={idx % 2 === 0 ? 20 : -20}
                  >
                    <ProductCard product={p} />
                  </ParallaxReveal>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
