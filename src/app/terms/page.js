import React from 'react';
import { getSettings } from '@/lib/storage';

export const metadata = {
  title: 'Terms of Service • Haven Realty & Plots',
  description: 'Terms and conditions governing the use of our property exploration platform and real estate advisory services.',
};

export default async function TermsPage() {
  const settings = await getSettings();
  const company = settings?.companyName || 'Haven Realty & Plots';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing {company}, exploring property listings, or submitting an enquiry, you agree to comply with and be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Property Information & Availability</h2>
          <p>
            While all property dimensions, prices, facing orientations, and legal clearances are verified with utmost diligence, property availability remains subject to prior reservation or sale. Buyers are encouraged to inspect official registry documents during site visits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Advisory Scope</h2>
          <p>
            {company} provides property facilitation and advisory services. Final purchase terms, sale deed executions, and bank financing agreements are formalized through legally binding contracts.
          </p>
        </section>
      </div>
    </div>
  );
}
