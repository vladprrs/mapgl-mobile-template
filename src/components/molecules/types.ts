// Advice Card Types
export interface CoverProps {
  title: string;
  subtitle: string;
  images?: string[];
  isGoodAdvisor?: boolean;
  variant?: 'default' | 'big';
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export interface InterestingProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  featureId?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export interface MetaItemProps {
  title: string;
  subtitle: string;
  iconUrl?: string;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export interface MetaItemAdProps {
  title: string;
  logoUrl?: string;
  gradientColor?: string;
  gradientMaskUrl?: string;
  searchPhrase?: string;
  advertiserId?: string;
  isSponsored?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

export interface RDProps {
  advertiserName: string;
  subtitle?: string;
  rating?: number;
  distance?: string;
  address?: string;
  images?: string[];
  isVerified?: boolean;
  establishmentIds?: string[];
  organizationId?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'Light' | 'Dark';
}

// Additional helper components for advice cards
export interface AdviceTitle {
  children: React.ReactNode;
  className?: string;
}

export interface AdviceBodyText {
  children: React.ReactNode;
  className?: string;
}

export interface AdviceSubtitle {
  children: React.ReactNode;
  className?: string;
}

export interface AdviceIconCircle {
  backgroundColor: string;
  children: React.ReactNode;
  className?: string;
}

export interface AdviceLogoCircle {
  backgroundColor: string;
  src: string;
  alt: string;
  className?: string;
}