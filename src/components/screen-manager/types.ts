export enum ScreenType {
  DASHBOARD = 'dashboard',
  SEARCH_SUGGESTIONS = 'search_suggestions',
  SEARCH_RESULTS = 'search_results',
}

// Simplified screen constants for cleaner code
export const SCREENS = {
  DASHBOARD: ScreenType.DASHBOARD,
  SUGGESTIONS: ScreenType.SEARCH_SUGGESTIONS,
  RESULTS: ScreenType.SEARCH_RESULTS,
} as const;

export interface ScreenConfig {
  type: ScreenType;
  title?: string;
  showBackButton?: boolean;
  transitionDuration?: number;
}

export interface ScreenState {
  currentScreen: ScreenType;
  previousScreen?: ScreenType;
  searchQuery?: string;
  screenHistory: ScreenType[];
}

export interface ScreenTransition {
  from: ScreenType;
  to: ScreenType;
  direction: 'forward' | 'backward';
}