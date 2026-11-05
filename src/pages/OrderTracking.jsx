import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  Search,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function OrderTracking() {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');

  const [orderIdInput, setOrderIdInput] = useState(urlId || 'KOKARE-DWL-78421');
  const [activeOrder, setActiveOrder] = useState(urlId || 'KOKARE-DWL-78421');

  useEffect(() => {
    if (urlId) {
      setOrderIdInput(urlId);
      setActiveOrder(urlId);
    }
  }, [urlId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setActiveOrder(orderIdInput.trim());
    }
  };

  const TRACKING_STEPS = [
    {
      title: 'Order Confirmed & Atelier Hand-Selection',
      time: 'Today, 10:15 AM',
      location: 'KOKARÉ Atelier, Ranchi, JH',
      completed: true,
      current: false,
      desc: 'Silhouettes verified by our textile specialists for flawless zari alignment.'
    },
    {
      title: 'Heirloom Festive Keepsake Packaging',
      time: 'Today, 02:30 PM',
      location: 'Central Dispatch Studio, Ranchi',
      completed: true,
      current: false,
      desc: 'Packaged in rigid warm alabaster and rose-gold keepsake box with ceremonial brass diya.'
    },
    {
      title: 'Handed Over to Express Air Courier',
      time: 'Today, 06:45 PM',
      location: 'Birsa Munda Express Cargo Hub',
      completed: true,
      current: true,
      desc: 'In transit via BlueDart Air Festive Priority (Waybill #BLU-8924018).'
    },
    {
      title: 'Out for Festive Delivery',
      time: 'Expected Tomorrow by 02:00 PM',
      location: 'Destination Delivery Hub',
      completed: false,
      current: false,
      desc: 'Courier associate will call prior to final doorstep delivery.'
    },
    {
      title: 'Delivered to Doorstep',
      time: 'Estimated Nov 6, 2026',
      location: 'Patron Residence',
      completed: false,
      current: false,
      desc: 'Signature delivery confirmed.'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-14 text-[#161616]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>Real-time Logistics · The Jharkhand Edit</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-3 text-[#161616]">
            Track Your Festive Order
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[17px] text-[#736E66] font-light leading-relaxed">
            Monitor the dispatch and express transit of your handcrafted KOKARÉ celebratory garments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] shadow-2xs mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#736E66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                placeholder="Enter Consignment ID (e.g. KOKARE-DWL-78421)"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] font-mono uppercase placeholder-[#736E66]/60 focus:outline-none focus:border-[#C8A27A]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#161616] hover:bg-[#721C2B] text-white text-xs font-normal uppercase tracking-[0.25em] transition-all border border-[#161616] hover:border-[#721C2B] cursor-pointer"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Live Order Timeline Card */}
        <div className="bg-white border border-[#EAE4DC] p-6 sm:p-10 shadow-2xs space-y-8">
          
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-[#EAE4DC]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#736E66] font-light block">
                Consignment Reference
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-normal text-[#161616]">
                {activeOrder}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 font-medium">
                In Transit · Express BlueDart Air
              </span>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="relative pl-6 sm:pl-8 space-y-8 border-l border-[#EAE4DC]">
            {TRACKING_STEPS.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Node Indicator */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.completed
                      ? 'bg-[#161616] border-[#161616] text-[#C8A27A]'
                      : 'bg-white border-[#EAE4DC] text-[#736E66]'
                  } ${step.current ? 'ring-4 ring-[#C8A27A]/25' : ''}`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAE4DC]" />
                  )}
                </div>

                {/* Step Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-[#161616]">
                      {step.title}
                    </h4>
                    <span className="text-xs font-mono text-[#736E66] font-light">
                      {step.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#C8A27A] mt-1 font-light">
                    <MapPin className="w-3 h-3" />
                    <span>{step.location}</span>
                  </div>

                  <p className="text-xs text-[#736E66] mt-1.5 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Help Banner */}
          <div className="pt-6 border-t border-[#EAE4DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E66] font-light">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A27A]" />
              <span>Complimentary insured shipping on all Diwali 2026 consignments.</span>
            </div>
            <Link
              to="/contact"
              className="text-[#161616] hover:text-[#C8A27A] underline underline-offset-4 uppercase tracking-wider font-normal"
            >
              Contact Dispatch Concierge →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
