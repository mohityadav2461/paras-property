import { NextResponse } from 'next/server';
import { getLeads, createLead } from '@/lib/storage';
import { getSession } from '@/lib/auth';
import { sendLeadNotificationEmail } from '@/lib/email';

export async function GET(request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const source = searchParams.get('source') || undefined;
    const search = searchParams.get('search') || undefined;

    const leads = await getLeads({ status, source, search });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

const leadSubmissions = new Map();
const MAX_LEADS_PER_WINDOW = 10;
const LEAD_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown-client';
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();
    const subRecord = leadSubmissions.get(ip) || { count: 0, firstSubmission: now };

    if (now - subRecord.firstSubmission > LEAD_WINDOW_MS) {
      subRecord.count = 0;
      subRecord.firstSubmission = now;
    }

    if (subRecord.count >= MAX_LEADS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'You have submitted multiple enquiries recently. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    subRecord.count += 1;
    leadSubmissions.set(ip, subRecord);

    const body = await request.json();
    const { name, phone, email, propertyId, propertyTitle, propertySlug, budget, message, source, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, landingPage, referrer } = body;

    // Strict validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!phone || !phone.trim() || phone.replace(/\D/g, '').length < 8) {
      return NextResponse.json({ error: 'A valid phone number is required' }, { status: 400 });
    }

    const leadData = {
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 20),
      email: email ? email.trim().toLowerCase().slice(0, 100) : '',
      propertyId: propertyId ? String(propertyId).slice(0, 50) : '',
      propertyTitle: (propertyTitle || 'General Enquiry').slice(0, 150),
      propertySlug: propertySlug ? String(propertySlug).slice(0, 150) : '',
      budget: budget ? String(budget).slice(0, 50) : '',
      message: message ? message.trim().slice(0, 2000) : '',
      source: (source || (utmSource ? `${utmSource.toUpperCase()} Ad` : 'Website Direct')).slice(0, 100),
      utmSource: utmSource ? String(utmSource).slice(0, 100) : '',
      utmMedium: utmMedium ? String(utmMedium).slice(0, 100) : '',
      utmCampaign: utmCampaign ? String(utmCampaign).slice(0, 100) : '',
      utmContent: utmContent ? String(utmContent).slice(0, 100) : '',
      utmTerm: utmTerm ? String(utmTerm).slice(0, 100) : '',
      landingPage: (landingPage || '/').slice(0, 255),
      referrer: referrer ? String(referrer).slice(0, 255) : '',
    };

    const newLead = await createLead(leadData);

    // Send email alert to owner (yadavashok9003@gmail.com) in background
    sendLeadNotificationEmail(leadData).catch((err) =>
      console.error('Background lead email dispatch error:', err.message)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your enquiry has been received. Our representative will contact you shortly.',
        leadId: newLead._id || newLead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'We could not submit your enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
