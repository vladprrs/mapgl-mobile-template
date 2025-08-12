import { 
  Organization, 
  RDFeatures, 
  NonRDFeatures,
  Friend
} from '@/components/search-results/SearchResultCard';

// Mock friends data
export const mockFriends: Friend[] = [
  { id: '1', avatar: '/assets/search-cards/non-rd/23edad0153988d6704197a43ed4d17e51f00e455.png', name: 'Анна' },
  { id: '2', avatar: '/assets/search-cards/non-rd/7c555ac081e621955c2c245891b952413a9a27c3.png', name: 'Михаил' },
  { id: '3', avatar: '/assets/search-cards/non-rd/5becee8b64e742d845f3d3853a20fc8aa217f421.png', name: 'Елена' },
  { id: '4', avatar: '/assets/search-cards/non-rd/3f7bea47f4117b52225de7a6e196c4397746c1aa.png', name: 'Дмитрий' },
  { id: '5', avatar: '/assets/search-cards/non-rd/23edad0153988d6704197a43ed4d17e51f00e455.png', name: 'Ольга' },
  { id: '6', avatar: '/assets/search-cards/non-rd/7c555ac081e621955c2c245891b952413a9a27c3.png', name: 'Игорь' },
];

// RD Organization Examples
export const mockRDOrganization1: Organization = {
  id: 'rd-1',
  name: 'Суши Маке',
  subtitle: 'Сеть ресторанов',
  category: 'Ресторан',
  rating: 4.6,
  reviewCount: 120,
  address: 'Тверская 32/12, 1 этаж, Москва',
  distance: '3 мин',
  distanceTime: '3 мин',
  workingHours: {
    status: 'open',
    text: 'Открыто до 23:00'
  },
  photos: [
    '/assets/search-cards/rd/5e1b67dce4c1918fde6ffcb619ba3c5d5d5a5ea3.png',
    '/assets/search-cards/rd/3a084ba8d83c71b6b8022e36397fa151c9a8d64b.png',
    '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
  ],
  logo: '/assets/search-cards/rd/de179af43782601411f486eb4116120bb9a58483.png',
  isAdvertiser: true
};

export const mockRDFeatures1: RDFeatures = {
  gallery: {
    images: [
      '/assets/search-cards/rd/5e1b67dce4c1918fde6ffcb619ba3c5d5d5a5ea3.png',
      '/assets/search-cards/rd/3a084ba8d83c71b6b8022e36397fa151c9a8d64b.png',
      '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    ],
    logo: '/assets/search-cards/rd/de179af43782601411f486eb4116120bb9a58483.png',
    size: 'large'
  },
  adSection: {
    promotionalText: 'Скажи кодовое слово «2ГИС» и получи карточку лояльности!',
    disclaimer: 'Реклама • Есть противопоказания, нужна консультация врача',
    buttonLabel: 'Label',
    buttonColor: '#FF0414'
  }
};

export const mockRDOrganization2: Organization = {
  id: 'rd-2',
  name: 'Реактор',
  subtitle: 'Региональная сеть автокомплексов для японских автомобилей',
  category: 'Автосервис',
  rating: 4.6,
  reviewCount: 120,
  address: 'Тверская 32/12, 1 этаж, Москва',
  distance: '3 мин',
  distanceTime: '3 мин',
  workingHours: {
    status: 'opening-soon',
    text: 'Откроется через 40 минут'
  },
  photos: [
    '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
  ],
  isAdvertiser: true
};

export const mockRDFeatures2: RDFeatures = {
  gallery: {
    images: [
      '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    ],
    size: 'small'
  },
  adSection: {
    promotionalText: 'Скажи кодовое слово «2ГИС» и получи карточку лояльности!',
    disclaimer: 'Реклама • Есть противопоказания, нужна консультация врача',
    buttonLabel: 'Label',
    buttonColor: '#6833FF',
    logo: '/assets/search-cards/rd/eae313a48883a46e7a2a60ee806e73a8052191be.png'
  }
};

// Non-RD Organization Examples
export const mockNonRDOrganization1: Organization = {
  id: 'non-rd-1',
  name: 'Шиномонтаж',
  subtitle: 'Региональная сеть автокомплексов для японских автомобилей',
  category: 'Автосервис',
  rating: 4.6,
  reviewCount: 120,
  address: 'Тверская 32/12, 1 этаж, Москва',
  distance: '3 мин',
  distanceTime: '3 мин',
  workingHours: {
    status: 'closing-soon',
    text: 'Закроется через 30 минут'
  },
  friends: mockFriends.slice(0, 6),
  isAdvertiser: false
};

export const mockNonRDFeatures1: NonRDFeatures = {
  additionalInfo: {
    type: 'parking',
    text: '500 мест • Цена в час 50 ₽ • Теплая'
  },
  deliveryButton: {
    label: 'Заказать доставку',
    icon: '/assets/search-cards/non-rd/ab9c05d5725cd77d5483c6ba86e3934fd2f34207.png'
  }
};

export const mockNonRDOrganization2: Organization = {
  id: 'non-rd-2',
  name: 'Бар-пицца',
  subtitle: 'Бар и пиццерия',
  category: 'Ресторан',
  rating: 4.6,
  reviewCount: 120,
  address: 'Тверская 32/12, 1 этаж, Москва',
  distance: '3 мин',
  distanceTime: '3 мин',
  workingHours: {
    status: 'closing-soon',
    text: 'Закроется через 30 минут'
  },
  photos: [
    '/assets/search-cards/non-rd/9848cf8552ae243ce7fb8b12c5687596fa5ef22f.png',
    '/assets/search-cards/non-rd/e351c41c77cb8d81d66f8fffa6da7995c31f1469.png',
    '/assets/search-cards/non-rd/cc3f2a7a9b8e324e3d57e5cb79be624f95ae0ee5.png',
    '/assets/search-cards/non-rd/d76da63a078678bcde725251db2c9c32aba956cb.png',
  ],
  friends: mockFriends.slice(0, 6),
  isAdvertiser: false
};

export const mockNonRDFeatures2: NonRDFeatures = {
  deliveryButton: {
    label: 'Заказать доставку',
    icon: '/assets/search-cards/non-rd/ab9c05d5725cd77d5483c6ba86e3934fd2f34207.png'
  }
};

export const mockNonRDOrganization3: Organization = {
  id: 'non-rd-3',
  name: 'Шиномонтаж',
  subtitle: 'Региональная сеть автокомплексов для японских автомобилей',
  category: 'Автосервис',
  rating: 4.6,
  reviewCount: 120,
  address: 'Тверская 32/12, 1 этаж, Москва',
  distance: '3 мин',
  distanceTime: '3 мин',
  friends: mockFriends.slice(0, 6),
  isAdvertiser: false
};

export const mockNonRDFeatures3: NonRDFeatures = {
  additionalInfo: {
    type: 'parking',
    text: '500 мест • Цена в час 50 ₽ • Теплая'
  }
};

// Combined search results for testing
export const mockSearchResults = [
  {
    variant: 'RD' as const,
    organization: mockRDOrganization1,
    features: mockRDFeatures1
  },
  {
    variant: 'non-RD' as const,
    organization: mockNonRDOrganization1,
    features: mockNonRDFeatures1
  },
  {
    variant: 'RD' as const,
    organization: mockRDOrganization2,
    features: mockRDFeatures2
  },
  {
    variant: 'non-RD' as const,
    organization: mockNonRDOrganization2,
    features: mockNonRDFeatures2
  },
  {
    variant: 'non-RD' as const,
    organization: mockNonRDOrganization3,
    features: mockNonRDFeatures3
  }
];