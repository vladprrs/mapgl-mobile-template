import type { AdviceItem } from '@/__mocks__/advice/types';

/**
 * Mock MetaItemAd components for advertisement cards
 * These are sponsored content cards with gradient backgrounds
 */

export const mockMetaItemAds: AdviceItem[] = [
  {
    type: 'meta_item_ad',
    id: 'xiaomi-ad',
    title: 'Xiaomi',
    logoUrl: '/assets/advice/74f7e8baab90184b05499ea80dce96f157e67779.png',
    gradientColor: '#EB6100',
    gradientMaskUrl: '/assets/advice/a81e514928dac622f5cd9e79d6ae0c85e8041eda.svg',
    searchPhrase: 'xiaomi',
    advertiserId: 'xiaomi-corp',
    theme: 'Light',
    isSponsored: true,
  },
];

export const mockMetaItemAdDark: AdviceItem = {
  type: 'meta_item_ad',
  id: 'samsung-ad',
  title: 'Samsung',
  logoUrl: '/assets/advice/samsung-logo.png',
  gradientColor: '#1428A0',
  gradientMaskUrl: '/assets/advice/gradient-mask.svg',
  searchPhrase: 'samsung',
  advertiserId: 'samsung-corp',
  theme: 'Dark',
  isSponsored: true,
};

// Export different states
export const emptyMetaItemAds: AdviceItem[] = [];
export const singleMetaItemAd: AdviceItem[] = [mockMetaItemAds[0]];
export const multipleMetaItemAds: AdviceItem[] = [...mockMetaItemAds, mockMetaItemAdDark];