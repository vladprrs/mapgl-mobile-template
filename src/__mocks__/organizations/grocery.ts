import type { SearchResult } from '@/stores/types';

/**
 * Grocery stores with major Russian chains and branches
 * Real Moscow addresses with metro stations and full contact info
 */
export const groceryStores: SearchResult[] = [
  // Пятёрочка - Branch 1 (Tverskaya)
  {
    id: 'grocery-pyaterochka-1',
    name: 'Пятёрочка',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'ул. Тверская, 12, Москва',
    coordinates: [37.6173, 55.7558] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 444-44-44',
    messengers: {
      whatsapp: '+74954444444',
      telegram: '@pyaterochka_official'
    },
    website: 'pyaterochka.ru',
    socialMedia: {
      vk: 'https://vk.com/pyaterochka',
      instagram: 'https://instagram.com/pyaterochka'
    },
    rating: 4.1,
    reviewCount: 342,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 08:00-22:00']
    },
    coords: [37.6173, 55.7558],
    distance: '150 м',
  },

  // Пятёрочка - Branch 2 (Arbat)
  {
    id: 'grocery-pyaterochka-2',
    name: 'Пятёрочка',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'ул. Новый Арбат, 24, Москва',
    coordinates: [37.5997, 55.7539] as [number, number],
    metro: {
      station: 'Арбатская',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 555-55-55',
    messengers: {
      whatsapp: '+74955555555',
      telegram: '@pyaterochka_official'
    },
    website: 'pyaterochka.ru',
    socialMedia: {
      vk: 'https://vk.com/pyaterochka',
      instagram: 'https://instagram.com/pyaterochka'
    },
    rating: 4.0,
    reviewCount: 189,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 23:00',
      schedule: ['пн-вс: 08:00-23:00']
    },
    coords: [37.5997, 55.7539],
    distance: '420 м',
  },

  // Пятёрочка - Branch 3 (Sokolniki)
  {
    id: 'grocery-pyaterochka-3',
    name: 'Пятёрочка',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'ул. Русаковская, 13, Москва',
    coordinates: [37.6794, 55.7894] as [number, number],
    metro: {
      station: 'Сокольники',
      line: 'Сокольническая',
      distance: '5 мин',
      color: '#D42B28',
    },
    phone: '+7 495 666-66-66',
    messengers: {
      whatsapp: '+74956666666',
      telegram: '@pyaterochka_official'
    },
    website: 'pyaterochka.ru',
    socialMedia: {
      vk: 'https://vk.com/pyaterochka',
      instagram: 'https://instagram.com/pyaterochka'
    },
    rating: 4.2,
    reviewCount: 267,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 45 минут',
      schedule: ['пн-вс: 08:00-22:00']
    },
    coords: [37.6794, 55.7894],
    distance: '1.2 км',
    closingStatus: {
      text: 'Закроется через 45 минут',
      isWarning: true,
    },
  },

  // Магнит - Branch 1
  {
    id: 'grocery-magnit-1',
    name: 'Магнит',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'ул. Маросейка, 9/2, Москва',
    coordinates: [37.6356, 55.7578] as [number, number],
    metro: {
      station: 'Китай-город',
      line: 'Сокольническая',
      distance: '4 мин',
      color: '#D42B28',
    },
    phone: '+7 495 777-77-77',
    messengers: {
      whatsapp: '+74957777777',
      telegram: '@magnit_retail'
    },
    website: 'magnit.ru',
    socialMedia: {
      vk: 'https://vk.com/magnit_retail',
      instagram: 'https://instagram.com/magnit_retail'
    },
    rating: 3.9,
    reviewCount: 156,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 07:00-22:00']
    },
    coords: [37.6356, 55.7578],
    distance: '680 м',
  },

  // Магнит - Branch 2
  {
    id: 'grocery-magnit-2',
    name: 'Магнит',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'Большая Полянка, 28, Москва',
    coordinates: [37.6156, 55.7358] as [number, number],
    metro: {
      station: 'Полянка',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 888-88-88',
    messengers: {
      whatsapp: '+74958888888',
      telegram: '@magnit_retail'
    },
    website: 'magnit.ru',
    socialMedia: {
      vk: 'https://vk.com/magnit_retail',
      instagram: 'https://instagram.com/magnit_retail'
    },
    rating: 4.0,
    reviewCount: 203,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-вс: 08:00-21:00']
    },
    coords: [37.6156, 55.7358],
    distance: '950 м',
  },

  // ВкусВилл - Branch 1
  {
    id: 'grocery-vkusvill-1',
    name: 'ВкусВилл',
    category: 'Продуктовый магазин здорового питания',
    type: 'regular',
    address: 'ул. Покровка, 27, Москва',
    coordinates: [37.6456, 55.7598] as [number, number],
    metro: {
      station: 'Чистые пруды',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 230-02-30',
    messengers: {
      whatsapp: '+74952300230',
      telegram: '@vkusvill_official'
    },
    website: 'vkusvill.ru',
    socialMedia: {
      vk: 'https://vk.com/vkusvill',
      instagram: 'https://instagram.com/vkusvill'
    },
    rating: 4.5,
    reviewCount: 421,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 23:00',
      schedule: ['пн-вс: 07:00-23:00']
    },
    coords: [37.6456, 55.7598],
    distance: '320 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Анна', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Петр', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.5
    },
  },

  // ВкусВилл - Branch 2
  {
    id: 'grocery-vkusvill-2',
    name: 'ВкусВилл',
    category: 'Продуктовый магазин здорового питания',
    type: 'regular',
    address: 'Цветной бульвар, 11, стр. 2, Москва',
    coordinates: [37.6219, 55.7700] as [number, number],
    metro: {
      station: 'Цветной бульвар',
      line: 'Серпуховско-Тимирязевская',
      distance: '1 мин',
      color: '#999999',
    },
    phone: '+7 495 230-02-31',
    messengers: {
      whatsapp: '+74952300231',
      telegram: '@vkusvill_official'
    },
    website: 'vkusvill.ru',
    socialMedia: {
      vk: 'https://vk.com/vkusvill',
      instagram: 'https://instagram.com/vkusvill'
    },
    rating: 4.6,
    reviewCount: 298,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:30',
      schedule: ['пн-вс: 07:30-22:30']
    },
    coords: [37.6219, 55.7700],
    distance: '540 м',
  },

  // Перекрёсток
  {
    id: 'grocery-perekrestok-1',
    name: 'Перекрёсток',
    category: 'Супермаркет',
    type: 'regular',
    address: 'ул. Мясницкая, 24/7, Москва',
    coordinates: [37.6350, 55.7650] as [number, number],
    metro: {
      station: 'Тургеневская',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 777-77-00',
    messengers: {
      whatsapp: '+74957777700',
      telegram: '@perekrestok_official'
    },
    website: 'perekrestok.ru',
    socialMedia: {
      vk: 'https://vk.com/perekrestok',
      instagram: 'https://instagram.com/perekrestok'
    },
    rating: 4.3,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.6350, 55.7650],
    distance: '220 м',
    friendsVisited: {
      friends: [
        { id: '3', name: 'Мария', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Сергей', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Елена', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.3
    },
  },

  // Дикси
  {
    id: 'grocery-dixy-1',
    name: 'Дикси',
    category: 'Продуктовый магазин',
    type: 'regular',
    address: 'Страстной бульвар, 4, Москва',
    coordinates: [37.6100, 55.7650] as [number, number],
    metro: {
      station: 'Чеховская',
      line: 'Серпуховско-Тимирязевская',
      distance: '3 мин',
      color: '#999999',
    },
    phone: '+7 495 363-36-36',
    messengers: {
      whatsapp: '+74953633636',
      telegram: '@dixy_stores'
    },
    website: 'dixy.ru',
    socialMedia: {
      vk: 'https://vk.com/dixy_stores',
      instagram: 'https://instagram.com/dixy_stores'
    },
    rating: 3.8,
    reviewCount: 134,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 08:00-22:00']
    },
    coords: [37.6100, 55.7650],
    distance: '410 м',
  },
];