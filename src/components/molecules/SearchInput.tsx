'use client';

import React, { forwardRef } from 'react';
import { Input } from '@/components/atoms';
import { Icon, ICONS } from '@/components/icons';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
  variant?: 'default' | 'filled';
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ 
    onClear,
    showClearButton = false,
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
            color="#898989"
          />
        }
        rightIcon={
          showClearButton && hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#898989" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
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