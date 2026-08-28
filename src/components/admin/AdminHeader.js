'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Plus, ExternalLink, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminHeader({ onOpenMobileMenu, title = 'Admin Portal' }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/properties/new"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Live Site</span>
        </Link>
      </div>
    </header>
  );
}
