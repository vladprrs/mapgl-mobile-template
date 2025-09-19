'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface AIAssistantSuggestionProps {
  text: string;
  subtext?: string;
  onMainClick: () => void;
  onAssistantClick: () => void;
}

/**
 * AIAssistantSuggestion molecule component - matches Figma design exactly
 * Two click zones: main row click → search results, "Подобрать" button → AI helper
 */
export function AIAssistantSuggestion({
  text,
  subtext,
  onMainClick,
  onAssistantClick
}: AIAssistantSuggestionProps) {
  return (
    <div className="w-full flex items-start justify-start relative">
      <div className="flex-1 box-border flex gap-3 items-start justify-start min-h-px pl-4 pr-0 py-0 relative">
        {/* AI Assistant Icon container */}
        <div className="box-border flex items-start justify-end pb-0 pt-[11px] px-0 relative shrink-0">
          <div className="relative shrink-0 size-6">
            <div className="absolute left-1/2 size-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 size-5 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  alt="AI Assistant"
                  className="block max-w-none w-full h-full"
                  src="/assets/3bf54109c4ca889133ecdfe5283cc2568df7e1f1.svg"
                  width={20}
                  height={20}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content row - main clickable area */}
        <button
          onClick={onMainClick}
          className="flex-1 bg-transparent box-border flex items-start justify-between min-h-px overflow-clip pb-[14px] pl-0 pr-4 pt-3 relative border-b hover:bg-gray-50 active:bg-gray-100 transition-colors"
          style={{ borderColor: tokens.colors.border.DEFAULT }}
          aria-label={`${text}${subtext ? `, ${subtext}` : ''}`}
        >
          {/* Title section */}
          <div className="flex-1 flex items-start justify-start min-h-px relative">
            <div className="flex-1 flex gap-2 items-start justify-start min-h-px relative">
              <div
                className="flex-1 font-medium leading-[0] min-h-px relative text-[16px] text-left tracking-[-0.24px] not-italic"
                style={{ color: tokens.colors.text.primary }}
              >
                <p className="leading-5 text-left">{text}</p>
              </div>
            </div>
          </div>

          {/* Action button - separate click area */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAssistantClick();
            }}
            className="flex gap-[2px] items-start justify-start relative shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Подобрать с помощью AI"
          >
            <div
              className="bg-clip-text font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.24px]"
              style={{
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
                color: tokens.colors.primary.DEFAULT
              }}
            >
              <p className="leading-5 whitespace-pre">Подобрать</p>
            </div>
            <div className="h-5 relative shrink-0 w-6">
              <div
                className="absolute left-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
                style={{ top: 'calc(50% + 1px)' }}
              >
                <div className="absolute left-1/2 size-5 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Arrow icon matching Figma design */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block max-w-none w-full h-full"
                  >
                    <path
                      d="M7 14L12 9.5L7 5"
                      stroke={tokens.colors.primary.DEFAULT}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          {/* Bottom border shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[0px_-0.5px_0px_0px_inset_rgba(137,137,137,0.3)]" />
        </button>
      </div>
    </div>
  );
}