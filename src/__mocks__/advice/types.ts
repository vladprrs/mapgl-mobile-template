export type AdviceItemType = 'meta_item' | 'meta_item_ad' | 'interesting' | 'cover' | 'rd';

export interface BaseAdviceItem {
  id: string;
  type: AdviceItemType;
}

export interface MetaItemData extends BaseAdviceItem {
  type: 'meta_item';
  category: string;
  count: number;
  image?: string;
  backgroundColor?: string;
}

export interface MetaItemAdData extends BaseAdviceItem {
  type: 'meta_item_ad';
  category: string;
  companyName: string;
  subtitle: string;
  image?: string;
  backgroundColor?: string;
  gradientColors?: [string, string];
}

export interface InterestingData extends BaseAdviceItem {
  type: 'interesting';
  title: string;
  subtitle: string;
  images?: string[];
}

export interface CoverData extends BaseAdviceItem {
  type: 'cover';
  title: string;
  subtitle: string;
  images?: string[];
  isGoodAdvisor?: boolean;
  isHorizontal?: boolean;
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
}

export type AdviceItem = MetaItemData | MetaItemAdData | InterestingData | CoverData | RDData;