import type { AdviceItem } from '@/__mocks__/advice/types';

/**
 * Mock Cover components for featured collection cards
 * These are collection covers with background images and gradient overlays
 */

export const mockCovers: AdviceItem[] = [
  {
    type: 'cover',
    id: 'repair-goods',
    title: 'Товары для ремонта',
    subtitle: '13 товаров',
    images: ['/assets/advice/4295bcc0ff3c5fd0b0b5cfe36d50701084688dc5.png'],
    variant: 'default',
  },
];

export const mockCoverBig: AdviceItem = {
  type: 'cover',
  id: 'restaurants-new',
  title: 'Новые рестораны',
  subtitle: '25 ресторанов',
  images: ['/assets/advice/restaurant-cover.png'],
  variant: 'big',
};

export const mockCoverSmall: AdviceItem = {
  type: 'cover',
  id: 'coffee-shops',
  title: 'Кофейни',
  subtitle: '48 кофеен',
  images: ['/assets/advice/coffee-cover.png'],
  variant: 'default',
};

// Export different states
export const emptyCovers: AdviceItem[] = [];
export const singleCover: AdviceItem[] = [mockCovers[0]];
export const multipleCovers: AdviceItem[] = [mockCovers[0], mockCoverBig, mockCoverSmall];