'use client';

import type { AppStore } from '../types';
import useStore from '../index';

export const selectMapInstance = (state: AppStore) => state.map.instance;
export const selectMapLoading = (state: AppStore) => state.map.isLoading;
export const selectMapMarkers = (state: AppStore) => state.map.markers;
export const selectMapCenter = (state: AppStore) => state.map.center;
export const selectMapZoom = (state: AppStore) => state.map.zoom;

export const selectMarkerById = (id: string) => (state: AppStore) => 
  state.map.markers.get(id);

export const selectMarkerCount = (state: AppStore) => 
  state.map.markers.size;

export const selectVisibleMarkers = (bounds?: [number, number, number, number]) => (state: AppStore) => {
  if (!bounds) return Array.from(state.map.markers.values());
  
  const [west, south, east, north] = bounds;
  return Array.from(state.map.markers.values()).filter((marker) => {
    const [lng, lat] = marker.coords;
    return lng >= west && lng <= east && lat >= south && lat <= north;
  });
};

export const useMapInstance = () => useStore(selectMapInstance);
export const useMapLoading = () => useStore(selectMapLoading);
export const useMapMarkers = () => useStore(selectMapMarkers);
export const useMapCenter = () => useStore(selectMapCenter);
export const useMapZoom = () => useStore(selectMapZoom);