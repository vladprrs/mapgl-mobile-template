'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapContext } from '@/hooks/useMapGL';
import type { Map, Marker } from '@2gis/mapgl/global';
import { MAP_CONFIG } from '@/lib/mapgl/config';
import { isTestHooksEnabled } from '@/lib/config/env';

interface MapProviderProps {
  children: React.ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const [map, setMap] = useState<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<globalThis.Map<string, Marker>>(new globalThis.Map());
  const originalCenterRef = useRef<[number, number] | null>(null);

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
      
      // Instrumentation: track marker counts in E2E
      if (isTestHooksEnabled()) {
        try {
          const w = window as unknown as { __markerCount?: number };
          w.__markerCount = markersRef.current.size;
        } catch {}
      }
    } catch (error) {
      console.error('Failed to create marker:', error);
    }
  }, [map]);

  const removeMarker = useCallback((id: string) => {
    const marker = markersRef.current.get(id);
    if (marker) {
      marker.destroy();
      markersRef.current.delete(id);
      if (isTestHooksEnabled()) {
        try {
          const w = window as unknown as { __markerCount?: number };
          w.__markerCount = markersRef.current.size;
        } catch {}
      }
    }
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker: Marker) => marker.destroy());
    markersRef.current.clear();
    if (isTestHooksEnabled()) {
      try {
        const w = window as unknown as { __markerCount?: number };
        w.__markerCount = 0;
      } catch {}
    }
  }, []);

  const centerOnMarker = useCallback((id: string) => {
    if (!map) return;
    
    const marker = markersRef.current.get(id);
    if (marker) {
      // @ts-expect-error - coordinates property exists
      const coords = (marker as { coordinates: [number, number] }).coordinates;
      
      // Reset original center when manually centering on marker
      originalCenterRef.current = coords;
      
      map.setCenter(coords, {
        duration: MAP_CONFIG.animation.duration,
        easing: MAP_CONFIG.animation.easing,
      });
    }
  }, [map]);

  const centerOnLocation = useCallback((coords: [number, number], zoom?: number) => {
    if (!map) return;
    
    // Reset original center when manually centering
    originalCenterRef.current = coords;
    
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

  const adjustCenterForBottomSheet = useCallback((oldSheetPercent: number, newSheetPercent: number) => {
    if (!map) {
      return;
    }
    
    // Skip if position hasn't changed significantly
    if (Math.abs(oldSheetPercent - newSheetPercent) < 0.1) {
      return;
    }
    
    const viewportHeight = window.innerHeight;
    
    // Calculate the center of visible area for old and new positions
    // Visible area is from top of viewport to top of sheet
    const oldSheetHeight = (oldSheetPercent / 100) * viewportHeight;
    const newSheetHeight = (newSheetPercent / 100) * viewportHeight;
    
    // Center of visible area in screen coordinates
    const oldVisibleCenter = (viewportHeight - oldSheetHeight) / 2;
    const newVisibleCenter = (viewportHeight - newSheetHeight) / 2;
    
    // Calculate how much we need to shift vertically in pixels
    // When sheet goes up, visible center goes up, so we need to pan map down
    const pixelShift = newVisibleCenter - oldVisibleCenter;
    
    // Get the geographic point that was at the old visible center
    // This is the point we want to keep centered
    const currentCenter = map.getCenter();
    const centerPixels = map.project(currentCenter);
    
    // The point that was at the old visible center is now offset by pixelShift
    // We need to find what geographic point is now at that screen position
    const targetPixels = {
      x: centerPixels.x,
      y: centerPixels.y - pixelShift // Subtract because screen Y is inverted
    };
    
    // Convert back to geographic coordinates
    const newCenter = map.unproject(targetPixels);
    
    // Pan to the new center
    map.setCenter(newCenter, {
      duration: MAP_CONFIG.animation.duration,
      easing: MAP_CONFIG.animation.easing,
    });
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
    adjustCenterForBottomSheet,
  };

  // Internal setter for map instance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This will be called by MapContainer when map is ready
      (window as unknown as { __setMapInstance?: (mapInstance: Map) => void }).__setMapInstance = (mapInstance: Map) => {
        setMap(mapInstance);
        setIsLoading(false);
        // Set initial original center from config
        originalCenterRef.current = MAP_CONFIG.defaultCenter;
      };
    }
  }, []);

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}