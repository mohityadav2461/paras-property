'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Scale, 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Share2
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export default function PropertyCard({ property, viewMode = 'grid' }) {
  const { toggleFavorite, isFavorite, toggleCompare, isCompared, showToast } = useProperties();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorited = isFavorite(property.id);
  const compared = isCompared(property.id);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/properties/${property.id}`;
      navigator.clipboard.writeText(url);
      showToast('Property link copied to clipboard!', 'info');
    }
  };

  const isList = viewMode === 'list';

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col ${
        isList ? 'md:flex-row' : ''
      }`}
    >
      {/* Media / Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 ${isList ? 'md:w-2/5 md:min-h-[260px] h-64' : 'h-64 sm:h-72 w-full'}`}>
        <Link href={`/properties/${property.id}`} className="block w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${
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

          {property.isNew && (
            <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-white/90 text-slate-800 backdrop-blur-sm shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              New
            </span>
          )}

          {property.isFeatured && (
            <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-600 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all active:scale-90"
            title="Share Property"
            aria-label="Share property link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center shadow-sm transition-all active:scale-90 ${
              compared
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-600'
            }`}
            title={compared ? 'Remove from comparison' : 'Add to comparison'}
            aria-label="Compare property"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center shadow-sm transition-all active:scale-90 ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Carousel Prev/Next Buttons (only if multiple images) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Price Tag in Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
          <div className="text-white">
            <div className="text-2xl font-bold font-display tracking-tight drop-shadow-md">
              {formatCurrency(property.price)}
              {property.status === 'for-rent' && (
                <span className="text-xs font-normal opacity-90">/month</span>
              )}
            </div>
            {property.hoaMonthly > 0 && (
              <span className="text-[11px] text-slate-200 block drop-shadow-sm">
                +${property.hoaMonthly}/mo HOA
              </span>
            )}
          </div>

          <span className="px-2 py-0.5 rounded-md bg-black/50 text-white text-[11px] font-medium backdrop-blur-sm">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`} className="block group/link">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover/link:text-emerald-600 transition-colors font-display">
              {property.title}
            </h3>
          </Link>

          {/* Tagline / Snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          {property.bedrooms > 0 ? (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-800">{property.bedrooms}</span>
              <span className="text-slate-400">Beds</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">Studio/Loft</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">{property.bathrooms}</span>
            <span className="text-slate-400">Baths</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">{formatNumber(property.areaSqFt)}</span>
            <span className="text-slate-400">Sq Ft</span>
          </div>
        </div>

        {/* Agent Info & Explore Link */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          {property.agent ? (
            <div className="flex items-center gap-2">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="text-xs font-medium text-slate-700 truncate max-w-[120px]">
                {property.agent.name}
              </span>
            </div>
          ) : (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Listing
            </span>
          )}

          <Link
            href={`/properties/${property.id}`}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
