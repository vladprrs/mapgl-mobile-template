declare module '@2gis/mapgl/global' {
  export interface MapOptions {
    container: string | HTMLElement;
    center: [number, number];
    zoom: number;
    key: string;
    style?: string;
    pitch?: number;
    rotation?: number;
    fitBoundsOptions?: {
      padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
  }

  export interface MarkerOptions {
    coordinates: [number, number];
    icon?: string;
    size?: [number, number];
    anchor?: [number, number];
    label?: string;
  }

  export class Map {
    constructor(container: string | HTMLElement, options: MapOptions);
    on(event: string, handler: (event: unknown) => void): void;
    off(event: string, handler: (event: unknown) => void): void;
    setCenter(center: [number, number], options?: { duration?: number; easing?: string }): void;
    setZoom(zoom: number, options?: { duration?: number; easing?: string }): void;
    getCenter(): [number, number];
    getZoom(): number;
    getBounds(): [[number, number], [number, number]];
    fitBounds(bounds: [[number, number], [number, number]], options?: Record<string, unknown>): void;
    project(lngLat: [number, number]): { x: number; y: number };
    unproject(point: { x: number; y: number }): [number, number];
    destroy(): void;
  }

  export class Marker {
    constructor(map: Map, options: MarkerOptions);
    setCoordinates(coordinates: [number, number]): void;
    setIcon(url: string): void;
    show(): void;
    hide(): void;
    destroy(): void;
  }

  export class ZoomControl {
    constructor(map: Map, options?: { position?: string });
  }

  export class GeoControl {
    constructor(map: Map, options?: { position?: string });
  }

  export class RulerControl {
    constructor(map: Map);
  }
}

declare module '@2gis/mapgl' {
  export function load(): Promise<typeof import('@2gis/mapgl/global')>;
}