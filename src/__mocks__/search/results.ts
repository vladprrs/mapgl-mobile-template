// Import the actual SearchResult type from the component
export interface SearchResult {
  id: string;
  name: string;
  category: string;
  address: string;
  distance?: string;
  rating?: number;
}

/**
 * Mock search results data for the SearchResults component
 * Represents actual search results with details and metadata
 */

export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    name: 'Городская поликлиника №1',
    category: 'Медицинский центр',
    address: 'ул. Ленина, 45',
    distance: '1.2 км',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Стоматология "Дента"',
    category: 'Стоматологическая клиника',
    address: 'Тверская ул., 12',
    distance: '500 м',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'МедЛаб',
    category: 'Диагностический центр',
    address: 'пр. Мира, 89',
    distance: '2.3 км',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Аптека 36.6',
    category: 'Аптека',
    address: 'Арбат, 23',
    distance: '800 м',
    rating: 4.0,
  },
];

export const mockRestaurantResults: SearchResult[] = [
  {
    id: 'r1',
    name: 'Пушкин',
    category: 'Ресторан русской кухни',
    address: 'Тверской бульвар, 26А',
    distance: '1.5 км',
    rating: 4.7,
  },
  {
    id: 'r2',
    name: 'White Rabbit',
    category: 'Ресторан',
    address: 'Смоленская площадь, 3',
    distance: '3.2 км',
    rating: 4.9,
  },
  {
    id: 'r3',
    name: 'Кафе Пушкинъ',
    category: 'Кафе',
    address: 'Никольская улица, 4/5',
    distance: '400 м',
    rating: 4.6,
  },
];

export const mockCafeResults: SearchResult[] = [
  {
    id: 'c1',
    name: 'Coffee Bean',
    category: 'Кофейня',
    address: 'Патриаршие пруды, 7',
    distance: '900 м',
    rating: 4.5,
  },
  {
    id: 'c2',
    name: 'Starbucks',
    category: 'Кофейня',
    address: 'Новый Арбат, 19',
    distance: '1.1 км',
    rating: 4.3,
  },
];

// Export different states for testing
export const emptySearchResults: SearchResult[] = [];
export const singleSearchResult: SearchResult[] = [mockSearchResults[0]];
export const manySearchResults: SearchResult[] = [
  ...mockSearchResults,
  ...mockRestaurantResults,
  ...mockCafeResults,
];

// Helper function to generate search results
export function generateSearchResults(count: number): SearchResult[] {
  const categories = ['Ресторан', 'Кафе', 'Магазин', 'Аптека', 'Клиника'];
  const results: SearchResult[] = [];
  
  for (let i = 0; i < count; i++) {
    results.push({
      id: `generated-${i}`,
      name: `Организация ${i + 1}`,
      category: categories[i % categories.length],
      address: `Улица ${i + 1}, дом ${(i % 50) + 1}`,
      distance: `${(Math.random() * 5).toFixed(1)} км`,
      rating: Number((3 + Math.random() * 2).toFixed(1)),
    });
  }
  
  return results;
}