import type { SearchResult } from '@/stores/types';

/**
 * Featured and advertiser organizations
 * Premium organizations with special promotional content and AD blocks
 */
export const featuredOrganizations: SearchResult[] = [
  // Большой Театр (Featured cultural venue)
  {
    id: 'featured-bolshoi-1',
    name: 'Большой театр',
    category: 'Театр оперы и балета',
    type: 'advertiser',
    address: 'Театральная площадь, 1, Москва',
    coordinates: [37.6176, 55.7596] as [number, number],
    metro: {
      station: 'Театральная',
      line: 'Замоскворецкая',
      distance: '1 мин',
      color: '#2D5016',
    },
    phone: '+7 495 455-55-55',
    messengers: {
      whatsapp: '+74954555555',
      telegram: '@bolshoi_theatre'
    },
    website: 'bolshoi.ru',
    socialMedia: {
      vk: 'https://vk.com/bolshoi_theatre',
      instagram: 'https://instagram.com/bolshoi_theatre',
      youtube: 'https://youtube.com/bolshoitheatre'
    },
    rating: 4.9,
    reviewCount: 2345,
    workHours: {
      status: 'open' as const,
      text: 'Касса работает до 19:30',
      schedule: ['касса: вт-вс: 11:00-19:30', 'пн: выходной']
    },
    coords: [37.6176, 55.7596],
    distance: '180 м',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Сезон 2024/25 - билеты на лучшие спектакли уже в продаже!',
    buttonLabel: 'Купить билет',
    adContent: {
      text: 'Главная сцена России. Опера, балет, концерты мирового уровня.',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
    friendsVisited: {
      friends: [
        { id: '1', name: 'Екатерина', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Михаил', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Анна', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Павел', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.9
    },
  },

  // ГУМ (Featured shopping center)
  {
    id: 'featured-gum-1',
    name: 'ГУМ',
    category: 'Торговый центр',
    type: 'advertiser',
    address: 'Красная площадь, 3, Москва',
    coordinates: [37.6208, 55.7540] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 788-43-43',
    messengers: {
      whatsapp: '+74957884343',
      telegram: '@gum_moscow'
    },
    website: 'gum.ru',
    socialMedia: {
      vk: 'https://vk.com/gum_moscow',
      instagram: 'https://instagram.com/gum_moscow',
      facebook: 'https://facebook.com/gum.moscow'
    },
    rating: 4.6,
    reviewCount: 3456,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 10:00-22:00']
    },
    coords: [37.6208, 55.7540],
    distance: '120 м',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Зимняя распродажа до -70%! Более 200 брендов в историческом центре.',
    buttonLabel: 'Подробнее',
    adContent: {
      text: 'Главный универмаг страны на Красной площади',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
    friendsVisited: {
      friends: [
        { id: '5', name: 'Владислав', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '6', name: 'Алиса', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.6
    },
  },

  // Яндекс.Такси (Featured service)
  {
    id: 'featured-yandex-taxi-1',
    name: 'Яндекс.Такси',
    category: 'Служба такси',
    type: 'advertiser',
    address: 'ул. Льва Толстого, 16, Москва',
    coordinates: [37.5890, 55.7330] as [number, number],
    metro: {
      station: 'Парк культуры',
      line: 'Кольцевая',
      distance: '4 мин',
      color: '#915C44',
    },
    phone: '+7 495 705-70-57',
    messengers: {
      whatsapp: '+74957057057',
      telegram: '@yandex_taxi'
    },
    website: 'taxi.yandex.ru',
    socialMedia: {
      vk: 'https://vk.com/yandextaxi',
      instagram: 'https://instagram.com/yandex.taxi'
    },
    rating: 4.4,
    reviewCount: 12345,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.5890, 55.7330],
    distance: '0 м',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    promotionalText: 'Поездки по фиксированной цене! Скидка 20% на первые 3 поездки.',
    buttonLabel: 'Заказать',
    adContent: {
      text: 'Быстрое и безопасное такси в любую точку города',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
  },

  // Сбербанк (Featured bank)
  {
    id: 'featured-sberbank-1',
    name: 'Сбербанк',
    category: 'Банк',
    type: 'advertiser',
    address: 'ул. Вавилова, 19, Москва',
    coordinates: [37.5390, 55.7080] as [number, number],
    metro: {
      station: 'Ленинский проспект',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 500-55-50',
    messengers: {
      whatsapp: '+74955005550',
      telegram: '@sberbank_official'
    },
    website: 'sberbank.ru',
    socialMedia: {
      vk: 'https://vk.com/sberbank',
      instagram: 'https://instagram.com/sberbank'
    },
    rating: 4.1,
    reviewCount: 1567,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 15 минут',
      schedule: ['пн-пт: 09:00-19:00', 'сб: 10:00-17:00', 'вс: выходной']
    },
    coords: [37.5390, 55.7080],
    distance: '2.1 км',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    promotionalText: 'Ипотека от 8.1% годовых. Одобрение за 2 минуты онлайн!',
    buttonLabel: 'Оформить',
    adContent: {
      text: 'Банковские услуги для частных лиц и бизнеса',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
    closingStatus: {
      text: 'Закроется через 15 минут',
      isWarning: true,
    },
    friendsVisited: {
      friends: [
        { id: '7', name: 'Олег', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '8', name: 'Ирина', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.1
    },
  },

  // МТС (Featured telecom - additional branch)
  {
    id: 'featured-mts-premium-1',
    name: 'МТС Premium',
    category: 'Премиум салон связи',
    type: 'advertiser',
    address: 'Тверская, 6/1, Москва',
    coordinates: [37.6120, 55.7580] as [number, number],
    metro: {
      station: 'Охотный ряд',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 766-99-99',
    messengers: {
      whatsapp: '+74957669999',
      telegram: '@mts_premium'
    },
    website: 'mts.ru/premium',
    socialMedia: {
      vk: 'https://vk.com/mts_premium',
      instagram: 'https://instagram.com/mts_premium'
    },
    rating: 4.7,
    reviewCount: 456,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 10:00-21:00', 'вс: 11:00-20:00']
    },
    coords: [37.6120, 55.7580],
    distance: '80 м',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Премиум тарифы со скоростью до 1 Гбит/с! Первый месяц бесплатно.',
    buttonLabel: 'Подключить',
    adContent: {
      text: 'Премиум услуги связи с персональным обслуживанием',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
    friendsVisited: {
      friends: [
        { id: '9', name: 'Артем', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.7
    },
  },
];