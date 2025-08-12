export const MAP_CONFIG = {
  defaultCenter: [37.531323, 55.736413] as [number, number], // Moscow
  defaultZoom: 14,
  defaultStyle: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b',
  mobileSettings: {
    pitch: 0,
    rotation: 0,
    cooperativeGestures: false,
    preloadTiles: true,
    tileSize: 256,
    maxZoom: 18,
  },
  fitBoundsOptions: {
    padding: {
      top: 50,
      bottom: 300, // Space for bottom sheet
      left: 50,
      right: 50,
    },
  },
  markerDefaults: {
    icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
    size: [32, 32] as [number, number],
    anchor: [16, 32] as [number, number],
  },
  animation: {
    duration: 300,
    easing: 'easeInOutCubic',
  },
} as const;

export const isHighEndDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  return (memory === undefined || memory >= 4) && (cores === undefined || cores >= 4);
};