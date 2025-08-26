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
  {
    id: 'ozon',
    name: 'Ozon',
    images: [
      '/assets/figma/stores/ozon-1.png',
      '/assets/figma/stores/ozon-2.png',
      '/assets/figma/stores/ozon-3.png',
    ],
    deliveryTime: 'Доставка завтра',
    rideTime: 'Prime 15 мин',
    rating: 4.8,
    gradient: 'radial-gradient(circle at 50% 50%, rgba(0,91,255,0.15) 0%, transparent 70%)',
    hasAward: true,
    description: 'Широкий выбор товаров с быстрой доставкой. Бонусные баллы и Prime-подписка для экспресс-доставки',
    products: [
      {
        id: 'ozon-1',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        title: 'Дрель Bosch Professional',
        price: 850,
        oldPrice: 1100,
        type: 'product',
      },
      {
        id: 'ozon-2',
        image: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Дрель Makita с набором',
        price: 480,
        oldPrice: 600,
        type: 'product',
      },
      {
        id: 'ozon-3',
        image: '/assets/figma/products/screwdriver.png',
        title: 'Шуруповерт DeWALT',
        price: 690,
        oldPrice: 850,
        type: 'product',
      },
      {
        id: 'ozon-4',
        image: '/assets/figma/products/saw.png',
        title: 'Перфоратор Metabo',
        price: 1350,
        oldPrice: 1500,
        type: 'product',
      },
      {
        id: 'ozon-all',
        image: '/assets/figma/2559335aecfc0288dce9aa2b2bac3b24eb5b4be5.png',
        image2: '/assets/figma/432a168b924d61b5bc79cc0268a37d4bf270fb5a.png',
        title: 'Все инструменты',
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
  
  // Find Ozon store
  const ozonStore = mockStoreRecommendations.find(s => s.id === 'ozon');
  const samokatStore = mockStoreRecommendations.find(s => s.id === 'samokat');
  const mvideoStore = mockStoreRecommendations.find(s => s.id === 'mvideo');
  
  // Tech/electronics queries - МВидео and Ozon
  if (lowerQuery.includes('телефон') || lowerQuery.includes('iphone') || 
      lowerQuery.includes('компьютер') || lowerQuery.includes('ноутбук') ||
      lowerQuery.includes('техника') || lowerQuery.includes('электроника')) {
    return [mvideoStore, ozonStore].filter(Boolean) as StoreRecommendation[];
  }
  
  // Tools/construction queries - all stores for drills
  if (lowerQuery.includes('дрель') || lowerQuery.includes('инструмент') ||
      lowerQuery.includes('молоток') || lowerQuery.includes('строительн') ||
      lowerQuery.includes('перфоратор')) {
    return mockStoreRecommendations; // All stores including Ozon
  }
  
  // Food/restaurant queries - Самокат and Ozon (Ozon Fresh)
  if (lowerQuery.includes('рестораны') || lowerQuery.includes('еда') ||
      lowerQuery.includes('кафе') || lowerQuery.includes('доставка') ||
      lowerQuery.includes('продукты')) {
    return [samokatStore, ozonStore].filter(Boolean) as StoreRecommendation[];
  }
  
  // General marketplace queries - prioritize Ozon
  if (lowerQuery.includes('купить') || lowerQuery.includes('заказать') ||
      lowerQuery.includes('товар') || lowerQuery.includes('маркетплейс')) {
    return [ozonStore, ...mockStoreRecommendations.filter(s => s.id !== 'ozon')].filter(Boolean) as StoreRecommendation[];
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