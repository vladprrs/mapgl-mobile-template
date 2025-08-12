import React from 'react';
import { ADSection as ADSectionType } from '../SearchResultCard.types';

interface ADSectionProps {
  data: ADSectionType;
  onButtonClick?: () => void;
}

export const ADSection: React.FC<ADSectionProps> = ({ data, onButtonClick }) => {
  return (
    <div className="bg-white border-t border-[rgba(137,137,137,0.3)] overflow-hidden pb-1.5 pl-4 pr-0">
      <div className="flex gap-3 pr-4 pt-2">
        <div className="flex-1 flex flex-col">
          {/* Promotional text */}
          <div 
            className="text-[#141414] pb-1 pt-0.5"
            style={{ 
              fontSize: '14px',
              letterSpacing: '-0.28px',
              lineHeight: '18px'
            }}
          >
            {data.promotionalText}
          </div>
          
          {/* FAS Disclaimer */}
          {data.disclaimer && (
            <div className="pb-[3px] pt-px">
              <div 
                className="text-[#B8B8B8] overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ 
                  fontSize: '11px',
                  letterSpacing: '-0.176px',
                  lineHeight: '14px',
                  height: '14px'
                }}
              >
                {data.disclaimer}
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          {data.buttonLabel && (
            <div className="py-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick?.();
                }}
                className="relative rounded-lg cursor-pointer"
                style={{ 
                  padding: '10px 14px'
                }}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span 
                    className="font-semibold text-center whitespace-nowrap"
                    style={{ 
                      fontSize: '15px',
                      letterSpacing: '-0.3px',
                      lineHeight: '20px',
                      color: '#5A5A5A'
                    }}
                  >
                    {data.buttonLabel}
                  </span>
                </div>
                
                {/* Button color overlay if specified */}
                {data.buttonColor && (
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: data.buttonColor,
                      opacity: 0.1
                    }}
                  />
                )}
                
                {/* Button border */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-lg"
                  style={{ 
                    border: '2px solid rgba(20, 20, 20, 0.06)'
                  }}
                />
              </button>
            </div>
          )}
        </div>
        
        {/* Logo on the right side */}
        {data.logo && (
          <div className="flex items-start pt-1">
            <div className="w-10 h-10 rounded-full overflow-hidden">
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
          </div>
        )}
      </div>
      
      {/* Top border line */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          boxShadow: '0px 0.5px 0px 0px inset rgba(137, 137, 137, 0.3)'
        }}
      />
    </div>
  );
};