export type CardVariant = 'RD' | 'non-RD';

export type WorkingHoursStatus = 'open' | 'closed' | 'closing-soon' | 'opening-soon';

export interface Friend {
  id: string;
  avatar: string;
  name?: string;
}

export interface WorkingHours {
  status: WorkingHoursStatus;
  text: string;
  color?: string;
}

export interface Organization {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  address: string;
  distance?: string;
  distanceTime?: string;
  workingHours?: WorkingHours;
  photos?: string[];
  logo?: string;
  friends?: Friend[];
  isAdvertiser?: boolean;
}

export interface GalleryData {
  images: string[];
  logo?: string;
  size?: 'large' | 'small';
}

export interface ADSection {
  promotionalText: string;
  disclaimer?: string;
  buttonLabel?: string;
  buttonColor?: string;
  logo?: string;
}

export interface RDFeatures {
  gallery?: GalleryData;
  adSection?: ADSection;
}

export interface ServiceOptions {
  delivery?: boolean;
  booking?: boolean;
  takeaway?: boolean;
}

export interface AdditionalInfo {
  type?: 'parking' | 'building' | 'eat';
  text: string;
}

export interface NonRDFeatures {
  services?: ServiceOptions;
  additionalInfo?: AdditionalInfo;
  deliveryButton?: {
    label: string;
    icon?: string;
  };
}

export interface SearchResultCardProps {
  variant: CardVariant;
  organization: Organization;
  features?: RDFeatures | NonRDFeatures;
  onClick?: () => void;
  onRouteClick?: () => void;
  onServiceClick?: (service: string) => void;
  onButtonClick?: () => void;
  className?: string;
}