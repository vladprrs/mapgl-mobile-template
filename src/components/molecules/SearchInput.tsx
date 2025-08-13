'use client';

import React, { forwardRef } from 'react';
import { Input } from '@/components/atoms';
import { Icon, ICONS, IMAGES } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import Image from 'next/image';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
  showSaluteButton?: boolean;
  onVoiceClick?: () => void;
  variant?: 'default' | 'filled';
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ 
    onClear,
    showClearButton = false,
    showSaluteButton = false,
    onVoiceClick,
    variant = 'default',
    value,
    className = '',
    style,
    ...props
  }, ref) => {
    const hasValue = value && String(value).length > 0;
    
    return (
      <Input
        ref={ref}
        type="search"
        variant={variant === 'filled' ? 'filled' : 'transparent'}
        leftIcon={
          <Icon 
            name={ICONS.SEARCH} 
            size={20} 
            color={tokens.colors.text.secondary}
          />
        }
        rightIcon={
          (showSaluteButton || (showClearButton && hasValue)) ? (
            <div className="flex items-center gap-1">
              {/* Salute Button */}
              {showSaluteButton && (
                <button
                  type="button"
                  onClick={onVoiceClick}
                  className="p-0 hover:opacity-80 transition-opacity"
                  aria-label="Голосовой помощник"
                >
                  {IMAGES.SALUT_ASSISTANT ? (
                    <Image
                      src={IMAGES.SALUT_ASSISTANT}
                      alt="Salut"
                      width={24}
                      height={24}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-blue-500" />
                  )}
                </button>
              )}
              {/* Clear Button */}
              {showClearButton && hasValue && onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke={tokens.colors.text.secondary} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          ) : undefined
        }
        value={value}
        className={className}
        style={style}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';