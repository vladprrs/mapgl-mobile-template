import React from 'react';
import { NonRDFeatures } from '@/components/organisms/SearchResultCard.types';

interface ZMKSectionProps {
  deliveryButton?: NonRDFeatures['deliveryButton'];
  onButtonClick?: () => void;
}

export const ZMKSection: React.FC<ZMKSectionProps> = ({ deliveryButton, onButtonClick }) => {
  if (!deliveryButton) return null;

  return (
    <div className="overflow-hidden pb-1.5 pl-4 pr-0">
      <div className="pr-4">
        {/* Disclaimer */}
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
            Реклама
          </div>
        </div>
        
        {/* Delivery Button */}
        <div className="py-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick?.();
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg cursor-pointer"
            style={{ 
              backgroundColor: 'rgba(20, 20, 20, 0.06)',
              padding: '10px 14px'
            }}
          >
            {deliveryButton.icon && (
              <div className="flex items-center justify-end w-[22px] h-5">
                <div className="w-6 h-6 rounded-md overflow-hidden">
                  <img
                    src={deliveryButton.icon}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-md"
                    style={{ 
                      border: '0.5px solid rgba(137, 137, 137, 0.3)'
                    }}
                  />
                </div>
              </div>
            )}
            <span 
              className="font-semibold text-center whitespace-nowrap"
              style={{ 
                fontSize: '15px',
                letterSpacing: '-0.3px',
                lineHeight: '20px',
                color: '#5A5A5A'
              }}
            >
              {deliveryButton.label}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};