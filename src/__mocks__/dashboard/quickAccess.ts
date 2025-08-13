import type { QuickAction } from '@/components/organisms/QuickAccessPanel';
import { COLORS } from '@/lib/icons';

/**
 * Mock QuickAction data for the QuickAccessPanel component
 * Note: Icons should be added at runtime since they are React components
 * Use the factory functions to create actions with icons
 */

export const mockQuickActionsData: Omit<QuickAction, 'icon'>[] = [
  {
    id: 'bookmark',
    // icon will be added at runtime
  },
  {
    id: 'home',
    label: '45 мин',
    labelColor: COLORS.TRAFFIC_HEAVY,
  },
  {
    id: 'work',
    label: '45 мин',
    labelColor: COLORS.TRAFFIC_MODERATE,
  },
  {
    id: 'location',
    label: 'Немировича-Данченко, 45',
    sublabel: '50 мин',
    sublabelColor: COLORS.TRAFFIC_LIGHT,
  },
];

/**
 * Factory function to create quick actions with icons
 * Use this in components where React components can be rendered
 */
export function createMockQuickActions(): QuickAction[] {
  // This function should be called in the component where icons can be imported
  // Example implementation in the component:
  // const actions = createMockQuickActions().map(action => ({
  //   ...action,
  //   icon: <Icon name={ICONS[action.id.toUpperCase()]} />
  // }));
  
  return mockQuickActionsData as QuickAction[];
}

export const mockExtendedQuickActions: Omit<QuickAction, 'icon'>[] = [
  ...mockQuickActionsData,
  {
    id: 'gas-station',
    label: 'АЗС',
    sublabel: '2 км',
  },
  {
    id: 'parking',
    label: 'Парковки',
    sublabel: 'Рядом',
  },
  {
    id: 'pharmacy',
    label: 'Аптеки',
    sublabel: '500 м',
  },
];

// Export different states for testing
export const emptyQuickActions: QuickAction[] = [];
export const singleQuickAction: Omit<QuickAction, 'icon'>[] = [mockQuickActionsData[0]];
export const minimalQuickActions: Omit<QuickAction, 'icon'>[] = mockQuickActionsData.slice(0, 2);