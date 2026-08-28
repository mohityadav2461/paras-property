'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  MapPin, 
  DollarSign, 
  Maximize, 
  FileText, 
  ShieldCheck,
  CheckCircle,
  Plus,
  X
} from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import { useSettings } from '@/context/SettingsContext';

const commonAmenities = [
  'Gated Security & CCTV',
  'Underground Electricity',
  '40 ft Wide Tar Road',
  '60 ft Main Boulevard',
  'Green Landscaped Park',
  '24/7 Water Supply',
  'Modern Drainage & Sewage',
  'Clubhouse & Gym',
  'Street Lighting',
  'Rainwater Harvesting',
  'Commercial Corner Advantage',
  'Borewell Sweet Water',
];

const commonLegalApprovals = [
  'JDA / Authority Approved',
  'RERA Registered',
  'Freehold Title',
  'Immediate Registry Ready',
  '80% Bank Loan Approved',
  'Commercial Conversion NOC',
  'Single Owner Title',
  'Encumbrance Free Certificate',
];

export default function AdminNewPropertyPage() {
  const router = useRouter();
  const { showToast } = useSettings();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    propertyType: 'Residential Plot',
    location: '',
    address: '',
    price: '',
    priceUnit: 'Lakh',
    priceDisplay: '',
    size: '',
    sizeUnit: 'sq ft',
    facing: 'East Facing',
    roadWidth: '40 ft Wide Road',
    status: 'Available',
    description: '',
    amenities: ['Gated Security & CCTV', 'Underground Electricity', '40 ft Wide Tar Road', '24/7 Water Supply'],
    legalInformation: ['JDA / Authority Approved', 'Freehold Title', '80% Bank Loan Approved', 'Immediate Registry Ready'],
    nearbyLandmarks: [],
    images: [],
    videoUrl: '',
    videoTitle: '',
    isFeatured: true,
  });

  const [landmarkInput, setLandmarkInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-generate slug when title changes if slug hasn't been manually customized
  const handleTitleChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug,
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const toggleLegal = (legal) => {
    setFormData((prev) => {
      const exists = prev.legalInformation.includes(legal);
      return {
        ...prev,
        legalInformation: exists
          ? prev.legalInformation.filter((l) => l !== legal)
          : [...prev.legalInformation, legal],
      };
    });
  };

  const addLandmark = () => {
    if (!landmarkInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      nearbyLandmarks: [...prev.nearbyLandmarks, landmarkInput.trim()],
    }));
    setLandmarkInput('');
  };

  const removeLandmark = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearbyLandmarks: prev.nearbyLandmarks.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.title.trim() || !formData.price || !formData.size || !formData.location.trim()) {
      setErrorMessage('Please fill in all required fields (Title, Location, Price, Size)');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create property');
      }

      showToast('Property created and published successfully!', 'success');
      router.push('/admin/properties');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create property');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Add New Property</h2>
            <p className="text-xs text-slate-500">Create a verified plot or property listing with images and video.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/properties"
            className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* SECTION 1: BASIC INFORMATION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span>1. Basic Property Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Grand Vista 1200 Sq Ft Gated Township Plot"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          {/* URL Slug */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              URL Slug (SEO friendly) *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-xs text-slate-500 font-mono">
                /properties/
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-lg text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Type *
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              <option value="Residential Plot">Residential Plot</option>
              <option value="Commercial Plot">Commercial Plot</option>
              <option value="Plot">Standard Plot</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Apartment">Apartment / Flat</option>
              <option value="Farmhouse">Farmhouse Land</option>
              <option value="Commercial Land">Commercial Land</option>
              <option value="Agricultural Land">Agricultural Land</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Listing Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              <option value="Available">Available (Active for Sale)</option>
              <option value="Reserved">Reserved (Under Token)</option>
              <option value="Sold">Sold</option>
              <option value="Hidden">Hidden (Draft / Unpublished)</option>
            </select>
          </div>

          {/* Location Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Location / Area *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jagatpura, Jaipur"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Specific Address / Landmark
            </label>
            <input
              type="text"
              placeholder="e.g. Sector 9, Jagatpura Extension, Jaipur"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: PRICING & MEASUREMENTS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-700" />
          <span>2. Pricing & Dimension Specifications</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Price (Numeric) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Total Price (₹ In Rupees) *
            </label>
            <input
              type="number"
              required
              min="1000"
              placeholder="e.g. 4200000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Enter plain number (e.g. 4200000 for ₹42 Lakh)
            </span>
          </div>

          {/* Price Display Unit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Price Display Label
            </label>
            <input
              type="text"
              placeholder="e.g. ₹42 Lakh or ₹3,500/sq yd"
              value={formData.priceDisplay}
              onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Plot / Property Size *
            </label>
            <div className="flex items-center">
              <input
                type="number"
                required
                min="10"
                placeholder="1200"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <select
                value={formData.sizeUnit}
                onChange={(e) => setFormData({ ...formData, sizeUnit: e.target.value })}
                className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-r-lg text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="sq ft">sq ft</option>
                <option value="sq yd">sq yd (Gaj)</option>
                <option value="Bigha">Bigha</option>
                <option value="Acres">Acres</option>
              </select>
            </div>
          </div>

          {/* Facing */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Facing Direction
            </label>
            <select
              value={formData.facing}
              onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="East Facing">East Facing</option>
              <option value="North Facing">North Facing</option>
              <option value="North-East Facing">North-East Facing</option>
              <option value="West Facing">West Facing</option>
              <option value="South Facing">South Facing</option>
              <option value="Corner Plot (Dual Facing)">Corner Plot (Dual Facing)</option>
            </select>
          </div>

          {/* Road Width */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Front Road Width
            </label>
            <input
              type="text"
              placeholder="e.g. 40 ft Wide Sector Road"
              value={formData.roadWidth}
              onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Detailed Description */}
        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Property Description & Highlights
          </label>
          <textarea
            rows={5}
            placeholder="Write a comprehensive description about the plot/property, surroundings, possession status, and investment potential..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* SECTION 3: MEDIA UPLOADS (IMAGES & VIDEO) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-700" />
          <span>3. Property Media & Video Walkthrough</span>
        </h3>

        <MediaUploader
          images={formData.images}
          onChangeImages={(newImages) => setFormData({ ...formData, images: newImages })}
          videoUrl={formData.videoUrl}
          onChangeVideo={(newVideo) => setFormData({ ...formData, videoUrl: newVideo })}
        />
      </div>

      {/* SECTION 4: AMENITIES, LEGAL APPROVALS & LANDMARKS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>4. Amenities & Legal Approvals</span>
        </h3>

        {/* Amenities Checklist */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Amenities & Infrastructure
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {commonAmenities.map((amenity) => {
              const selected = formData.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2 rounded-lg text-left text-xs font-semibold border transition-colors flex items-center justify-between gap-1 ${
                    selected
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{amenity}</span>
                  {selected && <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legal Approvals */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Legal Approvals & Certifications
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {commonLegalApprovals.map((legal) => {
              const selected = formData.legalInformation.includes(legal);
              return (
                <button
                  key={legal}
                  type="button"
                  onClick={() => toggleLegal(legal)}
                  className={`px-3 py-2 rounded-lg text-left text-xs font-semibold border transition-colors flex items-center justify-between gap-1 ${
                    selected
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{legal}</span>
                  {selected && <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nearby Landmarks */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Nearby Landmarks & Distance
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Airport - 10 mins, Metro Station - 5 mins"
              value={landmarkInput}
              onChange={(e) => setLandmarkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addLandmark();
                }
              }}
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="button"
              onClick={addLandmark}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Landmark</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {formData.nearbyLandmarks.map((lm, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-md"
              >
                <span>{lm}</span>
                <button
                  type="button"
                  onClick={() => removeLandmark(idx)}
                  className="text-slate-400 hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href="/admin/properties"
          className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-98"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Creating Property...' : 'Save & Publish Property'}</span>
        </button>
      </div>
    </form>
  );
}
