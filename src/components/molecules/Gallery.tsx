import React from 'react';
import { GalleryData } from '@/components/organisms/SearchResultCard.types';

interface GalleryProps {
  data: GalleryData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const height = data.size === 'small' ? 88 : 116;
  const hasLogo = data.size !== 'small' && data.logo;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <div className="flex gap-1 h-full overflow-x-auto overflow-y-hidden pl-3">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{ 
              width: `${height}px`,
              height: `${height}px`
            }}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ 
                border: '0.5px solid rgba(137, 137, 137, 0.3)'
              }}
            />
            
            {/* Logo overlay on first image for large galleries */}
            {hasLogo && index === 0 && (
              <div className="absolute bottom-[10px] left-[10px] w-16 h-16 rounded-full bg-white overflow-hidden">
                <img
                  src={data.logo}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{ 
                    border: '0.5px solid rgba(137, 137, 137, 0.3)'
                  }}
                />
              </div>
            )}
          </div>
        ))}
        
        {/* Spacer for scroll padding */}
        <div className="flex-shrink-0 w-6" />
      </div>
    </div>
  );
};