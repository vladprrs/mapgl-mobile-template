'use client';

import { useEffect, useRef } from 'react';
import { MAP_CONFIG } from '@/lib/mapgl/config';
import { config, ConfigError } from '@/lib/config/env';

interface MapContainerProps {
  className?: string;
}

export function MapContainer({ className = '' }: MapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<InstanceType<typeof import('@2gis/mapgl/global').Map> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initMap = async () => {
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

        // Add controls
        new mapgl.ZoomControl(map, {
          position: 'topRight',
        });

        new mapgl.GeoControl(map, {
          position: 'topRight',
        });

        // Handle map events
        map.on('click', (event: unknown) => {
          const mapEvent = event as { lngLat: [number, number] };
          console.log('Map clicked at:', mapEvent.lngLat);
        });

      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  );
}