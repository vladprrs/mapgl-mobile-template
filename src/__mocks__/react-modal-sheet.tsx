/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// Mock implementation of react-modal-sheet for testing

const SheetContainer = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, ...props }, ref) => (
    <div 
      ref={ref}
      data-testid="bottom-sheet" 
      className={className}
      {...props}
    >
      {children}
    </div>
  )
);
SheetContainer.displayName = 'Sheet.Container';

const SheetHeader = React.forwardRef<HTMLDivElement, any>(
  ({ children, ...props }, ref) => (
    <div 
      ref={ref}
      data-testid="sheet-header" 
      data-rsbs-header
      {...props}
    >
      {children}
    </div>
  )
);
SheetHeader.displayName = 'Sheet.Header';

const SheetScroller = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, ...props }, ref) => (
    <div 
      ref={ref}
      data-testid="bottom-sheet-content" 
      className={className}
      {...props}
    >
      {children}
    </div>
  )
);
SheetScroller.displayName = 'Sheet.Scroller';

const SheetContent = React.forwardRef<HTMLDivElement, any>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
);
SheetContent.displayName = 'Sheet.Content';

const SheetBackdrop = () => null;
SheetBackdrop.displayName = 'Sheet.Backdrop';

// Main Sheet component with compound components attached
interface SheetComponent extends React.ForwardRefExoticComponent<any> {
  Container: typeof SheetContainer;
  Header: typeof SheetHeader;
  Scroller: typeof SheetScroller;
  Content: typeof SheetContent;
  Backdrop: typeof SheetBackdrop;
}

const SheetBase = React.forwardRef<any, any>(
  ({ children, onSnap, initialSnap, isOpen }, ref) => {
    React.useImperativeHandle(ref, () => ({
      snapTo: jest.fn(),
      y: { get: () => 0 },
    }));
    
    React.useEffect(() => {
      // Simulate initial snap callback
      if (onSnap && typeof initialSnap === 'number') {
        onSnap(initialSnap);
      }
    }, [onSnap, initialSnap]);
    
    if (!isOpen) return null;
    
    return (
      <div data-testid="mocked-sheet" data-rsbs-root>
        {children}
      </div>
    );
  }
);
SheetBase.displayName = 'Sheet';

// Create the Sheet compound component
export const Sheet = SheetBase as SheetComponent;
Sheet.Container = SheetContainer;
Sheet.Header = SheetHeader;
Sheet.Scroller = SheetScroller;
Sheet.Content = SheetContent;
Sheet.Backdrop = SheetBackdrop;

// Export SheetRef type for TypeScript
export type SheetRef = {
  snapTo: (index: number) => void;
  y: { get: () => number };
};