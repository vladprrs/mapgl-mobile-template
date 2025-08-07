'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface QuickAction {
  id: string;
  icon?: React.ReactNode;
  label?: string;
  sublabel?: string;
  labelColor?: string;
  sublabelColor?: string;
  onClick?: () => void;
}

interface QuickAccessPanelProps {
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'bookmark',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'home',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: '45 мин',
    labelColor: '#f5373c', // Red for heavy traffic
  },
  {
    id: 'work',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: '45 мин',
    labelColor: '#efa701', // Yellow for moderate traffic
  },
  {
    id: 'location',
    label: 'Немировича-Данченко, 45',
    sublabel: '50 мин',
    sublabelColor: '#1ba136', // Green for light traffic
  },
];

export function QuickAccessPanel({
  actions = defaultActions,
  onActionClick,
  className = '',
}: QuickAccessPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleActionClick = (action: QuickAction) => {
    action.onClick?.();
    onActionClick?.(action.id);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Fade gradients */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="
          flex flex-row gap-2 
          overflow-x-auto
          scroll-smooth
          px-4 -mx-4
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >

        {/* Buttons */}
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            className="
              flex flex-row items-center gap-2
              px-3.5 py-2.5
              bg-gray-900/[0.06] rounded-lg
              hover:bg-gray-900/[0.08]
              active:bg-gray-900/[0.10]
              transition-colors
              shrink-0
              group
            "
            aria-label={action.label || action.id}
          >
            {/* Icon */}
            {action.icon && (
              <div className="flex items-center justify-center w-6 h-5 text-gray-900">
                {action.icon}
              </div>
            )}

            {/* Label(s) */}
            {(action.label || action.sublabel) && (
              <div className="flex flex-row items-center gap-1.5">
                {action.label && (
                  <span 
                    className="text-[15px] font-medium leading-5 tracking-[-0.3px] whitespace-nowrap"
                    style={{ color: action.labelColor || '#141414' }}
                  >
                    {action.label}
                  </span>
                )}
                {action.sublabel && (
                  <span 
                    className="text-[15px] font-medium leading-5 tracking-[-0.3px] whitespace-nowrap"
                    style={{ color: action.sublabelColor || '#141414' }}
                  >
                    {action.sublabel}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}

        {/* Right padding for scroll */}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}