'use client';

import React from 'react';
import { Button } from '@/components/atoms';
import { Icon, ICONS } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';

interface QuickActionProps {
  icon: keyof typeof ICONS;
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export function QuickAction({
  icon,
  label,
  onClick,
  className = '',
  isActive = false,
}: QuickActionProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      isActive={isActive}
      className={`flex items-center gap-2 whitespace-nowrap ${className}`}
      style={{
        backgroundColor: isActive ? tokens.colors.background.overlayDark : tokens.colors.background.overlay,
        border: 'none',
        padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
        height: tokens.spacing[9],
      }}
    >
      <Icon name={ICONS[icon]} size={20} />
      <span className="text-sm font-medium" style={{ color: tokens.colors.text.primary }}>{label}</span>
    </Button>
  );
}