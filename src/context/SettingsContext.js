'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

const defaultSettings = {
  companyName: 'Paras Property',
  tagline: 'Verified Plots & Premium Properties in Prime Locations',
  ownerName: 'Ashok Yadav',
  ownerRole: 'Founder & Property Consultant',
  ownerPhoto: '/images/ashok-yadav.jpg',
  ownerMessage: 'With over a decade of hands-on experience in prime residential plots, commercial lands, and gated townships across Jaipur, my personal commitment at Paras Property is to ensure 100% legal title verification, direct developer pricing, and a smooth registry experience for every buyer.',
  phone: '+91 77426 50820',
  whatsapp: '7742650820',
  email: 'ashokyadav@parasproperty.com',
  address: 'Tonk Road, Near Airport, Jaipur, Rajasthan 302018',
  metaPixelId: '',
  currencySymbol: '₹',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [toast, setToast] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data && data.companyName) {
          setSettings(data);
        }
      }
    } catch (e) {
      console.warn('Settings fetch fallback');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettingsState = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const closeToast = () => setToast(null);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings: updateSettingsState,
        refreshSettings: fetchSettings,
        toast,
        showToast,
        closeToast,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
