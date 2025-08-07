'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapContext } from '@/hooks/useMapGL';
import type { Map, Marker } from '@2gis/mapgl/global';
import { MAP_CONFIG } from '@/lib/mapgl/config';

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const [map, setMap] = useState<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<globalThis.Map<string, Marker>>(new globalThis.Map());

  const addMarker = useCallback(async (id: string, coords: [number, number], options?: Record<string, unknown>) => {
    if (!map) return;
    
    // Remove existing marker with same id
    if (markersRef.current.has(id)) {
      markersRef.current.get(id)?.destroy();
    }

    try {
      const { load } = await import('@2gis/mapgl');
      const mapgl = await load();
      
      // Create marker options, filtering out unsupported properties
      const markerOptions = {
        coordinates: coords,
        icon: MAP_CONFIG.markerDefaults.icon,
        size: MAP_CONFIG.markerDefaults.size,
        anchor: MAP_CONFIG.markerDefaults.anchor,
        // Override with valid options if provided
        ...(options && typeof options.icon === 'string' && { icon: options.icon }),
        ...(options && Array.isArray(options.size) && { size: options.size as [number, number] }),
        ...(options && Array.isArray(options.anchor) && { anchor: options.anchor as [number, number] }),
      };
      
      const marker = new mapgl.Marker(map, markerOptions);
      
      markersRef.current.set(id, marker);
    } catch (error) {
      console.error('Failed to create marker:', error);
    }
  }, [map]);

  const removeMarker = useCallback((id: string) => {
    const marker = markersRef.current.get(id);
    if (marker) {
      marker.destroy();
      markersRef.current.delete(id);
    }
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker: Marker) => marker.destroy());
    markersRef.current.clear();
  }, []);

  const centerOnMarker = useCallback((id: string) => {
    if (!map) return;
    
    const marker = markersRef.current.get(id);
    if (marker) {
      // @ts-expect-error - coordinates property exists
      const coords = (marker as { coordinates: [number, number] }).coordinates;
      map.setCenter(coords, {
        duration: MAP_CONFIG.animation.duration,
        easing: MAP_CONFIG.animation.easing,
      });
    }
  }, [map]);

  const centerOnLocation = useCallback((coords: [number, number], zoom?: number) => {
    if (!map) return;
    
    map.setCenter(coords, {
      duration: MAP_CONFIG.animation.duration,
      easing: MAP_CONFIG.animation.easing,
    });
    
    if (zoom) {
      map.setZoom(zoom, {
        duration: MAP_CONFIG.animation.duration,
        easing: MAP_CONFIG.animation.easing,
      });
    }
  }, [map]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearMarkers();
    };
  }, [clearMarkers]);

  const value = {
    map,
    isLoading,
    markers: markersRef.current,
    addMarker,
    removeMarker,
    clearMarkers,
    centerOnMarker,
    centerOnLocation,
  };

  // Internal setter for map instance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This will be called by MapContainer when map is ready
      (window as unknown as { __setMapInstance?: (mapInstance: Map) => void }).__setMapInstance = (mapInstance: Map) => {
        setMap(mapInstance);
        setIsLoading(false);
      };
    }
  }, []);

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}