# Mock Data Directory

Centralized location for all UI test mock data used across the application.

## Directory Structure

```
src/__mocks__/
├── advice/                     # Advice component mocks
│   ├── metaItems.ts            # MetaItem cards
│   ├── metaItemAds.ts          # Advertisement cards
│   ├── covers.ts               # Collection covers
│   ├── interesting.ts          # Feature promotion cards
│   └── rd.ts                   # Restaurant/Directory cards
├── dashboard/                  # Dashboard component mocks
│   ├── stories.ts              # Story items
│   └── quickAccess.ts          # Quick access buttons
├── search/                     # Search-related mocks
│   ├── suggestions.ts          # Search suggestions
│   └── results.ts              # Search results
└── utils/                      # Utilities
    ├── generators.ts           # Data generation functions
    └── constants.ts            # Shared constants
```

## Usage

### Basic Import

```typescript
import { mockStories, mockMetaItems } from '@/__mocks__';
```

### Component-Specific Imports

```typescript
// Advice components
import { mockMetaItems, mockCovers, mockInteresting } from '@/__mocks__/advice';

// Dashboard components
import { mockStories, mockQuickActionsData } from '@/__mocks__/dashboard';

// Search data
import { mockSavedAddresses, mockOrganizations } from '@/__mocks__/search';
```

### Using Preset Combinations

```typescript
import { fullAppMockData, emptyAppMockData, minimalAppMockData } from '@/__mocks__';

// Full dataset for integration testing
const { stories, quickActions, adviceItems } = fullAppMockData;

// Empty state testing
const emptyData = emptyAppMockData;

// Minimal data for unit tests
const minimalData = minimalAppMockData;
```

### Using Data Generators

```typescript
import { 
  generateMockStories, 
  generateMockSearchResults,
  generateMockMarkers 
} from '@/__mocks__/utils/generators';

// Generate 20 stories with 30% viewed
const stories = generateMockStories(20, 0.3);

// Generate 50 search results
const results = generateMockSearchResults(50);

// Generate 100 map markers
const markers = generateMockMarkers(100);
```

## Guidelines

### 1. Type Safety

All mock data is fully typed. Import types alongside the data:

```typescript
import type { Story } from '@/components/dashboard/StoriesPanel';
import { mockStories } from '@/__mocks__/dashboard/stories';
```

### 2. Multiple States

Each mock file provides different states for testing:

```typescript
import { 
  mockStories,           // Default dataset
  emptyStories,          // Empty array
  singleStory,           // Single item
  allViewedStories,      // All marked as viewed
  allUnviewedStories     // All marked as unviewed
} from '@/__mocks__/dashboard/stories';
```

### 3. React Components in Mock Data

For data containing React components (like icons), use factory functions:

```typescript
import { createMockQuickActions } from '@/__mocks__/dashboard/quickAccess';
import { Icon, ICONS } from '@/components/icons';

const actions = createMockQuickActions().map(action => ({
  ...action,
  icon: <Icon name={ICONS[action.id.toUpperCase()]} />
}));
```

### 4. Test-Specific Overrides

Create test-specific variations as needed:

```typescript
import { mockStories } from '@/__mocks__/dashboard/stories';

const customStories = mockStories.map(story => ({
  ...story,
  isViewed: false,  // Override viewed state
  label: `Test: ${story.label}`,  // Add test prefix
}));
```

## Migrating from Old Mock Data

If you're updating from inline mock data:

### Before:
```typescript
// In component file
const mockData = [{ id: '1', title: 'Test' }];
```

### After:
```typescript
// In src/__mocks__/[category]/[type].ts
export const mockData = [{ id: '1', title: 'Test' }];

// In component file
import { mockData } from '@/__mocks__/[category]/[type]';
```

## Adding New Mock Data

1. Create a new file in the appropriate category folder
2. Export typed mock data with multiple states
3. Add exports to the category's index.ts
4. Update the main index.ts if needed
5. Document any special usage requirements

Example:

```typescript
// src/__mocks__/map/markers.ts
import type { MapMarker } from '@/types/map';

export const mockMarkers: MapMarker[] = [
  { id: '1', lat: 55.75, lng: 37.62, title: 'Location 1' },
  // ... more markers
];

export const emptyMarkers: MapMarker[] = [];
export const singleMarker = [mockMarkers[0]];
```

## Best Practices

1. **Keep mock data realistic** - Use actual data from designs/API when possible
2. **Include edge cases** - Empty states, single items, maximum items
3. **Document special cases** - Add comments for non-obvious mock data
4. **Maintain consistency** - Follow naming patterns (mock*, empty*, single*, etc.)
5. **Update when designs change** - Keep mock data in sync with UI updates

## Common Test Scenarios

### Empty State Testing
```typescript
import { emptyStories, emptyAdviceMockData } from '@/__mocks__';
```

### Loading State Testing
```typescript
import { generateMockStories } from '@/__mocks__/utils/generators';
const loadingData = generateMockStories(3); // Minimal data during load
```

### Error State Testing
```typescript
// Use empty data or create specific error mock
import { emptySearchResults } from '@/__mocks__/search';
```

### Performance Testing
```typescript
import { generateMockSearchResults } from '@/__mocks__/utils/generators';
const largeDataset = generateMockSearchResults(1000);
```

## Troubleshooting

### Import Errors
- Ensure `@/__mocks__` path alias is configured in `tsconfig.json`
- Check that the mock file exists and exports are correct

### Type Errors
- Import types from component files, not mock files
- Ensure mock data matches component prop types

### React Component Issues
- Don't store React components in mock files directly
- Use factory functions or add components at runtime

## Contributing

When adding new mock data:
1. Follow existing patterns and naming conventions
2. Include multiple states (empty, single, multiple)
3. Add TypeScript types
4. Update this README if adding new categories
5. Test that existing tests still pass