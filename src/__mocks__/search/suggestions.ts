import { SuggestType } from '@/components/screen-manager/SuggestRow';

/**
 * Mock search suggestion data for the SearchSuggestions component
 * Includes saved addresses, organizations, and categories
 */

// Type definitions for suggestions
export interface SavedAddressSuggestion {
  type: SuggestType.SAVED_ADDRESS;
  title: string;
  subtitle: string;
  distance: string;
  icon: 'home' | 'work';
}

export interface OrganizationSuggestion {
  type: SuggestType.ORGANIZATION;
  title: string;
  subtitle: string;
  highlightedText: string;
}

export interface CategorySuggestion {
  type: SuggestType.CATEGORY;
  title: string;
  branchCount: string;
  highlightedText: string;
}

export type SearchSuggestion = SavedAddressSuggestion | OrganizationSuggestion | CategorySuggestion;

// Mock saved addresses
export const mockSavedAddresses: SavedAddressSuggestion[] = [
  {
    type: SuggestType.SAVED_ADDRESS,
    title: 'Дом',
    subtitle: 'Красный проспект, 49',
    distance: '5 км',
    icon: 'home',
  },
  {
    type: SuggestType.SAVED_ADDRESS,
    title: 'Работа',
    subtitle: 'Октябрьская, 42',
    distance: '12 км',
    icon: 'work',
  },
];

// Mock organizations
export const mockOrganizations: OrganizationSuggestion[] = [
  {
    type: SuggestType.ORGANIZATION,
    title: 'МЕСТО, инвест-апарты',
    subtitle: 'Красный проспект, 49',
    highlightedText: 'МЕС',
  },
  {
    type: SuggestType.ORGANIZATION,
    title: 'Место встречи, кафе',
    subtitle: 'Ленина, 21',
    highlightedText: 'Мес',
  },
];

// Mock categories/rubrics
export const mockCategories: CategorySuggestion[] = [
  {
    type: SuggestType.CATEGORY,
    title: 'Аквапарки/Водные аттракционы',
    branchCount: '6 филиалов',
    highlightedText: 'Места отдыха',
  },
  {
    type: SuggestType.CATEGORY,
    title: 'Рестораны',
    branchCount: '124 филиала',
    highlightedText: '',
  },
];

// Combined mock suggestions
export const mockAllSuggestions: SearchSuggestion[] = [
  ...mockSavedAddresses,
  ...mockOrganizations,
  ...mockCategories,
];

// Export different states for testing
export const emptySuggestions: SearchSuggestion[] = [];
export const onlySavedAddresses: SearchSuggestion[] = mockSavedAddresses;
export const onlyOrganizations: SearchSuggestion[] = mockOrganizations;
export const onlyCategories: SearchSuggestion[] = mockCategories;

// Helper function to filter suggestions by query
export function filterSuggestions(query: string, suggestions: SearchSuggestion[] = mockAllSuggestions): SearchSuggestion[] {
  if (!query) {
    return mockSavedAddresses; // Show saved addresses when no query
  }
  
  const lowerQuery = query.toLowerCase();
  return suggestions.filter(s => {
    if ('subtitle' in s && s.subtitle) {
      return s.title.toLowerCase().includes(lowerQuery) || 
             s.subtitle.toLowerCase().includes(lowerQuery);
    }
    return s.title.toLowerCase().includes(lowerQuery);
  });
}