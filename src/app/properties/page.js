'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Building2, RotateCcw, SlidersHorizontal, Loader2 } from 'lucide-react';
import PropertyCard from '@/components/public/PropertyCard';
import PropertyFilterBar from '@/components/public/PropertyFilterBar';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from query parameters
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || 'all',
    propertyType: searchParams.get('propertyType') || 'all',
    status: searchParams.get('status') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minSize: searchParams.get('minSize') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  const fetchProperties = async (currentFilters) => {
    try {
      setLoading(true);
      const query = new URLSearchParams();

      if (currentFilters.search) query.set('search', currentFilters.search);
      if (currentFilters.location && currentFilters.location !== 'all') query.set('location', currentFilters.location);
      if (currentFilters.propertyType && currentFilters.propertyType !== 'all') query.set('propertyType', currentFilters.propertyType);
      if (currentFilters.status && currentFilters.status !== 'all') query.set('status', currentFilters.status);
      if (currentFilters.minPrice) query.set('minPrice', currentFilters.minPrice);
      if (currentFilters.maxPrice) query.set('maxPrice', currentFilters.maxPrice);
      if (currentFilters.minSize) query.set('minSize', currentFilters.minSize);
      if (currentFilters.sort) query.set('sort', currentFilters.sort);

      const res = await fetch(`/api/properties?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (e) {
      console.error('Error fetching properties:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    const reset = {
      search: '',
      location: 'all',
      propertyType: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      minSize: '',
      sort: 'newest',
    };
    setFilters(reset);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Heading */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Verified Real Estate Portfolio • Paras Properties
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Plots & Properties in Kotputli & Jaipur
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Browse verified residential plots, commercial lands, luxury villas, and farmhouses in prime growth corridors. Direct advisory with Ashok Yadav & Adv. Balbir Singh.
        </p>
      </div>

      {/* Multi-Criteria Search & Filter Bar */}
      <PropertyFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={properties.length}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
        <span className="font-semibold text-slate-700">
          Showing <span className="text-amber-700 font-bold">{properties.length}</span> verified properties
        </span>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Loading matching properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white p-12 sm:p-16 rounded-2xl border border-slate-200 text-center space-y-4 shadow-xs">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No properties matched your criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your price range, location, or property type filters to see more results.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id || property.slug} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PublicPropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500">
          Loading properties...
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
