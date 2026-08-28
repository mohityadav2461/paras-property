import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Haven Realty & Plots • Premium Verified Properties in Prime Locations',
    template: '%s • Haven Realty',
  },
  description: 'Explore verified residential plots, commercial lands, luxury villas, and farmhouse properties with 100% legal title clearance and transparent pricing.',
  keywords: [
    'plots for sale',
    'residential plots',
    'commercial land',
    'gated township plots',
    'jaipur real estate',
    'villa plots',
    'farmhouse land',
    'real estate investment',
  ],
  openGraph: {
    title: 'Haven Realty & Plots • Verified Properties & Lands',
    description: 'Find premium plots and luxury properties in prime locations with verified legal clearances.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-700 selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
