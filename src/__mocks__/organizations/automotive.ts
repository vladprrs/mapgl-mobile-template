import type { SearchResult } from '@/stores/types';

/**
 * Automotive services - car service centers, dealerships, and car washes
 * Mix of regular and advertiser automotive businesses
 */
export const automotiveServices: SearchResult[] = [
  // Реактор (Auto service advertiser)
  {
    id: 'auto-reaktor-service-1',
    name: 'Реактор',
    category: 'Автосервис для японских автомобилей',
    type: 'advertiser',
    address: 'Варшавское шоссе, 125Г, Москва',
    coordinates: [37.6180, 55.6320] as [number, number],
    metro: {
      station: 'Аннино',
      line: 'Сокольническая',
      distance: '8 мин',
      color: '#D42B28',
    },
    phone: '+7 495 640-64-04',
    messengers: {
      whatsapp: '+74956406404',
      telegram: '@reaktor_service'
    },
    website: 'reaktor-auto.ru',
    socialMedia: {
      vk: 'https://vk.com/reaktor_auto',
      instagram: 'https://instagram.com/reaktor_auto',
      youtube: 'https://youtube.com/reaktorauto'
    },
    rating: 4.8,
    reviewCount: 892,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 09:00-20:00', 'вс: выходной']
    },
    coords: [37.6180, 55.6320],
    distance: '8.5 км',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Скажи кодовое слово «2ГИС» и получи скидку 10% на диагностику!',
    buttonLabel: 'Записаться',
    adContent: {
      text: 'Специализация: Honda, Toyota, Nissan, Mazda, Subaru',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
    friendsVisited: {
      friends: [
        { id: '1', name: 'Алексей', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Дмитрий', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Владимир', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.8
    },
  },

  // Автомойка Блеск
  {
    id: 'auto-carwash-blesk-1',
    name: 'Автомойка Блеск',
    category: 'Автомойка',
    type: 'regular',
    address: 'ул. Садовая-Спасская, 21/1, Москва',
    coordinates: [37.6280, 55.7720] as [number, number],
    metro: {
      station: 'Красносельская',
      line: 'Сокольническая',
      distance: '5 мин',
      color: '#D42B28',
    },
    phone: '+7 495 607-60-76',
    messengers: {
      whatsapp: '+74956076076',
      telegram: '@blesk_wash'
    },
    website: 'blesk-wash.ru',
    socialMedia: {
      vk: 'https://vk.com/blesk_wash',
      instagram: 'https://instagram.com/blesk_wash'
    },
    rating: 4.2,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.6280, 55.7720],
    distance: '1.2 км',
  },

  // Toyota Center Moscow
  {
    id: 'auto-toyota-center-1',
    name: 'Toyota Center Moscow',
    category: 'Автосалон Toyota',
    type: 'regular',
    address: 'Автомобильная ул., 8, Москва',
    coordinates: [37.7440, 55.7210] as [number, number],
    metro: {
      station: 'Автозаводская',
      line: 'Замоскворецкая',
      distance: '10 мин',
      color: '#2D5016',
    },
    phone: '+7 495 258-58-58',
    messengers: {
      whatsapp: '+74952585858',
      telegram: '@toyota_moscow'
    },
    website: 'toyota-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/toyota_moscow',
      instagram: 'https://instagram.com/toyota_moscow'
    },
    rating: 4.5,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-пт: 09:00-21:00', 'сб-вс: 10:00-20:00']
    },
    coords: [37.7440, 55.7210],
    distance: '15 км',
    friendsVisited: {
      friends: [
        { id: '4', name: 'Сергей', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Андрей', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.5
    },
  },

  // Mercedes-Benz
  {
    id: 'auto-mercedes-1',
    name: 'Mercedes-Benz Moscow',
    category: 'Автосалон Mercedes-Benz',
    type: 'regular',
    address: 'Ленинградский проспект, 35А, Москва',
    coordinates: [37.5340, 55.8010] as [number, number],
    metro: {
      station: 'Сокол',
      line: 'Замоскворецкая',
      distance: '7 мин',
      color: '#2D5016',
    },
    phone: '+7 495 745-74-57',
    messengers: {
      whatsapp: '+74957457457',
      telegram: '@mercedes_moscow'
    },
    website: 'mercedes-benz-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/mercedes_moscow',
      instagram: 'https://instagram.com/mercedesbenz'
    },
    rating: 4.6,
    reviewCount: 456,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 40 минут',
      schedule: ['пн-пт: 09:00-20:00', 'сб-вс: 10:00-19:00']
    },
    coords: [37.5340, 55.8010],
    distance: '6.8 км',
    closingStatus: {
      text: 'Закроется через 40 минут',
      isWarning: true,
    },
  },

  // BMW Moscow
  {
    id: 'auto-bmw-1',
    name: 'BMW Moscow City',
    category: 'Автосалон BMW',
    type: 'regular',
    address: 'ш. Энтузиастов, 31, стр. 40, Москва',
    coordinates: [37.7520, 55.7560] as [number, number],
    metro: {
      station: 'Шоссе Энтузиастов',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 780-78-07',
    messengers: {
      whatsapp: '+74957807807',
      telegram: '@bmw_moscow'
    },
    website: 'bmw-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/bmw_moscow',
      instagram: 'https://instagram.com/bmw'
    },
    rating: 4.4,
    reviewCount: 389,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-пт: 09:00-20:00', 'сб-вс: 10:00-19:00']
    },
    coords: [37.7520, 55.7560],
    distance: '18 км',
  },

  // LADA Center
  {
    id: 'auto-lada-1',
    name: 'LADA Center Moscow',
    category: 'Автосалон LADA',
    type: 'regular',
    address: 'Каширское шоссе, 61А, Москва',
    coordinates: [37.6480, 55.6180] as [number, number],
    metro: {
      station: 'Каширская',
      line: 'Замоскворецкая',
      distance: '12 мин',
      color: '#2D5016',
    },
    phone: '+7 495 788-78-87',
    messengers: {
      whatsapp: '+74957887887',
      telegram: '@lada_moscow'
    },
    website: 'lada-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/lada_official',
      instagram: 'https://instagram.com/lada_official'
    },
    rating: 4.0,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 19:00',
      schedule: ['пн-пт: 09:00-19:00', 'сб: 10:00-18:00', 'вс: выходной']
    },
    coords: [37.6480, 55.6180],
    distance: '12 км',
  },
];