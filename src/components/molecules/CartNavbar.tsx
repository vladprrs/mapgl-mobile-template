'use client';

import React from 'react';
import Image from 'next/image';

interface CartNavbarProps {
  totalAmount: number;
  itemCount: number;
  isVisible: boolean;
  isInCartView?: boolean;
  onCheckout: () => void;
}

export function CartNavbar({ totalAmount, isVisible, isInCartView = false, onCheckout }: CartNavbarProps) {
  if (!isVisible) {
    return null;
  }

  return (
    // Use inline styles to ensure highest z-index
    <div 
      className="fixed bottom-0 left-0 right-0 animate-slide-up"
      style={{ 
        zIndex: 2147483647, // Maximum z-index value
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div 
        className="pb-8 pt-3 px-4"
        style={{
          backgroundColor: 'rgba(242, 242, 242, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', // Safari support
        }}
      >
        <button
          onClick={onCheckout}
          className="w-full flex flex-row gap-1.5 items-center justify-center py-[14px] px-4 rounded-[10px] hover:brightness-110 active:scale-[0.98] transition-all duration-150"
          style={{
            backgroundColor: '#1db93c',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(29, 185, 60, 0.3)',
          }}
        >
          <Image 
            src="/assets/figma/cart/2b690b80f394c0edb91d671e9e05e2831f2e2d1b.svg"
            alt="Cart"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="font-semibold text-white text-[16px] tracking-[-0.24px]">
            {isInCartView ? `Оформить заказ за ${totalAmount} ₽` : `Заказать за ${totalAmount} ₽`}
          </span>
        </button>
      </div>
    </div>
  );
}