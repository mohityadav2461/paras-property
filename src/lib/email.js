import nodemailer from 'nodemailer';

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'yadavashok9003@gmail.com';

/**
 * Configure SMTP transporter using environment variables.
 * Compatible with Gmail, Outlook, Zoho, or any SMTP service.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Send an email alert whenever a new lead enquiry is submitted.
 * Target: yadavashok9003@gmail.com
 */
export async function sendLeadNotificationEmail(leadData) {
  try {
    const {
      name,
      phone,
      email,
      propertyTitle,
      budget,
      message,
      source,
      utmCampaign,
      landingPage,
    } = leadData;

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeProperty = escapeHtml(propertyTitle || 'General Enquiry');
    const safeBudget = escapeHtml(budget || 'Not specified');
    const safeMessage = escapeHtml(message || 'None');
    const safeSource = escapeHtml(source || 'Website Direct');
    const safeCampaign = escapeHtml(utmCampaign || '');
    const safeLanding = escapeHtml(landingPage || '/');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const cleanPhone = String(phone || '').replace(/\D/g, '');
    const intlPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const whatsappLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hello ${name}, thank you for contacting Paras Properties regarding ${propertyTitle || 'properties'}.`)}`;

    const subject = `🚨 New Enquiry: ${name} (${phone}) - ${propertyTitle || 'General Enquiry'}`;

    const textContent = `
New Lead Enquiry Received - Paras Properties

Customer Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Property: ${propertyTitle || 'General Enquiry'}
Budget: ${budget || 'Not specified'}
Message: ${message || 'None'}
Acquisition Source: ${source || 'Website Direct'} ${utmCampaign ? `(Campaign: ${utmCampaign})` : ''}
Landing Page: ${landingPage || '/'}

Quick Actions:
Call Customer: tel:${phone}
Chat on WhatsApp: ${whatsappLink}
Admin CRM: ${siteUrl}/admin/leads
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
    .header p { margin: 6px 0 0 0; font-size: 12px; color: #f59e0b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .alert-banner { background: #fef3c7; border-bottom: 1px solid #fde68a; padding: 14px 24px; display: flex; align-items: center; font-size: 13px; font-weight: 700; color: #92400e; }
    .content { padding: 24px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .detail-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .detail-table td.label { font-weight: 700; color: #64748b; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .detail-table td.value { color: #0f172a; font-weight: 600; }
    .buttons { display: flex; gap: 10px; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; text-align: center; }
    .btn-call { background: #0f172a; color: #ffffff !important; }
    .btn-wa { background: #25D366; color: #ffffff !important; }
    .btn-admin { background: #f1f5f9; color: #334155 !important; border: 1px solid #cbd5e1; }
    .footer { background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Paras Properties</h1>
      <p>Kotputli & Jaipur Real Estate • Lead Alert</p>
    </div>

    <div class="alert-banner">
      🔔 Immediate Attention: A new customer submitted an enquiry!
    </div>

    <div class="content">
      <table class="detail-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value">${safeName}</td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${safePhone}" style="color: #047857; text-decoration: underline;">${safePhone}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">${safeEmail ? `<a href="mailto:${safeEmail}" style="color: #047857;">${safeEmail}</a>` : '<em style="color: #94a3b8;">Not provided</em>'}</td>
        </tr>
        <tr>
          <td class="label">Interested Property</td>
          <td class="value" style="color: #b45309; font-weight: 700;">${safeProperty}</td>
        </tr>
        <tr>
          <td class="label">Budget Range</td>
          <td class="value">${safeBudget}</td>
        </tr>
        <tr>
          <td class="label">Customer Message</td>
          <td class="value" style="font-weight: 400; color: #334155;">${safeMessage}</td>
        </tr>
        <tr>
          <td class="label">Ad Source</td>
          <td class="value"><span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${safeSource}${safeCampaign ? ` (Campaign: ${safeCampaign})` : ''}</span></td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 20px;">
        <a href="tel:${phone}" class="btn btn-call" style="margin-right: 8px;">📞 Call Customer</a>
        <a href="${whatsappLink}" class="btn btn-wa" style="margin-right: 8px;">💬 Chat on WhatsApp</a>
        <a href="${siteUrl}/admin/leads" class="btn btn-admin">🔐 Open CRM</a>
      </div>
    </div>

    <div class="footer">
      This notification was automatically sent to <strong>${NOTIFICATION_EMAIL}</strong> by Paras Properties Lead Management System.
    </div>
  </div>
</body>
</html>
`;

    const transporter = getTransporter();

    if (!transporter) {
      console.log(`\n================= [EMAIL NOTIFICATION MOCK / SETUP REQUIRED] =================`);
      console.log(`To: ${NOTIFICATION_EMAIL}`);
      console.log(`Subject: ${subject}`);
      console.log(`Customer: ${name} | Phone: ${phone}`);
      console.log(`Property: ${propertyTitle || 'General Enquiry'} | Budget: ${budget || 'N/A'}`);
      console.log(`Notice: Configure SMTP_USER and SMTP_PASS in .env.local to enable live delivery via Gmail/SMTP.`);
      console.log(`===============================================================================\n`);
      return { success: true, simulated: true };
    }

    const fromAddress = process.env.SMTP_FROM || `"Paras Properties" <${process.env.SMTP_USER}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: NOTIFICATION_EMAIL,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[EMAIL SENT] Lead alert successfully dispatched to ${NOTIFICATION_EMAIL}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send lead notification email:', error.message);
    // Don't throw so customer lead form still succeeds
    return { success: false, error: error.message };
  }
}
