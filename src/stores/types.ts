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

export interface Filter {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface ZMKProduct {
  id: string;
  image: string;
  title: string;
  price?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  address: string;
  distance?: string;
  rating?: number;
  reviewCount?: number;
  closingStatus?: {
    text: string;
    isWarning: boolean;
  };
  friendsVisited?: {
    friends: Friend[];
    rating: number;
    displayText?: string;
  };
  zmkData?: {
    products: ZMKProduct[];
  };
  coords?: [number, number];
  // Result type to distinguish between organizations and addresses
  type?: 'organization' | 'address';
  // Future extensibility fields
  hasLogo?: boolean;
  hasPhotos?: boolean;
  isAdvertiser?: boolean;
  friendsReviews?: number;
  logo?: string;
  gallery?: string[];
  promotionalText?: string;
  buttonLabel?: string;
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
  filteredResults: SearchResult[];
  history: string[];
  isFocused: boolean;
  isSearching: boolean;
  activeFilters: string[];
  availableFilters: Filter[];
  
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  loadSuggestions: (query: string) => Promise<void>;
  clearSearch: () => void;
  setFocused: (focused: boolean) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  selectSuggestion: (suggestion: SearchSuggestion) => void;
  toggleFilter: (filterId: string) => void;
  clearFilters: () => void;
  setAvailableFilters: (filters: Filter[]) => void;
  applyFilters: () => void;
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

export interface OrganizationSlice {
  currentOrganization: SearchResult | null;
  isLoading: boolean;
  activeTab: string;
  
  setCurrentOrganization: (organization: SearchResult) => void;
  clearCurrentOrganization: () => void;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tabId: string) => void;
}

export interface CrossSliceActions {
  performSearch: (query: string) => Promise<void>;
  selectLocation: (location: SearchResult | SearchSuggestion) => void;
  selectOrganization: (organization: SearchResult) => void;
  selectMaster: (master: unknown) => void; // Using unknown to avoid circular dependency
  showMastersList: () => void;
  focusSearchBar: () => void;
  blurSearchBar: () => void;
  clearAllState: () => void;
  toggleFilter: (filterId: string) => void;
}

export interface AppStore {
  map: MapSlice;
  search: SearchSlice;
  ui: UISlice;
  organization: OrganizationSlice;
  actions: CrossSliceActions;
}