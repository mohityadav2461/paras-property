'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Send,
  ShieldCheck
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import EnquiryModal from './EnquiryModal';

export default function PublicNavbar() {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties & Plots', href: '/properties' },
    { name: 'About Team', href: '/about' },
    { name: 'Contact & Office', href: '/contact' },
  ];

  const whatsappLink = getWhatsAppUrl(
    settings?.whatsapp || '7742650820',
    `Hi Ashok ji & Balbir ji, I would like to enquire about available plots and properties listed on Paras Property.`
  );

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800 py-3 text-white'
            : 'bg-slate-900 border-b border-slate-800 py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Brand Logo and Company Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Paras Properties"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain bg-white p-1 shadow-sm group-hover:scale-105 transition-transform"
              />

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none">
                  Paras Properties
                </span>
                <span className="text-[11px] font-semibold text-amber-400 mt-1">
                  Kotputli - Jaipur Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-amber-400 bg-slate-800 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action: Simple Clean CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-extrabold shadow-sm transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-slide-up shadow-2xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp ({settings?.whatsapp || '7742650820'})</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
}
