'use client';

import React, { useState } from 'react';
import { Layers, Bed, Bath, Maximize2 } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

export default function FloorPlanViewer({ floorPlans = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[activeTab] || floorPlans[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Architectural Layouts</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Interactive Floor Plans & Dimensions
          </h3>
        </div>

        {/* Level Tabs */}
        {floorPlans.length > 1 && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {floorPlans.map((plan, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === idx
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {plan.level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Plan Details & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 items-center">
        <div className="lg:col-span-2 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 overflow-hidden flex items-center justify-center min-h-[300px]">
          <img
            src={currentPlan.image}
            alt={currentPlan.level}
            className="max-h-[350px] w-auto object-contain rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-slate-900 text-lg font-display">{currentPlan.level}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {currentPlan.description}
            </p>

            <div className="pt-3 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <Maximize2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{formatNumber(currentPlan.sqFt)}</span>
                <span className="text-[10px] text-slate-400">Sq Ft</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <Bed className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{currentPlan.bedrooms}</span>
                <span className="text-[10px] text-slate-400">Beds</span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <Bath className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{currentPlan.bathrooms}</span>
                <span className="text-[10px] text-slate-400">Baths</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
            📐 All dimensions are approximate and subject to field verification. High-res CAD files available on request.
          </div>
        </div>
      </div>
    </div>
  );
}
