import type { StoreRecommendation } from '@/stores/types';

/**
 * Mock store recommendations for AI assistant responses
 * Based on Figma design node-id 357-237859
 */
export const mockStoreRecommendations: StoreRecommendation[] = [
  {
    id: 'samokat',
    name: 'Самокат',
    images: [
      '/assets/figma/stores/samokat-1.png',
      '/assets/figma/stores/samokat-2.png',
      '/assets/figma/stores/samokat-3.png',
    ],
    deliveryTime: 'Доставка за 30 минут',
    rating: 4.6,
    gradient: 'radial-gradient(circle at 50% 50%, rgba(194,255,238,1) 0%, transparent 70%)',
    description: 'Есть несколько вариантов с быстрой доставкой',
    products: [
      {
        id: 'samokat-1',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        title: 'Дрель бош',
        price: 900,
        oldPrice: 1200,
        type: 'product',
      },
      {
        id: 'samokat-2', 
        image: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Дрель макита',
        price: 500,
        type: 'product',
      },
      {
        id: 'samokat-3',
        image: '/assets/figma/products/screwdriver.png',
        title: 'Шуруповерт',
        price: 650,
        oldPrice: 800,
        type: 'product',
      },
      {
        id: 'samokat-all',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        image2: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Все дрели',
        type: 'all',
      },
    ],
  },
  {
    id: 'mvideo',
    name: 'МВидео',
    images: [
      '/assets/figma/stores/mvideo-1.png',
      '/assets/figma/stores/mvideo-2.png',
      '/assets/figma/stores/mvideo-3.png',
    ],
    deliveryTime: 'Москва Ленина 11',
    rideTime: '3 мин',
    rating: 4.6,
    gradient: 'radial-gradient(circle at 50% 50%, rgba(210,194,255,1) 0%, transparent 70%)',
    hasAward: true,
    description: 'Здесь можно попробовать римскую пиццу, а также специфичные разновидности, такие как Маргарита и Пепперони',
    products: [
      {
        id: 'mvideo-1',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        title: 'Дрель бош',
        price: 900,
        type: 'product',
      },
      {
        id: 'mvideo-2',
        image: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Дрель макита',
        price: 500,
        type: 'product',
      },
      {
        id: 'mvideo-3',
        image: '/assets/figma/products/screwdriver.png',
        title: 'Шуруповерт',
        price: 750,
        oldPrice: 900,
        type: 'product',
      },
      {
        id: 'mvideo-4',
        image: '/assets/figma/products/saw.png',
        title: 'Электролобзик',
        price: 1200,
        type: 'product',
      },
      {
        id: 'mvideo-all',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        image2: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Все дрели',
        type: 'all',
      },
    ],
  },
];

/**
 * Get store recommendations based on search query
 * This simulates AI processing of search intent
 */
export function getStoreRecommendationsForQuery(query: string): StoreRecommendation[] {
  const lowerQuery = query.toLowerCase();
  
  // Tech/electronics queries
  if (lowerQuery.includes('телефон') || lowerQuery.includes('iPhone') || 
      lowerQuery.includes('компьютер') || lowerQuery.includes('ноутбук') ||
      lowerQuery.includes('техника') || lowerQuery.includes('электроника')) {
    return [mockStoreRecommendations[1]]; // МВидео only
  }
  
  // Tools/construction queries - return both stores for drills
  if (lowerQuery.includes('дрель') || lowerQuery.includes('инструмент') ||
      lowerQuery.includes('молоток') || lowerQuery.includes('строительн')) {
    return mockStoreRecommendations; // Both Самокат and МВидео
  }
  
  // Food/restaurant queries - return both stores
  if (lowerQuery.includes('рестораны') || lowerQuery.includes('еда') ||
      lowerQuery.includes('кафе') || lowerQuery.includes('доставка')) {
    return mockStoreRecommendations; // Both stores
  }
  
  // Default: return all stores
  return mockStoreRecommendations;
}

/**
 * Generate AI assistant response text based on search query
 */
export function getAssistantResponseText(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('рестораны') || lowerQuery.includes('еда')) {
    return 'Вот несколько мест, где можно заказать еду с доставкой:';
  }
  
  if (lowerQuery.includes('телефон') || lowerQuery.includes('техника')) {
    return 'Вот магазины, где можно купить технику:';
  }
  
  if (lowerQuery.includes('дрель') || lowerQuery.includes('инструмент') || lowerQuery.includes('строительн')) {
    return 'Вот несколько мест, где можно купить этот товар:';
  }
  
  return 'Вот несколько мест, где можно купить этот товар:';
}