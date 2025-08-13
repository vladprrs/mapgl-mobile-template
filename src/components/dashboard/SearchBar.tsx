'use client';

import React, { useState } from 'react';
import { Icon, ICONS, IMAGES, COLORS } from '@/components/icons';
import Image from 'next/image';

export type SearchBarVariant = 'dashboard' | 'suggest' | 'results';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  onVoiceClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  value?: string;
  className?: string;
  noTopRadius?: boolean;
  variant?: SearchBarVariant;
}

export function SearchBar({
  placeholder = 'Поиск в Москве',
  onSearch,
  onMenuClick,
  onVoiceClick,
  onFocus,
  onBlur,
  onChange,
  onClear,
  value: controlledValue,
  className = '',
  noTopRadius = false,
  variant = 'dashboard',
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Use controlled value if provided, otherwise use internal state
  const query = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(query);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Determine if this is the results variant (different background)
  const isResults = variant === 'results';
  
  return (
    <div 
      className={`${noTopRadius ? '' : 'rounded-t-2xl'} ${className}`}
      style={{
        backgroundColor: isResults ? 'transparent' : 'white',
        // Absolutely NO borders or visual separations
        border: 'none',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        outline: 'none',
        boxShadow: 'none',
        margin: 0,
        padding: 0,
      }}>
      {/* Search Bar Container - consistent padding */}
      <div className="flex flex-row items-start gap-3 px-4 pb-2" style={{ backgroundColor: isResults ? '#F1F1F1' : 'transparent' }}>
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit}>
            <div
              className={`
                flex flex-row items-center gap-1.5 h-10 px-2
                bg-gray-900/[0.06] rounded-lg
                transition-all duration-200
                ${isFocused ? 'ring-2 ring-gray-900/20' : ''}
              `}
            >
              {/* Search Icon - fixed 24x24 container */}
              <div className="flex items-center justify-center w-6 h-6 shrink-0">
                <Icon 
                  name={ICONS.SEARCH} 
                  size={24} 
                  color={COLORS.TEXT_SECONDARY} 
                />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="
                  flex-1 min-w-0 h-5 bg-transparent
                  text-[15px] leading-5 text-gray-900
                  placeholder:text-gray-500
                  focus:outline-none
                  font-sans tracking-[-0.3px]
                "
                aria-label="Search"
              />

              {/* Voice Assistant Icon */}
              <button
                type="button"
                onClick={onVoiceClick}
                className="flex items-center justify-center w-6 h-6 shrink-0 rounded-md hover:opacity-80 transition-opacity"
                aria-label="Voice search"
              >
                <Image 
                  src={IMAGES.SALUT_ASSISTANT} 
                  alt="Salut Assistant" 
                  width={24} 
                  height={24}
                  className="rounded-md"
                />
              </button>
            </div>
          </form>
        </div>

        {/* Menu/Clear Button */}
        <button
          onClick={() => {
            if (variant === 'suggest' || variant === 'results') {
              // Clear the search and call onClear callback
              if (controlledValue === undefined) {
                setInternalValue('');
              }
              onChange?.('');
              onClear?.();
            } else {
              onMenuClick?.();
            }
          }}
          className="
            flex items-center justify-center
            w-10 h-10 shrink-0
            rounded-lg
            hover:opacity-80 active:opacity-60
            transition-opacity
          "
          style={{ backgroundColor: COLORS.BUTTON_SECONDARY_BG }}
          aria-label={variant === 'suggest' || variant === 'results' ? 'Clear search' : 'Menu'}
        >
          <Icon 
            name={variant === 'suggest' || variant === 'results' ? ICONS.CLOSE : ICONS.MENU} 
            size={24} 
            color={COLORS.TEXT_PRIMARY} 
          />
        </button>
      </div>
    </div>
  );
}