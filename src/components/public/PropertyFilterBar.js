'use client';

import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw
} from 'lucide-react';

const propertyTypes = [
  'All Types',
  'Residential Plot',
  'Commercial Plot',
  'Plot',
  'Villa',
  'Farmhouse',
  'Apartment',
  'Commercial Land',
  'Agricultural Land',
];

const locationsList = [
  'All Locations',
  'Jagatpura',
  'Ajmer Road',
  'Tonk Road',
  'Mansarovar',
  'Sirsi Road',
  'Vaishali Nagar',
  'Kukas / Expressway',
  'Delhi Highway',
];

export default function PropertyFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeCount =
    (filters.search ? 1 : 0) +
    (filters.location && filters.location !== 'all' && filters.location !== 'All Locations' ? 1 : 0) +
    (filters.propertyType && filters.propertyType !== 'all' && filters.propertyType !== 'All Types' ? 1 : 0) +
    (filters.status && filters.status !== 'all' ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.minSize ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-8">
      {/* Primary Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by area, title, colony..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div>
          <select
            value={filters.location || 'all'}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-semibold focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
          >
            {locationsList.map((loc) => (
              <option key={loc} value={loc === 'All Locations' ? 'all' : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <select
            value={filters.propertyType || 'all'}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-semibold focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type === 'All Types' ? 'all' : type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Size Drawer Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-colors ${
              showMobileFilters || activeCount > 0
                ? 'border-amber-500 bg-amber-50 text-amber-900'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>Price & Size Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Price, Size & Status Drawer */}
      {showMobileFilters && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          {/* Max Budget Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Maximum Budget
            </label>
            <select
              value={filters.maxPrice || 'all'}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value === 'all' ? '' : e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Any Budget</option>
              <option value="3000000">Up to ₹30 Lakh</option>
              <option value="5000000">Up to ₹50 Lakh</option>
              <option value="7500000">Up to ₹75 Lakh</option>
              <option value="10000000">Up to ₹1 Crore</option>
              <option value="20000000">Up to ₹2 Crore</option>
            </select>
          </div>

          {/* Min Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Min Size (Sq Ft)
            </label>
            <select
              value={filters.minSize || 'all'}
              onChange={(e) => onFilterChange({ ...filters, minSize: e.target.value === 'all' ? '' : e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Any Size</option>
              <option value="900">900+ sq ft (100 Gaj)</option>
              <option value="1200">1200+ sq ft (133 Gaj)</option>
              <option value="1800">1800+ sq ft (200 Gaj)</option>
              <option value="2700">2700+ sq ft (300 Gaj)</option>
              <option value="5000">5000+ sq ft / Farmhouse</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Availability Status
            </label>
            <select
              value={filters.status || 'all'}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All (Available & Reserved)</option>
              <option value="Available">Available Only</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          {/* Sort Option */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Sort By
            </label>
            <select
              value={filters.sort || 'newest'}
              onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="newest">Newest Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Size: Largest First</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filter Pills Bar */}
      {activeCount > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-medium">Active:</span>

            {filters.search && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                &quot;{filters.search}&quot;
                <button onClick={() => onFilterChange({ ...filters, search: '' })}>
                  <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                </button>
              </span>
            )}

            {filters.location && filters.location !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                {filters.location}
                <button onClick={() => onFilterChange({ ...filters, location: 'all' })}>
                  <X className="w-3 h-3 text-amber-700 hover:text-amber-900" />
                </button>
              </span>
            )}

            {filters.propertyType && filters.propertyType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                {filters.propertyType}
                <button onClick={() => onFilterChange({ ...filters, propertyType: 'all' })}>
                  <X className="w-3 h-3 text-amber-700 hover:text-amber-900" />
                </button>
              </span>
            )}

            {filters.status && filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                Status: {filters.status}
                <button onClick={() => onFilterChange({ ...filters, status: 'all' })}>
                  <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                </button>
              </span>
            )}
          </div>

          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
