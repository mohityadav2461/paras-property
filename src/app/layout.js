import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Paras Properties • Verified Plots & Lands in Jaipur',
    template: '%s • Paras Properties',
  },
  description: 'Explore verified residential plots, commercial lands, luxury villas, and farmhouse properties in Jaipur with 100% legal title clearance and transparent developer pricing by Ashok Yadav & Adv. Balbir Singh.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  keywords: [
    'paras properties',
    'paras property jaipur',
    'plots for sale in jaipur',
    'residential plots',
    'commercial land jaipur',
    'gated township plots',
    'ashok yadav paras property',
    'adv balbir singh jaipur',
    'jagatpura plots',
    'ajmer road plots',
    'tonk road plots',
  ],
  openGraph: {
    title: 'Paras Properties • Verified Plots & Lands in Jaipur',
    description: 'Find premium plots and verified land properties in Jaipur with 100% legal title clearance by Ashok Yadav & Adv. Balbir Singh.',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/images/logo.png', width: 800, height: 800, alt: 'Paras Properties Logo' }],
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
