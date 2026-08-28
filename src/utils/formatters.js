/**
 * Format Indian / Global currency values cleanly
 * e.g. 4200000 -> "₹42 Lakh" or "₹4,200,000"
 */
export function formatPrice(price, priceUnit = '') {
  if (price === undefined || price === null || isNaN(price)) return 'Price on Request';

  if (price >= 10000000) {
    const crore = (price / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${crore} Crore`;
  }
  if (price >= 100000) {
    const lakh = (price / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lakh} Lakh`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format numbers with Indian commas or standard format
 */
export function formatNumber(value) {
  if (value === undefined || value === null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Format dates cleanly
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatShortDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
