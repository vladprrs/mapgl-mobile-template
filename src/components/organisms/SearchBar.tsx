'use client';

import React from 'react';
import { SearchInput } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { Icon, ICONS, IMAGES } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
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

  const isResults = variant === 'results';
  const showClearButton = variant === 'suggest' || variant === 'results';
  
  return (
    <div 
      className={`${noTopRadius ? '' : 'rounded-t-2xl'} ${className}`}
      style={{
        backgroundColor: isResults ? tokens.colors.background.secondary : tokens.colors.background.primary,
      }}>
      {/* Drag Handle */}
      <div 
        className="flex justify-center py-1.5"
        style={{ 
          backgroundColor: isResults ? tokens.colors.background.secondary : tokens.colors.transparent 
        }}>
        <div 
          className="w-9 h-1 rounded-full"
          style={{ backgroundColor: tokens.colors.ui.dragHandle }}
        />
      </div>
      
      {/* Search Bar Container */}
      <div 
        className="flex flex-row items-start gap-3 px-4 pb-2"
        style={{ 
          backgroundColor: isResults ? tokens.colors.background.secondary : tokens.colors.transparent 
        }}>
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
              onClear={showClearButton ? onClear : undefined}
              showClearButton={showClearButton}
              variant={isResults ? 'filled' : 'default'}
              className="h-10"
              style={{
                backgroundColor: isResults ? tokens.colors.background.primary : tokens.colors.background.overlay,
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
            <Icon name={ICONS.MENU} size={24} color={tokens.colors.text.primary} />
          </Button>
        )}
        
        {showClearButton && (
          <Button
            variant="icon"
            onClick={onClear}
            className="w-10 h-10"
            aria-label="Очистить поиск"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke={tokens.colors.text.primary} 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}