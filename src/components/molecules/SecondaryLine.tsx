import React from 'react';

interface SecondaryLineProps {
  rating?: number;
  reviewCount?: number;
  distance?: string;
  distanceTime?: string;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <div className="relative w-4 h-4">
    <div 
      className="absolute inset-0"
      style={{ 
        backgroundColor: filled ? '#EFA701' : 'rgba(20, 20, 20, 0.09)'
      }}
    />
  </div>
);

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon key={index} filled={index < fullStars} />
      ))}
    </div>
  );
};

export const SecondaryLine: React.FC<SecondaryLineProps> = ({
  rating,
  reviewCount,
  distance,
  distanceTime
}) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2 flex-1">
        {rating !== undefined && (
          <>
            <div className="flex items-center gap-1">
              <RatingStars rating={rating} />
              <div className="flex items-center gap-1.5">
                <span 
                  className="font-medium text-[#141414]"
                  style={{ 
                    fontSize: '14px',
                    letterSpacing: '-0.28px',
                    lineHeight: '18px'
                  }}
                >
                  {rating.toFixed(1)}
                </span>
                {reviewCount !== undefined && (
                  <span 
                    className="text-[#898989]"
                    style={{ 
                      fontSize: '14px',
                      letterSpacing: '-0.28px',
                      lineHeight: '18px'
                    }}
                  >
                    {reviewCount} оценок
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {(distance || distanceTime) && (
        <div className="flex items-center gap-1">
          {/* Icon placeholder - would use actual icon */}
          <div className="w-4 h-4" />
          <span 
            className="font-medium text-[#898989] whitespace-nowrap"
            style={{ 
              fontSize: '14px',
              letterSpacing: '-0.28px',
              lineHeight: '18px'
            }}
          >
            {distanceTime || distance}
          </span>
        </div>
      )}
    </div>
  );
};