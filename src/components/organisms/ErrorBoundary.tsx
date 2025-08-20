'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { tokens } from '@/lib/ui/tokens';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  feature?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.feature || 'component'}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          style={{
            padding: tokens.spacing[6],
            backgroundColor: tokens.colors.background.secondary,
            borderRadius: tokens.borders.radius.md,
            margin: tokens.spacing[4],
            textAlign: 'center' as const
          }}
        >
          <h2 
            style={{
              fontSize: tokens.typography.fontSize.lg,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing[2],
              fontFamily: tokens.typography.fontFamily.DEFAULT
            }}
          >
            Что-то пошло не так
          </h2>
          <p 
            style={{
              fontSize: tokens.typography.fontSize.base,
              color: tokens.colors.text.secondary,
              fontFamily: tokens.typography.fontFamily.DEFAULT
            }}
          >
            {this.props.feature 
              ? `Произошла ошибка в ${this.props.feature}. Попробуйте обновить страницу.`
              : 'Произошла ошибка. Попробуйте обновить страницу.'}
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details 
              style={{
                marginTop: tokens.spacing[4],
                textAlign: 'left' as const,
                padding: tokens.spacing[3],
                backgroundColor: tokens.colors.background.primary,
                borderRadius: tokens.borders.radius.sm,
                fontSize: tokens.typography.fontSize.sm,
                fontFamily: 'monospace'
              }}
            >
              <summary style={{ cursor: 'pointer', color: tokens.colors.text.secondary }}>
                Подробности ошибки (dev mode)
              </summary>
              <pre style={{ 
                marginTop: tokens.spacing[2], 
                overflow: 'auto',
                color: tokens.colors.text.primary 
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}