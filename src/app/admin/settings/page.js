'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Building2, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  Save, 
  UserCheck,
  Share2,
  Image as ImageIcon
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function AdminSettingsPage() {
  const { settings, setSettings, showToast } = useSettings();
  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    ownerName: '',
    ownerRole: '',
    ownerPhoto: '',
    ownerMessage: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    metaPixelId: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        companyName: settings.companyName || 'Paras Property',
        tagline: settings.tagline || 'Verified Plots & Premium Properties in Prime Locations',
        ownerName: settings.ownerName || 'Ashok Yadav',
        ownerRole: settings.ownerRole || 'Founder & Property Consultant',
        ownerPhoto: settings.ownerPhoto || '/images/ashok-yadav.jpg',
        ownerMessage: settings.ownerMessage || '',
        phone: settings.phone || '+91 77426 50820',
        whatsapp: settings.whatsapp || '7742650820',
        email: settings.email || 'ashokyadav@parasproperty.com',
        address: settings.address || 'Tonk Road, Near Airport, Jaipur, Rajasthan 302018',
        metaPixelId: settings.metaPixelId || '',
        facebookUrl: settings.facebookUrl || '',
        instagramUrl: settings.instagramUrl || '',
        youtubeUrl: settings.youtubeUrl || '',
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        showToast('Business settings and owner profile updated successfully!', 'success');
      } else {
        showToast('Failed to update settings', 'error');
      }
    } catch (e) {
      showToast('Error updating settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-600" />
            <span>Business Profile & Owner Settings</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage Ashok Yadav&apos;s owner profile, WhatsApp number, business branding, and Meta Pixel tracking.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Save className="w-4 h-4 text-amber-400" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* SECTION 1: OWNER SPOTLIGHT (ASHOK YADAV) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-600" />
          <span>1. Owner Profile (Ashok Yadav)</span>
        </h3>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="shrink-0 text-center space-y-1">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-sm mx-auto bg-slate-100">
              <img
                src={formData.ownerPhoto || '/images/ashok-yadav.jpg'}
                alt="Owner preview"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] text-slate-500 font-bold block">Current Photo</span>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Owner Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Owner Designation / Title *
              </label>
              <input
                type="text"
                required
                value={formData.ownerRole}
                onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Owner Photo Path / Cloudinary Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="/images/ashok-yadav.jpg or Cloudinary URL"
                  value={formData.ownerPhoto}
                  onChange={(e) => setFormData({ ...formData, ownerPhoto: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Owner Message / Personal Trust Promise
              </label>
              <textarea
                rows={3}
                value={formData.ownerMessage}
                onChange={(e) => setFormData({ ...formData, ownerMessage: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BUSINESS IDENTITY & CONTACT */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>2. Company Identity & Contact Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Company / Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official Phone Number
            </label>
            <input
              type="text"
              placeholder="+91 77426 50820"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              WhatsApp Business Number (without + or spaces) *
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25D366]" />
              <input
                type="text"
                required
                placeholder="7742650820"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Used for all WhatsApp click-to-chat buttons across public property pages.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Official Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Office Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: META ADS & CONVERSION TRACKING */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>3. Meta Ads (Facebook / Instagram) Tracking</span>
        </h3>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Meta Pixel ID
          </label>
          <input
            type="text"
            placeholder="e.g. 123456789012345 (Leave empty if not using Meta Pixel)"
            value={formData.metaPixelId}
            onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
          />
          <span className="text-[11px] text-slate-500 mt-1.5 block">
            When configured, the Meta Pixel automatically triggers a &quot;Lead&quot; conversion event whenever a customer submits an enquiry.
          </span>
        </div>
      </div>

      {/* SECTION 4: SOCIAL MEDIA LINKS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-600" />
          <span>4. Social Channels</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Facebook Page URL
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/yourpage"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/yourprofile"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              YouTube Channel URL
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/@yourchannel"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-98"
        >
          <Save className="w-4 h-4 text-amber-400" />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>
    </form>
  );
}
