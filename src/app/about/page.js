import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { getSettings } from '@/lib/storage';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export const metadata = {
  title: 'About Ashok Yadav & Paras Property • Verified Plots in Jaipur',
  description: 'Learn about Ashok Yadav, Founder of Paras Property, and our decade-long commitment to verified land titles, transparent developer pricing, and high-yield real estate.',
};

export default async function AboutPage() {
  const settings = await getSettings();
  const ownerName = settings?.ownerName || 'Ashok Yadav';
  const ownerPhoto = settings?.ownerPhoto || '/images/ashok-yadav.jpg';
  const phone = settings?.phone || '+91 77426 50820';
  const whatsapp = settings?.whatsapp || '7742650820';

  const whatsappLink = getWhatsAppUrl(
    whatsapp,
    `Hi Ashok ji, I read about Paras Property and would like to consult with you about property investment.`
  );

  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-16 pb-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Integrity, Verification & Direct Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About Paras Property & {ownerName}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Founded with a mission to bring absolute transparency, zero legal risk, and direct developer pricing to land buyers across Jaipur.
        </p>
      </section>

      {/* Founder Profile Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Owner Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-4 border-amber-500 max-w-sm shadow-xl">
                <img
                  src={ownerPhoto}
                  alt={ownerName}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 backdrop-blur-xs p-3 text-center">
                  <span className="text-base font-extrabold text-white block">{ownerName}</span>
                  <span className="text-xs text-amber-400 font-bold block">
                    Founder, Paras Property
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Bio */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Founder’s Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                &quot;Land purchase should bring security, not anxiety.&quot;
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you buy property in Jaipur, you are not just investing money—you are securing your family’s future or building a cornerstone for your business. For over 10 years, I have seen buyers struggle with ambiguous land titles, undisclosed restrictions, and unfair broker markups.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At <strong className="text-white font-bold">Paras Property</strong>, every plot, villa, and commercial parcel listed in our catalog has been physically inspected, legal title verified from original revenue records, and approved for immediate registry and bank financing.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Ashok Yadav ({whatsapp})</span>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Our 4 Pillars of Trust
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Why homebuyers and investors rely on Paras Property.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Legal Title Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete scrutiny of revenue records, Jamabandi, Naksha, conversion order, and development authority sanctions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Developer Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No artificial markups, no surprise brokerage fees. Transparent per square foot and per Gaj pricing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Chauffeured Site Inspection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complimentary pick & drop for physical site inspection across Jaipur corridors accompanied by Ashok Yadav.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">Bank Loan & Registry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              End-to-end guidance for bank home loan approvals (up to 80%) with SBI, HDFC, and sub-registrar deed execution.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready to Explore Verified Plots?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Contact Ashok Yadav directly or browse available plots across Jaipur.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/properties"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            Explore Properties
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            WhatsApp Ashok Yadav
          </a>
        </div>
      </section>
    </div>
  );
}
