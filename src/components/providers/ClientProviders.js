'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';
import UtmTracker from '@/components/public/UtmTracker';
import MetaPixel from '@/components/public/MetaPixel';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/PublicFooter';
import Toast from '@/components/ui/Toast';

export default function ClientProviders({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <SettingsProvider>
        <Suspense fallback={null}>
          <UtmTracker />
        </Suspense>
        <MetaPixel />
        {!isAdmin && <PublicNavbar />}
        <main className="flex-1">{children}</main>
        {!isAdmin && <PublicFooter />}
        <Toast />
      </SettingsProvider>
    </AuthProvider>
  );
}
