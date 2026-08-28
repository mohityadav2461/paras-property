'use client';

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  DollarSign, 
  MessageSquare, 
  Building,
  ShieldCheck
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useSettings } from '@/context/SettingsContext';
import { getStoredUtmData } from '@/components/public/UtmTracker';
import { trackMetaLead } from '@/components/public/MetaPixel';

export default function EnquiryModal({ isOpen, onClose, property = null }) {
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

  // Prefill default message when property changes
  useEffect(() => {
    if (property) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `I am interested in "${property.title}" located in ${property.location}. Please share complete details, site layout plan, and pricing.`,
      }));
    }
  }, [property]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter a valid mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      // Gather UTM tracking parameters
      const utmData = getStoredUtmData();

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        budget: formData.budget,
        message: formData.message.trim(),
        propertyId: property?._id || property?.id || '',
        propertyTitle: property?.title || 'General Property Enquiry',
        propertySlug: property?.slug || '',
        source: utmData.utmSource ? `${utmData.utmSource.toUpperCase()} Ad` : 'Website Direct',
        utmSource: utmData.utmSource || '',
        utmMedium: utmData.utmMedium || '',
        utmCampaign: utmData.utmCampaign || '',
        utmContent: utmData.utmContent || '',
        utmTerm: utmData.utmTerm || '',
        landingPage: utmData.landingPage || window.location.pathname,
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

      // Track Meta Pixel Lead event
      trackMetaLead({
        propertyTitle: property?.title,
        propertyType: property?.propertyType,
        value: property?.price || 0,
      });

      setIsSuccess(true);
      showToast('Enquiry received! Our team will contact you shortly.', 'success');
    } catch (err) {
      setErrorMessage(err.message || 'We could not submit your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      budget: '',
      message: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={
        isSuccess
          ? 'Enquiry Received'
          : property
          ? `Enquire About • ${property.title}`
          : 'Express Property Enquiry'
      }
      maxWidth="max-w-lg"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-bold text-slate-900">
            Thank You for Your Enquiry!
          </h4>

          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Thank you! Your enquiry has been received. Our senior property representative will contact you shortly via Call/WhatsApp.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {property && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold text-slate-900 truncate pr-2">
                {property.title}
              </span>
              <span className="font-bold text-emerald-700 shrink-0">
                {property.priceDisplay || `₹${property.price}`}
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Mobile Phone Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Phone / WhatsApp Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
              <input
                type="tel"
                required
                placeholder="e.g. +91 98290 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              We respect your privacy. No spam.
            </span>
          </div>

          {/* Email Address (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Budget Range (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Expected Budget
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              <option value="">Select Budget Range</option>
              <option value="Under ₹25 Lakh">Under ₹25 Lakh</option>
              <option value="₹25 - 50 Lakh">₹25 - 50 Lakh</option>
              <option value="₹50 - 75 Lakh">₹50 - 75 Lakh</option>
              <option value="₹75 Lakh - 1.5 Crore">₹75 Lakh - 1.5 Crore</option>
              <option value="Above ₹1.5 Crore">Above ₹1.5 Crore</option>
            </select>
          </div>

          {/* Message (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Message or Specific Requirement
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what size, location, or possession timeline you require..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting Enquiry...' : 'Send Enquiry'}</span>
          </button>
        </form>
      )}
    </Modal>
  );
}
