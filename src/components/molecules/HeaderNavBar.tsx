import React from 'react';
import { CardVariant } from '@/components/organisms/SearchResultCard.types';

interface HeaderNavBarProps {
  title: string;
  subtitle?: string;
  variant: CardVariant;
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ 
  title, 
  subtitle, 
  variant 
}) => {
  return (
    <div className="flex flex-col">
      <div 
        className="font-semibold text-[#141414] leading-5"
        style={{ 
          fontSize: '16px',
          letterSpacing: '-0.24px'
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div 
          className="text-[#898989] mt-0.5 leading-[18px]"
          style={{ 
            fontSize: '14px',
            letterSpacing: '-0.28px'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};