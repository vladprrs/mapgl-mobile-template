'use client';

import { useEffect, useState, useCallback } from 'react';

interface GeolocationControlProps {
  map: unknown; // 2GIS MapGL instance
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}

export function GeolocationControl({ map, position = 'topRight' }: GeolocationControlProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Type the map instance
        const mapInstance = map as {
          setCenter: (coords: [number, number], options?: { duration?: number }) => void;
          setZoom: (zoom: number, options?: { duration?: number }) => void;
        };
        
        // Center map on user's location
        mapInstance.setCenter([longitude, latitude], {
          duration: 300,
        });
        
        // Zoom in to show user location clearly
        mapInstance.setZoom(15, {
          duration: 300,
        });

        // Add a marker for user location (optional)
        // You might want to use a custom marker here
        interface WindowWithMapGL extends Window {
          mapgl?: {
            Marker: new (map: unknown, options: {
              coordinates: [number, number];
              icon: string;
              size: [number, number];
              anchor: [number, number];
            }) => { destroy: () => void };
          };
          __userLocationMarker?: { destroy: () => void };
        }
        
        const windowWithMapGL = window as unknown as WindowWithMapGL;
        
        if (typeof window !== 'undefined' && windowWithMapGL.mapgl) {
          const mapgl = windowWithMapGL.mapgl;
          
          // Remove previous location marker if exists
          if (windowWithMapGL.__userLocationMarker) {
            windowWithMapGL.__userLocationMarker.destroy();
          }

          // Create new location marker
          const marker = new mapgl.Marker(map, {
            coordinates: [longitude, latitude],
            icon: 'https://docs.2gis.com/img/mapgl/marker-blue.svg',
            size: [32, 32],
            anchor: [16, 32],
          });

          windowWithMapGL.__userLocationMarker = marker;
        }

        setHasLocation(true);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('An unknown error occurred');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, [map]);

  useEffect(() => {
    if (!map) return;

    // Create custom control HTML
    const controlHTML = `
      <div class="mapgl-ctrl-group">
        <button 
          id="geolocation-btn" 
          class="mapgl-ctrl-icon"
          title="Find my location"
          type="button"
          aria-label="Find my location"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8.5C9.17 8.5 8.5 9.17 8.5 10C8.5 10.83 9.17 11.5 10 11.5C10.83 11.5 11.5 10.83 11.5 10C11.5 9.17 10.83 8.5 10 8.5ZM10 2C9.45 2 9 2.45 9 3V5.07C6.06 5.56 3.56 8.06 3.07 11H1C0.45 11 0 11.45 0 12C0 12.55 0.45 13 1 13H3.07C3.56 15.94 6.06 18.44 9 18.93V21C9 21.55 9.45 22 10 22C10.55 22 11 21.55 11 21V18.93C13.94 18.44 16.44 15.94 16.93 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11H16.93C16.44 8.06 13.94 5.56 11 5.07V3C11 2.45 10.55 2 10 2ZM10 16.5C6.97 16.5 4.5 14.03 4.5 11C4.5 7.97 6.97 5.5 10 5.5C13.03 5.5 15.5 7.97 15.5 11C15.5 14.03 13.03 16.5 10 16.5Z" 
              fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;

    // Create control container
    const controlContainer = document.createElement('div');
    controlContainer.innerHTML = controlHTML;
    controlContainer.style.position = 'absolute';
    controlContainer.style.zIndex = '10';
    
    // Position the control (offset to avoid overlap with zoom controls)
    const positionStyles: Record<string, React.CSSProperties> = {
      topLeft: { top: '10px', left: '10px' },
      topCenter: { top: '10px', left: '50%', transform: 'translateX(-50%)' },
      topRight: { top: '80px', right: '10px' }, // Offset down to avoid zoom controls
      centerLeft: { top: '50%', left: '10px', transform: 'translateY(-50%)' },
      centerRight: { top: '50%', right: '10px', transform: 'translateY(-50%)' },
      bottomLeft: { bottom: '10px', left: '10px' },
      bottomCenter: { bottom: '10px', left: '50%', transform: 'translateX(-50%)' },
      bottomRight: { bottom: '10px', right: '10px' },
    };

    Object.assign(controlContainer.style, positionStyles[position]);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .mapgl-ctrl-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .mapgl-ctrl-icon {
        width: 32px;
        height: 32px;
        background: white;
        border: none;
        border-radius: 4px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        transition: background-color 0.2s;
      }
      
      .mapgl-ctrl-icon:hover {
        background-color: #f4f4f4;
      }
      
      .mapgl-ctrl-icon:active {
        background-color: #e8e8e8;
      }
      
      .mapgl-ctrl-icon.locating {
        color: #007AFF;
        animation: pulse 1.5s infinite;
      }
      
      .mapgl-ctrl-icon.has-location {
        color: #007AFF;
      }
      
      .mapgl-ctrl-icon.error {
        color: #FF3B30;
      }
      
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `;
    
    document.head.appendChild(style);

    // Get map container and append control
    const mapWithContainer = map as { getContainer: () => HTMLElement | null };
    const mapContainer = mapWithContainer.getContainer();
    if (mapContainer) {
      mapContainer.appendChild(controlContainer);
    }

    // Add click handler
    const button = controlContainer.querySelector('#geolocation-btn') as HTMLButtonElement;
    if (button) {
      button.addEventListener('click', handleGeolocation);
      
      // Update button state
      if (isLocating) {
        button.classList.add('locating');
        button.classList.remove('has-location', 'error');
      } else if (locationError) {
        button.classList.add('error');
        button.classList.remove('locating', 'has-location');
        button.title = locationError;
      } else if (hasLocation) {
        button.classList.add('has-location');
        button.classList.remove('locating', 'error');
      }
    }

    // Cleanup function
    return () => {
      if (mapContainer && controlContainer.parentNode === mapContainer) {
        mapContainer.removeChild(controlContainer);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [map, position, isLocating, hasLocation, locationError, handleGeolocation]);

  return null; // This component doesn't render anything directly
}