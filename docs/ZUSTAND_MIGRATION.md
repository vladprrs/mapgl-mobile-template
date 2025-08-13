# Zustand Store - Default State Management

## 🎉 Migration Complete - Zustand is Now Default

Zustand is now the default and only state management system for the 2GIS MapGL Mobile App. The dual-system complexity has been removed for a cleaner, more maintainable codebase.

## 📦 Store Architecture

### Store Structure
```
src/stores/
├── index.ts                 # Main store with middleware
├── types.ts                 # TypeScript interfaces
├── slices/
│   ├── mapSlice.ts         # Map state & actions
│   ├── searchSlice.ts      # Search state & actions
│   ├── uiSlice.ts          # UI state & actions
│   └── actions.ts          # Cross-slice actions
├── selectors/
│   ├── mapSelectors.ts     # Optimized map selectors
│   ├── searchSelectors.ts  # Search selectors
│   └── uiSelectors.ts      # UI selectors
└── StoreProvider.tsx        # Store initialization
```

## 🎯 Key Features

### 1. **Atomic Selectors for Performance**
```typescript
// Only re-renders when specific data changes
const query = useStore((state) => state.search.query);
const mapInstance = useStore((state) => state.map.instance);
const currentScreen = useStore((state) => state.ui.currentScreen);
```

### 2. **Cross-Slice Actions**
```typescript
// Coordinates actions across multiple slices
const { performSearch, selectLocation } = useActions();

// Performs search, updates UI, adds markers
await performSearch('restaurants');
```

### 3. **Persistence**
Search history and UI preferences are automatically persisted to localStorage.

### 4. **DevTools Integration**
Full Redux DevTools support for debugging state changes.

## 🚀 Usage Examples

### Basic Store Access
```typescript
import useStore from '@/stores';

// Get specific slice
const mapStore = useStore((state) => state.map);
const searchStore = useStore((state) => state.search);
```

### Using Pre-built Selectors
```typescript
import { useSearchQuery, useCurrentScreen } from '@/stores/selectors';

function MyComponent() {
  const query = useSearchQuery(); // Only re-renders on query change
  const screen = useCurrentScreen(); // Only re-renders on screen change
}
```

### Performing Actions
```typescript
import { useActions } from '@/stores';

function SearchBar() {
  const { performSearch, focusSearchBar } = useActions();
  
  const handleSearch = async (query: string) => {
    await performSearch(query); // Updates search, UI, and map
  };
}
```

### Direct Store Access in Components
```typescript
// Modern approach - direct atomic selectors
function MobileMapShell() {
  const search = useStore((state) => state.search);
  const ui = useStore((state) => state.ui);
  const map = useStore((state) => state.map);
  const actions = useActions();
  
  // Component only re-renders when these specific slices change
}
```

## 📊 Store Slices

### Map Slice
- **State**: Map instance, markers, center, zoom
- **Actions**: addMarker, removeMarker, centerOnLocation, adjustCenterForBottomSheet
- **Performance**: Direct map control without React re-renders

### Search Slice
- **State**: Query, suggestions, results, history
- **Actions**: search, loadSuggestions, addToHistory
- **Features**: Debounced search, result caching

### UI Slice
- **State**: Current screen, bottom sheet position, scroll state
- **Actions**: navigateTo, setBottomSheetSnap, resetNavigation
- **Optimization**: Automatic snap point adjustment per screen

## ⚡ Performance Benefits

1. **Selective Re-renders**: Components only update when their specific data changes
2. **No Context Re-render Cascades**: Eliminated provider nesting issues
3. **Direct Map Control**: Map operations bypass React reconciliation
4. **Optimized Mobile Performance**: Reduced re-renders crucial for mobile devices
5. **Smaller Bundle**: Only 8KB for Zustand vs previous Context overhead

## 🧪 Testing

```bash
# Run store tests
npm test -- src/__tests__/stores/store.test.ts

# All tests now use Zustand by default
npm test
```

## 📝 Best Practices

1. **Use Atomic Selectors**: Select only the data you need
2. **Use Pre-built Selectors**: Leverage optimized selectors from `src/stores/selectors/`
3. **Batch Updates**: Multiple state changes in one action are batched automatically
4. **Type Safety**: Always use TypeScript interfaces from `types.ts`

## 🔍 Debugging

1. **Redux DevTools**: Install browser extension for state inspection
2. **Console Logging**: `debugLog` calls throughout actions
3. **Store Snapshots**: `useStore.getState()` for current state

## 🏗️ Architecture Benefits

### Single State System
- ✅ No dual-system complexity
- ✅ Consistent patterns across all components
- ✅ Easier onboarding for new developers
- ✅ Simplified testing

### Component Integration
- ✅ **MapContainer**: Uses direct store access for map instance
- ✅ **MobileMapShell**: Direct atomic selectors for all state needs
- ✅ **All Components**: Clean, predictable state access

### Development Experience
- ✅ **Hot Reloading**: Works seamlessly with Zustand
- ✅ **Time Travel**: Full Redux DevTools support
- ✅ **Type Safety**: Complete TypeScript integration
- ✅ **Performance**: Atomic updates prevent unnecessary re-renders

## 🎉 Production Ready

The Zustand store is the single source of truth for:
- ✅ 8KB bundle size (minimal overhead)
- ✅ Better performance with selective subscriptions
- ✅ Improved developer experience
- ✅ Full TypeScript support
- ✅ Persistence and DevTools integration
- ✅ Clean, maintainable architecture