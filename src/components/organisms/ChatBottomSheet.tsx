'use client';

import React, { useRef, useEffect } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { ChatInput } from '@/components/molecules/ChatInput';
import { AssistantMessage } from '@/components/molecules/AssistantMessage';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';
import { getStoreRecommendationsForQuery, getAssistantResponseText } from '@/__mocks__/chat/storeRecommendations';

interface ChatBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

/**
 * ChatBottomSheet Organism
 * 
 * Full-screen overlay chat interface with AI assistant
 * Based on Figma design node-id 357-246695
 * 
 * Features:
 * - Full height overlay with backdrop blur
 * - Header with back/close buttons and title
 * - Scrollable messages area with placeholder cards
 * - Fixed chat input at bottom
 * - Keyboard-aware positioning
 * - Safe area inset support
 */
export function ChatBottomSheet({ isOpen, onClose, onBack }: ChatBottomSheetProps) {
  const bottomSheetRef = useRef<SheetRef>(null);
  
  // Get chat data from store
  const messages = useStore((state) => state.chat.messages);
  const isTyping = useStore((state) => state.chat.isTyping);
  const sendMessage = useStore((state) => state.chat.sendMessage);
  const addMessage = useStore((state) => state.chat.addMessage);
  
  // Auto-respond with store recommendations when user sends search query
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'user') {
      const userQuery = messages[0].text;
      
      // Simulate AI thinking delay
      setTimeout(() => {
        const responseText = getAssistantResponseText(userQuery);
        const storeRecommendations = getStoreRecommendationsForQuery(userQuery);
        
        addMessage({
          text: responseText,
          sender: 'assistant',
          type: 'store_recommendations',
          stores: storeRecommendations,
        });
      }, 1000);
    }
  }, [messages, addMessage]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleProductClick = (productId: string, storeId: string) => {
    console.log('Product clicked:', { productId, storeId });
    // TODO: Add product to cart or show product details
  };

  const handleOrderClick = (storeId: string) => {
    console.log('Order clicked for store:', storeId);
    // TODO: Navigate to store or open order flow
  };

  const handleClose = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(0);
    }
    setTimeout(onClose, 300);
  };

  const handleBack = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(0);
    }
    setTimeout(onBack, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
        onClick={handleClose}
      />
      
      <Sheet
        ref={bottomSheetRef}
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[0.9]}
        initialSnap={0}
      >
        <Sheet.Container>
          <div className="flex flex-col h-full relative">
            {/* Header with backdrop blur */}
            <div 
              className="backdrop-blur-[20px] backdrop-filter flex flex-col pt-4 pb-2 px-0 rounded-t-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {/* Drag handle */}
              <div className="flex items-center justify-center pb-1.5 pt-0 px-0 w-full h-0">
                <div 
                  className="h-1 rounded-md w-10"
                  style={{
                    backgroundColor: 'rgba(137, 137, 137, 0.25)',
                  }}
                />
              </div>

              {/* Navigation bar */}
              <div className="flex items-start justify-start w-full">
                <div className="flex-1 flex items-start justify-start gap-3 px-4 py-0">
                  {/* Back button */}
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(20, 20, 20, 0.06)',
                    }}
                  >
                    <div className="flex items-start justify-start gap-2 px-2 py-2.5">
                      <div className="flex items-center justify-center w-5 h-5">
                        {/* Back arrow icon */}
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          style={{ color: tokens.colors.text.primary }}
                        >
                          <path 
                            d="m15 18-6-6 6-6" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Title */}
                  <div className="flex-1 flex flex-col items-start justify-center pb-2.5 pt-1.5 px-0">
                    <div className="flex items-start justify-start w-full">
                      <div className="flex-1 flex items-start justify-center pb-0 pt-0.5 px-0">
                        <div 
                          className="text-left whitespace-pre"
                          style={{
                            fontFamily: 'SB Sans Text, sans-serif',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '20px',
                            letterSpacing: '-0.24px',
                            color: tokens.colors.text.primary,
                          }}
                        >
                          ИИ-помощник
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="flex items-center justify-center rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(20, 20, 20, 0.06)',
                    }}
                  >
                    <div className="flex items-start justify-start gap-2 px-2 py-2.5">
                      <div className="flex items-center justify-center w-5 h-5">
                        {/* Close X icon */}
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          style={{ color: tokens.colors.text.primary }}
                        >
                          <path 
                            d="m18 6-12 12M6 6l12 12" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages content area */}
            <div 
              className="flex-1 overflow-y-auto px-4 pt-4"
              style={{
                paddingBottom: '102px', // Space for input area
                backgroundColor: tokens.colors.background.primary,
              }}
            >
              <div className="flex flex-col gap-4 pb-4">
                {messages.length === 0 ? (
                  // Show placeholder messages when chat is empty
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={`placeholder-${index}`} className="flex flex-col gap-2">
                      {/* Message placeholder - blue card */}
                      <div 
                        className="h-[83px] rounded-2xl w-full"
                        style={{
                          backgroundColor: '#C1E4FF',
                        }}
                      />
                    </div>
                  ))
                ) : (
                  // Show real messages
                  messages.map((message) => (
                    <div key={message.id} className="flex flex-col gap-2">
                      {message.sender === 'user' ? (
                        // User message - right aligned
                        <div 
                          className="rounded-2xl p-4 max-w-[80%] ml-auto"
                          style={{
                            backgroundColor: '#007AFF',
                            color: '#FFFFFF',
                          }}
                        >
                          <p 
                            style={{
                              fontFamily: 'SB Sans Text, sans-serif',
                              fontSize: '15px',
                              lineHeight: '20px',
                            }}
                          >
                            {message.text}
                          </p>
                        </div>
                      ) : message.type === 'store_recommendations' && message.stores ? (
                        // Assistant message with store recommendations
                        <AssistantMessage
                          text={message.text}
                          stores={message.stores}
                          onProductClick={handleProductClick}
                          onOrderClick={handleOrderClick}
                        />
                      ) : (
                        // Regular assistant message
                        <div 
                          className="rounded-2xl p-4 max-w-[80%] mr-auto"
                          style={{
                            backgroundColor: '#C1E4FF',
                            color: tokens.colors.text.primary,
                          }}
                        >
                          <p 
                            style={{
                              fontFamily: 'SB Sans Text, sans-serif',
                              fontSize: '15px',
                              lineHeight: '20px',
                            }}
                          >
                            {message.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex flex-col gap-2">
                    <div 
                      className="rounded-2xl p-4 max-w-[80%] mr-auto"
                      style={{
                        backgroundColor: '#C1E4FF',
                        color: tokens.colors.text.primary,
                      }}
                    >
                      <p 
                        style={{
                          fontFamily: 'SB Sans Text, sans-serif',
                          fontSize: '15px',
                          lineHeight: '20px',
                        }}
                      >
                        ИИ печатает...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat input - ChatInput handles its own fixed positioning */}
            <ChatInput
              onSendMessage={handleSendMessage}
              placeholder="Написать ИИ-помощнику"
            />
          </div>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}