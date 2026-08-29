'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Mail, 
  Building2, 
  Calendar, 
  Clock, 
  Compass, 
  Plus, 
  User, 
  DollarSign, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { getWhatsAppUrl } from '@/utils/whatsapp';
import { useSettings } from '@/context/SettingsContext';

const leadStatuses = [
  'New',
  'Contacted',
  'Interested',
  'Site Visit',
  'Negotiation',
  'Converted',
  'Lost',
];

export default function AdminLeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { showToast } = useSettings();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/leads/${id}`);
      if (!res.ok) throw new Error('Lead not found');
      const data = await res.json();
      setLead(data);
    } catch (e) {
      showToast('Failed to load lead details', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLead((prev) => ({ ...prev, status: newStatus }));
        showToast(`Status updated to ${newStatus}`, 'success');
      }
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setAddingNote(true);
    try {
      const res = await fetch(`/api/leads/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteText.trim() }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLead(updated.lead);
        setNoteText('');
        showToast('Internal note saved', 'success');
      } else {
        showToast('Failed to add note', 'error');
      }
    } catch (e) {
      showToast('Error saving note', 'error');
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading customer dossier...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-12 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">Lead not found</h3>
        <Link
          href="/admin/leads"
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold"
        >
          Return to Leads
        </Link>
      </div>
    );
  }

  const waLink = getWhatsAppUrl(
    lead.phone,
    `Hello ${lead.name}, this is from Haven Realty regarding your enquiry on "${lead.propertyTitle}". When is a good time for a brief call / site visit?`
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{lead.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enquiry received on {formatDate(lead.createdAt)}
            </p>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${lead.phone}`}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Now</span>
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Contact Info + Marketing Attribution + Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Customer & Requirement Dossier (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Phone Number</span>
                <a href={`tel:${lead.phone}`} className="text-sm font-bold text-slate-900 hover:underline">
                  {lead.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Email Address</span>
                <span className="text-sm font-medium text-slate-900">
                  {lead.email || 'Not provided'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Property Interested In</span>
                <span className="text-sm font-bold text-emerald-800 block">
                  {lead.propertyTitle}
                </span>
                {lead.propertySlug && (
                  <Link
                    href={`/properties/${lead.propertySlug}`}
                    target="_blank"
                    className="text-[11px] text-emerald-700 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>View Property Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Expected Budget</span>
                <span className="text-sm font-bold text-slate-900">
                  {lead.budget || 'Not specified'}
                </span>
              </div>
            </div>

            {/* Customer Message */}
            {lead.message && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Customer Message / Requirement
                </span>
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                  &ldquo;{lead.message}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Marketing & Campaign Attribution Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Marketing & Ad Attribution (UTM Parameters)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">Traffic Source</span>
                <span className="font-bold text-slate-900">{lead.source || 'Website Direct'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">utm_campaign</span>
                <span className="font-mono text-slate-900">{lead.utmCampaign || 'None (Organic)'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">utm_medium</span>
                <span className="font-mono text-slate-900">{lead.utmMedium || 'None'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">utm_content</span>
                <span className="font-mono text-slate-900">{lead.utmContent || 'None'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">utm_term</span>
                <span className="font-mono text-slate-900">{lead.utmTerm || 'None'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[11px] block font-medium">Landing Page</span>
                <span className="font-mono text-slate-900 truncate block">{lead.landingPage || '/'}</span>
              </div>
            </div>

            {lead.referrer && (
              <div className="text-[11px] text-slate-500 truncate">
                <span className="font-semibold">Referrer URL:</span> {lead.referrer}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Status Switcher & Internal CRM Notes (1 col) */}
        <div className="space-y-6">
          {/* Status Switcher Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pipeline Stage
            </h4>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              {leadStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Internal Notes & Call Logs
            </h4>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={3}
                placeholder="Add follow-up notes, site visit feedback, or customer objections..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
              />
              <button
                type="submit"
                disabled={addingNote || !noteText.trim()}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{addingNote ? 'Saving Note...' : 'Add Internal Note'}</span>
              </button>
            </form>

            {/* Notes Timeline */}
            <div className="space-y-3 pt-2 divide-y divide-slate-100">
              {(!lead.notes || lead.notes.length === 0) ? (
                <p className="text-xs text-slate-400 text-center py-2">No notes added yet.</p>
              ) : (
                lead.notes.map((n, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {n.note}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>By {n.createdBy || 'Admin'}</span>
                      <span>{formatDate(n.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
