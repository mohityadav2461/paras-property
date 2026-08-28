'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Maximize, Compass, ArrowRight, Video, MessageCircle } from 'lucide-react';
import { formatPrice, formatNumber } from '@/utils/formatters';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '@/utils/whatsapp';
import { useSettings } from '@/context/SettingsContext';

export default function PropertyCard({ property }) {
  const { settings } = useSettings();
  if (!property) return null;

  const coverImage =
    property.images?.find((img) => img.isCover)?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';

  const priceText = property.priceDisplay || formatPrice(property.price, property.priceUnit);
  const sizeText = `${formatNumber(property.size)} ${property.sizeUnit || 'sq ft'}`;

  const statusColors = {
    Available: 'bg-amber-500 text-slate-950 font-extrabold',
    Reserved: 'bg-blue-600 text-white font-bold',
    Sold: 'bg-slate-700 text-white font-bold',
    Hidden: 'bg-slate-400 text-white',
  };

  const customMessage = getPropertyWhatsAppMessage(property);
  const whatsappUrl = getWhatsAppUrl(settings?.whatsapp || '7742650820', customMessage);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Media Container */}
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
          <Link href={`/properties/${property.slug}`} className="block w-full h-full">
            <img
              src={coverImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span
              className={`px-2.5 py-1 rounded-md text-xs uppercase tracking-wider shadow-sm ${
                statusColors[property.status] || statusColors.Available
              }`}
            >
              {property.status}
            </span>

            {property.propertyType && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900/90 text-white backdrop-blur-xs shadow-xs">
                {property.propertyType}
              </span>
            )}
          </div>

          {/* Video indicator if property has video */}
          {property.videoUrl && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                <Video className="w-3 h-3 text-amber-400" />
                Video
              </span>
            </div>
          )}

          {/* Price overlay on image bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3.5 pt-7 flex items-end justify-between text-white pointer-events-none">
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block drop-shadow-xs">
                {priceText}
              </span>
              {property.priceUnit && property.priceUnit !== 'Total' && property.priceUnit !== 'Lakh' && property.priceUnit !== 'Crore' && (
                <span className="text-[11px] text-slate-300 block">
                  {property.priceUnit}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-amber-400 block">
                {sizeText}
              </span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate font-semibold text-slate-700">{property.location}</span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block group/title">
            <h3 className="text-base font-bold text-slate-900 group-hover/title:text-blue-900 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Key Specs Row */}
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-slate-400" />
              <span>{sizeText}</span>
            </div>

            {property.facing && (
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{property.facing}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 grid grid-cols-5 gap-2">
        <Link
          href={`/properties/${property.slug}`}
          className="col-span-4 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-colors shadow-xs"
          title="WhatsApp Enquiry to Ashok Yadav"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
        </a>
      </div>
    </div>
  );
}
