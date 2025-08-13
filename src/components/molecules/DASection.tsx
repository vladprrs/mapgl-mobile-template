import React from 'react';
import { AdditionalInfo } from '@/components/organisms/SearchResultCard.types';

interface DASectionProps {
  data: AdditionalInfo;
}

export const DASection: React.FC<DASectionProps> = ({ data }) => {
  return (
    <div className="flex items-start gap-1">
      <div 
        className="flex-1 text-[#898989] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ 
          fontSize: '14px',
          letterSpacing: '-0.28px',
          lineHeight: '18px',
          height: '18px'
        }}
      >
        {data.text}
      </div>
    </div>
  );
};