/**
 * Dashboard component mock data exports
 * Centralized mock data for all dashboard-related components
 */

export * from './stories';
export * from './quickAccess';

// Preset combinations for common test scenarios
import { mockStories } from './stories';
import { mockQuickActionsData } from './quickAccess';

export const fullDashboardMockData = {
  stories: mockStories,
  quickActions: mockQuickActionsData,
};

export const emptyDashboardMockData = {
  stories: [],
  quickActions: [],
};