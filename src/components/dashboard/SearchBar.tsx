'use client';

import React, { useState } from 'react';
import { Icon, ICONS, IMAGES, COLORS } from '@/components/icons';
import Image from 'next/image';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  onVoiceClick?: () => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Поиск в Москве',
  onSearch,
  onMenuClick,
  onVoiceClick,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <div className={`bg-white rounded-t-2xl ${className}`}>
      {/* Drag Handle */}
      <div 
        className="flex items-center justify-center w-full pt-1.5 pb-1.5 cursor-grab active:cursor-grabbing"
        data-drag-handle="true"
      >
        <div className="w-10 h-1 rounded-md pointer-events-none" style={{ backgroundColor: COLORS.DRAG_HANDLE }} />
      </div>

      {/* Search Bar Container */}
      <div className="flex flex-row items-start gap-3 px-4 pb-3">
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
              {/* Search Icon */}
              <div className="flex items-center justify-center w-6 h-6 shrink-0">
                <Icon name={ICONS.SEARCH} size={20} color={COLORS.TEXT_SECONDARY} />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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

        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="
            flex items-center justify-center
            w-10 h-10 shrink-0
            rounded-lg
            hover:opacity-80 active:opacity-60
            transition-opacity
          "
          style={{ backgroundColor: COLORS.BUTTON_SECONDARY_BG }}
          aria-label="Menu"
        >
          <Icon name={ICONS.MENU} size={20} color={COLORS.TEXT_PRIMARY} />
        </button>
      </div>
    </div>
  );
}