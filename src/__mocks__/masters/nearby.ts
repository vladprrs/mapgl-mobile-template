/**
 * Mock data for Masters Nearby card
 * Contains sample master profiles for manicure search results
 */

export interface Master {
  id: string;
  name: string;
  avatar: string;
  specialization?: string;
  rating?: number;
}

export const mockMastersNearby: Master[] = [
  {
    id: 'master-1',
    name: 'Александра',
    avatar: '/assets/23edad0153988d6704197a43ed4d17e51f00e455.png',
    specialization: 'Маникюр, педикюр',
    rating: 4.9
  },
  {
    id: 'master-2', 
    name: 'Мария',
    avatar: '/assets/7c555ac081e621955c2c245891b952413a9a27c3.png',
    specialization: 'Наращивание ногтей',
    rating: 4.8
  },
  {
    id: 'master-3',
    name: 'Елена',
    avatar: '/assets/5becee8b64e742d845f3d3853a20fc8aa217f421.png',
    specialization: 'Дизайн ногтей',
    rating: 5.0
  },
  {
    id: 'master-4',
    name: 'Анна',
    avatar: '/assets/3f7bea47f4117b52225de7a6e196c4397746c1aa.png',
    specialization: 'Маникюр',
    rating: 4.7
  }
];

export const mastersNearbyConfig = {
  title: 'Мастера рядом',
  buttonText: 'Посмотреть',
  maxVisibleMasters: 4,
  extraMastersCount: 2, // Show "+2" for additional masters
};