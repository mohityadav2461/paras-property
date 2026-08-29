'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, X, Maximize2 } from 'lucide-react';

export default function PropertyGallery({ images = [], title = 'Property Image' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';
  const displayImages = images && images.length > 0 ? images.map(img => typeof img === 'string' ? img : img.url) : [fallbackImage];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="space-y-3">
      {/* Main Large Image Stage */}
      <div className="relative h-80 sm:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-sm group">
        <img
          src={currentImage}
          alt={title}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>View All Photos ({displayImages.length})</span>
        </button>

        {/* Next / Prev Controls */}
        {displayImages.length > 1 && (
          <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={prevImage}
              className="pointer-events-auto p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-transform active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="pointer-events-auto p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-transform active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-18 w-24 sm:h-20 sm:w-28 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-600/30 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-fade-in">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div>
              <h4 className="text-sm sm:text-base font-bold truncate max-w-md">{title}</h4>
              <span className="text-xs text-slate-400">
                Photo {selectedIndex + 1} of {displayImages.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImage}
              alt="fullscreen"
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  selectedIndex === idx ? 'border-emerald-500 scale-105 opacity-100' : 'border-transparent opacity-40'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
