'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { properties as initialProperties } from '@/data/properties';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  // All properties including newly added listings
  const [propertiesList, setPropertiesList] = useState(initialProperties);
  
  // Favorites saved in localStorage
  const [favorites, setFavorites] = useState([]);
  
  // Comparison list (array of property IDs)
  const [compareList, setCompareList] = useState([]);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Load favorites & custom properties from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('haven_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedProperties = localStorage.getItem('haven_custom_properties');
      if (savedProperties) {
        const parsed = JSON.parse(savedProperties);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPropertiesList([...parsed, ...initialProperties]);
        }
      }

      const savedCompare = localStorage.getItem('haven_compare');
      if (savedCompare) {
        setCompareList(JSON.parse(savedCompare));
      }
    } catch (err) {
      console.error('Failed to load storage data:', err);
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(propertyId)) {
        updated = prev.filter((id) => id !== propertyId);
        showToast('Property removed from favorites', 'info');
      } else {
        updated = [...prev, propertyId];
        showToast('Property saved to your favorites!', 'success');
      }
      try {
        localStorage.setItem('haven_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  // Compare properties management
  const toggleCompare = (propertyId) => {
    setCompareList((prev) => {
      let updated;
      if (prev.includes(propertyId)) {
        updated = prev.filter((id) => id !== propertyId);
        showToast('Removed from comparison', 'info');
      } else {
        if (prev.length >= 4) {
          showToast('You can compare a maximum of 4 properties at once', 'warning');
          return prev;
        }
        updated = [...prev, propertyId];
        showToast('Added to comparison matrix', 'success');
      }
      try {
        localStorage.setItem('haven_compare', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isCompared = (propertyId) => compareList.includes(propertyId);

  const clearComparison = () => {
    setCompareList([]);
    try {
      localStorage.removeItem('haven_compare');
    } catch (e) {
      console.error(e);
    }
    showToast('Comparison cleared', 'info');
  };

  // Add new user listing
  const addProperty = (newProp) => {
    const formattedProp = {
      ...newProp,
      id: `prop-user-${Date.now()}`,
      slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      yearBuilt: newProp.yearBuilt || new Date().getFullYear(),
      isFeatured: false,
      isVerified: true,
      isNew: true,
      images: newProp.images && newProp.images.length > 0 ? newProp.images : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
      ],
      neighborhoodScores: {
        walkScore: 85,
        transitScore: 80,
        schoolsScore: 90,
        safetyScore: 92,
      },
      agent: {
        id: 'agent-1',
        name: 'Sarah Jenkins',
        title: 'Listing Coordinator',
        phone: '+1 (555) 234-5678',
        email: 'sarah.jenkins@havenestate.com',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
      }
    };

    setPropertiesList((prev) => {
      const updated = [formattedProp, ...prev];
      try {
        const customProps = updated.filter((p) => p.id.startsWith('prop-user-'));
        localStorage.setItem('haven_custom_properties', JSON.stringify(customProps));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    showToast('Property listed successfully!', 'success');
    return formattedProp;
  };

  // Toast utility
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const closeToast = () => setToast(null);

  return (
    <PropertyContext.Provider
      value={{
        properties: propertiesList,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        isCompared,
        clearComparison,
        addProperty,
        showToast,
        toast,
        closeToast,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
