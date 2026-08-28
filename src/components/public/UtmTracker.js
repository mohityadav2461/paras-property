'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

function UtmTrackerInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const utmContent = searchParams.get('utm_content');
      const utmTerm = searchParams.get('utm_term');

      // If any UTM parameter is present, save to sessionStorage
      if (utmSource || utmCampaign || utmMedium) {
        const utmData = {
          utmSource: utmSource || '',
          utmMedium: utmMedium || '',
          utmCampaign: utmCampaign || '',
          utmContent: utmContent || '',
          utmTerm: utmTerm || '',
          landingPage: pathname + (window.location.search || ''),
          referrer: document.referrer || '',
          timestamp: Date.now(),
        };
        sessionStorage.setItem('haven_utm_data', JSON.stringify(utmData));
      } else if (!sessionStorage.getItem('haven_utm_data')) {
        // Record organic visit
        const initialData = {
          utmSource: '',
          utmMedium: '',
          utmCampaign: '',
          utmContent: '',
          utmTerm: '',
          landingPage: pathname,
          referrer: document.referrer || '',
          timestamp: Date.now(),
        };
        sessionStorage.setItem('haven_utm_data', JSON.stringify(initialData));
      }
    } catch (e) {
      console.warn('UTM tracker storage notice:', e);
    }
  }, [searchParams, pathname]);

  return null;
}

export default function UtmTracker() {
  return (
    <Suspense fallback={null}>
      <UtmTrackerInner />
    </Suspense>
  );
}

export function getStoredUtmData() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem('haven_utm_data');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
