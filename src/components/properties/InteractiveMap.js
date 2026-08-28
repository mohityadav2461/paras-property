'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, ExternalLink, Bed, Bath } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function InteractiveMap({ properties = [], selectedPropertyId = null, onSelectProperty }) {
  const [activePin, setActivePin] = useState(selectedPropertyId || (properties[0]?.id ?? null));
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });

  const activeProperty = properties.find((p) => p.id === activePin) || properties[0];

  // Map city anchors to relative coordinate positions on simulated map canvas
  const getMapPosition = (property, index) => {
    // Distribute nicely across map grid based on city/coordinates
    const cityOffsets = {
      'Los Angeles': { x: 22, y: 58 },
      'Beverly Hills': { x: 20, y: 54 },
      'New York': { x: 78, y: 35 },
      'Miami': { x: 75, y: 82 },
      'Austin': { x: 48, y: 72 },
      'Chicago': { x: 62, y: 38 },
      'Seattle': { x: 18, y: 22 },
    };

    const base = cityOffsets[property.city] || {
      x: 30 + ((index * 17) % 55),
      y: 25 + ((index * 13) % 60),
    };

    // Add slight offset for multiple in same city
    const jitterX = ((index % 3) - 1) * 3;
    const jitterY = (((index + 1) % 3) - 1) * 3;

    return {
      x: Math.max(10, Math.min(90, base.x + jitterX)),
      y: Math.max(10, Math.min(90, base.y + jitterY)),
    };
  };

  return (
    <div className="relative w-full h-[550px] sm:h-[620px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-card">
      {/* Simulated High-Tech Vector Satellite Map Background */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
        style={{
          transform: `scale(${mapZoom})`,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      >
        {/* Subtle Map Stylized Landmass Shapes */}
        <svg className="w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 120,80 Q 250,120 380,90 T 700,160 T 950,220 L 980,500 L 100,550 Z"
            fill="rgba(5, 150, 105, 0.2)"
          />
          <path
            d="M 200,280 Q 400,350 600,310 T 880,480 L 750,580 L 150,560 Z"
            fill="rgba(16, 185, 129, 0.15)"
          />
          {/* Simulated Highways */}
          <line x1="50" y1="120" x2="900" y2="420" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="220" y1="20" x2="350" y2="580" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <line x1="720" y1="40" x2="800" y2="580" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        </svg>

        {/* Property Pins */}
        {properties.map((prop, idx) => {
          const pos = getMapPosition(prop, idx);
          const isSelected = (activeProperty && activeProperty.id === prop.id) || activePin === prop.id;

          return (
            <div
              key={prop.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => {
                  setActivePin(prop.id);
                  if (onSelectProperty) onSelectProperty(prop);
                }}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all transform hover:scale-110 active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/40 scale-110 z-30 shadow-emerald-500/40'
                    : 'bg-slate-900/90 text-white border border-slate-700 hover:bg-emerald-600 hover:border-emerald-500'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950 fill-current' : 'text-emerald-400'}`} />
                <span>{formatCurrency(prop.price, true)}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Map Control Buttons (Zoom / Center) */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setMapZoom((prev) => Math.min(1.8, prev + 0.2))}
          className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center backdrop-blur-md shadow-md"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMapZoom((prev) => Math.max(0.8, prev - 0.2))}
          className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center backdrop-blur-md shadow-md"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Active Property Card Preview */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 animate-slide-up">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 shadow-2xl text-white flex gap-3.5 items-center">
            <img
              src={activeProperty.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
              alt={activeProperty.title}
              className="w-20 h-20 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-bold text-emerald-400 font-display">
                  {formatCurrency(activeProperty.price)}
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  • {activeProperty.type}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white truncate font-display mb-1">
                {activeProperty.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate mb-2">
                {activeProperty.address}, {activeProperty.city}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span>{activeProperty.bedrooms} bd</span>
                  <span>•</span>
                  <span>{activeProperty.bathrooms} ba</span>
                </div>

                <Link
                  href={`/properties/${activeProperty.id}`}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
