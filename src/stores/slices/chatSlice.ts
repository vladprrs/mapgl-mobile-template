import type { StateCreator } from 'zustand';
import type { AppStore, ChatSlice, Message } from '../types';

/**
 * Chat Slice - AI Assistant Chat State Management
 * 
 * Manages chat interface state including:
 * - Chat overlay open/close state
 * - Message history with user and assistant messages
 * - Typing indicators
 * - Message sending functionality
 */
export const createChatSlice: StateCreator<AppStore, [], [], ChatSlice> = (set, get) => ({
  // Initial state
  isChatOpen: false,
  messages: [],
  isTyping: false,

  // Actions
  openChat: () => {
    console.log('Opening AI chat');
    set((state) => ({
      chat: {
        ...state.chat,
        isChatOpen: true,
      }
    }));
  },

  closeChat: () => {
    console.log('Closing AI chat');
    set((state) => ({
      chat: {
        ...state.chat,
        isChatOpen: false,
      }
    }));
  },

  sendMessage: (text: string) => {
    const { chat } = get();
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    console.log('Sending message:', text);
    
    set((state) => ({
      chat: {
        ...state.chat,
        messages: [...state.chat.messages, userMessage],
        isTyping: true,
      }
    }));

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        text: `Это ответ на: "${text}"`,
        sender: 'assistant',
        timestamp: new Date(),
      };

      set((state) => ({
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, assistantMessage],
          isTyping: false,
        }
      }));
    }, 1000);
  },

  addMessage: (messageData) => {
    const message: Message = {
      ...messageData,
      id: `${messageData.sender}-${Date.now()}`,
      timestamp: new Date(),
    };

    set((state) => ({
      chat: {
        ...state.chat,
        messages: [...state.chat.messages, message],
      }
    }));
  },

  setTyping: (typing: boolean) => {
    set((state) => ({
      chat: {
        ...state.chat,
        isTyping: typing,
      }
    }));
  },

  clearMessages: () => {
    set((state) => ({
      chat: {
        ...state.chat,
        messages: [],
        isTyping: false,
      }
    }));
  },
});