// Use the SearchResult type from store types
interface Friend {
  id: string;
  name: string;
  avatar: string;
}

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  address: string;
  distance?: string;
  rating?: number;
  reviewCount?: number;
  closingStatus?: {
    text: string;
    isWarning: boolean;
  };
  friendsVisited?: {
    friends: Friend[];
    rating: number;
    displayText?: string;
  };
  coords?: [number, number];
  hasLogo?: boolean;
  hasPhotos?: boolean;
  isAdvertiser?: boolean;
  friendsReviews?: number;
  logo?: string;
  gallery?: string[];
  promotionalText?: string;
  buttonLabel?: string;
  zmkData?: {
    products: {
      id: string;
      image: string;
      title: string;
      price?: string;
    }[];
  };
}

/**
 * Mock search results data matching SearchResultCard props
 * Comprehensive data with varied states for testing UI components
 */
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    name: 'Управление ГИБДД',
    category: 'Главное управление МВД России по Новосибирской области',
    address: 'Тверская 32/12, 1 этаж, Москва',
    distance: '3 мин',
    closingStatus: {
      text: 'Закроется через 30 минут',
      isWarning: true,
    },
    coords: [82.9207, 55.0415],
  },
  {
    id: '2',
    name: 'Реактор',
    category: 'Региональная сеть автокомплексов для японских автомобилей',
    rating: 4.6,
    reviewCount: 120,
    address: 'ул. Ленина 45, Новосибирск',
    distance: '3 мин',
    coords: [82.9307, 55.0515],
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Скажи кодовое слово «2ГИС» и получи карточку лояльности!',
    buttonLabel: 'Label',
    closingStatus: {
      text: 'Закроется через 30 минут',
      isWarning: true,
    },
    friendsVisited: {
      friends: [
        { id: '1', name: 'Александр', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Мария', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Сергей', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Елена', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.6
    },
  },
  {
    id: '3',
    name: 'Стоматологическая клиника "Дента"',
    category: 'Стоматология',
    rating: 4.8,
    reviewCount: 89,
    address: 'пр. Дзержинского 12, 2 этаж, Новосибирск',
    distance: '850 м',
    isAdvertiser: false,
    closingStatus: {
      text: 'Работает до 20:00',
      isWarning: false,
    },
    friendsVisited: {
      friends: [
        { id: '3', name: 'Елена', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Дмитрий', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Анна', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '6', name: 'Михаил', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.8
    },
    coords: [82.9107, 55.0315],
  },
  {
    id: '4',
    name: 'Центр госуслуг МФЦ',
    category: 'Многофункциональный центр',
    address: 'ул. Красный проспект 101, Новосибирск',
    distance: '2.1 км',
    closingStatus: {
      text: 'Закроется через 15 минут',
      isWarning: true,
    },
    coords: [82.9407, 55.0615],
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
    reviewCount: 234,
    coords: [82.9157, 55.0365],
  },
  {
    id: 'r2',
    name: 'White Rabbit',
    category: 'Ресторан',
    address: 'Смоленская площадь, 3',
    distance: '3.2 км',
    rating: 4.9,
    reviewCount: 189,
    closingStatus: {
      text: 'Работает до 23:00',
      isWarning: false,
    },
    coords: [82.9257, 55.0465],
  },
  {
    id: 'r3',
    name: 'Кафе Пушкинъ',
    category: 'Кафе',
    address: 'Никольская улица, 4/5',
    distance: '400 м',
    rating: 4.6,
    reviewCount: 67,
    coords: [82.9057, 55.0265],
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
    reviewCount: 45,
    coords: [82.9177, 55.0385],
  },
  {
    id: 'c2',
    name: 'Starbucks',
    category: 'Кофейня',
    address: 'Новый Арбат, 19',
    distance: '1.1 км',
    rating: 4.3,
    reviewCount: 122,
    closingStatus: {
      text: 'Круглосуточно',
      isWarning: false,
    },
    coords: [82.9277, 55.0485],
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