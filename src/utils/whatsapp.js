/**
 * Generate a pre-filled WhatsApp click-to-chat URL
 * @param {string} phoneNumber - Clean phone number with country code, e.g. 919876543210
 * @param {string} message - Pre-filled message text
 */
export function getWhatsAppUrl(phoneNumber = '917742650820', message = '') {
  // Clean phone string (remove +, spaces, dashes)
  let cleanPhone = String(phoneNumber || '917742650820').replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.replace(/^0+/, '');
  }
  // If 10 digits (standard Indian mobile without country code), prepend 91
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }
  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

/**
 * Generate a pre-filled WhatsApp message for a specific property
 */
export function getPropertyWhatsAppMessage(property) {
  if (!property) {
    return 'Hi, I am interested in exploring available plots and properties. Please share more details.';
  }

  const sizeText = property.size ? `${property.size} ${property.sizeUnit || 'sq ft'}` : '';
  const priceText = property.priceDisplay || (property.price ? `₹${property.price}` : '');
  const locText = property.location || '';

  return `Hi, I am interested in "${property.title}" (${sizeText}, ${priceText}) in ${locText}. I found it on your website. Please share more details and layout plan.`;
}
