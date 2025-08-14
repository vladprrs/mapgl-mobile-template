export enum ScreenType {
  DASHBOARD = 'dashboard',
  SEARCH_SUGGESTIONS = 'search',
  SEARCH_RESULTS = 'search-results',
  ORGANIZATION_DETAILS = 'organization-details',
  LOCATION_DETAILS = 'location-details',
  ROUTE_DETAILS = 'route-details'
}

export interface ScreenState {
  currentScreen: ScreenType;
  previousScreen: ScreenType | null;
  history: ScreenType[];
}

export interface ScreenManagerContextType {
  screenState: ScreenState;
  searchQuery: string;
  navigateTo: (screen: ScreenType, options?: { addToHistory?: boolean }) => void;
  goBack: () => void;
  clearHistory: () => void;
  handleSearch: (query: string) => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
  handleSearchChange: (value: string) => void;
  handleClearSearch: () => void;
}