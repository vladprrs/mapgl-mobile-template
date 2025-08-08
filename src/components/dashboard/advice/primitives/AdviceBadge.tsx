'use client';

import React from 'react';

interface AdviceBadgeProps {
  text: string;
  className?: string;
}

export function AdviceBadge({ text, className = '' }: AdviceBadgeProps) {
  return (
    <span className={`text-[10px] font-semibold text-white bg-red-500 px-2 py-1 rounded-full ${className}`}>
      {text}
    </span>
  );
}


