import type { SearchResult } from '@/stores/types';

/**
 * Electronics stores - major Russian electronics retailers
 * Real Moscow locations with comprehensive contact information
 */
export const electronicsStores: SearchResult[] = [
  // DNS
  {
    id: 'electronics-dns-1',
    name: 'DNS',
    category: 'Магазин цифровой и бытовой техники',
    type: 'regular',
    address: 'ул. Тверская, 18, стр. 1, Москва',
    coordinates: [37.6090, 55.7580] as [number, number],
    metro: {
      station: 'Пушкинская',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 232-00-00',
    messengers: {
      whatsapp: '+74952320000',
      telegram: '@dns_shop'
    },
    website: 'dns-shop.ru',
    socialMedia: {
      vk: 'https://vk.com/dnsshop',
      instagram: 'https://instagram.com/dns_shop'
    },
    rating: 4.2,
    reviewCount: 891,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 10:00-20:00']
    },
    coords: [37.6090, 55.7580],
    distance: '280 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Алексей', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Игорь', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.2
    },
    // Products for cart functionality
    products: [
      {
        id: 'dns-smartphone-1',
        image: '/assets/figma/24ace8940eccc51dbbf5b15af155b01435ec8a23.png',
        title: 'Смартфон Apple iPhone 15 128GB черный',
        weight: '171 г',
        price: 79990,
        oldPrice: 89990
      },
      {
        id: 'dns-laptop-1', 
        image: '/assets/figma/d86e9c98cc883aff65270c606c4f6cc1b65f2d4d.png',
        title: 'Ноутбук ASUS VivoBook 15 X1500EA 15.6"',
        weight: '1.8 кг',
        price: 52990,
      },
      {
        id: 'dns-headphones-1',
        image: '/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png',
        title: 'Наушники Sony WH-1000XM4 черные',
        weight: '254 г',
        price: 24990,
        oldPrice: 29990
      }
    ],
  },

  // М.Видео
  {
    id: 'electronics-mvideo-1',
    name: 'М.Видео',
    category: 'Магазин электроники и бытовой техники',
    type: 'regular',
    address: 'Манежная площадь, 1, стр. 2, Москва',
    coordinates: [37.6156, 55.7575] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '1 мин',
      color: '#D42B28',
    },
    phone: '+7 495 777-777-5',
    messengers: {
      whatsapp: '+74957777775',
      telegram: '@mvideo_official'
    },
    website: 'mvideo.ru',
    socialMedia: {
      vk: 'https://vk.com/mvideorussia',
      instagram: 'https://instagram.com/mvideo'
    },
    rating: 4.0,
    reviewCount: 1234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 10:00-22:00']
    },
    coords: [37.6156, 55.7575],
    distance: '150 м',
  },

  // Эльдорадо
  {
    id: 'electronics-eldorado-1',
    name: 'Эльдорадо',
    category: 'Магазин бытовой техники и электроники',
    type: 'regular',
    address: 'ул. Новый Арбат, 15, Москва',
    coordinates: [37.6000, 55.7530] as [number, number],
    metro: {
      station: 'Арбатская',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 545-45-45',
    messengers: {
      whatsapp: '+74955454545',
      telegram: '@eldorado_official'
    },
    website: 'eldorado.ru',
    socialMedia: {
      vk: 'https://vk.com/eldorado_official',
      instagram: 'https://instagram.com/eldorado'
    },
    rating: 3.9,
    reviewCount: 567,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 30 минут',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 11:00-20:00']
    },
    coords: [37.6000, 55.7530],
    distance: '420 м',
    closingStatus: {
      text: 'Закроется через 30 минут',
      isWarning: true,
    },
  },

  // re:Store (Apple Authorized Reseller)
  {
    id: 'electronics-restore-1',
    name: 're:Store',
    category: 'Авторизованный реселлер Apple',
    type: 'regular',
    address: 'Кузнецкий Мост, 12, Москва',
    coordinates: [37.6240, 55.7590] as [number, number],
    metro: {
      station: 'Кузнецкий мост',
      line: 'Сокольническая',
      distance: '1 мин',
      color: '#D42B28',
    },
    phone: '+7 495 797-87-00',
    messengers: {
      whatsapp: '+74957978700',
      telegram: '@restore_official'
    },
    website: 'restore.ru',
    socialMedia: {
      vk: 'https://vk.com/restorerussia',
      instagram: 'https://instagram.com/restore'
    },
    rating: 4.6,
    reviewCount: 345,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 11:00-20:00']
    },
    coords: [37.6240, 55.7590],
    distance: '190 м',
    friendsVisited: {
      friends: [
        { id: '3', name: 'Максим', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Анна', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.6
    },
  },

  // Ситилинк
  {
    id: 'electronics-citilink-1',
    name: 'Ситилинк',
    category: 'Магазин компьютерной техники',
    type: 'regular',
    address: 'Большая Лубянка, 13/16, Москва',
    coordinates: [37.6280, 55.7610] as [number, number],
    metro: {
      station: 'Лубянка',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 735-00-00',
    messengers: {
      whatsapp: '+74957350000',
      telegram: '@citilink_official'
    },
    website: 'citilink.ru',
    socialMedia: {
      vk: 'https://vk.com/citilink',
      instagram: 'https://instagram.com/citilink'
    },
    rating: 4.1,
    reviewCount: 678,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-пт: 10:00-20:00', 'сб-вс: 10:00-19:00']
    },
    coords: [37.6280, 55.7610],
    distance: '320 м',
  },

  // Техносила
  {
    id: 'electronics-tehnosila-1',
    name: 'Техносила',
    category: 'Магазин бытовой техники',
    type: 'regular',
    address: 'Никольская, 25, Москва',
    coordinates: [37.6220, 55.7560] as [number, number],
    metro: {
      station: 'Площадь Революции',
      line: 'Сокольническая',
      distance: '4 мин',
      color: '#D42B28',
    },
    phone: '+7 495 788-77-66',
    messengers: {
      whatsapp: '+74957887766',
      telegram: '@tehnosila_official'
    },
    website: 'tehnosila.ru',
    socialMedia: {
      vk: 'https://vk.com/tehnosila',
      instagram: 'https://instagram.com/tehnosila'
    },
    rating: 3.8,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-вс: 10:00-21:00']
    },
    coords: [37.6220, 55.7560],
    distance: '380 м',
  },

  // Связной
  {
    id: 'electronics-svyaznoy-1',
    name: 'Связной',
    category: 'Магазин мобильных телефонов',
    type: 'regular',
    address: 'ул. Петровка, 17, Москва',
    coordinates: [37.6150, 55.7620] as [number, number],
    metro: {
      station: 'Театральная',
      line: 'Замоскворецкая',
      distance: '2 мин',
      color: '#2D5016',
    },
    phone: '+7 495 797-33-33',
    messengers: {
      whatsapp: '+74957973333',
      telegram: '@svyaznoy_official'
    },
    website: 'svyaznoy.ru',
    socialMedia: {
      vk: 'https://vk.com/svyaznoy',
      instagram: 'https://instagram.com/svyaznoy'
    },
    rating: 3.7,
    reviewCount: 145,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 10:00-20:00', 'вс: 11:00-19:00']
    },
    coords: [37.6150, 55.7620],
    distance: '210 м',
  },

  // Мегафон
  {
    id: 'electronics-megafon-1',
    name: 'МегаФон',
    category: 'Салон сотовой связи',
    type: 'regular',
    address: 'Красная площадь, 3, ГУМ, Москва',
    coordinates: [37.6210, 55.7540] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 502-55-00',
    messengers: {
      whatsapp: '+74955025500',
      telegram: '@megafon_moscow'
    },
    website: 'megafon.ru',
    socialMedia: {
      vk: 'https://vk.com/megafon',
      instagram: 'https://instagram.com/megafon'
    },
    rating: 4.0,
    reviewCount: 89,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-вс: 10:00-21:00']
    },
    coords: [37.6210, 55.7540],
    distance: '260 м',
  },

  // Beeline
  {
    id: 'electronics-beeline-1',
    name: 'Билайн',
    category: 'Салон сотовой связи',
    type: 'regular',
    address: 'Тверской бульвар, 26, Москва',
    coordinates: [37.6080, 55.7670] as [number, number],
    metro: {
      station: 'Пушкинская',
      line: 'Сокольническая',
      distance: '1 мин',
      color: '#D42B28',
    },
    phone: '+7 495 974-88-88',
    messengers: {
      whatsapp: '+74959748888',
      telegram: '@beeline_moscow'
    },
    website: 'beeline.ru',
    socialMedia: {
      vk: 'https://vk.com/beeline',
      instagram: 'https://instagram.com/beeline_russia'
    },
    rating: 3.9,
    reviewCount: 167,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 09:00-20:00', 'вс: 10:00-19:00']
    },
    coords: [37.6080, 55.7670],
    distance: '180 м',
  },

  // МТС
  {
    id: 'electronics-mts-1',
    name: 'МТС',
    category: 'Салон сотовой связи',
    type: 'regular',
    address: 'ул. Большая Дмитровка, 32, Москва',
    coordinates: [37.6120, 55.7680] as [number, number],
    metro: {
      station: 'Чеховская',
      line: 'Серпуховско-Тимирязевская',
      distance: '2 мин',
      color: '#999999',
    },
    phone: '+7 495 766-01-66',
    messengers: {
      whatsapp: '+74957660166',
      telegram: '@mts_official'
    },
    website: 'mts.ru',
    socialMedia: {
      vk: 'https://vk.com/mts',
      instagram: 'https://instagram.com/mts_ru'
    },
    rating: 4.1,
    reviewCount: 201,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-вс: 09:00-21:00']
    },
    coords: [37.6120, 55.7680],
    distance: '300 м',
  },
];