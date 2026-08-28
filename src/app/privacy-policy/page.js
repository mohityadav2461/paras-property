import React from 'react';
import { getSettings } from '@/lib/storage';

export const metadata = {
  title: 'Privacy Policy • Haven Realty & Plots',
  description: 'Our privacy practices and commitment to safeguarding customer data for real estate enquiries and Meta advertisement traffic.',
};

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();
  const company = settings?.companyName || 'Haven Realty & Plots';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you visit {company} or submit an enquiry on our website (including visitors arriving via Facebook, Instagram, or Google advertisements), we collect information necessary to assist your real estate request, such as your full name, phone number, email address, budget preference, and property interests.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to communicate property specifications, arrange site visits, coordinate loan and legal paperwork, and provide customer support via Phone, WhatsApp, and Email. We do not sell or rent your personal contact information to third-party marketing telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cookies & Meta Pixel Advertising Tracking</h2>
          <p>
            Our website uses session identifiers, UTM campaign parameters, and analytics cookies (such as Meta Pixel and Google Analytics) to assess advertisement campaign performance, optimize user experience, and measure conversion effectiveness.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Contact & Opt-Out</h2>
          <p>
            If you wish to update your details or request removal from our property update lists, please contact us at{' '}
            <a href={`mailto:${settings?.email || 'contact@havenrealty.com'}`} className="text-emerald-700 underline">
              {settings?.email || 'contact@havenrealty.com'}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
