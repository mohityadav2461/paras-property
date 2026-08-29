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
  Check,
  Clock,
  Navigation
} from 'lucide-react';
import PropertyCard from '@/components/public/PropertyCard';
import HomeEnquiryForm from '@/components/public/HomeEnquiryForm';
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
    `Hello Ashok ji & Balbir ji, I visited the Paras Property website and would like to consult about verified plot options in Jaipur.`
  );

  const teamMembers = [
    {
      name: 'Ashok Yadav',
      role: 'Founder & Property Consultant',
      badge: '★ Founder',
      photo: '/images/ashok-yadav.jpg',
      bio: 'Over a decade of hands-on expertise in prime residential plots, commercial lands, gated townships, and direct developer pricing across Kotputli & Jaipur.',
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
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HOME / HERO SECTION (CLEAN, DIRECT & MODERN)                           */}
      {/* ========================================================================= */}
      <section id="home" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 sm:pt-24 pb-28 sm:pb-36 scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.18),rgba(255,255,255,0))]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Kotputli & Jaipur’s Trusted Real Estate Advisory</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Find Your Verified Plot with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              Paras Properties
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct advisory with <strong className="text-white font-semibold">Ashok Yadav</strong> & <strong className="text-white font-semibold">Adv. Balbir Singh</strong>. Verified residential plots, commercial lands, and luxury townships with 100% legal clarity.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#properties"
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-98 inline-flex items-center gap-2"
            >
              <span>Explore Verified Plots</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-colors inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Free Site Visit</span>
            </a>
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

      {/* QUICK CORRIDOR SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Browse Properties by Corridor
              </h3>
              <p className="text-xs text-slate-500">
                Handpicked inventory with clear title deeds and immediate registry.
              </p>
            </div>

            <a
              href="#properties"
              className="text-xs font-bold text-amber-700 hover:underline self-start sm:self-auto"
            >
              View Below ↓
            </a>
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

      {/* ========================================================================= */}
      {/* 2. PROPERTIES SECTION (VERIFIED PLOTS PORTFOLIO)                          */}
      {/* ========================================================================= */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
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
            <span>View Full Catalog</span>
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

      {/* ========================================================================= */}
      {/* 3. OFFICE SECTION (KOTPUTLI & JAIPUR PHYSICAL OFFICE)                     */}
      {/* ========================================================================= */}
      <section id="office" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Physical Presence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Visit Our Kotputli Office
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Walk in for face-to-face consultation, revenue map verification, and registry guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Office Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Kotputli Headquarters</h3>
                  <span className="text-xs text-amber-600 font-semibold">Kotputli - Jaipur Corridor</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Exact GPS Coordinates & Address:</strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      27°47&apos;15.1&quot;N 76°13&apos;57.5&quot;E, Kotputli, Rajasthan 303108
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Visiting Hours:</strong>
                    <span className="text-xs text-slate-600">
                      Monday to Sunday: 9:00 AM – 7:30 PM (All 7 Days Open)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">On-Site Services:</strong>
                    <span className="text-xs text-slate-600">
                      Original Patta verification, Jamabandi registry check, map sanction review, and free chauffeured site visit pickup.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href="https://www.google.com/maps/place/27%C2%B047'15.1%22N+76%C2%B013'57.5%22E/@27.787777,76.230226,18z/data=!4m4!3m3!8m2!3d27.787535!4d76.23264?hl=en&entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps (Get Driving Directions)</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+917742650820"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Office</span>
                </a>

                <a
                  href={getWhatsAppUrl('7742650820', 'Hi Ashok ji, I want to visit your Kotputli office.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[350px] sm:min-h-[420px] relative">
            <iframe
              title="Paras Properties Kotputli Office Map"
              src="https://maps.google.com/maps?q=27.787535,76.23264&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE TRUSTED PART (CLIENT TESTIMONIALS & 4 PILLARS OF TRUST)            */}
      {/* ========================================================================= */}
      <section id="trust" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
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

        {/* 3 Customer Reviews */}
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
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
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

        {/* 4 Pillars of Legal & Financial Trust */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Guaranteed Protections
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why Jaipur Land Buyers Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              { title: 'Legal Title Scrutiny', desc: 'Adv. Balbir Singh checks 30-year revenue chain & encumbrances.' },
              { title: 'Free Chauffeured Visits', desc: 'Pick & drop for physical site inspection across Jaipur.' },
              { title: 'Direct Developer Rates', desc: 'No broker markups or hidden fees with Ashok Yadav.' },
              { title: 'Bank Loan Sanctioning', desc: '80% loan assistance with SBI, HDFC & ICICI Bank.' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TEAM VALA PART & DIRECT ENQUIRY / BOOKING                              */}
      {/* ========================================================================= */}
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>Direct Leadership & Legal Verification</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Meet Our Leadership Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Personalized property consultation with Ashok Yadav & legal title assurance with Adv. Balbir Singh.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, idx) => {
            const whatsappUrl = getWhatsAppUrl(
              member.whatsapp,
              `Hello ${member.name}, I visited the Paras Property website and would like to consult about plot options in Jaipur.`
            );

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-amber-400 transition-all"
              >
                <div className="space-y-4">
                  {/* Teammate Photo */}
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md bg-slate-100">
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
                    <h3 className="text-xl font-extrabold text-slate-900">{member.name}</h3>
                    <p className="text-xs text-amber-600 font-bold">{member.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Teammate Direct Contact Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${member.phone}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Directly</span>
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

        {/* ========================================================================= */}
        {/* INTERACTIVE ENQUIRY & SITE VISIT BOOKING FORM                             */}
        {/* ========================================================================= */}
        <div id="contact" className="max-w-3xl mx-auto pt-6 scroll-mt-24">
          <HomeEnquiryForm />
        </div>
      </section>
    </div>
  );
}
