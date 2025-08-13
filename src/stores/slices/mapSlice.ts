'use client';

import type { StateCreator } from 'zustand';
import type { Map } from '@2gis/mapgl/global';
import type { AppStore, MapSlice, MarkerData, MarkerOptions } from '../types';
import { MAP_CONFIG } from '@/lib/mapgl/config';
import { safeDestroyMap } from '@/lib/mapgl/lifecycle';
import { isTestHooksEnabled } from '@/lib/config/env';
import { debugLog } from '@/lib/logging';

export const createMapSlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  MapSlice
> = (set, get) => ({
  instance: null,
  isLoading: true,
  markers: new globalThis.Map(),
  center: MAP_CONFIG.defaultCenter,
  zoom: MAP_CONFIG.defaultZoom,
  originalCenter: null,

  setMapInstance: (map: Map) => {
    set((state) => {
      state.map.instance = map;
      state.map.isLoading = false;
      state.map.originalCenter = MAP_CONFIG.defaultCenter;
      
      if (isTestHooksEnabled()) {
        try {
          (window as unknown as { __mapInstance?: unknown; __mapClickCount?: number }).__mapInstance = map;
          (window as unknown as { __mapClickCount?: number }).__mapClickCount = 0;
        } catch {}
      }
      
      if (map && typeof map.on === 'function') {
        map.on('click', (event: unknown) => {
          const mapEvent = event as { lngLat: [number, number] };
          debugLog('Map clicked at:', mapEvent.lngLat);
          if (isTestHooksEnabled()) {
            try {
              (window as unknown as { __mapClickCount?: number }).__mapClickCount = ((window as unknown as { __mapClickCount?: number }).__mapClickCount ?? 0) + 1;
            } catch {}
          }
        });
      }
    });
  },

  addMarker: async (id: string, coords: [number, number], options?: MarkerOptions) => {
    const mapInstance = get().map.instance;
    if (!mapInstance) return;

    const existingMarker = get().map.markers.get(id);
    if (existingMarker?.marker) {
      existingMarker.marker.destroy();
    }

    try {
      const { load } = await import('@2gis/mapgl');
      const mapgl = await load();

      const markerOptions = {
        coordinates: coords,
        icon: MAP_CONFIG.markerDefaults.icon,
        size: MAP_CONFIG.markerDefaults.size,
        anchor: MAP_CONFIG.markerDefaults.anchor,
        ...(options?.icon && { icon: options.icon }),
        ...(options?.size && { size: options.size }),
        ...(options?.anchor && { anchor: options.anchor }),
      };

      const marker = new mapgl.Marker(mapInstance, markerOptions);

      set((state) => {
        state.map.markers.set(id, {
          id,
          coords,
          marker,
          options,
        });
      });

      if (isTestHooksEnabled()) {
        try {
          (window as unknown as { __markerCount?: number }).__markerCount = get().map.markers.size;
        } catch {}
      }
    } catch (error) {
      console.error('Failed to create marker:', error);
    }
  },

  removeMarker: (id: string) => {
    const markerData = get().map.markers.get(id);
    if (markerData?.marker) {
      markerData.marker.destroy();
      set((state) => {
        state.map.markers.delete(id);
      });
      
      if (isTestHooksEnabled()) {
        try {
          (window as unknown as { __markerCount?: number }).__markerCount = get().map.markers.size;
        } catch {}
      }
    }
  },

  clearMarkers: () => {
    const markers = get().map.markers;
    markers.forEach((markerData: MarkerData) => {
      if (markerData.marker) {
        markerData.marker.destroy();
      }
    });
    
    set((state) => {
      state.map.markers.clear();
    });
    
    if (isTestHooksEnabled()) {
      try {
        (window as unknown as { __markerCount?: number }).__markerCount = 0;
      } catch {}
    }
  },

  centerOnMarker: (id: string) => {
    const mapInstance = get().map.instance;
    if (!mapInstance) return;

    const markerData = get().map.markers.get(id);
    if (markerData) {
      set((state) => {
        state.map.originalCenter = markerData.coords;
        state.map.center = markerData.coords;
      });

      mapInstance.setCenter(markerData.coords, {
        duration: MAP_CONFIG.animation.duration,
        easing: MAP_CONFIG.animation.easing,
      });
    }
  },

  centerOnLocation: (coords: [number, number], zoom?: number) => {
    const mapInstance = get().map.instance;
    if (!mapInstance) return;

    set((state) => {
      state.map.originalCenter = coords;
      state.map.center = coords;
      if (zoom) state.map.zoom = zoom;
    });

    mapInstance.setCenter(coords, {
      duration: MAP_CONFIG.animation.duration,
      easing: MAP_CONFIG.animation.easing,
    });

    if (zoom) {
      mapInstance.setZoom(zoom, {
        duration: MAP_CONFIG.animation.duration,
        easing: MAP_CONFIG.animation.easing,
      });
    }
  },

  adjustCenterForBottomSheet: (oldPercent: number, newPercent: number) => {
    const mapInstance = get().map.instance;
    if (!mapInstance) return;

    if (Math.abs(oldPercent - newPercent) < 0.1) return;

    const viewportHeight = window.innerHeight;
    const oldSheetHeight = (oldPercent / 100) * viewportHeight;
    const newSheetHeight = (newPercent / 100) * viewportHeight;

    const oldVisibleCenter = (viewportHeight - oldSheetHeight) / 2;
    const newVisibleCenter = (viewportHeight - newSheetHeight) / 2;
    const pixelShift = newVisibleCenter - oldVisibleCenter;

    const currentCenter = mapInstance.getCenter();
    const centerPixels = mapInstance.project(currentCenter);

    const targetPixels = {
      x: centerPixels.x,
      y: centerPixels.y - pixelShift,
    };

    const newCenter = mapInstance.unproject(targetPixels);

    set((state) => {
      state.map.center = newCenter;
    });

    mapInstance.setCenter(newCenter, {
      duration: MAP_CONFIG.animation.duration,
      easing: MAP_CONFIG.animation.easing,
    });
  },

  destroyMap: () => {
    const mapInstance = get().map.instance;
    get().map.clearMarkers();
    
    if (mapInstance) {
      safeDestroyMap(mapInstance, 'Failed to destroy map instance from store');
    }
    
    set((state) => {
      state.map.instance = null;
      state.map.isLoading = true;
      state.map.markers.clear();
    });
  },
});