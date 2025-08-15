import type { SearchResult } from '@/stores/types';

/**
 * Medical services - clinics, laboratories, and healthcare providers
 * Mix of private and chain medical organizations
 */
export const medicalServices: SearchResult[] = [
  // Инвитро
  {
    id: 'medical-invitro-1',
    name: 'Инвитро',
    category: 'Медицинская лаборатория',
    type: 'regular',
    address: 'ул. Петровка, 28, Москва',
    coordinates: [37.6170, 55.7630] as [number, number],
    metro: {
      station: 'Чеховская',
      line: 'Серпуховско-Тимирязевская',
      distance: '2 мин',
      color: '#999999',
    },
    phone: '+7 495 363-03-63',
    messengers: {
      whatsapp: '+74953630363',
      telegram: '@invitro_lab'
    },
    website: 'invitro.ru',
    socialMedia: {
      vk: 'https://vk.com/invitro_official',
      instagram: 'https://instagram.com/invitro_lab'
    },
    rating: 4.4,
    reviewCount: 567,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 20:00',
      schedule: ['пн-сб: 07:30-20:00', 'вс: 08:00-17:00']
    },
    coords: [37.6170, 55.7630],
    distance: '230 м',
    friendsVisited: {
      friends: [
        { id: '1', name: 'Марина', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '2', name: 'Сергей', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.4
    },
    // Medical services for cart functionality
    products: [
      {
        id: 'invitro-blood-test-1',
        image: '/assets/figma/24ace8940eccc51dbbf5b15af155b01435ec8a23.png',
        title: 'Общий анализ крови',
        weight: '1 процедура',
        price: 450
      },
      {
        id: 'invitro-biochem-1', 
        image: '/assets/figma/d86e9c98cc883aff65270c606c4f6cc1b65f2d4d.png',
        title: 'Биохимический анализ крови',
        weight: '15 показателей',
        price: 1200,
        oldPrice: 1500
      },
      {
        id: 'invitro-vitamin-d-1',
        image: '/assets/figma/8441c3055b3f38c931e05b652aacb578fe48a2b8.png',
        title: 'Анализ на витамин D',
        weight: '1 показатель',
        price: 890
      }
    ],
  },

  // СМ-Клиника
  {
    id: 'medical-sm-clinic-1',
    name: 'СМ-Клиника',
    category: 'Многопрофильная клиника',
    type: 'regular',
    address: 'ул. Ярославская, 4к2, Москва',
    coordinates: [37.6590, 55.7970] as [number, number],
    metro: {
      station: 'ВДНХ',
      line: 'Калужско-Рижская',
      distance: '5 мин',
      color: '#ED9F2D',
    },
    phone: '+7 495 777-48-49',
    messengers: {
      whatsapp: '+74957774849',
      telegram: '@smclinic_moscow'
    },
    website: 'smclinic.ru',
    socialMedia: {
      vk: 'https://vk.com/sm_clinic',
      instagram: 'https://instagram.com/sm_clinic'
    },
    rating: 4.6,
    reviewCount: 892,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 22:00',
      schedule: ['пн-вс: 08:00-22:00']
    },
    coords: [37.6590, 55.7970],
    distance: '2.3 км',
    friendsVisited: {
      friends: [
        { id: '3', name: 'Анна', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '4', name: 'Игорь', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '5', name: 'Татьяна', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
      ],
      rating: 4.6
    },
  },

  // Гемотест
  {
    id: 'medical-gemotest-1',
    name: 'Гемотест',
    category: 'Лабораторная диагностика',
    type: 'regular',
    address: 'Ленинградский проспект, 15А, Москва',
    coordinates: [37.5640, 55.7890] as [number, number],
    metro: {
      station: 'Белорусская',
      line: 'Замоскворецкая',
      distance: '3 мин',
      color: '#2D5016',
    },
    phone: '+7 495 532-13-13',
    messengers: {
      whatsapp: '+74955321313',
      telegram: '@gemotest_lab'
    },
    website: 'gemotest.ru',
    socialMedia: {
      vk: 'https://vk.com/gemotest',
      instagram: 'https://instagram.com/gemotest'
    },
    rating: 4.2,
    reviewCount: 445,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 18:00',
      schedule: ['пн-сб: 07:00-18:00', 'вс: 08:00-16:00']
    },
    coords: [37.5640, 55.7890],
    distance: '1.8 км',
  },

  // Поликлиника №1 УДП РФ
  {
    id: 'medical-polyclinic-1',
    name: 'Поликлиника №1 УДП РФ',
    category: 'Государственная поликлиника',
    type: 'regular',
    address: 'ул. Сивцев Вражек, 26/28, Москва',
    coordinates: [37.5950, 55.7480] as [number, number],
    metro: {
      station: 'Кропоткинская',
      line: 'Сокольническая',
      distance: '4 мин',
      color: '#D42B28',
    },
    phone: '+7 495 695-56-95',
    messengers: {
      whatsapp: '+74956955695'
    },
    website: 'udprf.ru',
    socialMedia: {
      vk: 'https://vk.com/udprf_official'
    },
    rating: 3.9,
    reviewCount: 234,
    workHours: {
      status: 'closing_soon' as const,
      text: 'Закроется через 20 минут',
      schedule: ['пн-пт: 08:00-20:00', 'сб: 09:00-15:00', 'вс: выходной']
    },
    coords: [37.5950, 55.7480],
    distance: '850 м',
    closingStatus: {
      text: 'Закроется через 20 минут',
      isWarning: true,
    },
  },

  // ЦКБ УДП РФ
  {
    id: 'medical-ckb-1',
    name: 'ЦКБ УДП РФ',
    category: 'Больница',
    type: 'regular',
    address: 'ул. Маршала Тимошенко, 15, Москва',
    coordinates: [37.4850, 55.7590] as [number, number],
    metro: {
      station: 'Крылатское',
      line: 'Сокольническая',
      distance: '8 мин',
      color: '#D42B28',
    },
    phone: '+7 495 530-01-11',
    messengers: {
      whatsapp: '+74955300111'
    },
    website: 'ckbran.ru',
    socialMedia: {
      vk: 'https://vk.com/ckbran'
    },
    rating: 4.3,
    reviewCount: 678,
    workHours: {
      status: 'open' as const,
      text: 'Работает круглосуточно',
      schedule: ['пн-вс: 24 часа']
    },
    coords: [37.4850, 55.7590],
    distance: '12 км',
    friendsVisited: {
      friends: [
        { id: '6', name: 'Елена', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
      ],
      rating: 4.3
    },
  },

  // Стоматология Дента
  {
    id: 'medical-denta-1',
    name: 'Стоматология Дента',
    category: 'Стоматологическая клиника',
    type: 'regular',
    address: 'ул. Остоженка, 25, Москва',
    coordinates: [37.5980, 55.7420] as [number, number],
    metro: {
      station: 'Кропоткинская',
      line: 'Сокольническая',
      distance: '2 мин',
      color: '#D42B28',
    },
    phone: '+7 495 637-70-70',
    messengers: {
      whatsapp: '+74956377070',
      telegram: '@denta_clinic'
    },
    website: 'denta-moscow.ru',
    socialMedia: {
      vk: 'https://vk.com/denta_moscow',
      instagram: 'https://instagram.com/denta_moscow'
    },
    rating: 4.7,
    reviewCount: 324,
    workHours: {
      status: 'open' as const,
      text: 'Работает до 21:00',
      schedule: ['пн-сб: 09:00-21:00', 'вс: 10:00-18:00']
    },
    coords: [37.5980, 55.7420],
    distance: '640 м',
    friendsVisited: {
      friends: [
        { id: '7', name: 'Михаил', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '8', name: 'Ольга', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.7
    },
  },
];