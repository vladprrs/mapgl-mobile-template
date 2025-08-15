'use client';

import React, { useState } from 'react';
import { tokens } from '@/lib/ui/tokens';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * ChatInput Molecule
 * 
 * Chat input component with keyboard-aware positioning and backdrop blur
 * Based on Figma design node-id 357-246695
 * 
 * Features:
 * - Backdrop blur with rgba(236,234,234,0.65) background
 * - White input field with placeholder text
 * - Send button with rgba(20,20,20,0.06) background
 * - Fixed positioning that stays above keyboard
 * - Safe area inset support for iOS
 */
export function ChatInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Написать ИИ-помощнику"
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0"
      style={{ 
        zIndex: 2147483646, // Slightly less than CartNavbar (2147483647)
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 'env(safe-area-inset-bottom)', // iOS safe area
      }}
    >
      {/* Backdrop blur container */}
      <div 
        className="backdrop-blur-[20px] backdrop-filter w-full"
        style={{
          backgroundColor: 'rgba(236, 234, 234, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', // Safari support
        }}
      >
        {/* Message input area */}
        <div 
          className="flex items-end gap-2 px-3 py-2 w-full"
        >
          {/* Text input area */}
          <div className="flex-1 flex flex-col">
            <div 
              className="flex items-center overflow-hidden rounded-lg px-4 py-2.5 pr-2"
              style={{
                backgroundColor: tokens.colors.background.primary,
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                placeholder={placeholder}
                className="flex-1 outline-none border-none bg-transparent text-left"
                style={{
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '-0.3px',
                  fontFamily: 'SB Sans Text, sans-serif',
                  color: message ? tokens.colors.text.primary : '#898989',
                }}
              />
              
              {/* Voice input icon placeholder */}
              <div 
                className="w-6 h-5 ml-2 rounded-md flex items-center justify-center"
                style={{
                  color: tokens.colors.text.secondary,
                }}
              >
                {/* Voice input icon would go here */}
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  style={{ color: tokens.colors.text.secondary }}
                >
                  <path 
                    d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v5M8 23h8" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="flex items-center justify-center rounded-lg px-3.5 py-2.5"
            style={{
              backgroundColor: 'rgba(20, 20, 20, 0.06)',
              opacity: disabled || !message.trim() ? 0.5 : 1,
            }}
          >
            {/* Send icon */}
            <div className="w-6 h-5 flex items-center justify-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{ color: tokens.colors.text.primary }}
              >
                <path 
                  d="m22 2-20 10 7 3 3 7 10-20z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Home indicator for iOS */}
        <div className="flex justify-center pb-2">
          <div 
            className="h-1 rounded-full"
            style={{
              width: '146px',
              backgroundColor: '#000000',
            }}
          />
        </div>
      </div>
    </div>
  );
}