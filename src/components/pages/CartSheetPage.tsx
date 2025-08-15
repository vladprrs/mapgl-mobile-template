'use client';

import React, { useState } from 'react';
import { CheckoutItemCard } from '@/components/organisms';
import useStore from '@/stores';
import { tokens } from '@/lib/ui/tokens';

interface CartSheetPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSheetPage({ isOpen, onClose }: CartSheetPageProps) {
  const cartItems = useStore((state) => state.cart.cart.items);
  const updateQuantity = useStore((state) => state.cart.updateQuantity);
  const cartTotal = useStore((state) => state.cart.cart.total);
  
  const [selectedTimeOption, setSelectedTimeOption] = useState<'express' | 'click'>('express');
  const [promoCode, setPromoCode] = useState('');
  const [bonusEnabled, setBonusEnabled] = useState(false);

  // Convert Map to array of cart items
  const cartProducts = Array.from(cartItems.values());
  
  console.log('CartSheetPage - Cart items:', cartItems);
  console.log('CartSheetPage - Cart products:', cartProducts);

  const handleQuantityChange = (id: string, quantity: number) => {
    console.log('CartSheetPage - Updating quantity:', { id, quantity });
    updateQuantity(id, quantity);
  };

  if (!isOpen) return null;

  // Empty state
  if (cartProducts.length === 0) {
    return (
      <div className="bg-white rounded-t-[16px] h-full flex flex-col" style={{ paddingTop: '6px' }}>
        {/* Header with blur backdrop - NO drag handle */}
        <div 
          className="absolute top-0 left-0 right-0 z-10 pb-2 pt-4"
          style={{
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderTopLeftRadius: tokens.borders.radius.lg,
            borderTopRightRadius: tokens.borders.radius.lg
          }}
        >
          {/* Header title and close button - starts directly */}
          <div className="flex items-center px-4">
            <div className="flex-1 text-center">
              <h2 
                className="text-[16px]"
                style={{
                  fontFamily: 'SB Sans Text, sans-serif',
                  fontWeight: 600,
                  color: tokens.colors.text.primary,
                  lineHeight: '20px'
                }}
              >
                Корзина
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2.5 rounded-lg"
              style={{ backgroundColor: 'rgba(20,20,20,0.06)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path 
                  d="M12 4L4 12M4 4L12 12" 
                  stroke="#141414" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex items-center justify-center">
          <p 
            className="text-[16px]"
            style={{
              fontFamily: 'SB Sans Text, sans-serif',
              color: tokens.colors.text.secondary
            }}
          >
            Корзина пуста
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-[16px] pb-[116px] h-full flex flex-col" style={{ paddingTop: '6px' }}>
      {/* Header with blur backdrop - NO drag handle */}
      <div 
        className="absolute top-0 left-0 right-0 z-10 pb-2 pt-4"
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderTopLeftRadius: tokens.borders.radius.lg,
          borderTopRightRadius: tokens.borders.radius.lg
        }}
      >
        {/* Header title and close button - starts directly */}
        <div className="flex items-center px-4">
          <div className="flex-1 text-center">
            <h2 
              className="text-[16px]"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 600,
                color: tokens.colors.text.primary,
                lineHeight: '20px'
              }}
            >
              Корзина
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-lg"
            style={{ backgroundColor: 'rgba(20,20,20,0.06)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M12 4L4 12M4 4L12 12" 
                stroke="#141414" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Items list - padding-top to clear fixed header */}
        <div className="flex flex-col gap-3 px-4 pt-20">
          {cartProducts.map((item) => (
            <CheckoutItemCard
              key={item.productId}
              id={item.productId}
              image={item.image}
              title={item.title}
              weight={item.weight}
              quantity={item.quantity}
              price={item.price}
              oldPrice={item.oldPrice}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        {/* Delivery section */}
        <div className="mt-5 px-4">
          <div 
            className="rounded-xl p-0"
            style={{ backgroundColor: tokens.colors.background.secondary }}
          >
            <h3 
              className="text-[16px] px-4 pt-[17px] pb-[11px]"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 600,
                color: tokens.colors.text.primary,
                lineHeight: '20px'
              }}
            >
              Способ получения
            </h3>
            
            <div className="flex gap-3 px-4 pb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 mt-[19px] flex-shrink-0">
                <path d="M3 7h18l-1.5 10H5L3 7z" stroke="#141414" strokeWidth="2" fill="none"/>
                <path d="M3 7L2 3H1" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1" stroke="#141414" strokeWidth="2"/>
                <circle cx="20" cy="20" r="1" stroke="#141414" strokeWidth="2"/>
              </svg>
              <div className="flex-1">
                <p 
                  className="text-[16px] mb-1"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 400,
                    color: tokens.colors.text.primary,
                    lineHeight: '20px'
                  }}
                >
                  Доставка курьером, бесплатно
                </p>
                <p 
                  className="text-[14px]"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 400,
                    color: tokens.colors.text.secondary,
                    lineHeight: '18px'
                  }}
                >
                  ул Ленина, 1, кв. 10
                </p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 mt-[9px] flex-shrink-0">
                <path d="M12 20h9" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Time options */}
          <div 
            className="rounded-xl mt-3"
            style={{ backgroundColor: tokens.colors.background.secondary }}
          >
            <h3 
              className="text-[16px] px-4 pt-[17px] pb-[11px]"
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 600,
                color: tokens.colors.text.primary,
                lineHeight: '20px'
              }}
            >
              Время доставки
            </h3>
            <div className="flex gap-2 px-4 pb-4">
              <button 
                onClick={() => setSelectedTimeOption('express')}
                className="px-[9px] py-2.5 rounded-lg"
                style={{ 
                  backgroundColor: selectedTimeOption === 'express' ? 'rgba(20,20,20,0.12)' : 'rgba(20,20,20,0.06)'
                }}
              >
                <span 
                  className="text-[15px]"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 500,
                    color: tokens.colors.text.primary,
                    lineHeight: '19px'
                  }}
                >
                  Экспресс
                </span>
              </button>
              <button 
                onClick={() => setSelectedTimeOption('click')}
                className="px-[9px] py-2.5 rounded-lg"
                style={{ 
                  backgroundColor: selectedTimeOption === 'click' ? 'rgba(20,20,20,0.12)' : 'rgba(20,20,20,0.06)'
                }}
              >
                <span 
                  className="text-[15px]"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 500,
                    color: tokens.colors.text.primary,
                    lineHeight: '19px'
                  }}
                >
                  По клику
                </span>
              </button>
            </div>
          </div>

          {/* Promo code section */}
          <div 
            className="rounded-xl mt-3"
            style={{ backgroundColor: tokens.colors.background.secondary }}
          >
            <div className="px-4 py-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Промокод"
                className="w-full bg-white rounded-lg px-3 py-2.5 border-none outline-none"
                style={{
                  fontFamily: 'SB Sans Text, sans-serif',
                  fontSize: '16px',
                  color: tokens.colors.text.primary
                }}
              />
            </div>
          </div>

          {/* Bonus toggle section */}
          <div 
            className="rounded-xl mt-3"
            style={{ backgroundColor: tokens.colors.background.secondary }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/figma/f87b9323274bfae730634fda057ef34d35ba7501.svg" 
                  alt="SberSpasibo"
                  className="w-6 h-6"
                />
                <span 
                  className="text-[16px]"
                  style={{
                    fontFamily: 'SB Sans Text, sans-serif',
                    fontWeight: 400,
                    color: tokens.colors.text.primary,
                    lineHeight: '20px'
                  }}
                >
                  СберСпасибо
                </span>
              </div>
              <button 
                onClick={() => setBonusEnabled(!bonusEnabled)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                style={{ 
                  backgroundColor: bonusEnabled ? '#4CAF50' : 'rgba(20,20,20,0.12)' 
                }}
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    bonusEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing for CartNavbar */}
        <div className="h-4" />
      </div>
    </div>
  );
}