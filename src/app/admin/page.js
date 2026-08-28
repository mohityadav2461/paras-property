'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  PlusCircle, 
  Eye, 
  MessageSquare, 
  Phone, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { formatPrice, formatDate, formatShortDate } from '@/utils/formatters';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const analytics = await res.json();
        setData(analytics);
      }
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    New: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Contacted: 'bg-blue-100 text-blue-800 border-blue-200',
    Interested: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Site Visit': 'bg-amber-100 text-amber-800 border-amber-200',
    Negotiation: 'bg-purple-100 text-purple-800 border-purple-200',
    Converted: 'bg-emerald-700 text-white',
    Lost: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const propStatusColors = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Reserved: 'bg-amber-50 text-amber-700 border-amber-200',
    Sold: 'bg-slate-100 text-slate-600 border-slate-200',
    Hidden: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-md w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const { propertyStats, leadStats, recentLeads = [], recentProperties = [] } = data || {};

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Overview & Key Statistics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor real-time incoming advertisement leads, properties status, and pipeline conversions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/properties/new"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg transition-colors"
          >
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {/* Statistics Grid - Row 1: Properties */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Property Inventory
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Properties"
            value={propertyStats?.total || 0}
            subtitle="Catalog inventory"
            icon={Building2}
            color="slate"
          />
          <StatCard
            title="Available"
            value={propertyStats?.available || 0}
            subtitle="Active for sale"
            icon={Building2}
            color="emerald"
          />
          <StatCard
            title="Reserved"
            value={propertyStats?.reserved || 0}
            subtitle="In token / agreement"
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Sold"
            value={propertyStats?.sold || 0}
            subtitle="Closed deals"
            icon={CheckCircle}
            color="blue"
          />
        </div>
      </div>

      {/* Statistics Grid - Row 2: Leads */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Lead Generation & Pipeline
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value={leadStats?.total || 0}
            subtitle="All time enquiries"
            icon={Users}
            color="indigo"
          />
          <StatCard
            title="New Leads"
            value={leadStats?.new || 0}
            subtitle="Needs immediate call"
            icon={AlertCircle}
            color="emerald"
          />
          <StatCard
            title="Contacted"
            value={leadStats?.contacted || 0}
            subtitle="Follow-up in progress"
            icon={MessageSquare}
            color="blue"
          />
          <StatCard
            title="Converted"
            value={leadStats?.converted || 0}
            subtitle="Successfully closed"
            icon={UserCheck}
            color="emerald"
          />
        </div>
      </div>

      {/* Two Column Layout: Recent Leads + Recent Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Recent Customer Enquiries</h3>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No customer leads received yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="text-sm font-bold text-slate-900 hover:text-emerald-700 truncate"
                      >
                        {lead.name}
                      </Link>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          statusColors[lead.status] || statusColors.New
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{lead.phone}</span>
                      <span>•</span>
                      <span className="truncate max-w-[200px] text-emerald-800 font-medium">
                        {lead.propertyTitle}
                      </span>
                      {lead.source && (
                        <>
                          <span>•</span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-medium">
                            {lead.source}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                    <span className="text-slate-400 font-medium whitespace-nowrap">
                      {formatShortDate(lead.createdAt)}
                    </span>
                    <Link
                      href={`/admin/leads/${lead._id}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold text-xs transition-colors"
                    >
                      Open Dossier
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Properties (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Recent Properties</h3>
              </div>
              <Link
                href="/admin/properties"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentProperties.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No properties added yet.
                </div>
              ) : (
                recentProperties.map((prop) => {
                  const cover =
                    prop.images?.find((img) => img.isCover)?.url ||
                    prop.images?.[0]?.url ||
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80';

                  return (
                    <div key={prop._id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-3">
                      <img
                        src={cover}
                        alt={prop.title}
                        className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/admin/properties/${prop._id}/edit`}
                          className="text-xs font-bold text-slate-900 hover:text-emerald-700 truncate block"
                        >
                          {prop.title}
                        </Link>
                        <span className="text-[11px] text-slate-500 truncate block">
                          {prop.location}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-emerald-700">
                            {prop.priceDisplay || formatPrice(prop.price)}
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-semibold border ${
                              propStatusColors[prop.status] || propStatusColors.Available
                            }`}
                          >
                            {prop.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <Link
              href="/admin/properties/new"
              className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Add New Listing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
