import type { AdviceItem } from '@/components/dashboard/advice/types';

/**
 * Mock Cover components for featured collection cards
 * These are collection covers with background images and gradient overlays
 */

export const mockCovers: AdviceItem[] = [
  {
    type: 'cover',
    id: 'repair-goods',
    title: 'Товары для ремонта',
    imageUrl: '/assets/advice/4295bcc0ff3c5fd0b0b5cfe36d50701084688dc5.png',
    collectionId: 'repair-goods',
    itemCount: 13,
    state: 'Default',
  },
];

export const mockCoverBig: AdviceItem = {
  type: 'cover',
  id: 'restaurants-new',
  title: 'Новые рестораны',
  imageUrl: '/assets/advice/restaurant-cover.png',
  collectionId: 'new-restaurants',
  itemCount: 25,
  state: 'Big',
};

export const mockCoverSmall: AdviceItem = {
  type: 'cover',
  id: 'coffee-shops',
  title: 'Кофейни',
  imageUrl: '/assets/advice/coffee-cover.png',
  collectionId: 'coffee-shops',
  itemCount: 48,
  state: 'Default',
};

// Export different states
export const emptyCovers: AdviceItem[] = [];
export const singleCover: AdviceItem[] = [mockCovers[0]];
export const multipleCovers: AdviceItem[] = [mockCovers[0], mockCoverBig, mockCoverSmall];