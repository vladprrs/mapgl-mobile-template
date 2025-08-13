import type { AdviceItem } from '@/__mocks__/advice/types';

/**
 * Mock RD (Restaurant/Directory) components for advertiser cards
 * These are verified business cards with gallery images and ratings
 */

export const mockRdItems: AdviceItem[] = [
  {
    type: 'rd',
    id: 'geraldine',
    advertiserName: 'Geraldine',
    subtitle: 'Необистро',
    images: [
      '/assets/advice/f24b81b9f69b94fda4e5da97e97749387406ae95.png',
      '/assets/advice/1b05043773971df7e57c1383b3943d78bf6b5aff.png',
    ],
    rating: '4.6',
    distance: '1.4 км',
    address: 'Тверская 32/12, БЦ Апельсин, 1 этаж',
    establishmentIds: ['geraldine-tverskaya'],
    organizationId: 'geraldine-corp',
    theme: 'Light',
    isVerified: true,
  },
];

export const mockRdCafe: AdviceItem = {
  type: 'rd',
  id: 'coffee-mania',
  advertiserName: 'Coffee Mania',
  subtitle: 'Кофейня',
  images: [
    '/assets/advice/coffee-mania-1.png',
    '/assets/advice/coffee-mania-2.png',
    '/assets/advice/coffee-mania-3.png',
  ],
  rating: '4.8',
  distance: '500 м',
  address: 'Никольская улица, 10',
  establishmentIds: ['coffee-mania-nikolskaya'],
  organizationId: 'coffee-mania-corp',
  theme: 'Light',
  isVerified: true,
};

export const mockRdBar: AdviceItem = {
  type: 'rd',
  id: 'noor-bar',
  advertiserName: 'Noor Bar',
  subtitle: 'Бар',
  images: [
    '/assets/advice/noor-bar-1.png',
    '/assets/advice/noor-bar-2.png',
  ],
  rating: '4.7',
  distance: '2.1 км',
  address: 'Тверская улица, 23',
  establishmentIds: ['noor-bar-tverskaya'],
  organizationId: 'noor-bar-corp',
  theme: 'Dark',
  isVerified: true,
};

// Export different states
export const emptyRdItems: AdviceItem[] = [];
export const singleRdItem: AdviceItem[] = [mockRdItems[0]];
export const multipleRdItems: AdviceItem[] = [mockRdItems[0], mockRdCafe, mockRdBar];