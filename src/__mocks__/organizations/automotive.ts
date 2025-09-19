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

  // Auto parts stores
  {
    id: 'autoparts-exist-1',
    name: 'Exist.ru',
    category: 'Магазин автозапчастей',
    type: 'advertiser',
    address: 'ул. Ленина, 45, Москва',
    coordinates: [37.6173, 55.7558] as [number, number],
    metro: {
      station: 'Чистые пруды',
      line: 'Сокольническая',
      distance: '3 мин',
      color: '#D42B28',
    },
    phone: '+7 495 234-56-78',
    messengers: {
      whatsapp: '+74952345678',
      telegram: '@exist_auto'
    },
    website: 'exist.ru',
    socialMedia: {
      vk: 'https://vk.com/exist_auto',
      instagram: 'https://instagram.com/exist_auto'
    },
    rating: 4.5,
    reviewCount: 2341,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 09:00-20:00', 'вс: 10:00-18:00']
    },
    coords: [37.6173, 55.7558],
    distance: '1.2 км',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Оригинальные запчасти с гарантией + бесплатная доставка от 3000₽!',
    buttonLabel: 'Каталог',
    adContent: {
      text: 'Широкий ассортимент автозапчастей для всех марок авто',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
  },

  {
    id: 'autoparts-bibi-1',
    name: 'БИ-БИ Автозапчасти',
    category: 'Автомагазин',
    type: 'advertiser',
    address: 'пр. Мира, 123, Москва',
    coordinates: [37.6340, 55.7700] as [number, number],
    metro: {
      station: 'Проспект Мира',
      line: 'Кольцевая',
      distance: '5 мин',
      color: '#6A4C93',
    },
    phone: '+7 495 345-67-89',
    messengers: {
      whatsapp: '+74953456789',
      telegram: '@bibi_auto'
    },
    website: 'bibi-auto.ru',
    socialMedia: {
      vk: 'https://vk.com/bibi_auto',
      instagram: 'https://instagram.com/bibi_auto'
    },
    rating: 4.8,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 08:00-21:00', 'вс: 10:00-19:00']
    },
    coords: [37.6340, 55.7700],
    distance: '800 м',
    isAdvertiser: true,
    logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
    gallery: [
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    ],
    promotionalText: 'Подбор запчастей по VIN коду + установка в наших сервисах',
    buttonLabel: 'Подобрать',
    adContent: {
      text: 'Запчасти с подбором по VIN. Установка у проверенных партнёров',
      disclaimer: 'Реклама',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
    },
  },

  {
    id: 'autoparts-autodoc-1',
    name: 'Автодок',
    category: 'Интернет-магазин автозапчастей',
    type: 'regular',
    address: 'ул. Автомобильная, 15, Москва',
    coordinates: [37.7440, 55.7210] as [number, number],
    metro: {
      station: 'Автозаводская',
      line: 'Замоскворецкая',
      distance: '8 мин',
      color: '#2D5016',
    },
    phone: '+7 495 456-78-90',
    messengers: {
      whatsapp: '+74954567890',
      telegram: '@autodoc_ru'
    },
    website: 'autodoc.ru',
    socialMedia: {
      vk: 'https://vk.com/autodoc',
      instagram: 'https://instagram.com/autodoc'
    },
    rating: 4.2,
    reviewCount: 89,
    workHours: {
      status: 'open' as const,
      text: 'Заказ онлайн круглосуточно',
      schedule: ['пн-сб: 09:00-18:00', 'Заказ онлайн: 24 часа']
    },
    coords: [37.7440, 55.7210],
    distance: '950 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Михаил', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.2
    },
  },

  {
    id: 'autoparts-24-1',
    name: 'АвтоЗапчасти 24',
    category: 'Магазин автозапчастей',
    type: 'regular',
    address: 'ул. Гаражная, 78, Москва',
    coordinates: [37.6280, 55.7420] as [number, number],
    metro: {
      station: 'Сретенский бульвар',
      line: 'Люблинско-Дмитровская',
      distance: '6 мин',
      color: '#006400',
    },
    phone: '+7 495 567-89-01',
    messengers: {
      whatsapp: '+74955678901'
    },
    website: 'avtozap24.ru',
    rating: 4.4,
    reviewCount: 156,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.6280, 55.7420],
    distance: '1.1 км',
  },

  {
    id: 'autoparts-wheels-1',
    name: 'Колёса и Запчасти',
    category: 'Автозапчасти и шины',
    type: 'regular',
    address: 'Автомобильный переулок, 5, Москва',
    coordinates: [37.6580, 55.7380] as [number, number],
    metro: {
      station: 'Курская',
      line: 'Сокольническая',
      distance: '10 мин',
      color: '#D42B28',
    },
    phone: '+7 495 678-90-12',
    messengers: {
      whatsapp: '+74956789012',
      telegram: '@wheels_parts'
    },
    website: 'kolesa-zapchasti.ru',
    socialMedia: {
      vk: 'https://vk.com/kolesa_zapchasti'
    },
    rating: 4.6,
    reviewCount: 234,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 19:00',
      schedule: ['пн-сб: 09:00-19:00', 'вс: 10:00-17:00']
    },
    coords: [37.6580, 55.7380],
    distance: '1.3 км',
    friendsVisited: {
      friends: [
        { id: '2', name: 'Алексей', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '3', name: 'Дмитрий', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
      ],
      rating: 4.6
    },
  },

  {
    id: 'autoparts-service-1',
    name: 'Автосервис Профи',
    category: 'Автосервис с продажей запчастей',
    type: 'regular',
    address: 'ул. Механиков, 32, Москва',
    coordinates: [37.6780, 55.7180] as [number, number],
    metro: {
      station: 'Таганская',
      line: 'Кольцевая',
      distance: '12 мин',
      color: '#6A4C93',
    },
    phone: '+7 495 789-01-23',
    messengers: {
      whatsapp: '+74957890123'
    },
    website: 'autoservice-profi.ru',
    rating: 4.3,
    reviewCount: 78,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 40 минут',
      schedule: ['пн-сб: 08:00-19:00', 'вс: выходной']
    },
    coords: [37.6780, 55.7180],
    distance: '1.5 км',
    closingStatus: {
      text: 'Закроется через 40 минут',
      isWarning: true,
    },
  },

  {
    id: 'autoparts-used-1',
    name: 'Б/У Запчасти',
    category: 'Разборка автомобилей',
    type: 'regular',
    address: 'Промышленная зона, участок 12, Москва',
    coordinates: [37.5980, 55.6980] as [number, number],
    metro: {
      station: 'Тульская',
      line: 'Серпуховско-Тимирязевская',
      distance: '15 мин',
      color: '#999999',
    },
    phone: '+7 495 890-12-34',
    messengers: {
      whatsapp: '+74958901234'
    },
    rating: 4.0,
    reviewCount: 45,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 18:00',
      schedule: ['пн-сб: 09:00-18:00', 'вс: выходной']
    },
    coords: [37.5980, 55.6980],
    distance: '2.1 км',
  },
];