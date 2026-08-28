'use client';

import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Building, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2 
} from 'lucide-react';
import { propertyTypes, propertyStatuses, allAmenitiesList } from '@/data/properties';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export default function PropertyFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handleTypeChange = (type) => {
    onFilterChange({ ...filters, type });
  };

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  // Count active non-default filters
  const activeFilterCount =
    (filters.query ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.type !== 'All Types' ? 1 : 0) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000000 ? 1 : 0) +
    (filters.bedrooms > 0 ? 1 : 0) +
    (filters.bathrooms > 0 ? 1 : 0) +
    (filters.minSqFt > 0 ? 1 : 0) +
    (filters.amenities?.length || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 mb-8">
      {/* Primary Search Bar Row */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch">
        {/* Search Query Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.query || ''}
            onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            placeholder="Search by city, neighborhood, address, or keyword (e.g. Miami, Beverly Hills, Penthouse)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
          {filters.query && (
            <button
              onClick={() => onFilterChange({ ...filters, query: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 overflow-x-auto">
          {propertyStatuses.map((st) => (
            <button
              key={st.value}
              onClick={() => handleStatusChange(st.value)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                filters.status === st.value
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Property Type Dropdown */}
        <div className="shrink-0">
          <select
            value={filters.type || 'All Types'}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Advanced Filters Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all shrink-0 ${
            showAdvanced || activeFilterCount > 0
              ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Advanced Filters Drawer */}
      {showAdvanced && (
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Max Price
              </label>
              <span className="text-xs font-bold text-emerald-700 font-display">
                {filters.maxPrice >= 10000000 ? 'Any Price' : formatCurrency(filters.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={100000}
              value={filters.maxPrice || 10000000}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>$100k</span>
              <span>$5M</span>
              <span>$10M+</span>
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
              <Bed className="w-3.5 h-3.5 text-emerald-600" />
              Bedrooms
            </label>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((beds) => (
                <button
                  key={beds}
                  onClick={() => onFilterChange({ ...filters, bedrooms: beds })}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    filters.bedrooms === beds
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {beds === 0 ? 'Any' : `${beds}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
              <Bath className="w-3.5 h-3.5 text-emerald-600" />
              Bathrooms
            </label>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((baths) => (
                <button
                  key={baths}
                  onClick={() => onFilterChange({ ...filters, bathrooms: baths })}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    filters.bathrooms === baths
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  {baths === 0 ? 'Any' : `${baths}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Square Footage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                Min Living Area
              </label>
              <span className="text-xs font-bold text-emerald-700 font-display">
                {filters.minSqFt > 0 ? `${formatNumber(filters.minSqFt)} sq ft` : 'Any Size'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={6000}
              step={250}
              value={filters.minSqFt || 0}
              onChange={(e) => onFilterChange({ ...filters, minSqFt: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0 sq ft</span>
              <span>3,000 sq ft</span>
              <span>6,000+ sq ft</span>
            </div>
          </div>

          {/* Amenities Checklist (Spans all columns) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Must-Have Amenities & Features
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {allAmenitiesList.map((amenity) => {
                const isSelected = (filters.amenities || []).includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                        : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{amenity}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Pills Bar & Reset Action */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">Active filters:</span>

            {filters.query && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Keyword: &quot;{filters.query}&quot;
                <button onClick={() => onFilterChange({ ...filters, query: '' })}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Status: {filters.status}
                <button onClick={() => onFilterChange({ ...filters, status: 'all' })}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {filters.type !== 'All Types' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Type: {filters.type}
                <button onClick={() => onFilterChange({ ...filters, type: 'All Types' })}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {filters.maxPrice < 10000000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                Up to {formatCurrency(filters.maxPrice)}
                <button onClick={() => onFilterChange({ ...filters, maxPrice: 10000000 })}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {filters.bedrooms > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                {filters.bedrooms}+ Beds
                <button onClick={() => onFilterChange({ ...filters, bedrooms: 0 })}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            )}

            {filters.amenities?.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium"
              >
                {amenity}
                <button onClick={() => handleAmenityToggle(amenity)}>
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
