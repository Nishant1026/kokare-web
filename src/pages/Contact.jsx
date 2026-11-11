import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, Compass } from 'lucide-react';
import { ParallaxWatermark, FadeInUp } from '../components/Parallax';

const FAQS = [
  {
    q: 'How fast will my Diwali order be delivered?',
    a: 'Orders placed during our Diwali 2026 campaign are processed within 24 hours. Metro deliveries arrive in 2–3 business days, while standard pan-India delivery completes in 3–5 days.'
  },
  {
    q: 'What is included in the complimentary festive gift packaging?',
    a: 'Every Diwali order ships in a rigid keepsake box finished in warm alabaster and rose-gold foil, accompanied by a festive greeting card, cotton garment protector, and a handcrafted decorative brass diya.'
  },
  {
    q: 'What is your return or exchange policy during the festive season?',
    a: 'We offer a complimentary 7-day hassle-free return and exchange period. Garments must be unworn, with all original security tags and packaging intact.'
  },
  {
    q: 'Can I request bespoke size customization for bridal or wedding edits?',
    a: 'Yes. For our Wedding Stories and lehenga collections, our concierge atelier team can coordinate with your exact measurements. Reach out via email or WhatsApp.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Diwali Styling & Atelier Appointment',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen py-14 text-[#161616] overflow-x-clip">
      {/* Background Watermark Parallax */}
      <ParallaxWatermark text="CONCIERGE" speed={65} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A27A] block mb-2">
            Festive Concierge · The Jharkhand Edit
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-3 text-[#161616]">
            Connect With KOKARÉ
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C8A27A] mx-auto mb-4" />
          <p className="text-[17px] text-[#736E66] font-light leading-relaxed">
            Whether inquiring about silhouettes, booking a private atelier appointment, or tracking consignments, our concierge is delighted to assist you.
          </p>
        </div>

        {/* 2-Column Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Left Column: Atelier Address & Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#EAE4DC] shadow-2xs space-y-6">
              <h3 className="font-serif text-2xl font-normal border-b border-[#EAE4DC] pb-3 text-[#161616]">
                Atelier Headquarters
              </h3>

              <div className="space-y-5 text-sm font-light text-[#736E66]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#161616] block font-normal text-xs uppercase tracking-wider mb-0.5">
                      Flagship Boutique
                    </strong>
                    KOKARÉ Atelier, Circular Road, Lalpur, Ranchi, Jharkhand 834001, India
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#161616] block font-normal text-xs uppercase tracking-wider mb-0.5">
                      Client Phone & WhatsApp
                    </strong>
                    +91 98765 43210 (10 AM – 8 PM IST)
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#161616] block font-normal text-xs uppercase tracking-wider mb-0.5">
                      Styling & Concierge Email
                    </strong>
                    concierge@kokare.in
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#C8A27A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#161616] block font-normal text-xs uppercase tracking-wider mb-0.5">
                      Boutique Hours
                    </strong>
                    Monday – Saturday: 10:00 AM – 8:30 PM IST <br />
                    Sunday: By Private Festive Appointment
                  </div>
                </div>
              </div>
            </div>

            {/* Private Appointment Card */}
            <div className="bg-[#161616] text-white p-6 sm:p-8 border border-[#C8A27A]/40 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C8A27A]">
                <Compass className="w-4 h-4" />
                <span>Private Styling Session</span>
              </div>
              <h4 className="font-serif text-2xl font-normal text-white">
                Book An Atelier Visit
              </h4>
              <p className="text-[17px] text-white/80 font-light leading-relaxed">
                Experience our wild tussar silks and bespoke ceremonial draping in person with a dedicated master stylist at our Ranchi flagship.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Kokare%20Atelier,%20I%20would%20like%20to%20book%20a%20private%20styling%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 bg-white text-[#161616] text-xs font-normal uppercase tracking-wider hover:bg-[#C8A27A] hover:text-white transition-all"
                >
                  Schedule Via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 border border-[#EAE4DC] shadow-2xs">
              <h3 className="font-serif text-2xl font-normal text-[#161616] border-b border-[#EAE4DC] pb-4 mb-6">
                Send Us An Inquiry
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C8A27A]/40 flex items-center justify-center mx-auto text-[#C8A27A]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl font-normal text-[#161616]">Message Received</h4>
                  <p className="text-[17px] text-[#736E66] max-w-sm mx-auto font-light leading-relaxed">
                    Our atelier styling team will review your note and respond within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-[#161616] text-white text-xs uppercase tracking-wider hover:bg-[#C8A27A] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nishant Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A] cursor-pointer"
                      >
                        <option>Diwali Styling & Atelier Appointment</option>
                        <option>Bespoke Sizing & Custom Draping</option>
                        <option>Order Status & Dispatch Inquiries</option>
                        <option>Corporate & Bulk Gifting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#161616] block mb-1.5 font-normal">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Share your requirements or questions with our stylists..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE4DC] text-sm text-[#161616] focus:outline-none focus:border-[#C8A27A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#161616] hover:bg-[#721C2B] text-white font-normal text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 border border-[#161616] hover:border-[#721C2B] cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message To Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Accordion FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A27A] font-medium block mb-1">
              Curated Guidance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#161616]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAE4DC] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif text-lg text-[#161616] hover:text-[#C8A27A] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C8A27A] transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#736E66] font-light leading-relaxed border-t border-[#FAF7F2]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
