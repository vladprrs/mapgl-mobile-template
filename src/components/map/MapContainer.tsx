'use client';

import { useEffect, useRef, useState } from 'react';
import { MAP_CONFIG } from '@/lib/mapgl/config';
import { config, ConfigError } from '@/lib/config/env';
import { GeolocationControl } from './GeolocationControl';

interface MapContainerProps {
  className?: string;
}

export function MapContainer({ className = '' }: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<InstanceType<typeof import('@2gis/mapgl/global').Map> | null>(null);
  const zoomControlRef = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);
  const initializingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializingRef.current) return;

    const initMap = async () => {
      initializingRef.current = true;
      
      try {
        const { load } = await import('@2gis/mapgl');
        const mapgl = await load();

        let apiKey: string;
        try {
          apiKey = config.mapgl.apiKey;
        } catch (error) {
          if (error instanceof ConfigError) {
            console.error('Configuration Error:', error.message);
            // You could also show a user-friendly error message in the UI
          }
          return;
        }

        // Clean up any existing map instance first
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        const map = new mapgl.Map(containerRef.current!, {
          container: containerRef.current!,
          center: MAP_CONFIG.defaultCenter,
          zoom: MAP_CONFIG.defaultZoom,
          key: apiKey,
          style: MAP_CONFIG.defaultStyle,
          ...MAP_CONFIG.mobileSettings,
          fitBoundsOptions: MAP_CONFIG.fitBoundsOptions,
        });

        mapInstanceRef.current = map;

        // Set map instance in provider
        if ((window as unknown as { __setMapInstance?: (map: unknown) => void }).__setMapInstance) {
          (window as unknown as { __setMapInstance: (map: unknown) => void }).__setMapInstance(map);
        }

        // Store mapgl globally for use in GeolocationControl
        (window as unknown as { mapgl: unknown }).mapgl = mapgl;

        // Add zoom control and store reference
        zoomControlRef.current = new mapgl.ZoomControl(map, {
          position: 'topRight',
        });

        // Mark map as ready for custom controls
        setMapReady(true);

        // Handle map events
        map.on('click', (event: unknown) => {
          const mapEvent = event as { lngLat: [number, number] };
          console.log('Map clicked at:', mapEvent.lngLat);
        });

      } catch (error) {
        console.error('Failed to initialize map:', error);
      } finally {
        initializingRef.current = false;
      }
    };

    initMap();

    return () => {
      setMapReady(false);
      if (zoomControlRef.current) {
        const control = zoomControlRef.current as { destroy?: () => void };
        control.destroy?.();
        zoomControlRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef}
        className={`w-full h-full ${className}`}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {mapReady && mapInstanceRef.current && (
        <GeolocationControl map={mapInstanceRef.current} position="topRight" />
      )}
    </>
  );
}