import { SearchResultCardProps } from '@/components/organisms/SearchResultCard';

interface SearchResultsByQuery {
  [query: string]: SearchResultCardProps[];
}

/**
 * Mock search results organized by query with realistic advertiser placement
 * Structure: Positions 1-2 = Advertisers (premium placement), Positions 3+ = Regular businesses
 * Simulates real search behavior where paid advertisers appear first
 */
export const searchResultsByQuery: SearchResultsByQuery = {
  // Restaurant search results
  'рестораны': [
    // Position 1: Premium advertiser
    {
      id: 'rest-adv-1',
      name: 'Ресторан Пушкин',
      category: 'Русская кухня • Премиум-класс',
      isAdvertiser: true,
      rating: 4.8,
      reviewCount: 1247,
      address: 'Тверской бульвар, 26А',
      distance: '850 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Банкет до 100 человек со скидкой 15% при бронировании через 2ГИС!',
      buttonLabel: 'Забронировать',
      closingStatus: {
        text: 'Открыто до 02:00',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '1', name: 'Александра', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
          { id: '2', name: 'Михаил', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
          { id: '3', name: 'Елена', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
        ],
        rating: 4.8
      },
    },
    // Position 2: Second advertiser
    {
      id: 'rest-adv-2',
      name: 'White Rabbit',
      category: 'Авторская кухня • Высокая кухня',
      isAdvertiser: true,
      rating: 4.9,
      reviewCount: 892,
      address: 'Смоленская площадь, 3, 16 этаж',
      distance: '1.2 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Дегустационное меню на панорамной террасе с видом на Москву',
      buttonLabel: 'Меню',
      closingStatus: {
        text: 'Открыто до 23:00',
        isWarning: false,
      },
    },
    // Position 3: Regular business with friends
    {
      id: 'rest-reg-3',
      name: 'Кафе Му-Му',
      category: 'Кафе • Домашняя кухня',
      isAdvertiser: false,
      address: 'ул. Арбат, 45/1',
      distance: '650 м',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '4', name: 'Анна', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' },
          { id: '5', name: 'Дмитрий', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
        ],
        rating: 4.2
      },
      zmkData: {
        products: [
          { id: 'p1', image: '/assets/products/coffee.jpg', title: 'Кофе', price: '120 ₽' },
          { id: 'p2', image: '/assets/products/sandwich.jpg', title: 'Сэндвич', price: '250 ₽' },
          { id: 'p3', image: '/assets/products/salad.jpg', title: 'Салат', price: '180 ₽' }
        ]
      }
    },
    // Position 4: Regular business with warning
    {
      id: 'rest-reg-4',
      name: 'Столовая №1',
      category: 'Столовая • Быстрое питание',
      isAdvertiser: false,
      address: 'ул. Тверская, 8',
      distance: '420 м',
      closingStatus: {
        text: 'Закроется через 25 минут',
        isWarning: true,
      },
    },
    // Position 5: Regular business with half-star rating
    {
      id: 'rest-reg-5',
      name: 'Пиццерия Папа Джонс',
      category: 'Пиццерия • Американская кухня',
      isAdvertiser: false,
      address: 'пр. Мира, 12',
      distance: '1.8 км',
      rating: 4.5,
      reviewCount: 156,
      closingStatus: {
        text: 'Открыто до 01:00',
        isWarning: false,
      },
    }
  ],

  // Pharmacy search results
  'аптеки': [
    // Position 1: Premium pharmacy chain
    {
      id: 'pharm-adv-1',
      name: 'Ригла',
      category: 'Аптечная сеть • Круглосуточно',
      isAdvertiser: true,
      rating: 4.6,
      reviewCount: 823,
      address: 'Красный проспект, 82',
      distance: '300 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Скидка 10% по карте лояльности на все лекарства!',
      buttonLabel: 'Каталог',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Second pharmacy chain
    {
      id: 'pharm-adv-2',
      name: '36.6',
      category: 'Аптечная сеть',
      isAdvertiser: true,
      rating: 4.5,
      reviewCount: 567,
      address: 'ул. Ленина, 123',
      distance: '450 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Бесплатная доставка лекарств при заказе от 500 рублей',
      buttonLabel: 'Заказать',
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 3: Local pharmacy
    {
      id: 'pharm-reg-3',
      name: 'Аптека Здоровье',
      category: 'Аптека',
      isAdvertiser: false,
      address: 'ул. Садовая, 56',
      distance: '680 м',
      closingStatus: {
        text: 'Открыто до 20:00',
        isWarning: false,
      },
    },
    // Position 4: Social pharmacy with warning
    {
      id: 'pharm-reg-4',
      name: 'Социальная аптека',
      category: 'Аптека • Льготные лекарства',
      isAdvertiser: false,
      address: 'пр. Дзержинского, 34',
      distance: '920 м',
      closingStatus: {
        text: 'Закроется через 15 минут',
        isWarning: true,
      },
    },
    // Position 5: Pharmacy point
    {
      id: 'pharm-reg-5',
      name: 'Аптечный пункт',
      category: 'Аптечный пункт',
      isAdvertiser: false,
      address: 'ул. Октябрьская, 15',
      distance: '1.1 км',
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    }
  ],

  // Coffee shop search results
  'кофейни': [
    // Position 1: Premium coffee chain
    {
      id: 'coffee-adv-1',
      name: 'Starbucks',
      category: 'Кофейня • Международная сеть',
      isAdvertiser: true,
      rating: 4.4,
      reviewCount: 1156,
      address: 'Новый Арбат, 19',
      distance: '520 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Новый сезонный латте с тыквенными специями уже в продаже!',
      buttonLabel: 'Меню',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Local premium coffee
    {
      id: 'coffee-adv-2',
      name: 'Coffee Bean & Tea Leaf',
      category: 'Кофейня • Авторский кофе',
      isAdvertiser: true,
      rating: 4.7,
      reviewCount: 445,
      address: 'Патриаршие пруды, 7',
      distance: '780 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Свежеобжаренный кофе из собственной обжарочной',
      buttonLabel: 'Заказать',
      closingStatus: {
        text: 'Открыто до 23:00',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '6', name: 'Ольга', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
          { id: '7', name: 'Сергей', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
        ],
        rating: 4.7
      },
    },
    // Position 3: Local coffee shop
    {
      id: 'coffee-reg-3',
      name: 'Кофе Хауз',
      category: 'Кофейня',
      isAdvertiser: false,
      address: 'ул. Тверская, 25',
      distance: '350 м',
      rating: 4.2,
      reviewCount: 89,
      friendsVisited: {
        friends: [
          { id: '8', name: 'Мария', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
        ],
        rating: 4.2
      },
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 4: Small coffee point
    {
      id: 'coffee-reg-4',
      name: 'Кофе с собой',
      category: 'Кофе-поинт',
      isAdvertiser: false,
      address: 'Красная площадь, 1',
      distance: '1.2 км',
      closingStatus: {
        text: 'Закроется через 40 минут',
        isWarning: true,
      },
    }
  ],

  // Product/grocery search results
  'продукты': [
    // Position 1: Major grocery chain
    {
      id: 'grocery-adv-1',
      name: 'Пятёрочка',
      category: 'Продуктовый магазин • Супермаркет',
      isAdvertiser: true,
      rating: 4.3,
      reviewCount: 445,
      address: 'ул. Ленина, 89',
      distance: '250 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Скидки до 50% на продукты собственной торговой марки!',
      buttonLabel: 'Акции',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Premium grocery
    {
      id: 'grocery-adv-2',
      name: 'Азбука Вкуса',
      category: 'Продуктовый магазин • Премиум',
      isAdvertiser: true,
      rating: 4.6,
      reviewCount: 289,
      address: 'Тверская, 12',
      distance: '680 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Свежие продукты премиум-качества с доставкой на дом',
      buttonLabel: 'Каталог',
      closingStatus: {
        text: 'Открыто до 23:00',
        isWarning: false,
      },
    },
    // Position 3: Local grocery
    {
      id: 'grocery-reg-3',
      name: 'Магнит',
      category: 'Продуктовый магазин',
      isAdvertiser: false,
      address: 'ул. Садовая, 43',
      distance: '420 м',
      rating: 4.1,
      reviewCount: 67,
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 4: Small shop
    {
      id: 'grocery-reg-4',
      name: 'Продукты 24',
      category: 'Магазин у дома',
      isAdvertiser: false,
      address: 'пр. Мира, 156',
      distance: '890 м',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    }
  ],

  // Gas station search results
  'азс': [
    // Position 1: Major oil company
    {
      id: 'gas-adv-1',
      name: 'Лукойл',
      category: 'АЗС • Нефтяная компания',
      isAdvertiser: true,
      rating: 4.5,
      reviewCount: 678,
      address: 'Ленинградское шоссе, 45',
      distance: '2.1 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Заправься на 1000₽ и получи мойку автомобиля бесплатно!',
      buttonLabel: 'Услуги',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Second oil company
    {
      id: 'gas-adv-2',
      name: 'Роснефть',
      category: 'АЗС • Нефтяная компания',
      isAdvertiser: true,
      rating: 4.4,
      reviewCount: 523,
      address: 'МКАД, 89 км',
      distance: '3.2 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Премиальное топливо с присадками для защиты двигателя',
      buttonLabel: 'Карта АЗС',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 3: Local gas station
    {
      id: 'gas-reg-3',
      name: 'Газпромнефть',
      category: 'АЗС',
      isAdvertiser: false,
      address: 'Рублевское шоссе, 12',
      distance: '2.8 км',
      rating: 4.2,
      reviewCount: 89,
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    }
  ],

  // Hospital search results
  'больницы': [
    // Position 1: Private medical center
    {
      id: 'hospital-adv-1',
      name: 'МЕДСИ',
      category: 'Частная клиника • Многопрофильная',
      isAdvertiser: true,
      rating: 4.7,
      reviewCount: 934,
      address: 'Красная Пресня, 16',
      distance: '1.1 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Комплексное обследование Check-up со скидкой 20%',
      buttonLabel: 'Записаться',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Medical network
    {
      id: 'hospital-adv-2',
      name: 'СМ-Клиника',
      category: 'Многопрофильная клиника',
      isAdvertiser: true,
      rating: 4.6,
      reviewCount: 567,
      address: 'ул. Волгоградский проспект, 42',
      distance: '2.3 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Консультация врача-терапевта бесплатно при первом визите',
      buttonLabel: 'Запись онлайн',
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    },
    // Position 3: State hospital
    {
      id: 'hospital-reg-3',
      name: 'Городская больница №1',
      category: 'Государственная больница',
      isAdvertiser: false,
      address: 'ул. Больничная, 5',
      distance: '1.8 км',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 4: Polyclinic
    {
      id: 'hospital-reg-4',
      name: 'Поликлиника №25',
      category: 'Поликлиника',
      isAdvertiser: false,
      address: 'пр. Ленина, 78',
      distance: '950 м',
      closingStatus: {
        text: 'Открыто до 20:00',
        isWarning: false,
      },
    }
  ],

  // Store search results
  'магазины': [
    // Position 1: Electronics store
    {
      id: 'store-adv-1',
      name: 'М.Видео',
      category: 'Магазин электроники • Федеральная сеть',
      isAdvertiser: true,
      rating: 4.3,
      reviewCount: 756,
      address: 'ТЦ Европейский, Площадь Киевского вокзала, 2',
      distance: '1.5 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Скидки до 30% на технику Samsung при трейд-ин старого устройства',
      buttonLabel: 'Каталог',
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 2: Clothing store
    {
      id: 'store-adv-2',
      name: 'ZARA',
      category: 'Одежда и аксессуары • Международный бренд',
      isAdvertiser: true,
      rating: 4.5,
      reviewCount: 445,
      address: 'ГУМ, Красная площадь, 3',
      distance: '890 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Новая коллекция осень-зима уже в продаже!',
      buttonLabel: 'Новинки',
      closingStatus: {
        text: 'Открыто до 23:00',
        isWarning: false,
      },
    },
    // Position 3: Book store
    {
      id: 'store-reg-3',
      name: 'Читай-город',
      category: 'Книжный магазин',
      isAdvertiser: false,
      address: 'ул. Новый Арбат, 8',
      distance: '650 м',
      rating: 4.4,
      reviewCount: 123,
      friendsVisited: {
        friends: [
          { id: '9', name: 'Анастасия', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
        ],
        rating: 4.4
      },
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    },
    // Position 4: Hobby store
    {
      id: 'store-reg-4',
      name: 'Леонардо',
      category: 'Товары для творчества',
      isAdvertiser: false,
      address: 'ТЦ Атриум, ул. Земляной Вал, 33',
      distance: '1.2 км',
      closingStatus: {
        text: 'Закроется через 35 минут',
        isWarning: true,
      },
    }
  ],

  // Bank search results
  'банки': [
    // Position 1: Major bank
    {
      id: 'bank-adv-1',
      name: 'Сбербанк',
      category: 'Банк • Отделение с банкоматом',
      isAdvertiser: true,
      rating: 4.2,
      reviewCount: 889,
      address: 'ул. Тверская, 7',
      distance: '420 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Открытие счета онлайн за 5 минут с доставкой карты на дом',
      buttonLabel: 'Открыть счет',
      closingStatus: {
        text: 'Открыто до 19:00',
        isWarning: false,
      },
    },
    // Position 2: Commercial bank
    {
      id: 'bank-adv-2',
      name: 'ВТБ',
      category: 'Банк • Премиальное обслуживание',
      isAdvertiser: true,
      rating: 4.4,
      reviewCount: 445,
      address: 'Садовое кольцо, 12',
      distance: '750 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Ипотека от 4.5% годовых с господдержкой',
      buttonLabel: 'Условия',
      closingStatus: {
        text: 'Открыто до 20:00',
        isWarning: false,
      },
    },
    // Position 3: Regional bank
    {
      id: 'bank-reg-3',
      name: 'Альфа-Банк',
      category: 'Банк',
      isAdvertiser: false,
      address: 'пр. Мира, 89',
      distance: '920 м',
      rating: 4.1,
      reviewCount: 156,
      closingStatus: {
        text: 'Открыто до 18:00',
        isWarning: false,
      },
    },
    // Position 4: Bank office
    {
      id: 'bank-reg-4',
      name: 'Тинькофф',
      category: 'Банковский офис',
      isAdvertiser: false,
      address: 'ул. Арбат, 54',
      distance: '1.1 км',
      closingStatus: {
        text: 'Закроется через 20 минут',
        isWarning: true,
      },
    }
  ],

  // === DEFAULT SEARCH HISTORY QUERIES ===

  // Manicure/nail service search results
  'маникюр': [
    // Position 1: Premium nail salon chain
    {
      id: 'manicure-adv-1',
      name: 'Студия красоты Luxury Nails',
      category: 'Салон красоты • Маникюр и педикюр',
      isAdvertiser: true,
      rating: 4.9,
      reviewCount: 567,
      address: 'ул. Тверская, 15',
      distance: '300 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Покрытие гель-лак + укрепление ногтей всего 1500₽!',
      buttonLabel: 'Записаться',
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 2: Nail salon franchise
    {
      id: 'manicure-adv-2',
      name: 'Маникюрный салон PRO Ногти',
      category: 'Маникюрный салон • Сеть салонов',
      isAdvertiser: true,
      rating: 4.7,
      reviewCount: 234,
      address: 'пр. Мира, 45',
      distance: '450 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Скидка 20% на первое посещение для новых клиентов',
      buttonLabel: 'Услуги',
      closingStatus: {
        text: 'Работает до 21:00',
        isWarning: false,
      },
    },
    // Position 3: Local nail studio with friends
    {
      id: 'manicure-reg-3',
      name: 'Ногтевая студия Елены',
      category: 'Маникюр • Индивидуальный мастер',
      isAdvertiser: false,
      address: 'ул. Садовая, 23',
      distance: '600 м',
      friendsVisited: {
        friends: [
          { id: '1', name: 'Анна', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' },
          { id: '2', name: 'Мария', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
        ],
        rating: 5.0
      },
      closingStatus: {
        text: 'Работает до 20:00',
        isWarning: false,
      },
    },
    // Position 4: Master at home
    {
      id: 'manicure-reg-4',
      name: 'Мастер маникюра Ольга',
      category: 'Маникюр на дому',
      isAdvertiser: false,
      address: 'Выезд к клиенту',
      distance: '1.2 км',
      rating: 4.8,
      reviewCount: 45,
      closingStatus: {
        text: 'Запись до 19:00',
        isWarning: false,
      },
    },
    // Position 5: Express nail bar
    {
      id: 'manicure-reg-5',
      name: 'Nail Bar Express',
      category: 'Экспресс-маникюр',
      isAdvertiser: false,
      address: 'ТЦ Европейский, 2 этаж',
      distance: '850 м',
      closingStatus: {
        text: 'Закроется через 30 минут',
        isWarning: true,
      }
    }
  ],

  // Fitness/gym search results
  'фитнес': [
    // Position 1: Premium fitness chain
    {
      id: 'fitness-adv-1',
      name: 'World Class',
      category: 'Фитнес-клуб • Премиум-класс',
      isAdvertiser: true,
      rating: 4.8,
      reviewCount: 1245,
      address: 'Тверская, 23',
      distance: '650 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Гостевой визит бесплатно + скидка 50% на первый месяц!',
      buttonLabel: 'Попробовать',
      closingStatus: {
        text: 'Работает до 23:00',
        isWarning: false,
      },
    },
    // Position 2: Popular fitness network
    {
      id: 'fitness-adv-2',
      name: 'Фитнес-клуб Alex Fitness',
      category: 'Фитнес-клуб • Сеть клубов',
      isAdvertiser: true,
      rating: 4.5,
      reviewCount: 678,
      address: 'ул. Ленина, 89',
      distance: '420 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Безлимитный абонемент на 3 месяца всего 9999₽',
      buttonLabel: 'Абонементы',
      closingStatus: {
        text: 'Работает до 22:00',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '3', name: 'Сергей', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
          { id: '4', name: 'Олег', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
        ],
        rating: 4.5
      },
    },
    // Position 3: Local gym
    {
      id: 'fitness-reg-3',
      name: 'Качалка',
      category: 'Тренажерный зал',
      isAdvertiser: false,
      address: 'ул. Спортивная, 12',
      distance: '780 м',
      rating: 4.2,
      reviewCount: 89,
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 4: Fitness studio
    {
      id: 'fitness-reg-4',
      name: 'Спортзал Энергия',
      category: 'Фитнес-студия',
      isAdvertiser: false,
      address: 'пр. Дзержинского, 45',
      distance: '920 м',
      friendsVisited: {
        friends: [
          { id: '5', name: 'Дмитрий', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' }
        ],
        rating: 4.3
      },
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    },
    // Position 5: Small gym
    {
      id: 'fitness-reg-5',
      name: 'Фитнес у дома',
      category: 'Спортзал',
      isAdvertiser: false,
      address: 'ул. Садовая, 67',
      distance: '1.1 км',
      closingStatus: {
        text: 'Закроется через 45 минут',
        isWarning: true,
      },
    }
  ],

  // Specific address search results
  'москва ленина 11': [
    // Position 1: The building itself as an address result
    {
      id: 'addr-lenin-11',
      name: 'ул. Ленина, 11',
      category: 'Жилое здание',
      address: 'ул. Ленина, 11, Москва',
      distance: '0 м',
      type: 'address',
      coords: [82.9207, 55.0415],
    },
    // Position 2: Medical center at this address
    {
      id: 'lenin11-adv-1',
      name: 'Медицинский центр "Здоровье+"',
      category: 'Частная клиника • ул. Ленина, 11',
      isAdvertiser: true,
      type: 'organization',
      rating: 4.7,
      reviewCount: 445,
      address: 'ул. Ленина, 11, 2 этаж',
      distance: '0 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Комплексная диагностика организма со скидкой 25%',
      buttonLabel: 'Записаться',
      closingStatus: {
        text: 'Работает до 20:00',
        isWarning: false,
      },
    },
    // Position 2: Business center
    {
      id: 'lenin11-adv-2',
      name: 'Бизнес-центр "Ленинский"',
      category: 'Бизнес-центр • Аренда офисов',
      isAdvertiser: true,
      rating: 4.3,
      reviewCount: 89,
      address: 'ул. Ленина, 11',
      distance: '0 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Аренда офисов от 30 кв.м с мебелью и ремонтом',
      buttonLabel: 'Подробнее',
      closingStatus: {
        text: 'Работает до 18:00',
        isWarning: false,
      },
    },
    // Position 3: Coffee shop in building
    {
      id: 'lenin11-reg-3',
      name: 'Кофейня на Ленина',
      category: 'Кофейня • 1 этаж',
      isAdvertiser: false,
      address: 'ул. Ленина, 11, 1 этаж',
      distance: '0 м',
      rating: 4.5,
      reviewCount: 67,
      friendsVisited: {
        friends: [
          { id: '6', name: 'Елена', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
        ],
        rating: 4.5
      },
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 4: Pharmacy nearby
    {
      id: 'lenin11-reg-4',
      name: 'Аптека "Здоровье"',
      category: 'Аптека',
      isAdvertiser: false,
      address: 'ул. Ленина, 13',
      distance: '50 м',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 5: Bank nearby
    {
      id: 'lenin11-reg-5',
      name: 'Отделение Сбербанка',
      category: 'Банк',
      isAdvertiser: false,
      address: 'ул. Ленина, 9',
      distance: '80 м',
      closingStatus: {
        text: 'Открыто до 19:00',
        isWarning: false,
      },
    }
  ],

  // Nearby cafe search results
  'кафе рядом': [
    // Position 1: Popular cafe chain
    {
      id: 'nearby-cafe-adv-1',
      name: 'Шоколадница',
      category: 'Кафе • Популярная сеть',
      isAdvertiser: true,
      rating: 4.4,
      reviewCount: 567,
      address: 'ул. Тверская, 12',
      distance: '150 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Десерт в подарок при заказе основного блюда!',
      buttonLabel: 'Меню',
      closingStatus: {
        text: 'Работает до 23:00',
        isWarning: false,
      },
    },
    // Position 2: Coffee shop chain
    {
      id: 'nearby-cafe-adv-2',
      name: 'Кофе Хауз',
      category: 'Кофейня • Сеть кофеен',
      isAdvertiser: true,
      rating: 4.2,
      reviewCount: 234,
      address: 'пр. Мира, 8',
      distance: '200 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Второй кофе со скидкой 50% до 12:00!',
      buttonLabel: 'Акции',
      closingStatus: {
        text: 'Открыто до 22:00',
        isWarning: false,
      },
    },
    // Position 3: Local cafe with friends
    {
      id: 'nearby-cafe-reg-3',
      name: 'Кафе "Уютное место"',
      category: 'Семейное кафе',
      isAdvertiser: false,
      address: 'ул. Садовая, 15',
      distance: '280 м',
      rating: 4.6,
      reviewCount: 89,
      friendsVisited: {
        friends: [
          { id: '7', name: 'Анна', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' },
          { id: '8', name: 'Ирина', avatar: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png' }
        ],
        rating: 4.6
      },
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    },
    // Position 4: Fast food
    {
      id: 'nearby-cafe-reg-4',
      name: 'Быстрая еда',
      category: 'Фастфуд',
      isAdvertiser: false,
      address: 'ул. Ленина, 25',
      distance: '320 м',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
      zmkData: {
        products: [
          { id: 'f1', image: '/assets/products/burger.jpg', title: 'Бургер', price: '280 ₽' },
          { id: 'f2', image: '/assets/products/fries.jpg', title: 'Картофель фри', price: '150 ₽' }
        ]
      }
    },
    // Position 5: Closing soon warning
    {
      id: 'nearby-cafe-reg-5',
      name: 'Пекарня-кондитерская',
      category: 'Пекарня • Кондитерская',
      isAdvertiser: false,
      address: 'пр. Дзержинского, 3',
      distance: '380 м',
      rating: 4.3,
      reviewCount: 45,
      closingStatus: {
        text: 'Закроется через 20 минут',
        isWarning: true,
      },
    }
  ],

  // 24-hour pharmacy search results
  'аптека 24 часа': [
    // Position 1: Major 24h pharmacy chain
    {
      id: 'pharm24-adv-1',
      name: 'Ригла 24/7',
      category: 'Аптека • Круглосуточно',
      isAdvertiser: true,
      rating: 4.6,
      reviewCount: 823,
      address: 'Красный проспект, 82',
      distance: '400 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Круглосуточная аптека с доставкой лекарств на дом!',
      buttonLabel: 'Заказать',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 2: Another 24h pharmacy
    {
      id: 'pharm24-adv-2',
      name: 'ПульсПлюс Круглосуточно',
      category: 'Аптечная сеть • 24 часа',
      isAdvertiser: true,
      rating: 4.4,
      reviewCount: 445,
      address: 'ул. Ленина, 156',
      distance: '650 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      promotionalText: 'Экстренная доставка лекарств в любое время суток',
      buttonLabel: 'Доставка',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 3: Hospital pharmacy
    {
      id: 'pharm24-reg-3',
      name: 'Аптека при больнице №1',
      category: 'Больничная аптека',
      isAdvertiser: false,
      address: 'ул. Больничная, 5',
      distance: '920 м',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 4: Gas station pharmacy
    {
      id: 'pharm24-reg-4',
      name: 'Аптечный пункт на АЗС',
      category: 'Аптечный пункт',
      isAdvertiser: false,
      address: 'Ленинградское шоссе, 45 (АЗС)',
      distance: '1.2 км',
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 5: Night pharmacy
    {
      id: 'pharm24-reg-5',
      name: 'Ночная аптека',
      category: 'Дежурная аптека',
      isAdvertiser: false,
      address: 'ул. Центральная, 89',
      distance: '1.5 км',
      rating: 4.1,
      reviewCount: 67,
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    }
  ],

  // General address searches
  'ленина 11': [
    // Position 1: Address building
    {
      id: 'addr-lenin-11-general',
      name: 'ул. Ленина, 11',
      category: 'Многоквартирный дом',
      address: 'ул. Ленина, 11, Новосибирск',
      distance: '250 м',
      type: 'address',
      coords: [82.9207, 55.0415],
    }
  ],

  'бривибас 45': [
    // Position 1: Office building address
    {
      id: 'addr-brivibas-45',
      name: 'ул. Бривибас, 45',
      category: 'Офисное здание',
      address: 'ул. Бривибас, 45, Рига',
      distance: '1.2 км',
      type: 'address',
      coords: [24.1052, 56.9496],
    }
  ],

  'тверская 12': [
    // Position 1: Historic building
    {
      id: 'addr-tverskaya-12',
      name: 'ул. Тверская, 12',
      category: 'Историческое здание',
      address: 'ул. Тверская, 12, Москва',
      distance: '300 м',
      type: 'address',
      coords: [37.6173, 55.7558],
    }
  ],

  // Auto parts search results
  'автозапчасти': [
    // Position 1: Premium auto parts chain
    {
      id: 'auto-adv-1',
      name: 'Exist.ru',
      category: 'Магазин автозапчастей • Онлайн каталог',
      isAdvertiser: true,
      rating: 4.5,
      reviewCount: 2341,
      address: 'ул. Ленина, 45',
      distance: '1.2 км',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Оригинальные запчасти с гарантией + бесплатная доставка от 3000₽!',
      buttonLabel: 'Каталог',
      closingStatus: {
        text: 'Открыто до 20:00',
        isWarning: false,
      },
    },
    // Position 2: Local auto parts chain
    {
      id: 'auto-adv-2',
      name: 'БИ-БИ Автозапчасти',
      category: 'Автомагазин • Сеть магазинов',
      isAdvertiser: true,
      rating: 4.8,
      reviewCount: 567,
      address: 'пр. Мира, 123',
      distance: '800 м',
      logo: '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
      gallery: [
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png',
        '/icons/eae313a48883a46e7a2a60ee806e73a8052191be.png'
      ],
      promotionalText: 'Подбор запчастей по VIN коду + установка в наших сервисах',
      buttonLabel: 'Подобрать',
      closingStatus: {
        text: 'Открыто до 21:00',
        isWarning: false,
      },
    },
    // Position 3: Online auto parts store
    {
      id: 'auto-reg-3',
      name: 'Автодок',
      category: 'Интернет-магазин автозапчастей',
      isAdvertiser: false,
      address: 'ул. Автомобильная, 15',
      distance: '950 м',
      rating: 4.2,
      reviewCount: 89,
      closingStatus: {
        text: 'Заказ онлайн круглосуточно',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '1', name: 'Михаил', avatar: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png' }
        ],
        rating: 4.2
      },
    },
    // Position 4: Local auto parts shop
    {
      id: 'auto-reg-4',
      name: 'АвтоЗапчасти 24',
      category: 'Магазин автозапчастей',
      isAdvertiser: false,
      address: 'ул. Гаражная, 78',
      distance: '1.1 км',
      rating: 4.4,
      reviewCount: 156,
      closingStatus: {
        text: 'Работает круглосуточно',
        isWarning: false,
      },
    },
    // Position 5: Auto parts with tire service
    {
      id: 'auto-reg-5',
      name: 'Колёса и Запчасти',
      category: 'Автозапчасти • Шиномонтаж',
      isAdvertiser: false,
      address: 'Автомобильный переулок, 5',
      distance: '1.3 км',
      rating: 4.6,
      reviewCount: 234,
      closingStatus: {
        text: 'Открыто до 19:00',
        isWarning: false,
      },
      friendsVisited: {
        friends: [
          { id: '2', name: 'Алексей', avatar: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png' },
          { id: '3', name: 'Дмитрий', avatar: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png' }
        ],
        rating: 4.6
      },
    },
    // Position 6: Auto service with parts
    {
      id: 'auto-reg-6',
      name: 'Автосервис Профи',
      category: 'Автосервис • Запчасти и ремонт',
      isAdvertiser: false,
      address: 'ул. Механиков, 32',
      distance: '1.5 км',
      rating: 4.3,
      reviewCount: 78,
      closingStatus: {
        text: 'Закроется через 40 минут',
        isWarning: true,
      },
    },
    // Position 7: Used auto parts
    {
      id: 'auto-reg-7',
      name: 'Б/У Запчасти',
      category: 'Разборка автомобилей • Б/У запчасти',
      isAdvertiser: false,
      address: 'Промышленная зона, участок 12',
      distance: '2.1 км',
      rating: 4.0,
      reviewCount: 45,
      closingStatus: {
        text: 'Открыто до 18:00',
        isWarning: false,
      },
    }
  ]
};

/**
 * Get search results for a specific query
 * Returns empty array if query not found
 */
export function getSearchResultsForQuery(query: string): SearchResultCardProps[] {
  const normalizedQuery = query.toLowerCase().trim();
  return searchResultsByQuery[normalizedQuery] || [];
}

/**
 * Get all available search queries
 */
export function getAvailableQueries(): string[] {
  return Object.keys(searchResultsByQuery);
}

/**
 * Check if query has mock results
 */
export function hasResultsForQuery(query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  return normalizedQuery in searchResultsByQuery;
}