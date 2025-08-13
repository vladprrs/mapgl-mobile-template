'use client';

import type { Map, Marker } from '@2gis/mapgl/global';
import type { ScreenType } from '@/components/templates/types';

export interface MarkerData {
  id: string;
  coords: [number, number];
  marker?: Marker;
  options?: MarkerOptions;
}

export interface MarkerOptions {
  icon?: string;
  size?: [number, number];
  anchor?: [number, number];
  [key: string]: unknown;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  type: 'place' | 'category' | 'history';
  coords?: [number, number];
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  coords: [number, number];
  distance?: number;
  rating?: number;
  category?: string;
}

export interface MapSlice {
  instance: Map | null;
  isLoading: boolean;
  markers: globalThis.Map<string, MarkerData>;
  center: [number, number];
  zoom: number;
  originalCenter: [number, number] | null;
  
  setMapInstance: (map: Map) => void;
  addMarker: (id: string, coords: [number, number], options?: MarkerOptions) => Promise<void>;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
  centerOnMarker: (id: string) => void;
  centerOnLocation: (coords: [number, number], zoom?: number) => void;
  adjustCenterForBottomSheet: (oldPercent: number, newPercent: number) => void;
  destroyMap: () => void;
}

export interface SearchSlice {
  query: string;
  suggestions: SearchSuggestion[];
  results: SearchResult[];
  history: string[];
  isFocused: boolean;
  isSearching: boolean;
  
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  loadSuggestions: (query: string) => Promise<void>;
  clearSearch: () => void;
  setFocused: (focused: boolean) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  selectSuggestion: (suggestion: SearchSuggestion) => void;
}

export interface UISlice {
  currentScreen: ScreenType;
  previousScreen: ScreenType | null;
  screenHistory: ScreenType[];
  bottomSheet: {
    snapPoint: number;
    snapPoints: [number, number, number];
    isTransitioning: boolean;
    isDragging: boolean;
  };
  scrollEnabled: boolean;
  
  navigateTo: (screen: ScreenType) => void;
  navigateBack: () => void;
  setBottomSheetSnap: (snap: number) => void;
  setBottomSheetDragging: (dragging: boolean) => void;
  setBottomSheetTransitioning: (transitioning: boolean) => void;
  setScrollEnabled: (enabled: boolean) => void;
  resetNavigation: () => void;
}

export interface CrossSliceActions {
  performSearch: (query: string) => Promise<void>;
  selectLocation: (location: SearchResult | SearchSuggestion) => void;
  focusSearchBar: () => void;
  blurSearchBar: () => void;
  clearAllState: () => void;
}

export interface AppStore {
  map: MapSlice;
  search: SearchSlice;
  ui: UISlice;
  actions: CrossSliceActions;
}