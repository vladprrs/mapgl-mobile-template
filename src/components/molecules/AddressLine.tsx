import React from 'react';

interface AddressLineProps {
  address: string;
}

export const AddressLine: React.FC<AddressLineProps> = ({ address }) => {
  return (
    <div className="flex items-start gap-1">
      <div 
        className="flex-1 text-[#141414]"
        style={{ 
          fontSize: '14px',
          letterSpacing: '-0.28px',
          lineHeight: '18px'
        }}
      >
        {address}
      </div>
    </div>
  );
};