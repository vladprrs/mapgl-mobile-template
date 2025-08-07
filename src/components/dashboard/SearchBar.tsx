'use client';

import React, { useState } from 'react';

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
        <div className="w-10 h-1 bg-gray-400/25 rounded-md pointer-events-none" />
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 19L14.65 14.65"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                className="flex items-center justify-center w-6 h-6 shrink-0 rounded-md hover:bg-gray-900/5 transition-colors"
                aria-label="Voice search"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1V13"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 3V11"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 3V11"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M1 5V9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 5V9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
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
            bg-gray-900/[0.06] rounded-lg
            hover:bg-gray-900/[0.08] active:bg-gray-900/[0.10]
            transition-colors
          "
          aria-label="Menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-900"
          >
            <path
              d="M3 5H17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 10H17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 15H17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}