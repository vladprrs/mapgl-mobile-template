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
  type: 'place' | 'category' | 'history' | 'organization' | 'chain' | 'product';
  coords?: [number, number];
  organizationId?: string;
  organizationIds?: string[];
  category?: string;
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
  type?: 'regular' | 'advertiser' | 'organization' | 'address'; // Support both old and new type systems
  address: string;
  coordinates?: [number, number];
  metro?: {
    station: string;
    line: string;
    distance: string;
    color: string;
  };
  distance?: string;
  rating?: number;
  reviewCount?: number;
  workHours?: {
    status: 'open' | 'closing_soon' | 'closed';
    text: string;
    schedule: string[];
  };
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
  // Products for checkout/cart functionality
  products?: {
    id: string;
    image: string;
    title: string;
    weight?: string;
    price: number;
    oldPrice?: number;
  }[];
  coords?: [number, number];
  // Contact information fields for ContactInfo molecule
  phone?: string;
  messengers?: {
    telegram?: string;
    whatsapp?: string;
    viber?: string;
  };
  website?: string;
  socialMedia?: {
    vk?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    google?: string;
  };
  // Advertiser fields
  isAdvertiser?: boolean;
  logo?: string;
  gallery?: string[];
  promotionalText?: string;
  buttonLabel?: string;
  adContent?: {
    text: string;
    disclaimer: string;
    logo?: string;
  };
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

export interface SearchContext {
  type: 'product_search' | 'category_search' | 'regular_search';
  query: string;
  categories?: string[];
  message?: string;
  originalQuery?: string;
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
  searchContext: SearchContext | null;
  
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
  setSearchContext: (context: SearchContext | null) => void;
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
  loadOrganizationById: (id: string) => Promise<void>;
  clearCurrentOrganization: () => void;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tabId: string) => void;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  title: string;
  image: string;
  weight?: string;
}

export interface CartSlice {
  cart: {
    items: globalThis.Map<string, CartItem>;
    total: number;
    count: number;
  };
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface StoreProduct {
  id: string;
  image?: string;
  image2?: string; // For "all products" variant with stacked images
  title: string;
  price?: number;
  oldPrice?: number;
  type?: 'product' | 'all';
}

export interface StoreRecommendation {
  id: string;
  name: string;
  images: string[]; // 3 images for StoreImageStack
  deliveryTime: string;
  rideTime?: string; // Optional ride/travel time
  rating: number;
  gradient: string;
  hasAward?: boolean; // Optional award/crown icon
  products: StoreProduct[];
  description: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  type?: 'text' | 'store_recommendations';
  stores?: StoreRecommendation[];
}

export interface ChatSlice {
  isChatOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
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
  openChat: () => void;
  closeChat: () => void;
}

export interface AppStore {
  map: MapSlice;
  search: SearchSlice;
  ui: UISlice;
  organization: OrganizationSlice;
  cart: CartSlice;
  chat: ChatSlice;
  actions: CrossSliceActions;
}