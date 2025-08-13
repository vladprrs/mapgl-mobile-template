export type AdviceItemType = 'meta_item' | 'meta_item_ad' | 'interesting' | 'cover' | 'rd';

export interface BaseAdviceItem {
  id: string;
  type: AdviceItemType;
}

export interface MetaItemData extends BaseAdviceItem {
  type: 'meta_item';
  title: string;
  subtitle: string;
  iconUrl?: string;
  categoryId?: string;
  searchQuery?: string;
  theme?: 'Light' | 'Dark';
  backgroundColor?: string;
}

export interface MetaItemAdData extends BaseAdviceItem {
  type: 'meta_item_ad';
  title: string;
  logoUrl?: string;
  gradientColor?: string;
  gradientMaskUrl?: string;
  searchPhrase?: string;
  advertiserId?: string;
  theme?: 'Light' | 'Dark';
  isSponsored?: boolean;
  backgroundColor?: string;
}

export interface InterestingData extends BaseAdviceItem {
  type: 'interesting';
  title: string;
  subtitle: string;
  imageUrl?: string;
  images?: string[];
  featureId?: string;
  theme?: 'Light' | 'Dark';
}

export interface CoverData extends BaseAdviceItem {
  type: 'cover';
  title: string;
  subtitle: string;
  images?: string[];
  isGoodAdvisor?: boolean;
  variant?: 'default' | 'big';
}

export interface RDData extends BaseAdviceItem {
  type: 'rd';
  advertiserName: string;
  subtitle?: string;
  rating?: number;
  distance?: string;
  address?: string;
  images?: string[];
  isVerified?: boolean;
  establishmentIds?: string[];
  organizationId?: string;
  theme?: 'Light' | 'Dark';
}

export type AdviceItem = MetaItemData | MetaItemAdData | InterestingData | CoverData | RDData;