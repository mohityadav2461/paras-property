'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function Toast() {
  const { toast, closeToast } = useSettings();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-slate-900',
    warning: 'border-amber-200 bg-white text-slate-900',
    error: 'border-rose-200 bg-white text-slate-900',
    info: 'border-blue-200 bg-white text-slate-900',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm w-full px-4 sm:px-0">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg border ${
          borders[toast.type] || borders.success
        }`}
      >
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium flex-1 pr-2">{toast.message}</p>
        <button
          onClick={closeToast}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
