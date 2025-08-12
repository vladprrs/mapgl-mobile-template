/**
 * Shared constants for mock data
 * Common values used across different mock data files
 */

// Moscow coordinates and bounds
export const MOSCOW_CENTER: [number, number] = [37.618423, 55.751244];
export const MOSCOW_BOUNDS = {
  minLng: 37.3,
  maxLng: 37.9,
  minLat: 55.5,
  maxLat: 55.9,
};

// Common organization types
export const ORGANIZATION_TYPES = [
  'Ресторан',
  'Кафе',
  'Бар',
  'Аптека',
  'Клиника',
  'Магазин',
  'Супермаркет',
  'Банк',
  'АЗС',
  'Парковка',
] as const;

// Common street names in Moscow
export const MOSCOW_STREETS = [
  'Тверская',
  'Арбат',
  'Никольская',
  'Петровка',
  'Мясницкая',
  'Большая Дмитровка',
  'Малая Дмитровка',
  'Пречистенка',
  'Остоженка',
  'Большая Ордынка',
  'Малая Ордынка',
  'Пятницкая',
  'Большая Полянка',
  'Красная Пресня',
  'Садовое кольцо',
] as const;

// Common distances
export const COMMON_DISTANCES = [
  '100 м',
  '200 м',
  '500 м',
  '1 км',
  '1.5 км',
  '2 км',
  '3 км',
  '5 км',
] as const;

// Common ratings
export const RATING_RANGE = {
  min: 3.0,
  max: 5.0,
};

// Story image paths
export const STORY_IMAGE_PATHS = [
  '/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png',
  '/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png',
  '/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png',
  '/assets/stories/5738e1bc9a25d52bf21144f9c160f545681e96d7.png',
] as const;

// Advice icon paths
export const ADVICE_ICON_PATHS = {
  pharmacy: '/assets/advice/pharmacy-icon.svg',
  restaurant: '/assets/advice/restaurant-icon.svg',
  cafe: '/assets/advice/cafe-icon.svg',
  shop: '/assets/advice/shop-icon.svg',
  atm: '/assets/advice/atm-icon.svg',
} as const;

// Test IDs for consistency
export const TEST_IDS = {
  storyItem: 'story-item',
  quickAction: 'quick-action',
  adviceItem: 'advice-item',
  searchSuggestion: 'search-suggestion',
  searchResult: 'search-result',
} as const;