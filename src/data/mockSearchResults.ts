import { SearchResult } from '@/stores/types';
import { allOrganizations } from '@/__mocks__/organizations';

// Legacy export for backward compatibility
export const mockSearchResults: SearchResult[] = allOrganizations;

// Helper function to get random subset for demos
export function getRandomSearchResults(count: number = 3): SearchResult[] {
  const shuffled = [...mockSearchResults].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get results by category
export function getSearchResultsByCategory(category: string): SearchResult[] {
  return mockSearchResults.filter(result => 
    result.category.toLowerCase().includes(category.toLowerCase())
  );
}

// Helper function to get results with warnings
export function getSearchResultsWithWarnings(): SearchResult[] {
  return mockSearchResults.filter(result => 
    result.closingStatus?.isWarning === true
  );
}

// Helper function to get advertiser organizations
export function getAdvertiserResults(): SearchResult[] {
  return mockSearchResults.filter(result => result.type === 'advertiser');
}

// Helper function to get regular organizations
export function getRegularResults(): SearchResult[] {
  return mockSearchResults.filter(result => result.type === 'regular');
}