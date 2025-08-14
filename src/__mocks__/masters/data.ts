export interface Review {
  id: string;
  customerName: string;
  date: string;
  rating: number;
  text: string;
}

export interface Master {
  id: string;
  name: string;
  profession: string;
  description: string;
  rating: number;
  reviewCount: number;
  photo: string;
  yearsOfExperience?: number;
  completedJobs?: number;
  phone?: string;
  messengers?: {
    telegram?: string;
    whatsapp?: string;
    viber?: string;
  };
  website?: string;
  socialMedia?: {
    vk?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    google?: string;
  };
  reviews?: Review[];
}

export const mockMasters: Master[] = [
  {
    id: 'master-1',
    name: 'Елена Петрова',
    profession: 'Маникюр, педикюр',
    description: 'Опытный мастер маникюра с 8-летним стажем. Качественное покрытие гель-лаком.',
    rating: 4.9,
    reviewCount: 127,
    photo: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png',
    yearsOfExperience: 8,
    completedJobs: 1250,
    phone: '+7 (913) 123-45-67',
    messengers: {
      telegram: '@elena_nails',
      whatsapp: '+79131234567',
      viber: '+79131234567',
    },
    website: 'elena-nails.ru',
    socialMedia: {
      vk: 'https://vk.com/elena_nails',
      youtube: 'https://youtube.com/@elena_nails',
      facebook: 'https://facebook.com/elena.nails',
    },
    reviews: [
      {
        id: 'review-1-1',
        customerName: 'Анна К.',
        date: '2 дня назад',
        rating: 5,
        text: 'Отличный мастер! Быстро и качественно сделала маникюр. Покрытие держится уже две недели без сколов.'
      },
      {
        id: 'review-1-2',
        customerName: 'Мария С.',
        date: '1 неделя назад',
        rating: 5,
        text: 'Елена - профессионал своего дела. Аккуратно работает, стерильные инструменты. Обязательно вернусь!'
      },
      {
        id: 'review-1-3',
        customerName: 'Ольга Д.',
        date: '2 недели назад',
        rating: 4,
        text: 'Хорошая работа, но немного долго делала. В остальном всё отлично, результатом довольна.'
      }
    ],
  },
  {
    id: 'master-2',
    name: 'Анна Смирнова',
    profession: 'Аппаратный маникюр',
    description: 'Специализируюсь на аппаратном маникюре и укреплении ногтей.',
    rating: 4.8,
    reviewCount: 89,
    photo: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png',
    yearsOfExperience: 5,
    completedJobs: 980,
    phone: '+7 (913) 234-56-78',
    messengers: {
      telegram: '@anna_manicure',
      whatsapp: '+79132345678',
    },
    website: 'anna-manicure.com',
    socialMedia: {
      vk: 'https://vk.com/anna_manicure',
      google: 'https://g.co/kgs/anna_manicure',
    },
    reviews: [
      {
        id: 'review-2-1',
        customerName: 'Светлана П.',
        date: '3 дня назад',
        rating: 5,
        text: 'Анна замечательный мастер! Аппаратный маникюр сделала идеально, кутикула убрана без повреждений.'
      },
      {
        id: 'review-2-2',
        customerName: 'Екатерина В.',
        date: '1 неделя назад',
        rating: 4,
        text: 'Хорошо работает с проблемными ногтями. Качественно укрепила мои слабые ногти.'
      }
    ],
  },
  {
    id: 'master-3',
    name: 'Ольга Иванова',
    profession: 'Nail art специалист',
    description: 'Создаю уникальные дизайны ногтей. Художественная роспись и стемпинг.',
    rating: 5.0,
    reviewCount: 156,
    photo: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png',
  },
  {
    id: 'master-4',
    name: 'Мария Козлова',
    profession: 'Маникюр и дизайн',
    description: 'Комплексный уход за ногтями и кожей рук. Современные техники дизайна.',
    rating: 4.7,
    reviewCount: 203,
    photo: '/avatars/3f7bea47f4117b52225de7a6e196c4397746c1aa.png',
  },
  {
    id: 'master-5',
    name: 'Сергей Михайлов',
    profession: 'Электрик',
    description: 'Монтаж и ремонт электропроводки. Установка розеток, выключателей, светильников.',
    rating: 4.9,
    reviewCount: 78,
    photo: '/avatars/23edad0153988d6704197a43ed4d17e51f00e455.png',
    yearsOfExperience: 12,
    completedJobs: 560,
    phone: '+7 (913) 456-78-90',
    messengers: {
      telegram: '@sergey_electro',
      whatsapp: '+79134567890',
      viber: '+79134567890',
    },
    website: 'electro-service.ru',
    socialMedia: {
      vk: 'https://vk.com/electro_service',
      youtube: 'https://youtube.com/@electro_sergey',
    },
    reviews: [
      {
        id: 'review-5-1',
        customerName: 'Александр И.',
        date: '4 дня назад',
        rating: 5,
        text: 'Отличный электрик! Быстро нашёл проблему с проводкой и качественно всё починил. Работает аккуратно.'
      },
      {
        id: 'review-5-2',
        customerName: 'Наталья К.',
        date: '1 неделя назад',
        rating: 5,
        text: 'Сергей установил дополнительные розетки в кухне. Работа выполнена профессионально, убрал за собой.'
      },
      {
        id: 'review-5-3',
        customerName: 'Дмитрий Ф.',
        date: '2 недели назад',
        rating: 4,
        text: 'Хороший мастер, знает своё дело. Немного задержался по времени, но работу сделал качественно.'
      }
    ],
  },
  {
    id: 'master-6',
    name: 'Александр Волков',
    profession: 'Сантехник',
    description: 'Ремонт и установка сантехники. Устранение протечек, замена смесителей.',
    rating: 4.8,
    reviewCount: 145,
    photo: '/avatars/7c555ac081e621955c2c245891b952413a9a27c3.png',
  },
  {
    id: 'master-7',
    name: 'Татьяна Николаева',
    profession: 'Массажист',
    description: 'Классический и лечебный массаж. Снятие мышечного напряжения и стресса.',
    rating: 4.9,
    reviewCount: 92,
    photo: '/avatars/5becee8b64e742d845f3d3853a20fc8aa217f421.png',
  },
];

// Helper functions
export function getMastersByProfession(profession: string): Master[] {
  return mockMasters.filter(master => 
    master.profession.toLowerCase().includes(profession.toLowerCase())
  );
}

export function getTopRatedMasters(limit: number = 5): Master[] {
  return [...mockMasters]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getRandomMasters(count: number = 3): Master[] {
  const shuffled = [...mockMasters].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}