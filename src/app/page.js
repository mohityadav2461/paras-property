import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Search, 
  Star, 
  Sparkles,
  Calendar,
  UserCheck
} from 'lucide-react';
import PropertyCard from '@/components/public/PropertyCard';
import { getProperties, getSettings } from '@/lib/storage';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export const revalidate = 60;

export default async function HomePage() {
  const [properties, settings] = await Promise.all([
    getProperties(),
    getSettings(),
  ]);

  const featuredProperties = properties
    .filter((p) => p.isFeatured && p.status !== 'Hidden')
    .slice(0, 6);

  const phone = settings?.phone || '+91 77426 50820';
  const whatsappNumber = settings?.whatsapp || '7742650820';
  const ownerName = settings?.ownerName || 'Ashok Yadav';
  const ownerPhoto = settings?.ownerPhoto || '/images/ashok-yadav.jpg';

  const defaultWhatsAppLink = getWhatsAppUrl(
    whatsappNumber,
    `Hello Ashok ji, I visited the Paras Property website and would like to consult with you about verified plot options in Jaipur.`
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION WITH ASHOK YADAV SPOTLIGHT */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Legal Title & Registry Verified Land</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Find Your Perfect Plot with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                  Paras Property
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Direct consultation with <strong className="text-white font-bold">{ownerName}</strong>. Verified residential plots, commercial showroom lands, and luxury gated township properties in Jaipur&apos;s fastest growing corridors.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/properties"
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98 inline-flex items-center gap-2"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={defaultWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Ashok Yadav</span>
                </a>

                <Link
                  href="/contact"
                  className="px-5 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Contact Office</span>
                </Link>
              </div>

              {/* Key Trust Counters */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block">500+</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Happy Plot Owners</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-white block">100%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Clear Legal Deeds</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block">0%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Brokerage Markup</span>
                </div>
              </div>
            </div>

            {/* Right Column: Owner Card with Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Background Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-3xl blur-md opacity-40" />

                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
                  <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-3 border-amber-500 shadow-lg">
                    <img
                      src={ownerPhoto}
                      alt={ownerName}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs py-1 text-center">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                        ★ Verified Consultant
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-white">{ownerName}</h3>
                    <p className="text-xs text-amber-400 font-bold">
                      {settings?.ownerRole || 'Founder & Property Consultant'}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      &quot;Direct title deeds, verified township approvals, and honest pricing with complete peace of mind.&quot;
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`tel:${phone}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call {phone}</span>
                    </a>

                    <a
                      href={defaultWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Chat with Ashok Yadav</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH / CORRIDOR SELECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Search Properties by Corridor & Type
              </h3>
              <p className="text-xs text-slate-500">
                Browse verified inventory handpicked by Ashok Yadav.
              </p>
            </div>

            <Link
              href="/properties"
              className="text-xs font-bold text-amber-700 hover:underline self-start sm:self-auto"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Jagatpura Corridor', query: 'Jagatpura', desc: 'Township Plots & Villas' },
              { name: 'Ajmer Road Expressway', query: 'Ajmer Road', desc: 'SEZ Plots & Corner Lands' },
              { name: 'Tonk Road Highway', query: 'Tonk Road', desc: 'Commercial Showrooms' },
              { name: 'Mansarovar & Kukas', query: 'Mansarovar', desc: 'Villas & Farmhouses' },
            ].map((loc, idx) => (
              <Link
                key={idx}
                href={`/properties?location=${encodeURIComponent(loc.query)}`}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-400 transition-all text-left group"
              >
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-amber-600 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-amber-900">
                    {loc.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{loc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
              Handpicked Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Featured Plots & Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              100% verified legal documentation, clear title deeds, and ready for immediate registry.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors shrink-0"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            Properties currently updating. Please check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id || property.slug} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 4. MEET ASHOK YADAV & TRUST PILLARS */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-500/50 shadow-2xl max-w-sm">
                <img
                  src={ownerPhoto}
                  alt={ownerName}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                  <span className="text-lg font-extrabold text-white block">{ownerName}</span>
                  <span className="text-xs text-amber-400 font-bold block">
                    Founder, Paras Property
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Direct Owner Commitment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Why Buy Through Paras Property?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {settings?.ownerMessage ||
                  'With over a decade of hands-on experience in prime residential plots, commercial lands, and gated townships across Jaipur, my personal commitment at Paras Property is to ensure 100% legal title verification, direct developer pricing, and a smooth registry experience for every buyer.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Title Deed Scrutiny', desc: 'Every plot inspected for 30-year chain and zero encumbrance.' },
                  { title: 'Free Chauffeured Visits', desc: 'Complimentary pick & drop for physical site inspection.' },
                  { title: 'Direct Developer Rates', desc: 'No artificial broker markups or hidden fees.' },
                  { title: 'Bank Loan Sanctioning', desc: 'Associated with SBI, HDFC, and ICICI for 80% financing.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={defaultWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Talk with Ashok Yadav (7742650820)</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Trusted by Hundreds of Land Buyers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Read what our clients say about their purchasing experience with Ashok Yadav.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Neeraj Mathur',
              location: 'Jagatpura Plot Buyer',
              text: 'Ashok ji made the entire registry and mutation process completely stress-free. He personally verified all documents before we paid any booking advance.',
            },
            {
              name: 'Suresh Choudhary',
              location: 'Ajmer Road Corner Plot',
              text: 'Found an incredible 200 sq yard corner plot near Mahindra SEZ. Direct owner pricing with zero brokerage drama. Highly recommended!',
            },
            {
              name: 'Vikramaditya Rathore',
              location: 'Commercial Land Investor',
              text: 'Investing in Tonk Road highway commercial land with Paras Property gave our family exceptional rental returns. Ashok Yadav is a gentleman of integrity.',
            },
          ].map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block">{rev.name}</span>
                <span className="text-[11px] text-slate-400 block">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white border border-slate-800 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Plan a Free Site Visit This Weekend
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience the plots, road connectivity, and surrounding infrastructure firsthand. Ashok Yadav personally coordinates site inspections.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-colors"
            >
              Book Free Site Visit
            </Link>

            <a
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Ashok Yadav</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
