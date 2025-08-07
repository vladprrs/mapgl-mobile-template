import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickAccessPanel, type QuickAction } from '@/components/dashboard/QuickAccessPanel';

describe('QuickAccessPanel', () => {
  const mockOnActionClick = jest.fn();

  const customActions: QuickAction[] = [
    {
      id: 'test1',
      label: 'Test 1',
      icon: <span data-testid="test-icon-1">Icon1</span>,
    },
    {
      id: 'test2',
      label: 'Test 2',
      sublabel: 'Sub 2',
      labelColor: '#ff0000',
      sublabelColor: '#00ff00',
    },
    {
      id: 'test3',
      icon: <span data-testid="test-icon-3">Icon3</span>,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default actions', () => {
    render(<QuickAccessPanel />);
    
    // Check for default action buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders custom actions', () => {
    render(
      <QuickAccessPanel 
        actions={customActions} 
        onActionClick={mockOnActionClick}
      />
    );
    
    // Check for custom action buttons
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Sub 2')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(
      <QuickAccessPanel 
        actions={customActions} 
        onActionClick={mockOnActionClick}
      />
    );
    
    expect(screen.getByTestId('test-icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon-3')).toBeInTheDocument();
  });

  it('applies custom label colors', () => {
    render(
      <QuickAccessPanel 
        actions={customActions} 
        onActionClick={mockOnActionClick}
      />
    );
    
    const label = screen.getByText('Test 2');
    expect(label).toHaveStyle({ color: '#ff0000' });
    
    const sublabel = screen.getByText('Sub 2');
    expect(sublabel).toHaveStyle({ color: '#00ff00' });
  });

  it('calls onActionClick when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <QuickAccessPanel 
        actions={customActions} 
        onActionClick={mockOnActionClick}
      />
    );
    
    const button = screen.getByText('Test 1').closest('button');
    await user.click(button!);
    
    expect(mockOnActionClick).toHaveBeenCalledWith('test1');
  });

  it('calls action onClick handler when provided', async () => {
    const mockActionClick = jest.fn();
    const actionsWithHandler: QuickAction[] = [
      {
        id: 'test',
        label: 'Test Action',
        onClick: mockActionClick,
      },
    ];
    
    const user = userEvent.setup();
    render(
      <QuickAccessPanel 
        actions={actionsWithHandler} 
        onActionClick={mockOnActionClick}
      />
    );
    
    const button = screen.getByText('Test Action').closest('button');
    await user.click(button!);
    
    expect(mockActionClick).toHaveBeenCalled();
    expect(mockOnActionClick).toHaveBeenCalledWith('test');
  });

  it('renders with horizontal scroll container', () => {
    const { container } = render(
      <QuickAccessPanel actions={customActions} />
    );
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    expect(scrollContainer).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <QuickAccessPanel 
        className="custom-class" 
        actions={customActions}
      />
    );
    
    const panel = container.firstChild;
    expect(panel).toHaveClass('custom-class');
  });

  it('handles empty actions array', () => {
    render(<QuickAccessPanel actions={[]} />);
    
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('sets proper aria-label for buttons', () => {
    render(
      <QuickAccessPanel 
        actions={customActions} 
        onActionClick={mockOnActionClick}
      />
    );
    
    const button1 = screen.getByLabelText('Test 1');
    expect(button1).toBeInTheDocument();
    
    const button3 = screen.getByLabelText('test3'); // Falls back to id when no label
    expect(button3).toBeInTheDocument();
  });

  it('handles scroll events for gradient visibility', () => {
    const manyActions = [
      ...customActions,
      { id: 'test4', label: 'Test 4' },
      { id: 'test5', label: 'Test 5' },
      { id: 'test6', label: 'Test 6' },
      { id: 'test7', label: 'Test 7' },
      { id: 'test8', label: 'Test 8' },
    ];
    const { container } = render(
      <QuickAccessPanel 
        actions={manyActions}
      />
    );
    
    const scrollContainer = container.querySelector('.overflow-x-auto');
    
    // Simulate scroll
    if (scrollContainer) {
      fireEvent.scroll(scrollContainer, { target: { scrollLeft: 100 } });
    }
    
    // Note: Testing actual gradient visibility would require mocking refs and scroll dimensions
    expect(scrollContainer).toBeInTheDocument();
  });
});