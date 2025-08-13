// Advice Card Types
export interface CoverProps {
  title: string;
  subtitle: string;
  images?: string[];
  isGoodAdvisor?: boolean;
  isHorizontal?: boolean;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface InterestingProps {
  title: string;
  subtitle: string;
  images?: string[];
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface MetaItemProps {
  category: string;
  count: number;
  image?: string;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface MetaItemAdProps {
  category: string;
  companyName: string;
  subtitle: string;
  image?: string;
  backgroundColor?: string;
  gradientColors?: [string, string];
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface RDProps {
  advertiserName: string;
  subtitle?: string;
  rating?: number;
  distance?: string;
  address?: string;
  images?: string[];
  isVerified?: boolean;
  onClick?: () => void;
  className?: string;
  theme?: 'light' | 'dark';
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