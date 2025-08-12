/**
 * Central export point for all mock data
 * Import from here for convenient access to all mock data
 */

// Re-export all mock data categories
export * from './advice';
export * from './dashboard';
export * from './search';
export * from './utils/generators';
export * from './utils/constants';

// Import specific items for preset combinations
import { fullAdviceMockData } from './advice';
import { fullDashboardMockData } from './dashboard';
import { fullSearchMockData } from './search';

/**
 * Full application mock data
 * Use this for testing the complete app with all features
 */
export const fullAppMockData = {
  ...fullDashboardMockData,
  ...fullSearchMockData,
  adviceItems: fullAdviceMockData,
};

/**
 * Empty state mock data
 * Use this for testing empty states and loading conditions
 */
export const emptyAppMockData = {
  stories: [],
  quickActions: [],
  adviceItems: [],
  suggestions: [],
  results: [],
};

/**
 * Minimal mock data
 * Use this for basic functionality testing
 */
export const minimalAppMockData = {
  stories: fullDashboardMockData.stories.slice(0, 2),
  quickActions: fullDashboardMockData.quickActions.slice(0, 2),
  adviceItems: fullAdviceMockData.slice(0, 3),
  suggestions: fullSearchMockData.suggestions.slice(0, 3),
  results: fullSearchMockData.results.slice(0, 3),
};