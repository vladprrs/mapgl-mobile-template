'use client';

import React from 'react';
import { SearchInput } from '@/components/molecules';
import { Button } from '@/components/atoms';
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
  value,
  className = '',
  noTopRadius = false,
  variant = 'dashboard',
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(value || '');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  // Determine if this is the results variant (different background)
  const isResults = variant === 'results';
  
  return (
    <div 
      className={`${noTopRadius ? '' : 'rounded-t-2xl'} ${className}`}
      style={{
        backgroundColor: isResults ? 'transparent' : 'white',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        margin: 0,
        padding: 0,
      }}>
      {/* Drag Handle - exact dimensions from Figma */}
      <div className="flex justify-center py-1.5" style={{ backgroundColor: isResults ? '#F1F1F1' : 'transparent' }}>
        <div 
          className="w-9 h-1 rounded-full"
          style={{ backgroundColor: COLORS.DRAG_HANDLE }}
        />
      </div>
      
      {/* Search Bar Container */}
      <div className="flex flex-row items-start gap-3 px-4 pb-2" style={{ backgroundColor: isResults ? '#F1F1F1' : 'transparent' }}>
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit}>
            <SearchInput
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              onClear={variant === 'suggest' || variant === 'results' ? onClear : undefined}
              showClearButton={variant === 'suggest' || variant === 'results'}
              variant={isResults ? 'filled' : 'default'}
              className="h-10"
              style={{
                backgroundColor: isResults ? 'white' : 'rgba(20, 20, 20, 0.06)',
              }}
            />
          </form>
        </div>

        {/* Voice Assistant Button */}
        <Button
          variant="icon"
          onClick={onVoiceClick}
          className="w-10 h-10 p-0"
          aria-label="Голосовой помощник"
        >
          <Image
            src={IMAGES.SALUT_ASSISTANT}
            alt="Salut"
            width={40}
            height={40}
          />
        </Button>

        {/* Menu/Clear Button */}
        {variant === 'dashboard' && (
          <Button
            variant="icon"
            onClick={onMenuClick}
            className="w-10 h-10"
            aria-label="Меню"
          >
            <Icon name={ICONS.MENU} size={24} color={COLORS.TEXT_PRIMARY} />
          </Button>
        )}
        
        {(variant === 'suggest' || variant === 'results') && (
          <Button
            variant="icon"
            onClick={onClear}
            className="w-10 h-10"
            aria-label="Очистить поиск"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke={COLORS.TEXT_PRIMARY} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}