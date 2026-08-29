'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { getStoredUtmData } from '@/components/public/UtmTracker';
import { trackMetaLead } from '@/components/public/MetaPixel';

export default function HomeEnquiryForm() {
  const { showToast } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Name and phone number are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const utmData = getStoredUtmData();
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        budget: formData.budget,
        message: formData.message.trim(),
        propertyTitle: 'Home Page Direct Enquiry / Site Visit',
        source: utmData.utmSource ? `${utmData.utmSource.toUpperCase()} Ad` : 'Home Page Form',
        utmSource: utmData.utmSource || '',
        utmMedium: utmData.utmMedium || '',
        utmCampaign: utmData.utmCampaign || '',
        utmContent: utmData.utmContent || '',
        utmTerm: utmData.utmTerm || '',
        landingPage: utmData.landingPage || '/',
        referrer: utmData.referrer || (typeof document !== 'undefined' ? document.referrer : '') || '',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      trackMetaLead({
        propertyTitle: 'Home Page Enquiry',
        value: 0,
      });

      setIsSuccess(true);
      showToast('Enquiry received! Ashok & Balbir Singh will reach out shortly.', 'success');
      setFormData({ name: '', phone: '', email: '', budget: '', message: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-white">Enquiry Successfully Submitted!</h4>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Thank you! Ashok Yadav & Adv. Balbir Singh have received your details and will call you shortly to assist with plot verification and schedule your free site visit.
        </p>
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getWhatsAppUrl('7742650820', 'Hi Ashok ji, I just submitted an enquiry on the website.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
          >
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-left">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Book a Free Site Visit / Enquiry
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Direct consultation with Ashok Yadav & legal advisory with Adv. Balbir Singh.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Your Full Name <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Phone Number <span className="text-amber-400">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 98290 12345"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="e.g. ramesh@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Approximate Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
          >
            <option value="">Select your budget</option>
            <option value="Under ₹25 Lakh">Under ₹25 Lakh</option>
            <option value="₹25 - 50 Lakh">₹25 - 50 Lakh</option>
            <option value="₹50 Lakh - 1 Crore">₹50 Lakh - 1 Crore</option>
            <option value="₹1 - 2 Crore">₹1 - 2 Crore</option>
            <option value="Above ₹2 Crore">Above ₹2 Crore</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1.5">
          Requirement or Message
        </label>
        <textarea
          rows={3}
          placeholder="Tell us what size, corridor (Jagatpura, Ajmer Road, Tonk Road), or weekend site visit time you prefer..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-extrabold text-sm shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Submitting Enquiry...' : 'Book Free Site Visit & Consultation'}</span>
      </button>

      <p className="text-[11px] text-slate-500 text-center">
        🔒 100% confidential. No spam calls. Direct contact with Ashok Yadav & Adv. Balbir Singh.
      </p>
    </form>
  );
}
