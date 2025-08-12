/**
 * Search-related mock data exports
 * Centralized mock data for search suggestions and results
 */

export * from './suggestions';
export * from './results';

// Preset combinations for common test scenarios
import { mockAllSuggestions } from './suggestions';
import { mockSearchResults } from './results';

export const fullSearchMockData = {
  suggestions: mockAllSuggestions,
  results: mockSearchResults,
};

export const emptySearchMockData = {
  suggestions: [],
  results: [],
};