'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  DollarSign, 
  ShieldCheck,
  CheckCircle,
  Plus,
  X,
  ExternalLink,
  Loader2
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

export default function AdminEditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { showToast } = useSettings();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [landmarkInput, setLandmarkInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) throw new Error('Property not found');
      const data = await res.json();
      setFormData({
        ...data,
        amenities: data.amenities || [],
        legalInformation: data.legalInformation || [],
        nearbyLandmarks: data.nearbyLandmarks || [],
        images: data.images || [],
      });
    } catch (e) {
      setErrorMessage(e.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
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
    setSaving(true);

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update property');
      }

      showToast('Property updated successfully!', 'success');
      router.push('/admin/properties');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update property');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading property details...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="p-12 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Property not found</h3>
        <Link
          href="/admin/properties"
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
        >
          Return to Properties
        </Link>
      </div>
    );
  }

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
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate max-w-lg">
              Edit • {formData.title}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500">Slug: /{formData.slug}</span>
              <Link
                href={`/properties/${formData.slug}`}
                target="_blank"
                className="text-xs text-emerald-700 hover:underline flex items-center gap-0.5"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
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
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Type *
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Listing Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="Available">Available (Active for Sale)</option>
              <option value="Reserved">Reserved (Under Token)</option>
              <option value="Sold">Sold</option>
              <option value="Hidden">Hidden (Draft / Unpublished)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Location / Area *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Address / Landmark
            </label>
            <input
              type="text"
              value={formData.address || ''}
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Total Price (₹ Numeric) *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Price Display Label
            </label>
            <input
              type="text"
              value={formData.priceDisplay || ''}
              onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Plot / Property Size *
            </label>
            <div className="flex items-center">
              <input
                type="number"
                required
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <select
                value={formData.sizeUnit || 'sq ft'}
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Facing Direction
            </label>
            <input
              type="text"
              value={formData.facing || ''}
              onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Front Road Width
            </label>
            <input
              type="text"
              value={formData.roadWidth || ''}
              onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Property Description
          </label>
          <textarea
            rows={5}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* SECTION 3: MEDIA UPLOADER */}
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

      {/* SECTION 4: AMENITIES & APPROVALS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>4. Amenities & Legal Approvals</span>
        </h3>

        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Amenities & Infrastructure
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {commonAmenities.map((amenity) => {
              const selected = formData.amenities?.includes(amenity);
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

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Legal Approvals & Certifications
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {commonLegalApprovals.map((legal) => {
              const selected = formData.legalInformation?.includes(legal);
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
              placeholder="e.g. Airport - 10 mins"
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
            {formData.nearbyLandmarks?.map((lm, idx) => (
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

      {/* Save Button */}
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
          <span>{saving ? 'Saving...' : 'Save & Update Property'}</span>
        </button>
      </div>
    </form>
  );
}
