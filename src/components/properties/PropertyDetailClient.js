'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Scale, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Phone, 
  Mail, 
  Footprints, 
  Navigation, 
  GraduationCap, 
  ShieldAlert, 
  ArrowLeft,
  Eye
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import PropertyCard from '@/components/properties/PropertyCard';
import MortgageCalculator from '@/components/properties/MortgageCalculator';
import FloorPlanViewer from '@/components/properties/FloorPlanViewer';
import ScheduleTourModal from '@/components/properties/ScheduleTourModal';
import ImageGalleryModal from '@/components/properties/ImageGalleryModal';

export default function PropertyDetailClient({ property }) {
  const { 
    properties, 
    isFavorite, 
    toggleFavorite, 
    isCompared, 
    toggleCompare, 
    showToast 
  } = useProperties();

  // Modals state
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // Agent inquiry form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    `Hello, I am interested in ${property?.title || 'this property'}. Please contact me with more information.`
  );
  const [inquirySent, setInquirySent] = useState(false);

  if (!property) return null;

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);
  const images = property.images || [];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'info');
    }
  };

  const handleAgentInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    showToast(`Inquiry sent to ${property.agent?.name || 'our advisory team'}!`, 'success');
  };

  // Similar properties
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const pricePerSqFt = property.areaSqFt > 0 ? Math.round(property.price / property.areaSqFt) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all properties</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          {/* Compare */}
          <button
            onClick={() => toggleCompare(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium shadow-sm transition-all ${
              compared
                ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{compared ? 'In Comparison' : 'Compare'}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
              favorited
                ? 'bg-rose-500 text-white border-rose-500 font-bold'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
            <span>{favorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Header Meta */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                property.status === 'for-sale'
                  ? 'bg-emerald-600 text-white'
                  : property.status === 'for-rent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {property.status === 'for-sale'
                ? 'For Sale'
                : property.status === 'for-rent'
                ? 'For Rent'
                : 'Commercial'}
            </span>

            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
              {property.type}
            </span>

            {property.isVerified && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Title
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </span>
          </div>
        </div>

        {/* Price Tag & Schedule Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
          <div className="text-left sm:text-right">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              {formatCurrency(property.price)}
              {property.status === 'for-rent' && (
                <span className="text-base font-normal text-slate-500">/mo</span>
              )}
            </div>
            {pricePerSqFt > 0 && (
              <span className="text-xs text-slate-400 font-medium">
                ${formatNumber(pricePerSqFt)} / sq ft {property.hoaMonthly > 0 && `• $${property.hoaMonthly}/mo HOA`}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsTourModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            Schedule a Private Tour
          </button>
        </div>
      </div>

      {/* Interactive Photo Gallery Mosaic */}
      <div className="relative rounded-3xl overflow-hidden shadow-card grid grid-cols-1 md:grid-cols-4 gap-2 bg-slate-100 max-h-[500px]">
        {/* Main Hero Photo */}
        <div
          onClick={() => {
            setGalleryStartIndex(0);
            setIsGalleryOpen(true);
          }}
          className="md:col-span-2 h-[340px] md:h-[500px] relative cursor-pointer group overflow-hidden"
        >
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Secondary Photos 2 and 3 */}
        <div className="hidden md:flex flex-col gap-2 md:col-span-1 h-[500px]">
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setGalleryStartIndex(idx + 1);
                setIsGalleryOpen(true);
              }}
              className="h-1/2 relative cursor-pointer group overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt="thumb"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Secondary Photos 4 and 5 */}
        <div className="hidden md:flex flex-col gap-2 md:col-span-1 h-[500px]">
          {images.slice(3, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setGalleryStartIndex(idx + 3);
                setIsGalleryOpen(true);
              }}
              className="h-1/2 relative cursor-pointer group overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt="thumb"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {idx === 1 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
                  +{images.length - 5} More Photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fullscreen Gallery Trigger Button */}
        <button
          onClick={() => {
            setGalleryStartIndex(0);
            setIsGalleryOpen(true);
          }}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold backdrop-blur-md flex items-center gap-2 shadow-lg transition-all"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>View All Photos ({images.length})</span>
        </button>
      </div>

      {/* Main Layout Grid: Left Content Column & Right Sticky Advisory Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Specs, Description, Amenities, Floor Plans, Mortgage, Neighborhood */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Bed className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="block text-lg font-black text-slate-900 font-display">
                {property.bedrooms > 0 ? property.bedrooms : 'Studio'}
              </span>
              <span className="text-xs text-slate-400">Bedrooms</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="block text-lg font-black text-slate-900 font-display">
                {property.bathrooms}
              </span>
              <span className="text-xs text-slate-400">Bathrooms</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <Maximize2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="block text-lg font-black text-slate-900 font-display">
                {formatNumber(property.areaSqFt)}
              </span>
              <span className="text-xs text-slate-400">Sq Ft Interior</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <Calendar className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="block text-lg font-black text-slate-900 font-display">
                {property.yearBuilt}
              </span>
              <span className="text-xs text-slate-400">Year Built</span>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Property Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>

            {/* Key Highlights List */}
            {property.features && property.features.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Key Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amenities & Lifestyle Features */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities?.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floor Plans Section */}
          {property.floorPlans && property.floorPlans.length > 0 && (
            <FloorPlanViewer floorPlans={property.floorPlans} />
          )}

          {/* Neighborhood & Lifestyle Scores */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                Location Intelligence
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Neighborhood Scores & Commute
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <Footprints className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <span className="text-2xl font-black text-slate-900 font-display">
                  {property.neighborhoodScores?.walkScore || 85}/100
                </span>
                <span className="text-xs text-slate-500 block mt-1 font-semibold">WalkScore®</span>
                <span className="text-[10px] text-emerald-700 font-medium">Very Walkable</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <Navigation className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-2xl font-black text-slate-900 font-display">
                  {property.neighborhoodScores?.transitScore || 80}/100
                </span>
                <span className="text-xs text-slate-500 block mt-1 font-semibold">Transit Score</span>
                <span className="text-[10px] text-blue-700 font-medium">Excellent Transit</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                <GraduationCap className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <span className="text-2xl font-black text-slate-900 font-display">
                  {property.neighborhoodScores?.schoolsScore || 90}/100
                </span>
                <span className="text-xs text-slate-500 block mt-1 font-semibold">Public Schools</span>
                <span className="text-[10px] text-amber-700 font-medium">Top Rated District</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
                <ShieldAlert className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <span className="text-2xl font-black text-slate-900 font-display">
                  {property.neighborhoodScores?.safetyScore || 94}/100
                </span>
                <span className="text-xs text-slate-500 block mt-1 font-semibold">Safety Rating</span>
                <span className="text-[10px] text-purple-700 font-medium">High Security Index</span>
              </div>
            </div>
          </div>

          {/* Mortgage Calculator */}
          <MortgageCalculator defaultPrice={property.price} defaultHoa={property.hoaMonthly} />
        </div>

        {/* Right 1 Column: Agent Sidebar & Tour Schedule CTA */}
        <div className="space-y-6">
          {/* Agent Card */}
          {property.agent && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-6 sticky top-24">
              <div className="flex items-center gap-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-slate-900 font-display">{property.agent.name}</h4>
                  <span className="text-xs text-emerald-700 font-medium block">
                    {property.agent.title}
                  </span>
                  <span className="text-[11px] text-slate-400">{property.agent.license}</span>
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Agent</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email</span>
                </a>
              </div>

              {/* Schedule Tour Big CTA Button */}
              <button
                type="button"
                onClick={() => setIsTourModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Private Tour</span>
              </button>

              {/* Instant Inquiry Form */}
              <div className="pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Request Property Dossier & Pricing
                </h5>

                {inquirySent ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs text-center font-medium">
                    ✓ Your inquiry has been sent! The agent will reach out shortly.
                  </div>
                ) : (
                  <form onSubmit={handleAgentInquiry} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />

                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Send Message to Agent
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar & Recommended Properties */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Similar Properties You May Like
            </h3>
            <Link
              href="/properties"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Browse all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}

      {/* Tour Booking Modal */}
      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        property={property}
      />

      {/* Fullscreen Photo Lightbox Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        initialIndex={galleryStartIndex}
        title={property.title}
      />
    </div>
  );
}
