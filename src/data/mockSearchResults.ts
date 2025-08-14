import { SearchResultCardProps } from '@/components/organisms/SearchResultCard';

export const mockSearchResults: SearchResultCardProps[] = [
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
    isAdvertiser: false,
    zmkData: {
      products: [
        { id: 'p1', image: '/assets/products/phone-case.jpg', title: 'Чехол для телефона', price: '990 ₽' },
        { id: 'p2', image: '/assets/products/car-mount.jpg', title: 'Держатель в авто', price: '1290 ₽' },
        { id: 'p3', image: '/assets/products/documents-holder.jpg', title: 'Папка для документов', price: '490 ₽' },
        { id: 'p4', image: '/assets/products/keychain.jpg', title: 'Брелок', price: '290 ₽' },
      ],
    },
  },
  {
    id: '2',
    name: 'Реактор',
    category: 'Региональная сеть автокомплексов для японских автомобилей',
    rating: 4.6,
    reviewCount: 120,
    address: 'ул. Ленина 45, Новосибирск',
    distance: '3 мин',
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
    zmkData: {
      products: [
        { id: 'p8', image: '/assets/products/toothbrush.jpg', title: 'Зубная щётка', price: '390 ₽' },
        { id: 'p9', image: '/assets/products/toothpaste.jpg', title: 'Зубная паста', price: '290 ₽' },
        { id: 'p10', image: '/assets/products/mouthwash.jpg', title: 'Ополаскиватель', price: '490 ₽' },
        { id: 'p11', image: '/assets/products/dental-floss.jpg', title: 'Зубная нить', price: '190 ₽' },
      ],
    },
  },
  {
    id: '4',
    name: 'Центр госуслуг МФЦ',
    category: 'Многофункциональный центр',
    address: 'ул. Красный проспект 101, Новосибирск',
    distance: '2.1 км',
    isAdvertiser: false,
    closingStatus: {
      text: 'Закроется через 15 минут',
      isWarning: true,
    },
    friendsVisited: {
      friends: [
        { id: '7', name: 'Виктор', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '8', name: 'Олеся', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
        { id: '9', name: 'Павел', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
        { id: '10', name: 'Светлана', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
        { id: '11', name: 'Игорь', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
        { id: '12', name: 'Ольга', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
      ],
      rating: 4.2
    },
  },
  {
    id: '5',
    name: 'Детская поликлиника №7',
    category: 'Детская поликлиника',
    rating: 4.2,
    reviewCount: 67,
    address: 'ул. Советская 23, Новосибирск',
    distance: '5 мин',
    isAdvertiser: false,
    zmkData: {
      products: [
        { id: 'p5', image: '/assets/products/vitamins.jpg', title: 'Витамины', price: '1590 ₽' },
        { id: 'p6', image: '/assets/products/thermometer.jpg', title: 'Термометр', price: '890 ₽' },
        { id: 'p7', image: '/assets/products/toys.jpg', title: 'Игрушки', price: '590 ₽' },
      ],
    },
  },
  {
    id: '6',
    name: 'Регистрационная палата',
    category: 'Государственная служба',
    address: 'ул. Максима Горького 83, 1 этаж, Новосибирск',
    distance: '1.8 км',
    isAdvertiser: false,
    closingStatus: {
      text: 'Открыто до 18:00',
      isWarning: false,
    },
  },
  {
    id: '7',
    name: 'Налоговая инспекция №15',
    category: 'Федеральная налоговая служба',
    rating: 3.9,
    reviewCount: 156,
    address: 'пр. Карла Маркса 45, корп. 2, Новосибирск',
    distance: '12 мин',
    isAdvertiser: true, // This is an advertiser, no ZMK block
    closingStatus: {
      text: 'Закроется через 45 минут',
      isWarning: true,
    },
  },
];

// Helper function to get random subset for demos
export function getRandomSearchResults(count: number = 3): SearchResultCardProps[] {
  const shuffled = [...mockSearchResults].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get results by category
export function getSearchResultsByCategory(category: string): SearchResultCardProps[] {
  return mockSearchResults.filter(result => 
    result.category.toLowerCase().includes(category.toLowerCase())
  );
}

// Helper function to get results with warnings
export function getSearchResultsWithWarnings(): SearchResultCardProps[] {
  return mockSearchResults.filter(result => 
    result.closingStatus?.isWarning === true
  );
}