'use client';

import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'emerald' }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-start justify-between">
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {title}
        </span>
        <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900">
          {value}
        </span>
        {subtitle && (
          <span className="block text-xs text-slate-500 mt-1 font-medium">
            {subtitle}
          </span>
        )}
      </div>

      {Icon && (
        <div className={`p-2.5 rounded-xl border ${colorMap[color] || colorMap.emerald}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
