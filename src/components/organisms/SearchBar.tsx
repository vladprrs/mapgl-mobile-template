'use client';

import React from 'react';
import { SearchInput } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { Icon, ICONS } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import { ScreenType } from '@/components/templates/types';

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

  // Get current screen from Zustand store for dynamic behavior
  const currentScreen = useStore((state) => state.ui.currentScreen);
  
  const isResults = variant === 'results';
  const showClearButton = false; // Never show clear button inside search input (Figma designs)
  const showSaluteButton = true; // Always show salute button inside search input
  
  // Dynamic icon logic: burger on dashboard, X on suggestions/results
  const isSearchActive = currentScreen === ScreenType.SEARCH_SUGGESTIONS || 
                         currentScreen === ScreenType.SEARCH_RESULTS;
  const actionIcon = isSearchActive ? ICONS.CLOSE : ICONS.MENU;
  const actionHandler = isSearchActive ? onClear : onMenuClick;
  const actionLabel = isSearchActive ? 'Очистить поиск' : 'Меню';
  
  return (
    <div className={`flex flex-row items-start gap-3 px-4 pb-2 ${className}`}>
      {/* Search Input with Salute Button Inside */}
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
            showSaluteButton={showSaluteButton}
            onVoiceClick={onVoiceClick}
            variant={isResults ? 'filled' : 'default'}
            className="h-10"
            style={{
              backgroundColor: isResults ? tokens.colors.background.primary : tokens.colors.background.overlay,
            }}
          />
        </form>
      </div>

      {/* Dynamic Action Button (Burger/Cross) with Proper Background */}
      <Button
        variant="icon"
        onClick={actionHandler}
        className="w-10 h-10"
        style={{ 
          backgroundColor: 'rgba(20, 20, 20, 0.06)',
        }}
        aria-label={actionLabel}
      >
        <Icon name={actionIcon} size={24} color={tokens.colors.text.primary} />
      </Button>
    </div>
  );
}