'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '@/utils/whatsapp';
import EnquiryModal from './EnquiryModal';

export default function StickyMobileBar({ property }) {
  const { settings } = useSettings();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const phone = settings?.phone || '+91 77426 50820';
  const whatsappNumber = settings?.whatsapp || '7742650820';

  const message = property
    ? getPropertyWhatsAppMessage(property)
    : `Hi Ashok ji & Adv. Balbir ji, I am on the Paras Property website and would like to enquire about available plots.`;

  const whatsappUrl = getWhatsAppUrl(whatsappNumber, message);

  return (
    <>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-2.5 animate-slide-up">
        {/* 1. Direct Call Button */}
        <a
          href={`tel:${phone}`}
          className="flex-1 py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call</span>
        </a>

        {/* 2. WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* 3. Enquire Form Button */}
        <button
          type="button"
          onClick={() => setEnquiryOpen(true)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-98"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </button>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        property={property}
      />
    </>
  );
}
