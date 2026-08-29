'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Filter, 
  Clock, 
  Building,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { formatDate, formatShortDate } from '@/utils/formatters';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { useSettings } from '@/context/SettingsContext';

const statuses = [
  'all',
  'New',
  'Contacted',
  'Interested',
  'Site Visit',
  'Negotiation',
  'Converted',
  'Lost',
];

const statusColors = {
  New: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
  Contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  Interested: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Site Visit': 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
  Negotiation: 'bg-purple-100 text-purple-800 border-purple-200',
  Converted: 'bg-emerald-700 text-white font-bold',
  Lost: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function AdminLeadsPage() {
  const { showToast } = useSettings();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const url = selectedStatus === 'all' ? '/api/leads' : `/api/leads?status=${selectedStatus}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (e) {
        showToast('Failed to load leads', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [selectedStatus, showToast]);

  const handleQuickStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
        );
        showToast(`Lead status updated to ${newStatus}`, 'success');
      }
    } catch (e) {
      showToast('Failed to update lead status', 'error');
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(s) ||
      l.phone.includes(s) ||
      (l.propertyTitle && l.propertyTitle.toLowerCase().includes(s)) ||
      (l.email && l.email.toLowerCase().includes(s))
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" />
            <span>Lead Management & CRM ({leads.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track inquiries from Meta Ads, Google, and direct web visitors. Follow up instantly on WhatsApp and phone.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {statuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Leads' : st}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by customer name, phone number, property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500 animate-pulse">
            Loading leads pipeline...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No leads found</h4>
            <p className="text-xs text-slate-400">
              No enquiries match the current status or search filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Property / Requirement</th>
                  <th className="px-4 py-3.5">Source / Campaign</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const leadWaLink = getWhatsAppUrl(
                    lead.phone,
                    `Hello ${lead.name}, thank you for enquiring about "${lead.propertyTitle}". When would be a good time for a quick call / site visit?`
                  );

                  return (
                    <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name & Phone */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/leads/${lead._id}`}
                          className="font-bold text-slate-900 hover:text-emerald-700 block text-sm"
                        >
                          {lead.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5 text-slate-600">
                          <span className="font-mono">{lead.phone}</span>
                          {lead.email && (
                            <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                              {lead.email}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Property Interested */}
                      <td className="px-4 py-4">
                        <span className="font-semibold text-emerald-800 block line-clamp-1">
                          {lead.propertyTitle}
                        </span>
                        {lead.budget && (
                          <span className="text-[11px] text-slate-500 block">
                            Budget: {lead.budget}
                          </span>
                        )}
                      </td>

                      {/* Source / Campaign */}
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {lead.source || 'Website Direct'}
                        </span>
                        {lead.utmCampaign && (
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5 truncate max-w-[120px]">
                            {lead.utmCampaign}
                          </span>
                        )}
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleQuickStatus(lead._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none ${
                            statusColors[lead.status] || statusColors.New
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Interested">Interested</option>
                          <option value="Site Visit">Site Visit</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                        {formatShortDate(lead.createdAt)}
                      </td>

                      {/* Quick Contact & Dossier Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Call Button */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4 text-emerald-700" />
                          </a>

                          {/* WhatsApp Button */}
                          <a
                            href={leadWaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Open Dossier */}
                          <Link
                            href={`/admin/leads/${lead._id}`}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg transition-colors"
                          >
                            View
                          </Link>
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
