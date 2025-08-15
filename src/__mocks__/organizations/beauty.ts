import type { SearchResult } from '@/stores/types';

/**
 * Beauty services - salons, spas, and beauty centers
 * Mix of premium and chain beauty establishments
 */
export const beautyServices: SearchResult[] = [
  // Сеть салонов красоты Милавица
  {
    id: 'beauty-milavica-1',
    name: 'Милавица',
    category: 'Салон красоты',
    type: 'regular',
    address: 'ул. Арбат, 54/2, стр. 1, Москва',
    coordinates: [37.5860, 55.7490] as [number, number],
    metro: {
      station: 'Смоленская',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 241-24-12',
    messengers: {
      whatsapp: '+74952412412',
      telegram: '@milavica_salon'
    },
    website: 'milavica.ru',
    socialMedia: {
      vk: 'https://vk.com/milavica_beauty',
      instagram: 'https://instagram.com/milavica_salon'
    },
    rating: 4.5,
    reviewCount: 678,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-пт: 10:00-21:00', 'сб-вс: 10:00-20:00']
    },
    coords: [37.5860, 55.7490],
    distance: '450 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Анастасия', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Виктория', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Елена', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.5
    },
  },

  // Студия красоты Бьюти
  {
    id: 'beauty-studio-1',
    name: 'Студия красоты Бьюти',
    category: 'Парикмахерская',
    type: 'regular',
    address: 'ул. Покровка, 37, Москва',
    coordinates: [37.6480, 55.7580] as [number, number],
    metro: {
      station: 'Курская',
      line: 'Кольцевая',
      distance: '4 мин',
      color: '#915C44',
    },
    phone: '+7 495 777-66-55',
    messengers: {
      whatsapp: '+74957776655',
      telegram: '@beauty_studio'
    },
    website: 'beauty-studio.ru',
    socialMedia: {
      vk: 'https://vk.com/beauty_studio_moscow',
      instagram: 'https://instagram.com/beauty_studio'
    },
    rating: 4.3,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 09:00-20:00', 'вс: 11:00-18:00']
    },
    coords: [37.6480, 55.7580],
    distance: '680 м',
  },

  // Ногтевая студия Nail Art
  {
    id: 'beauty-nailart-1',
    name: 'Nail Art Studio',
    category: 'Ногтевая студия',
    type: 'regular',
    address: 'Чистопрудный бульвар, 12А, Москва',
    coordinates: [37.6390, 55.7650] as [number, number],
    metro: {
      station: 'Чистые пруды',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 623-62-36',
    messengers: {
      whatsapp: '+74956236236',
      telegram: '@nailart_studio'
    },
    website: 'nailart-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/nailart_moscow',
      instagram: 'https://instagram.com/nailart_studio'
    },
    rating: 4.7,
    reviewCount: 456,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 30 минут',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 11:00-19:00']
    },
    coords: [37.6390, 55.7650],
    distance: '320 м',
    closingStatus: {
      text: 'Закроется через 30 минут',
      isWarning: true,
    },
    friendsVisited: {
      friends: [
        { id: '4', name: 'Мария', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Ольга', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.7
    },
  },

  // SPA центр Релакс
  {
    id: 'beauty-spa-relax-1',
    name: 'SPA центр Релакс',
    category: 'SPA-салон',
    type: 'regular',
    address: 'ул. Остоженка, 37/7, стр. 3, Москва',
    coordinates: [37.5920, 55.7380] as [number, number],
    metro: {
      station: 'Парк культуры',
      line: 'Сокольническая',
      distance: '5 мин',
      color: '#D42B28',
    },
    phone: '+7 495 789-78-97',
    messengers: {
      whatsapp: '+74957897897',
      telegram: '@spa_relax'
    },
    website: 'spa-relax.ru',
    socialMedia: {
      vk: 'https://vk.com/spa_relax_moscow',
      instagram: 'https://instagram.com/spa_relax'
    },
    rating: 4.8,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 10:00-22:00']
    },
    coords: [37.5920, 55.7380],
    distance: '1.1 км',
    friendsVisited: {
      friends: [
        { id: '6', name: 'Светлана', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '7', name: 'Наталья', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.8
    },
  },

  // Барбершоп Усы и Борода
  {
    id: 'beauty-barbershop-1',
    name: 'Усы и Борода',
    category: 'Барбершоп',
    type: 'regular',
    address: 'Малая Дмитровка, 16, стр. 2, Москва',
    coordinates: [37.6050, 55.7700] as [number, number],
    metro: {
      station: 'Пушкинская',
      line: 'Таганско-Краснопресненская',
      distance: '3 мин',
      color: '#A42E2C',
    },
    phone: '+7 495 555-44-33',
    messengers: {
      whatsapp: '+74955554433',
      telegram: '@usy_boroda'
    },
    website: 'usy-boroda.ru',
    socialMedia: {
      vk: 'https://vk.com/usy_boroda',
      instagram: 'https://instagram.com/usy_boroda'
    },
    rating: 4.6,
    reviewCount: 345,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 12:00-19:00']
    },
    coords: [37.6050, 55.7700],
    distance: '380 м',
    friendsVisited: {
      friends: [
        { id: '8', name: 'Максим', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '9', name: 'Денис', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.6
    },
  },

  // Косметология Эстет
  {
    id: 'beauty-cosmetology-1',
    name: 'Центр косметологии Эстет',
    category: 'Косметологическая клиника',
    type: 'regular',
    address: 'ул. Новослободская, 26, Москва',
    coordinates: [37.6010, 55.7790] as [number, number],
    metro: {
      station: 'Новослободская',
      line: 'Кольцевая',
      distance: '1 мин',
      color: '#915C44',
    },
    phone: '+7 495 234-23-42',
    messengers: {
      whatsapp: '+74952342342',
      telegram: '@estet_clinic'
    },
    website: 'estet-clinic.ru',
    socialMedia: {
      vk: 'https://vk.com/estet_clinic',
      instagram: 'https://instagram.com/estet_clinic'
    },
    rating: 4.4,
    reviewCount: 678,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 09:00-20:00', 'вс: выходной']
    },
    coords: [37.6010, 55.7790],
    distance: '920 м',
  },
];