'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useSettings } from '@/context/SettingsContext';

export default function MetaPixel() {
  const { settings } = useSettings();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || settings?.metaPixelId;

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="meta-pixel"
        />
      </noscript>
    </>
  );
}

/**
 * Trigger Meta Pixel Lead Conversion event
 */
export function trackMetaLead(customData = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', 'Lead', {
        content_name: customData.propertyTitle || 'Property Enquiry',
        content_category: customData.propertyType || 'Real Estate',
        value: customData.value || 0,
        currency: 'INR',
        ...customData,
      });
    } catch (e) {
      console.warn('Meta Pixel tracking error:', e);
    }
  }
}
