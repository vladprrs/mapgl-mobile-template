import type { SearchResult } from '@/stores/types';

/**
 * Restaurants and cafes - popular Moscow dining establishments
 * Mix of premium restaurants and chain establishments
 */
export const restaurants: SearchResult[] = [
  // Реактор (as restaurant branch)
  {
    id: 'restaurant-reaktor-1',
    name: 'Реактор',
    category: 'Ресторан европейской кухни',
    type: 'regular',
    address: 'Патриаршие пруды, 12, Москва',
    coordinates: [37.5950, 55.7660] as [number, number],
    metro: {
      station: 'Маяковская',
      line: 'Замоскворецкая',
      distance: '4 мин',
      color: '#2D5016',
    },
    phone: '+7 495 699-89-89',
    messengers: {
      whatsapp: '+74956998989',
      telegram: '@reaktor_restaurant'
    },
    website: 'reaktor-restaurant.ru',
    socialMedia: {
      vk: 'https://vk.com/reaktor_restaurant',
      instagram: 'https://instagram.com/reaktor_restaurant'
    },
    rating: 4.7,
    reviewCount: 456,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 02:00',
      schedule: ['пн-чт: 12:00-24:00', 'пт-сб: 12:00-02:00', 'вс: 12:00-23:00']
    },
    coords: [37.5950, 55.7660],
    distance: '320 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Владимир', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Ольга', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Дмитрий', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.7
    },
  },

  // Тануки
  {
    id: 'restaurant-tanuki-1',
    name: 'Тануки',
    category: 'Ресторан японской кухни',
    type: 'regular',
    address: 'ул. Солянка, 1/2, стр. 2, Москва',
    coordinates: [37.6340, 55.7510] as [number, number],
    metro: {
      station: 'Китай-город',
      line: 'Таганско-Краснопресненская',
      distance: '3 мин',
      color: '#A42E2C',
    },
    phone: '+7 495 725-86-86',
    messengers: {
      whatsapp: '+74957258686',
      telegram: '@tanuki_moscow'
    },
    website: 'tanuki.ru',
    socialMedia: {
      vk: 'https://vk.com/tanuki_moscow',
      instagram: 'https://instagram.com/tanuki_moscow'
    },
    rating: 4.5,
    reviewCount: 789,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 23:00',
      schedule: ['пн-вс: 12:00-23:00']
    },
    coords: [37.6340, 55.7510],
    distance: '450 м',
    friendsVisited: {
      friends: [
        { id: '4', name: 'Светлана', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Андрей', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.5
    },
  },

  // Додо Пицца
  {
    id: 'restaurant-dodo-1',
    name: 'Додо Пицца',
    category: 'Пиццерия',
    type: 'regular',
    address: 'ул. Арбат, 51/21, Москва',
    coordinates: [37.5880, 55.7500] as [number, number],
    metro: {
      station: 'Смоленская',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 363-30-60',
    messengers: {
      whatsapp: '+74953633060',
      telegram: '@dodopizza'
    },
    website: 'dodopizza.ru',
    socialMedia: {
      vk: 'https://vk.com/dodopizza',
      instagram: 'https://instagram.com/dodopizza'
    },
    rating: 4.3,
    reviewCount: 1234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 23:30',
      schedule: ['пн-вс: 09:00-23:30']
    },
    coords: [37.5880, 55.7500],
    distance: '380 м',
  },

  // White Rabbit
  {
    id: 'restaurant-whiterabbit-1',
    name: 'White Rabbit',
    category: 'Ресторан высокой кухни',
    type: 'regular',
    address: 'Смоленская площадь, 3, 16 эт., Москва',
    coordinates: [37.5810, 55.7470] as [number, number],
    metro: {
      station: 'Смоленская',
      line: 'Арбатско-Покровская',
      distance: '1 мин',
      color: '#0078BE',
    },
    phone: '+7 495 510-30-75',
    messengers: {
      whatsapp: '+74955103075',
      telegram: '@whiterabbit_moscow'
    },
    website: 'whiterabbitmoscow.ru',
    socialMedia: {
      vk: 'https://vk.com/whiterabbitfamily',
      instagram: 'https://instagram.com/whiterabbitmoscow'
    },
    rating: 4.8,
    reviewCount: 567,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 1 час',
      schedule: ['вт-сб: 19:00-01:00', 'пн, вс: выходной']
    },
    coords: [37.5810, 55.7470],
    distance: '1.2 км',
    closingStatus: {
      text: 'Закроется через 1 час',
      isWarning: true,
    },
    friendsVisited: {
      friends: [
        { id: '6', name: 'Михаил', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '7', name: 'Екатерина', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.8
    },
  },

  // Кафе Пушкинъ
  {
    id: 'restaurant-pushkin-1',
    name: 'Кафе Пушкинъ',
    category: 'Ресторан русской кухни',
    type: 'regular',
    address: 'Тверской бульвар, 26А, Москва',
    coordinates: [37.6060, 55.7640] as [number, number],
    metro: {
      station: 'Тверская',
      line: 'Замоскворецкая',
      distance: '3 мин',
      color: '#2D5016',
    },
    phone: '+7 495 739-00-33',
    messengers: {
      whatsapp: '+74957390033',
      telegram: '@cafe_pushkin'
    },
    website: 'cafe-pushkin.ru',
    socialMedia: {
      vk: 'https://vk.com/cafe_pushkin',
      instagram: 'https://instagram.com/cafe_pushkin'
    },
    rating: 4.6,
    reviewCount: 892,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.6060, 55.7640],
    distance: '280 м',
    friendsVisited: {
      friends: [
        { id: '8', name: 'Наталья', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '9', name: 'Павел', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.6
    },
  },

  // McDonald's
  {
    id: 'restaurant-mcdonalds-1',
    name: "McDonald's",
    category: 'Ресторан быстрого питания',
    type: 'regular',
    address: 'ул. Тверская, 20/1, Москва',
    coordinates: [37.6070, 55.7600] as [number, number],
    metro: {
      station: 'Пушкинская',
      line: 'Сокольническая',
      distance: '1 мин',
      color: '#D42B28',
    },
    phone: '+7 495 755-39-39',
    messengers: {
      whatsapp: '+74957553939',
      telegram: '@mcdonalds_russia'
    },
    website: 'mcdonalds.ru',
    socialMedia: {
      vk: 'https://vk.com/mcdonalds_russia',
      instagram: 'https://instagram.com/mcdonalds_russia'
    },
    rating: 4.1,
    reviewCount: 2156,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.6070, 55.7600],
    distance: '120 м',
  },

  // Starbucks (Cafe example)
  {
    id: 'restaurant-starbucks-1',
    name: 'Starbucks',
    category: 'Кофейня',
    type: 'regular',
    address: 'ул. Тверская, 22, Москва',
    coordinates: [37.6080, 55.7600] as [number, number],
    metro: {
      station: 'Пушкинская',
      line: 'Сокольническая',
      distance: '1 мин',
      color: '#D42B28',
    },
    phone: '+7 495 777-77-00',
    messengers: {
      whatsapp: '+74957777700',
      telegram: '@starbucks_russia'
    },
    website: 'starbucks.ru',
    socialMedia: {
      vk: 'https://vk.com/starbucks_russia',
      instagram: 'https://instagram.com/starbucks_russia'
    },
    rating: 4.2,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 07:00-22:00']
    },
    coords: [37.6080, 55.7600],
    distance: '120 м',
  },

  // Coffee Bean (Another cafe example)
  {
    id: 'restaurant-coffeebean-1', 
    name: 'Coffee Bean & Tea Leaf',
    category: 'Кафе',
    type: 'regular',
    address: 'Красная площадь, 3, ГУМ, Москва',
    coordinates: [37.6208, 55.7540] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 788-43-44',
    messengers: {
      whatsapp: '+74957884344',
      telegram: '@coffeebean_moscow'
    },
    website: 'coffeebean.ru',
    socialMedia: {
      vk: 'https://vk.com/coffeebean_moscow',
      instagram: 'https://instagram.com/coffeebean'
    },
    rating: 4.3,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-вс: 08:00-21:00']
    },
    coords: [37.6208, 55.7540],
    distance: '180 м',
  },
];