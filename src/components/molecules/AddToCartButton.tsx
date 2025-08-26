'use client';

import React from 'react';
import Image from 'next/image';

type ButtonState = 'default' | 'discount' | 'added';

interface AddToCartButtonProps {
  price: number;
  oldPrice?: number;
  quantity?: number;
  state: ButtonState;
  onAdd: () => void;
  onRemove?: () => void;
}

export function AddToCartButton({ 
  price,
  oldPrice,
  quantity = 0,
  state,
  onAdd,
  onRemove
}: AddToCartButtonProps) {
  
  // Format price helper
  const formatPrice = (priceValue: number) => `${priceValue} ₽`;
  
  // For 'added' state, show minus and plus buttons with quantity (Figma node 474-80383)
  if (state === 'added' && quantity > 0) {
    return (
      <div 
        className="flex flex-row gap-1.5 items-center justify-center px-3 py-1.5 w-full transition-all active:scale-95"
        style={{
          backgroundColor: '#1db93c',
          borderRadius: '10px',
          height: '32px',
          border: 'none',
        }}
      >
        {/* Minus button */}
        <button 
          onClick={onRemove} 
          className="size-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            src="/assets/figma/buttons/28f5d1fd4a08bd87957a7e9d0ac33e4141c2c0fd.svg"
            alt="Remove"
            width={24}
            height={24}
            className="block"
          />
        </button>
        
        {/* Quantity and price */}
        <div className="flex flex-row items-center gap-1.5 flex-1 justify-center">
          <span 
            className="text-white text-[16px] whitespace-nowrap"
            style={{
              fontFamily: 'SB Sans Text, sans-serif',
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: '-0.24px',
            }}
          >
            {quantity > 1 && `${quantity}× `}{formatPrice(price)}
          </span>
        </div>
        
        {/* Plus button */}
        <button 
          onClick={onAdd} 
          className="size-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        >
          <Image
            src="/assets/figma/buttons/f87b9323274bfae730634fda057ef34d35ba7501.svg"
            alt="Add"
            width={24}
            height={24}
            className="block"
          />
        </button>
      </div>
    );
  }

  // Default and discount states (Figma nodes: 474-80391 default, 462-80511 discount)
  return (
    <button 
      onClick={onAdd}
      className="flex flex-row gap-1.5 items-center justify-center pl-4 pr-3 py-1.5 w-full border-none cursor-pointer transition-all active:scale-95"
      style={{
        backgroundColor: 'rgba(20, 20, 20, 0.06)',
        borderRadius: '10px',
        height: '32px',
      }}
    >
      {/* Price display logic - HORIZONTAL layout */}
      <div className="flex flex-row items-center gap-1.5 flex-1">
        {oldPrice && state === 'discount' ? (
          // Correct horizontal layout for discount state (Figma node 462-80511)
          <div className="flex flex-row items-center gap-1.5">
            {/* Strikethrough old price */}
            <span 
              className="text-[#898989] line-through text-[16px] whitespace-nowrap"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 500,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
              }}
            >
              {formatPrice(oldPrice)}
            </span>
            {/* Current price */}
            <span 
              className="text-[#141414] text-[16px] whitespace-nowrap"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 500,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
              }}
            >
              {formatPrice(price)}
            </span>
          </div>
        ) : (
          /* Default state - just current price */
          <span 
            className="text-[#141414] text-[16px] whitespace-nowrap"
            style={{
              fontFamily: 'SB Sans Text, sans-serif',
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: '-0.24px',
            }}
          >
            {formatPrice(price)}
          </span>
        )}
      </div>
      
      {/* Plus icon - #1BA136 green */}
      <div className="w-6 h-6 flex-shrink-0">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M11 13V20H13V13H20V11H13V4H11V11H4V13H11Z" 
            fill="#1BA136"
          />
        </svg>
      </div>
    </button>
  );
}