/**
 * Advice component mock data exports
 * Centralized mock data for all advice-related components
 */

export * from './metaItems';
export * from './metaItemAds';
export * from './covers';
export * from './interesting';
export * from './rd';

// Re-export the original combined mock data for backward compatibility
export { mockAdviceItems, getFigmaLayoutItems, getMixedLayoutItems } from './mockData';

// Preset combinations for common test scenarios
import { mockMetaItems } from './metaItems';
import { mockMetaItemAds } from './metaItemAds';
import { mockCovers } from './covers';
import { mockInteresting } from './interesting';
import { mockRdItems } from './rd';

export const fullAdviceMockData = [
  ...mockInteresting,
  ...mockMetaItems,
  ...mockMetaItemAds,
  ...mockCovers,
  ...mockRdItems,
];

export const emptyAdviceMockData: never[] = [];

export const minimalAdviceMockData = [
  mockMetaItems[0],
  mockInteresting[0],
];