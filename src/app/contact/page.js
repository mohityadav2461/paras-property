'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { getStoredUtmData } from '@/components/public/UtmTracker';
import { trackMetaLead } from '@/components/public/MetaPixel';

export default function ContactPage() {
  const { settings, showToast } = useSettings();

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

  const phone = settings?.phone || '+91 77426 50820';
  const whatsappNumber = settings?.whatsapp || '7742650820';
  const ownerName = settings?.ownerName || 'Ashok & Balbir Singh';

  const whatsappLink = getWhatsAppUrl(
    whatsappNumber,
    `Hello Ashok ji & Balbir ji, I would like to schedule a site visit and discuss available plot listings on Paras Property.`
  );

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
        propertyTitle: 'General Contact Page Enquiry',
        source: utmData.utmSource ? `${utmData.utmSource.toUpperCase()} Ad` : 'Contact Page',
        utmSource: utmData.utmSource || '',
        utmMedium: utmData.utmMedium || '',
        utmCampaign: utmData.utmCampaign || '',
        utmContent: utmData.utmContent || '',
        utmTerm: utmData.utmTerm || '',
        landingPage: utmData.landingPage || '/contact',
        referrer: utmData.referrer || document.referrer || '',
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
        propertyTitle: 'Contact Page Enquiry',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 pb-24 md:pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contact Paras Properties • Kotputli & Jaipur
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Schedule a personalized site inspection, request verified revenue documents, or consult directly on land investment with Ashok Yadav & Adv. Balbir Singh.
        </p>
      </div>

      {/* Main Grid: Contact Cards + Lead Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Contact Details for Both Teammates (1 col) */}
        <div className="space-y-5">
          {/* Ashok Yadav Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-3.5">
              <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-amber-500 shadow-xs bg-slate-100">
                <img
                  src="/images/ashok-yadav.jpg"
                  alt="Ashok Yadav"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 leading-tight">Ashok Yadav</h3>
                <span className="text-xs text-amber-600 font-bold block mt-0.5">
                  Founder & Property Consultant
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Kotputli & Jaipur Acquisitions</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+917742650820"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call Directly</span>
              </a>

              <a
                href={getWhatsAppUrl('7742650820', 'Hi Ashok ji, I would like to schedule a site visit and discuss available plot listings.')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Adv. Balbir Singh Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-3.5">
              <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-amber-500 shadow-xs bg-slate-100">
                <img
                  src="/images/adv-balbir-singh.jpg"
                  alt="Adv. Balbir Singh"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 leading-tight">Adv. Balbir Singh</h3>
                <span className="text-xs text-amber-600 font-bold block mt-0.5">
                  Advocate & Legal Advisor
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Title Scrutiny & Registry</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+917082795453"
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Call Directly</span>
              </a>

              <a
                href={getWhatsAppUrl('7082795453', 'Hi Adv. Balbir ji, I would like to consult regarding plot title verification.')}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Office Address & Working Hours Card with Google Maps */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Office Location</span>
                <span className="text-xs font-bold text-slate-900 leading-snug block">
                  Kotputli - Jaipur Corridor Office
                </span>
                <span className="text-xs text-slate-600 leading-relaxed block">
                  27°47&apos;15.1&quot;N 76°13&apos;57.5&quot;E, Kotputli, Rajasthan 303108
                </span>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-100 relative">
              <iframe
                title="Paras Properties Office Location"
                src="https://maps.google.com/maps?q=27.787535,76.23264&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://www.google.com/maps/place/27%C2%B047'15.1%22N+76%C2%B013'57.5%22E/@27.787777,76.230226,18z/data=!4m4!3m3!8m2!3d27.787535!4d76.23264?hl=en&entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps (Kotputli Office)</span>
            </a>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Office Hours: Mon - Sun (9:00 AM - 7:30 PM)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form (2 cols) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Send an Enquiry / Book Site Visit</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the quick form below and Ashok & Balbir Singh will get in touch with you shortly.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Enquiry Successfully Submitted!</h4>
                <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                  Thank you! Your message has reached Ashok & Balbir Singh. We will connect with you via Phone or WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 px-5 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98290 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Expected Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">Select Budget</option>
                      <option value="Under ₹30 Lakh">Under ₹30 Lakh</option>
                      <option value="₹30 - 50 Lakh">₹30 - 50 Lakh</option>
                      <option value="₹50 - 75 Lakh">₹50 - 75 Lakh</option>
                      <option value="₹75 Lakh - 1.5 Crore">₹75 Lakh - 1.5 Crore</option>
                      <option value="Above ₹1.5 Crore">Above ₹1.5 Crore</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Requirement / Preferred Location in Jaipur
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what size plot, location (Jagatpura, Ajmer Road, Tonk Road...), or possession timeline you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry to Ashok & Balbir'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
