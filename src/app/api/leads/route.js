import { NextResponse } from 'next/server';
import { getLeads, createLead } from '@/lib/storage';
import { getSession } from '@/lib/auth';

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

export async function POST(request) {
  try {
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
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : '',
      propertyId: propertyId || '',
      propertyTitle: propertyTitle || 'General Enquiry',
      propertySlug: propertySlug || '',
      budget: budget || '',
      message: message ? message.trim() : '',
      source: source || (utmSource ? `${utmSource.toUpperCase()} Ad` : 'Website Direct'),
      utmSource: utmSource || '',
      utmMedium: utmMedium || '',
      utmCampaign: utmCampaign || '',
      utmContent: utmContent || '',
      utmTerm: utmTerm || '',
      landingPage: landingPage || '/',
      referrer: referrer || '',
    };

    const newLead = await createLead(leadData);

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
