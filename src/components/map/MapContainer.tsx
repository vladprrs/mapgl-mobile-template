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
          }
          return;
        }

        // Clean up any existing map instance first
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        // Create map with default controls enabled
        const map = new mapgl.Map(containerRef.current!, {
          container: containerRef.current!,
          center: MAP_CONFIG.defaultCenter,
          zoom: MAP_CONFIG.defaultZoom,
          key: apiKey,
          style: MAP_CONFIG.defaultStyle,
          ...MAP_CONFIG.mobileSettings,
          fitBoundsOptions: MAP_CONFIG.fitBoundsOptions,
          // Let 2GIS handle all controls by default
          // No manual control management needed
        });

        mapInstanceRef.current = map;

        // Set map instance in provider if needed
        if ((window as unknown as { __setMapInstance?: (map: unknown) => void }).__setMapInstance) {
          (window as unknown as { __setMapInstance: (map: unknown) => void }).__setMapInstance(map);
        }

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
      // Clean up map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
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