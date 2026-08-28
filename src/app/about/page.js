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
  title: 'About Ashok Yadav & Adv. Balbir Singh • Paras Property Jaipur',
  description: 'Learn about Ashok Yadav (Founder) and Adv. Balbir Singh (Legal Advisor) at Paras Property, committed to 100% legal title verification and direct developer pricing in Jaipur.',
};

export default async function AboutPage() {
  const ashokWhatsApp = getWhatsAppUrl(
    '7742650820',
    `Hello Ashok ji, I read about Paras Property and would like to consult with you about property investment in Jaipur.`
  );

  const balbirWhatsApp = getWhatsAppUrl(
    '7082795453',
    `Hello Adv. Balbir ji, I would like to consult with you regarding legal verification and plot options in Jaipur.`
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
          About Paras Property & Leadership Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Founded with a mission to bring absolute transparency, zero legal risk, and direct developer pricing to land buyers across Jaipur.
        </p>
      </section>

      {/* Leadership Profile Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Meet the Founders & Leadership Team
          </h2>
          <p className="text-sm text-slate-600">
            Over a decade of combined expertise in Jaipur real estate, legal scrutiny, and transparent property acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Teammate 1: Ashok Yadav */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative w-full aspect-square max-w-[240px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-sm bg-slate-100">
                <img
                  src="/images/ashok-yadav.jpg"
                  alt="Ashok Yadav"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-xs py-1 text-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    ★ Founder & Property Consultant
                  </span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Ashok Yadav</h3>
                <p className="text-xs text-amber-700 font-bold">Founder & Property Consultant</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Specializes in residential and commercial land acquisition, verified township plots across Jaipur growth corridors, and honest direct pricing with zero broker markup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
              <a
                href="tel:+917742650820"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call 7742650820</span>
              </a>

              <a
                href={ashokWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Teammate 2: Adv. Balbir Singh */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative w-full aspect-square max-w-[240px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-sm bg-slate-100">
                <img
                  src="/images/adv-balbir-singh.jpg"
                  alt="Adv. Balbir Singh"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-xs py-1 text-center">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    ★ Advocate & Legal Consultant
                  </span>
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Adv. Balbir Singh</h3>
                <p className="text-xs text-amber-700 font-bold">Legal Advisor & Title Scrutiny Specialist</p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Advocate specializing in complete 30-year legal title verification, Jamabandi/Naksha examination, government conversion approvals, registry execution, and client legal protection.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
              <a
                href="tel:+917082795453"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call 7082795453</span>
              </a>

              <a
                href={balbirWhatsApp}
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
              Complete scrutiny of revenue records, Jamabandi, Naksha, conversion order, and development authority sanctions by Adv. Balbir Singh.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Developer Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No artificial markups, no surprise brokerage fees. Transparent per square foot and per Gaj pricing with Ashok Yadav.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Chauffeured Site Inspection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complimentary pick & drop for physical site inspection across Jaipur corridors accompanied by our advisors.
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
        <p className="text-sm text-slate-600 leading-relaxed">
          Contact Ashok Yadav & Adv. Balbir Singh directly or browse available plots across Jaipur.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/properties"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
          >
            Explore Properties
          </Link>
          <a
            href={ashokWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Ashok</span>
          </a>
          <a
            href={balbirWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Adv. Balbir</span>
          </a>
        </div>
      </section>
    </div>
  );
}
