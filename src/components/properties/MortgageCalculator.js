'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar, 
  PieChart, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { calculateMortgageBreakdown, formatCurrency, formatNumber } from '@/utils/formatters';

export default function MortgageCalculator({ defaultPrice = 1250000, defaultHoa = 250 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState(1400);
  const [hoaMonthly, setHoaMonthly] = useState(defaultHoa);

  const breakdown = calculateMortgageBreakdown({
    homePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    homeInsuranceAnnual,
    hoaMonthly,
  });

  // Calculate percentages for visual distribution bar
  const total = breakdown.totalMonthly || 1;
  const pniPct = Math.max(0, (breakdown.principalAndInterest / total) * 100);
  const taxPct = Math.max(0, (breakdown.monthlyPropertyTax / total) * 100);
  const insPct = Math.max(0, (breakdown.monthlyInsurance / total) * 100);
  const hoaPct = Math.max(0, (breakdown.hoaMonthly / total) * 100);
  const pmiPct = Math.max(0, (breakdown.monthlyPMI / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Financial Planning</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Interactive Mortgage & Payment Estimator
          </h3>
        </div>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-right">
          <span className="text-xs text-emerald-800 font-medium block">Estimated Monthly Payment</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-display">
            {formatCurrency(breakdown.totalMonthly)}
            <span className="text-sm font-normal text-emerald-600">/mo</span>
          </span>
        </div>
      </div>

      {/* Visual Payment Breakdown Bar */}
      <div className="my-6">
        <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 mb-4">
          <div style={{ width: `${pniPct}%` }} className="bg-emerald-600" title="Principal & Interest" />
          <div style={{ width: `${taxPct}%` }} className="bg-blue-600" title="Property Tax" />
          <div style={{ width: `${insPct}%` }} className="bg-amber-500" title="Home Insurance" />
          <div style={{ width: `${hoaPct}%` }} className="bg-purple-600" title="HOA Fees" />
          <div style={{ width: `${pmiPct}%` }} className="bg-rose-500" title="PMI" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-500 block">Principal & Interest</span>
              <span className="font-bold text-slate-900">{formatCurrency(breakdown.principalAndInterest)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
            <div>
              <span className="text-slate-500 block">Property Taxes</span>
              <span className="font-bold text-slate-900">{formatCurrency(breakdown.monthlyPropertyTax)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <div>
              <span className="text-slate-500 block">Home Insurance</span>
              <span className="font-bold text-slate-900">{formatCurrency(breakdown.monthlyInsurance)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
            <div>
              <span className="text-slate-500 block">HOA & Others</span>
              <span className="font-bold text-slate-900">{formatCurrency(breakdown.hoaMonthly + breakdown.monthlyPMI)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
        {/* Home Price Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Home Price ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Math.max(10000, Number(e.target.value)))}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>
          <input
            type="range"
            min={100000}
            max={10000000}
            step={50000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full mt-2 accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Down Payment % & Amount */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Down Payment ({downPaymentPercent}%)
            </label>
            <span className="text-xs font-bold text-emerald-700">
              {formatCurrency(breakdown.downPaymentAmount)}
            </span>
          </div>
          <div className="flex gap-1 mb-2">
            {[10, 15, 20, 25, 30].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setDownPaymentPercent(pct)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  downPaymentPercent === pct
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Interest Rate (%)
            </label>
            <span className="text-xs font-bold text-emerald-700">{interestRate}%</span>
          </div>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>
          <input
            type="range"
            min={3.0}
            max={11.0}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full mt-2 accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Loan Term
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((years) => (
              <button
                key={years}
                type="button"
                onClick={() => setLoanTermYears(years)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  loanTermYears === years
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {years} Years
              </button>
            ))}
          </div>
        </div>

        {/* Property Tax Rate */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Annual Property Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={propertyTaxRate}
            onChange={(e) => setPropertyTaxRate(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>

        {/* HOA Fees */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Monthly HOA Dues ($)
          </label>
          <input
            type="number"
            value={hoaMonthly}
            onChange={(e) => setHoaMonthly(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>* Estimates exclude local closing costs, legal transfers, and variable escrow charges.</span>
        <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">
          Get Pre-Approved with HavenLending →
        </span>
      </div>
    </div>
  );
}
