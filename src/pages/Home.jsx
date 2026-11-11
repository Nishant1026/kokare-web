import React from 'react';
import Hero from '../components/Hero';
import EditorialIntro from '../components/EditorialIntro';
import CollectionBanner from '../components/CollectionBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import FestiveCampaign from '../components/FestiveCampaign';
import DiwaliOfferSection from '../components/DiwaliOfferSection';
import BrandStory from '../components/BrandStory';
import CustomerReviews from '../components/CustomerReviews';
import InstagramGallery from '../components/InstagramGallery';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="bg-[#FAF7F2] text-[#161616] w-full max-w-full overflow-x-clip">
      {/* 1. Hero Section (Zoya Lookbook Composition) */}
      <Hero />

      {/* 2. Editorial Introduction */}
      <EditorialIntro />

      {/* 3. Shop by Collection (Zoya Asymmetric Editorial Grid) */}
      <CollectionBanner />

      {/* 4. Shop by Category (6 Categories) */}
      <CategoryGrid />

      {/* 5. Bestsellers Product Grid ("THE PIECES EVERYONE LOVES") */}
      <ProductGrid
        title="THE PIECES EVERYONE LOVES"
        subtitle="Diwali Festive Collection 2026"
        limit={8}
        showTabs={true}
      />

      {/* 6. Festive Campaign ("CELEBRATE IN TIMELESS GRACE") */}
      <FestiveCampaign />

      {/* 7. Diwali Special Offer ("A LITTLE MORE JOY, A LITTLE MORE STYLE") */}
      <DiwaliOfferSection />

      {/* 8. Brand Story ("ROOTED IN JHARKHAND. MADE FOR THE WORLD.") */}
      <BrandStory />

      {/* 9. Patron Testimonials */}
      <CustomerReviews />

      {/* 10. Instagram Lookbook Gallery */}
      <InstagramGallery />

      {/* 11. Newsletter */}
      <Newsletter />
    </div>
  );
}
