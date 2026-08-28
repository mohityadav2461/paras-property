'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Eye, 
  SlidersHorizontal,
  Video,
  Check
} from 'lucide-react';
import { formatPrice, formatNumber } from '@/utils/formatters';
import { useSettings } from '@/context/SettingsContext';

export default function AdminPropertiesPage() {
  const { showToast } = useSettings();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/properties?admin=true');
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (e) {
      showToast('Failed to load properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
        );
        showToast(`Status updated to ${newStatus}`, 'success');
      }
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this property listing?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
        showToast('Property deleted successfully', 'success');
      } else {
        showToast('Delete failed', 'error');
      }
    } catch (e) {
      showToast('Error deleting property', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Reserved: 'bg-amber-50 text-amber-700 border-amber-200',
    Sold: 'bg-slate-100 text-slate-700 border-slate-200',
    Hidden: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Manage Properties ({properties.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Create, edit, change status, and manage media for all plots and residential properties.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search properties by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
            <option value="Hidden">Hidden (Unpublished)</option>
          </select>
        </div>
      </div>

      {/* Properties Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 animate-pulse">
            Loading property inventory...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No properties found</h4>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or add a new property listing.
            </p>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Property</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Property</th>
                  <th className="px-4 py-3.5">Type</th>
                  <th className="px-4 py-3.5">Price & Size</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Media</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((p) => {
                  const cover =
                    p.images?.find((img) => img.isCover)?.url ||
                    p.images?.[0]?.url ||
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80';

                  return (
                    <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Title & Location */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={cover}
                            alt={p.title}
                            className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <Link
                              href={`/admin/properties/${p._id}/edit`}
                              className="font-bold text-slate-900 hover:text-emerald-700 line-clamp-1"
                            >
                              {p.title}
                            </Link>
                            <span className="text-slate-500 block truncate mt-0.5">
                              {p.location}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              /{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-4 font-semibold text-slate-700">
                        {p.propertyType}
                      </td>

                      {/* Price & Size */}
                      <td className="px-4 py-4">
                        <span className="font-bold text-slate-900 block">
                          {p.priceDisplay || formatPrice(p.price)}
                        </span>
                        <span className="text-slate-500 block">
                          {formatNumber(p.size)} {p.sizeUnit || 'sq ft'}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-4">
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(p._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none ${
                            statusColors[p.status] || statusColors.Available
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </td>

                      {/* Media Stats */}
                      <td className="px-4 py-4 text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            {p.images?.length || 0} photos
                          </span>
                          {p.videoUrl && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700" title="Has video">
                              <Video className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-md"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/properties/${p._id}/edit`}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md font-semibold"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            disabled={deletingId === p._id}
                            onClick={() => handleDelete(p._id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
