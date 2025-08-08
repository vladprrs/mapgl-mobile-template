'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';

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
    icon: <Icon name={ICONS.BOOKMARK} color={COLORS.TEXT_PRIMARY} />,
  },
  {
    id: 'home',
    icon: <Icon name={ICONS.HOME} color={COLORS.TEXT_PRIMARY} />,
    label: '45 мин',
    labelColor: COLORS.TRAFFIC_HEAVY,
  },
  {
    id: 'work',
    icon: <Icon name={ICONS.WORK} color={COLORS.TEXT_PRIMARY} />,
    label: '45 мин',
    labelColor: COLORS.TRAFFIC_MODERATE,
  },
  {
    id: 'location',
    label: 'Немировича-Данченко, 45',
    sublabel: '50 мин',
    sublabelColor: COLORS.TRAFFIC_LIGHT,
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
      {/* Fade gradients - extend to edges for visual effect */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container - content starts at 16px from edges */}
      <div
        ref={scrollContainerRef}
        className="
          flex flex-row gap-2 
          overflow-x-auto
          px-4
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          scrollBehavior: 'auto',
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
            {/* Icon - fixed 24x24 container */}
            {action.icon && (
              <div className="flex items-center justify-center w-6 h-6 text-gray-900">
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