'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';

export default function Footer() {
  const { showToast } = useProperties();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to HavenEstate Market Intelligence!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">100% Verified Listings</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every property and agent on our platform undergoes strict title verification and legal vetting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Direct Agent Advisory</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect directly with top tier certified brokers without intermediary broker markups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">End-to-End Closing</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Seamless digital escrow, scheduling, documentation, and mortgage calculation tools.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Haven<span className="text-emerald-400">Estate</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              HavenEstate is your trusted destination for luxury real estate, waterfront estates, architectural homes, and high-yield commercial investments.
            </p>

            <div className="pt-2 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>9450 Wilshire Blvd, Beverly Hills, CA 90212</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 555-4283</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@havenestate.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-display">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Interactive Map View
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Compare Properties
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link href="/list-property" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Tools */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-display">
              Tools & Insights
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/calculator" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Find an Agent
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Market Reports & News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  About HavenEstate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-display">
              Market Intelligence
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get off-market listings and weekly luxury market reports delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HavenEstate Properties Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Equal Housing Opportunity</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
