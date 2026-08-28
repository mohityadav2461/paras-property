'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Lock,
  ArrowRight,
  Award
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getWhatsAppUrl } from '@/utils/whatsapp';

export default function PublicFooter() {
  const { settings } = useSettings();

  const whatsappLink = getWhatsAppUrl(
    settings?.whatsapp || '7742650820',
    `Hello Ashok ji, I would like more information about properties listed on Paras Property.`
  );

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info with Owner Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={settings?.ownerPhoto || '/images/ashok-yadav.jpg'}
                alt={settings?.ownerName || 'Ashok Yadav'}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {settings?.companyName || 'Paras Property'}
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  {settings?.ownerName || 'Ashok Yadav'} (Founder)
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {settings?.tagline || 'Your trusted real estate destination in Jaipur for verified residential plots, commercial lands, luxury villas, and high-yield investment properties.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Legal & Encumbrance Verified Land</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
              Verified Properties
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/properties?propertyType=Residential+Plot" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Residential Plots
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=Commercial+Plot" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Commercial Plots & Showrooms
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=Villa" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Luxury Designer Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=Farmhouse" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Aravali Farmhouse Lands
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-slate-400 hover:text-amber-400 transition-colors">
                  All Properties Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-amber-400 transition-colors">
                  About Ashok Yadav
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Owner Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-amber-400">
              Direct Contact
            </h4>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Ashok Yadav</span>
                <a href={`tel:${settings?.phone || '+917742650820'}`} className="hover:underline font-bold text-white">
                  {settings?.phone || '+91 77426 50820'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">WhatsApp Support</span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#25D366] font-bold">
                  Chat on 7742650820
                </a>
              </div>
            </div>

            {settings?.email && (
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </div>
            )}

            {settings?.address && (
              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1 leading-relaxed">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings?.companyName || 'Paras Property'} • Founded by Ashok Yadav. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-slate-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
