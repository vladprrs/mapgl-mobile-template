import React from 'react';
import {
  SearchResultCardProps,
  RDFeatures,
  NonRDFeatures
} from './SearchResultCard.types';
import {
  HeaderNavBar,
  SecondaryLine,
  AddressLine,
  WorkTime,
  Friends,
  Gallery,
  ADSection,
  DASection,
  ZMKSection
} from '@/components/molecules';

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  variant,
  organization,
  features,
  onClick,
  onRouteClick,
  onServiceClick,
  onButtonClick,
  className = ''
}) => {
  const isRD = variant === 'RD';
  const rdFeatures = isRD ? features as RDFeatures : undefined;
  const nonRDFeatures = !isRD ? features as NonRDFeatures : undefined;

  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden active:scale-[0.98] transition-transform cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Gallery Section */}
      {isRD && rdFeatures?.gallery && (
        <Gallery data={rdFeatures.gallery} />
      )}
      
      {!isRD && organization.photos && organization.photos.length > 0 && (
        <Gallery data={{ 
          images: organization.photos,
          size: 'small'
        }} />
      )}

      {/* Main Content */}
      <div className="px-4 py-3">
        {/* Friends section for Non-RD (shown at top of content) */}
        {!isRD && organization.friends && organization.friends.length > 0 && (
          <div className="pb-1">
            <Friends friends={organization.friends} />
          </div>
        )}

        {/* Header */}
        <HeaderNavBar
          title={organization.name}
          subtitle={organization.subtitle || organization.category}
          variant={variant}
        />

        {/* Secondary Line with Rating and Distance */}
        <div className="mt-2">
          <SecondaryLine
            rating={organization.rating}
            reviewCount={organization.reviewCount}
            distance={organization.distance}
            distanceTime={organization.distanceTime}
          />
        </div>

        {/* Address */}
        <div className="mt-2">
          <AddressLine address={organization.address} />
        </div>

        {/* Additional Details for Non-RD */}
        {!isRD && nonRDFeatures?.additionalInfo && (
          <div className="mt-0.5">
            <DASection data={nonRDFeatures.additionalInfo} />
          </div>
        )}

        {/* Working Hours */}
        {organization.workingHours && (
          <div className="mt-1.5">
            <WorkTime workingHours={organization.workingHours} />
          </div>
        )}
      </div>

      {/* AD Section for RD */}
      {isRD && rdFeatures?.adSection && (
        <ADSection 
          data={rdFeatures.adSection}
          onButtonClick={onButtonClick}
        />
      )}

      {/* ZMK Section for Non-RD */}
      {!isRD && nonRDFeatures?.deliveryButton && (
        <ZMKSection 
          deliveryButton={nonRDFeatures.deliveryButton}
          onButtonClick={() => onServiceClick?.('delivery')}
        />
      )}
    </div>
  );
};

// Memoized version for performance
export const SearchResultCardMemo = React.memo(SearchResultCard);