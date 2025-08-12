import type { Story } from '@/components/dashboard/StoriesPanel';

/**
 * Mock Story data for the StoriesPanel component
 * These represent story cards with images and viewed states
 */

export const mockStories: Story[] = [
  {
    id: '1',
    imageUrl: '/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '2',
    imageUrl: '/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '3',
    imageUrl: '/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '4',
    imageUrl: '/assets/stories/5738e1bc9a25d52bf21144f9c160f545681e96d7.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
];

export const mockUnviewedStories: Story[] = mockStories.map(story => ({
  ...story,
  isViewed: false,
}));

export const mockMixedViewStories: Story[] = mockStories.map((story, index) => ({
  ...story,
  isViewed: index % 2 === 0,
}));

export const mockExtendedStories: Story[] = [
  ...mockStories,
  {
    id: '5',
    imageUrl: '/assets/stories/story5.png',
    label: 'Новые кафе',
    isViewed: false,
  },
  {
    id: '6',
    imageUrl: '/assets/stories/story6.png',
    label: 'Лучшие парки',
    isViewed: false,
  },
  {
    id: '7',
    imageUrl: '/assets/stories/story7.png',
    label: 'События недели',
    isViewed: true,
  },
  {
    id: '8',
    imageUrl: '/assets/stories/story8.png',
    label: 'Музеи и галереи',
    isViewed: false,
  },
];

// Export different states for testing
export const emptyStories: Story[] = [];
export const singleStory: Story[] = [mockStories[0]];
export const allViewedStories: Story[] = mockStories;
export const allUnviewedStories: Story[] = mockUnviewedStories;