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

// Import mock data structure from centralized location
import { mockQuickActionsData } from '@/__mocks__/dashboard/quickAccess';

interface QuickAccessPanelProps {
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  className?: string;
}

// Generate default actions with icons from mock data
const defaultActions: QuickAction[] = mockQuickActionsData.map(action => {
  // Add appropriate icons based on action id
  const iconMap: Record<string, React.ReactNode> = {
    bookmark: <Icon name={ICONS.BOOKMARK} color={COLORS.TEXT_PRIMARY} />,
    home: <Icon name={ICONS.HOME} color={COLORS.TEXT_PRIMARY} />,
    work: <Icon name={ICONS.WORK} color={COLORS.TEXT_PRIMARY} />,
  };
  
  return {
    ...action,
    icon: iconMap[action.id],
  } as QuickAction;
});

export function QuickAccessPanel({
  actions = defaultActions,
  onActionClick,
  className = '',
}: QuickAccessPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Initialize gradient visibility based on expected initial state
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(actions.length > 3); // Only show if content overflows

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
    <div className={`relative w-full ${className}`} data-testid="quick-access-panel">
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
        {actions.map((action) => {
          // Determine padding based on content (matches Figma exactly)
          const hasIcon = !!action.icon;
          const hasLabel = !!(action.label || action.sublabel);
          const paddingClass = hasIcon && hasLabel 
            ? "px-[9px] py-2.5" // Icon + label: 9px horizontal padding
            : "px-3.5 py-2.5";   // Icon only or label only: 14px horizontal padding
          
          // Gap between icon and label (Figma: 5px)
          const gapClass = hasIcon && hasLabel ? "gap-[5px]" : "";
          
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={`
                flex flex-row items-center
                h-10
                ${paddingClass}
                ${gapClass}
                bg-[rgba(20,20,20,0.06)] rounded-lg
                hover:bg-[rgba(20,20,20,0.08)]
                active:bg-[rgba(20,20,20,0.10)]
                transition-colors
                shrink-0
              `}
              aria-label={action.label || action.id}
            >
              {/* Icon container with special positioning for icon+label buttons */}
              {action.icon && (
                <div className={`
                  flex items-center shrink-0
                  ${hasLabel ? 'justify-end w-[23px] h-5' : 'justify-center w-6 h-6'}
                `}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {action.icon}
                  </div>
                </div>
              )}

              {/* Label(s) - matches Figma text styling exactly */}
              {(action.label || action.sublabel) && (
                <div className="flex flex-row items-center gap-1.5">
                  {action.label && (
                    <span 
                      className="text-[15px] font-medium leading-[20px] tracking-[-0.3px] whitespace-nowrap"
                      style={{ color: action.labelColor || '#141414' }}
                    >
                      {action.label}
                    </span>
                  )}
                  {action.sublabel && (
                    <span 
                      className="text-[15px] font-medium leading-[20px] tracking-[-0.3px] whitespace-nowrap"
                      style={{ color: action.sublabelColor || '#141414' }}
                    >
                      {action.sublabel}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}

        {/* Right padding for scroll */}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}