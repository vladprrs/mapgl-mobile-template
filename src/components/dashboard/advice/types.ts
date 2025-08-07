/**
 * Type definitions for Advice section components
 * Советы - Dashboard advice/recommendation cards
 */

/**
 * Base props shared by all advice components
 */
export interface BaseAdviceProps {
  id: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Meta-Item Component Props
 * Category/rubric search card that leads to filtered search results
 */
export interface MetaItemProps extends BaseAdviceProps {
  title: string;
  subtitle?: string;
  iconUrl?: string;
  categoryId: string;
  searchQuery?: string;
  theme?: 'Light' | 'Dark';
}

/**
 * Meta-Item-Ad Component Props
 * Advertisement search card that leads to sponsored search results
 */
export interface MetaItemAdProps extends BaseAdviceProps {
  title: string;
  logoUrl?: string;
  gradientColor?: string;
  gradientMaskUrl?: string;
  searchPhrase: string;
  advertiserId?: string;
  theme?: 'Light' | 'Dark';
  isSponsored?: boolean;
}

/**
 * Cover Component Props
 * Featured collection cover showcasing compilations
 */
export interface CoverProps extends BaseAdviceProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  collectionId: string;
  itemCount?: number;
  author?: string;
  state?: 'Default' | 'Big';
}

/**
 * Interesting Component Props
 * Feature promotion card for app functions or important information
 */
export interface InterestingProps extends BaseAdviceProps {
  title: string;
  description: string;
  imageUrl: string;
  featureId: string;
  theme?: 'Light' | 'Dark';
  state?: 'Default' | 'Big';
  actionText?: string;
  badge?: string;
}

/**
 * RD (РекламоДатель) Component Props
 * Advertiser card promoting specific establishments
 */
export interface RDProps extends BaseAdviceProps {
  advertiserName: string;
  subtitle?: string;
  images?: string[];
  rating?: string;
  distance?: string;
  address?: string;
  establishmentIds?: string[];
  organizationId?: string;
  theme?: 'Light' | 'Dark';
  isVerified?: boolean;
}

/**
 * Combined type for any advice component
 */
export type AdviceItem = 
  | ({ type: 'meta-item' } & MetaItemProps)
  | ({ type: 'meta-item-ad' } & MetaItemAdProps)
  | ({ type: 'cover' } & CoverProps)
  | ({ type: 'interesting' } & InterestingProps)
  | ({ type: 'rd' } & RDProps);

/**
 * Layout configurations for advice grid
 */
export type AdviceLayoutType = 'single' | 'double' | 'triple' | 'mixed';

/**
 * Advice Section Props
 */
export interface AdviceSectionProps {
  items: AdviceItem[];
  layout?: AdviceLayoutType;
  title?: string;
  className?: string;
  onItemClick?: (item: AdviceItem) => void;
}