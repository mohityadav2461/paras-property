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
  UserCheck,
  Compass,
  Check
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

  const defaultWhatsAppLink = getWhatsAppUrl(
    whatsappNumber,
    `Hello, I visited the Paras Property website and would like to consult about verified plot options in Jaipur.`
  );

  const teamMembers = [
    {
      name: 'Ashok Yadav',
      role: 'Founder & Property Consultant',
      badge: '★ Founder',
      photo: '/images/ashok-yadav.jpg',
      bio: 'Over a decade of hands-on expertise in prime residential plots, commercial lands, gated townships, and direct developer pricing across Jaipur.',
      phone: '+91 77426 50820',
      whatsapp: '7742650820',
    },
    {
      name: 'Adv. Balbir Singh',
      role: 'Legal Advisor & Title Scrutiny',
      badge: '★ Legal Consultant',
      photo: '/images/adv-balbir-singh.jpg',
      bio: 'Advocate specializing in complete legal title verification, 30-year revenue record scrutiny, Jamabandi, Naksha approvals, and registry execution.',
      phone: '+91 70827 95453',
      whatsapp: '7082795453',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* 1. SIMPLE & MODERN HERO SECTION (CLEAN TOP, NO TOP CONTACT CLUTTER) */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 sm:pt-24 pb-28 sm:pb-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.18),rgba(255,255,255,0))]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Find Your Perfect Plot with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              Paras Properties
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct advisory with <strong className="text-white font-semibold">Ashok Yadav</strong> & <strong className="text-white font-semibold">Adv. Balbir Singh</strong>. Verified residential plots, commercial lands, and luxury townships in Jaipur with complete legal clarity.
          </p>

          {/* Clean Primary Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/properties"
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-98 inline-flex items-center gap-2"
            >
              <span>Explore Verified Plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-colors"
            >
              About Our Team
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">500+</span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Happy Plot Owners</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Clear Legal Deeds</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">0%</span>
              <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Brokerage Markup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH CORRIDOR BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Browse Properties by Jaipur Corridor
              </h3>
              <p className="text-xs text-slate-500">
                Handpicked and verified inventory with clear legal titles.
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
                <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-amber-600 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-bold text-slate-800 group-hover:text-amber-900">
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
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

      {/* 4. MEET BOTH TEAMMATES SECTION (PHOTOS BELOW ON FRONT PAGE) */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Direct Leadership & Legal Verification</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Meet Our Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Personalized property consultation with Ashok Yadav & legal title assurance with Adv. Balbir Singh.
            </p>
          </div>

          {/* Cards for Both Teammates with Their Respective Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, idx) => {
              const whatsappUrl = getWhatsAppUrl(
                member.whatsapp,
                `Hello ${member.name}, I visited the Paras Property website and would like to consult about plot options in Jaipur.`
              );

              return (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-amber-500/50 transition-all"
                >
                  <div className="space-y-4">
                    {/* Teammate Photo */}
                    <div className="relative w-full aspect-square max-w-[220px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md bg-slate-900">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-xs py-1 text-center">
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          {member.badge}
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="text-center space-y-1.5">
                      <h3 className="text-xl font-extrabold text-white">{member.name}</h3>
                      <p className="text-xs text-amber-400 font-semibold">{member.role}</p>
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Teammate Direct Contact Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
                    <a
                      href={`tel:${member.phone}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call {member.whatsapp}</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4 Pillars of Trust Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
            {[
              { title: 'Legal Title Verification', desc: 'Adv. Balbir Singh inspects 30-year revenue chain & encumbrances.' },
              { title: 'Free Chauffeured Visits', desc: 'Pick & drop for physical site inspection across Jaipur.' },
              { title: 'Direct Developer Rates', desc: 'No broker markups or hidden fees with Ashok Yadav.' },
              { title: 'Bank Loan Sanctioning', desc: '80% loan assistance with SBI, HDFC & ICICI.' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
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
            Read what our clients say about their purchasing experience with Ashok Yadav & Adv. Balbir Singh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Neeraj Mathur',
              location: 'Jagatpura Plot Buyer',
              text: 'Ashok Yadav and Adv. Balbir Singh made the entire registry and mutation process completely stress-free. Adv. Balbir personally verified all documents before we paid any booking advance.',
            },
            {
              name: 'Suresh Choudhary',
              location: 'Ajmer Road Corner Plot',
              text: 'Found an incredible 200 sq yard corner plot near Mahindra SEZ. Direct developer pricing with zero brokerage drama. Highly recommended team!',
            },
            {
              name: 'Vikramaditya Rathore',
              location: 'Commercial Land Investor',
              text: 'Investing in Tonk Road highway commercial land with Paras Property gave our family exceptional rental returns. Ashok Yadav and Adv. Balbir Singh are true professionals.',
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white border border-slate-800 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Plan a Free Site Visit This Weekend
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Experience the plots, road connectivity, and surrounding infrastructure firsthand with Ashok Yadav & Adv. Balbir Singh.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
            {/* Top Row: Enquiry Button */}
            <div className="w-full flex justify-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98 text-center"
              >
                Book Free Site Visit
              </Link>
            </div>

            {/* Second Row: Both WhatsApp Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl('7742650820', 'Hi Ashok ji, I would like to schedule a site visit.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Ashok (7742650820)</span>
              </a>

              <a
                href={getWhatsAppUrl('7082795453', 'Hi Adv. Balbir ji, I would like to consult about plot options.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Adv. Balbir (7082795453)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
