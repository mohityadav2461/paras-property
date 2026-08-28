'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function EnquiryModalTrigger({ property }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
      >
        <Send className="w-4 h-4" />
        <span>Enquire Now / Book Visit</span>
      </button>

      <EnquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        property={property}
      />
    </>
  );
}
