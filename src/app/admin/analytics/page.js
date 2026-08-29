'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar, 
  BarChart3, 
  PieChart, 
  Building2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { useSettings } from '@/context/SettingsContext';

export default function AdminAnalyticsPage() {
  const { showToast } = useSettings();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const analytics = await res.json();
          setData(analytics);
        }
      } catch (e) {
        showToast('Failed to load analytics', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [showToast]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 animate-pulse">
        Calculating marketing analytics & lead conversion metrics...
      </div>
    );
  }

  const { leadStats, propertyStats, sourceBreakdown = {}, campaignBreakdown = {} } = data || {};

  const conversionRate =
    leadStats?.total > 0
      ? ((leadStats.converted / leadStats.total) * 100).toFixed(1)
      : '0.0';

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-700" />
          <span>Marketing & Lead Analytics</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Analyze advertisement conversion efficiency, lead acquisition channels, and top performing campaigns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={leadStats?.total || 0}
          subtitle="All time enquiries"
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Leads This Week"
          value={leadStats?.thisWeek || 0}
          subtitle="Past 7 days volume"
          icon={Calendar}
          color="emerald"
        />
        <StatCard
          title="Leads This Month"
          value={leadStats?.thisMonth || 0}
          subtitle="Past 30 days volume"
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle={`${leadStats?.converted || 0} converted customers`}
          icon={Target}
          color="amber"
        />
      </div>

      {/* Breakdown Grids: Sources & Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Traffic Source */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-700" />
            <span>Leads by Acquisition Source</span>
          </h3>

          <div className="space-y-3">
            {Object.keys(sourceBreakdown).length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No source data recorded yet.</p>
            ) : (
              Object.entries(sourceBreakdown).map(([source, count]) => {
                const pct = ((count / (leadStats?.total || 1)) * 100).toFixed(0);
                return (
                  <div key={source} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>{source}</span>
                      <span>
                        {count} leads ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Leads by Ad Campaign */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Leads by Meta / Google Ad Campaign</span>
          </h3>

          <div className="space-y-3">
            {Object.keys(campaignBreakdown).length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No active UTM campaigns recorded yet. Enquiries from ads with utm_campaign will populate here automatically.
              </p>
            ) : (
              Object.entries(campaignBreakdown).map(([campaign, count]) => (
                <div
                  key={campaign}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block font-mono">{campaign}</span>
                    <span className="text-[11px] text-slate-500">UTM Campaign Tag</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">
                    {count} Enquiries
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
