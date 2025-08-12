'use client';

import { useContext, createContext } from 'react';
import type { Map, Marker } from '@2gis/mapgl/global';

export interface MapContextValue {
  map: Map | null;
  isLoading: boolean;
  markers: globalThis.Map<string, Marker>;
  addMarker: (id: string, coords: [number, number], options?: Record<string, unknown>) => Promise<void>;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
  centerOnMarker: (id: string) => void;
  centerOnLocation: (coords: [number, number], zoom?: number) => void;
  adjustCenterForBottomSheet: (oldSheetPercent: number, newSheetPercent: number) => void;
}

export const MapContext = createContext<MapContextValue | null>(null);

export const useMapGL = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapGL must be used within MapProvider');
  }
  return context;
};