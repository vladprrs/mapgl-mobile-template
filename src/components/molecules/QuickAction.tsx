'use client';

import React from 'react';
import { Button } from '@/components/atoms';
import { Icon, ICONS } from '@/components/icons';

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
        backgroundColor: isActive ? 'rgba(20, 20, 20, 0.12)' : 'rgba(20, 20, 20, 0.06)',
        border: 'none',
        padding: '8px 12px',
        height: '36px',
      }}
    >
      <Icon name={ICONS[icon]} size={20} />
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </Button>
  );
}