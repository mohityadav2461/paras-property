import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Maximize, 
  Compass, 
  Road, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Phone, 
  MessageCircle, 
  Calendar, 
  ArrowLeft, 
  Film, 
  Share2, 
  Send,
  Sparkles,
  UserCheck
} from 'lucide-react';
import PropertyGallery from '@/components/public/PropertyGallery';
import PropertyCard from '@/components/public/PropertyCard';
import StickyMobileBar from '@/components/public/StickyMobileBar';
import EnquiryModalTrigger from '@/components/public/EnquiryModalTrigger';
import { getPropertyBySlugOrId, getProperties, getSettings } from '@/lib/storage';
import { formatPrice, formatNumber } from '@/utils/formatters';
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from '@/utils/whatsapp';

export const revalidate = 60;

// Dynamic SEO & Open Graph Metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  const property = await getPropertyBySlugOrId(slug);

  if (!property) {
    return {
      title: 'Property Not Found • Paras Property',
    };
  }

  const coverImage =
    property.images?.find((img) => img.isCover)?.url ||
    property.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80';

  const priceText = property.priceDisplay || formatPrice(property.price);

  return {
    title: `${property.title} in ${property.location} - ${priceText} • Paras Property`,
    description: property.description
      ? property.description.slice(0, 160)
      : `Explore verified ${property.size} ${property.sizeUnit} ${property.propertyType} for sale in ${property.location}. Complete legal approval and registry ready.`,
    openGraph: {
      title: `${property.title} • ${priceText} • Paras Property`,
      description: `Verified ${property.propertyType} in ${property.location}. ${property.size} ${property.sizeUnit} with clear legal title. Consult Ashok & Balbir Singh.`,
      images: [{ url: coverImage, width: 1200, height: 630, alt: property.title }],
      type: 'article',
    },
  };
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = params;
  const [property, allProperties, settings] = await Promise.all([
    getPropertyBySlugOrId(slug),
    getProperties(),
    getSettings(),
  ]);

  if (!property || property.status === 'Hidden') {
    notFound();
  }

  const priceText = property.priceDisplay || formatPrice(property.price, property.priceUnit);
  const sizeText = `${formatNumber(property.size)} ${property.sizeUnit || 'sq ft'}`;

  // Similar Properties
  const similarProperties = allProperties
    .filter((p) => p.slug !== property.slug && p.status !== 'Hidden')
    .slice(0, 3);

  const phone = settings?.phone || '+91 70827 95453';
  const whatsappNumber = settings?.whatsapp || '7082795453';
  const ownerName = settings?.ownerName || 'Ashok & Balbir Singh';
  const ownerPhoto = settings?.ownerPhoto || '/images/ashok-yadav.jpg';

  const customMessage = getPropertyWhatsAppMessage(property);
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, customMessage);

  const statusColors = {
    Available: 'bg-amber-500 text-slate-950 font-extrabold',
    Reserved: 'bg-blue-600 text-white font-bold',
    Sold: 'bg-slate-300 text-slate-800 font-bold',
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 md:pb-16">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-amber-600">Properties</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate">{property.title}</span>
          </div>

          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-1 text-amber-700 font-bold hover:underline shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Listings</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        {/* Title, Location & Price Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs ${statusColors[property.status] || statusColors.Available}`}>
                {property.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-800">
                {property.propertyType}
              </span>
              {property.isFeatured && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Verified Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{property.address ? `${property.address}, ` : ''}{property.location}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="lg:text-right space-y-1 bg-amber-50/60 lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-none border-amber-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Offered Price
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 block">
              {priceText}
            </span>
            <span className="text-xs text-slate-500 font-medium block">
              Plot Size: <strong className="text-slate-800">{sizeText}</strong>
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Image Gallery */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <PropertyGallery images={property.images} title={property.title} />
            </div>

            {/* 2. Video Section (COMPLETELY HIDDEN IF NO VIDEO) */}
            {property.videoUrl && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Film className="w-5 h-5 text-amber-600" />
                  <span>Property Drone & Walkthrough Video</span>
                </h3>

                <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-md">
                  <video
                    src={property.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                {property.videoTitle && (
                  <p className="text-xs text-slate-500 italic">{property.videoTitle}</p>
                )}
              </div>
            )}

            {/* 3. Key Specifications Grid */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Property Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block font-medium">Plot / Property Size</span>
                  <span className="font-bold text-slate-900 text-base">{sizeText}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block font-medium">Property Type</span>
                  <span className="font-bold text-slate-900 text-base">{property.propertyType}</span>
                </div>

                {property.facing && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs block font-medium">Facing Direction</span>
                    <span className="font-bold text-slate-900 text-base">{property.facing}</span>
                  </div>
                )}

                {property.roadWidth && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs block font-medium">Front Road Width</span>
                    <span className="font-bold text-slate-900 text-base">{property.roadWidth}</span>
                  </div>
                )}

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block font-medium">Availability</span>
                  <span className="font-bold text-amber-600 text-base">{property.status}</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-xs block font-medium">Possession</span>
                  <span className="font-bold text-slate-900 text-base">Immediate Registry</span>
                </div>
              </div>
            </div>

            {/* 4. Description */}
            {property.description && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Overview & Description
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </div>
              </div>
            )}

            {/* 5. Legal Information & Certifications */}
            {property.legalInformation && property.legalInformation.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>Legal Approvals & Verification</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.legalInformation.map((legal, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center gap-2 text-xs sm:text-sm text-slate-900 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{legal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Amenities & Township Infrastructure */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Amenities & Infrastructure
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Nearby Landmarks */}
            {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Nearby Landmarks & Connectivity
                </h3>

                <div className="space-y-2">
                  {property.nearbyLandmarks.map((lm, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-medium"
                    >
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{lm}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Contact & Advisors Profile Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 space-y-5">
              {/* Consultant Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex -space-x-2">
                  <img
                    src="/images/ashok-yadav.jpg"
                    alt="Ashok Yadav"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                  />
                  <img
                    src="/images/adv-balbir-singh.jpg"
                    alt="Adv. Balbir Singh"
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Ashok Yadav & Adv. Balbir Singh</h3>
                  <span className="text-xs text-amber-600 font-bold block">
                    Property & Legal Advisory
                  </span>
                  <span className="text-[11px] text-slate-400">Paras Property</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Interested in this property?
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Call or WhatsApp our team directly to inspect revenue title records or schedule a free site inspection.
                </p>
              </div>

              {/* Direct Call Options */}
              <div className="space-y-2">
                <a
                  href="tel:+917742650820"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Ashok Yadav</span>
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold">7742650820</span>
                </a>

                <a
                  href="tel:+917082795453"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between shadow-xs transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Adv. Balbir</span>
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold">7082795453</span>
                </a>
              </div>

              {/* WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppUrl('7742650820', customMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Ashok</span>
                </a>

                <a
                  href={getWhatsAppUrl('7082795453', customMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Balbir</span>
                </a>
              </div>

              {/* Enquire Modal Trigger */}
              <EnquiryModalTrigger property={property} />

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>100% Free Site Visit with Pick & Drop</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Direct Developer / Clear Title Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Similar Verified Properties
              </h3>
              <Link href="/properties" className="text-xs font-bold text-amber-700 hover:underline">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p._id || p.slug} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Mobile Bar */}
      <StickyMobileBar property={property} />
    </div>
  );
}
