import type { AdviceItem } from '@/components/dashboard/advice/types';

/**
 * Mock Interesting components for feature promotion cards
 * These are cards that promote specific app features or content collections
 */

export const mockInteresting: AdviceItem[] = [
  {
    type: 'interesting',
    id: 'guide-city',
    title: 'Гид по городу',
    description: '37 подборок',
    imageUrl: '/assets/advice/b84cad0c5a3abfaa17c4ee4fbc61536ad9c33781.png',
    featureId: 'city-guide',
    theme: 'Light',
  },
];

export const mockInterestingTourist: AdviceItem = {
  type: 'interesting',
  id: 'tourist-layer',
  title: 'Туристический слой',
  description: 'Достопримечательности города',
  imageUrl: '/assets/advice/tourist-layer.png',
  featureId: 'tourist-layer',
  theme: 'Light',
};

export const mockInterestingDark: AdviceItem = {
  type: 'interesting',
  id: 'night-mode',
  title: 'Ночной режим',
  description: 'Работает до утра',
  imageUrl: '/assets/advice/night-mode.png',
  featureId: 'night-mode',
  theme: 'Dark',
};

// Export different states
export const emptyInteresting: AdviceItem[] = [];
export const singleInteresting: AdviceItem[] = [mockInteresting[0]];
export const multipleInteresting: AdviceItem[] = [
  mockInteresting[0],
  mockInterestingTourist,
  mockInterestingDark,
];