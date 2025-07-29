'use client';

import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface UseLocationReturn {
  location: Location | null;
  loading: boolean;
  error: string | null;
  getLocation: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = data.results[0]?.formatted_address || 'Address not available';
            
            setLocation({
              latitude,
              longitude,
              address
            });
          } else {
            setLocation({
              latitude,
              longitude,
              address: 'Address not available'
            });
          }
        } catch (err) {
          // If reverse geocoding fails, still save coordinates
          setLocation({
            latitude,
            longitude,
            address: 'Address not available'
          });
        }
        
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information unavailable.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while getting location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return { location, loading, error, getLocation };
};