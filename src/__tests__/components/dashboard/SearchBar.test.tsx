import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/dashboard/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  const mockOnMenuClick = jest.fn();
  const mockOnVoiceClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Поиск в Москве');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Search here" />);
    
    const input = screen.getByPlaceholderText('Search here');
    expect(input).toBeInTheDocument();
  });

  it('renders drag handle', () => {
    const { container } = render(<SearchBar />);
    
    const dragHandle = container.querySelector('[data-drag-handle="true"]');
    expect(dragHandle).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<SearchBar />);
    
    const searchInput = screen.getByLabelText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders voice assistant button', () => {
    render(<SearchBar />);
    
    const voiceButton = screen.getByLabelText('Voice search');
    expect(voiceButton).toBeInTheDocument();
  });

  it('renders menu button', () => {
    render(<SearchBar />);
    
    const menuButton = screen.getByLabelText('Menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск в Москве');
    await user.type(input, 'Test query');
    
    expect(input).toHaveValue('Test query');
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск в Москве');
    await user.type(input, 'Test query');
    
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Test query');
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Поиск в Москве');
    await user.type(input, 'Test query{enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('Test query');
  });

  it('calls onMenuClick when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onMenuClick={mockOnMenuClick} />);
    
    const menuButton = screen.getByLabelText('Menu');
    await user.click(menuButton);
    
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('calls onVoiceClick when voice button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onVoiceClick={mockOnVoiceClick} />);
    
    const voiceButton = screen.getByLabelText('Voice search');
    await user.click(voiceButton);
    
    expect(mockOnVoiceClick).toHaveBeenCalledTimes(1);
  });

  it('applies focus styles when input is focused', async () => {
    const user = userEvent.setup();
    const { container } = render(<SearchBar />);
    
    const input = screen.getByPlaceholderText('Поиск в Москве');
    const inputContainer = input.closest('.bg-gray-900\\/\\[0\\.06\\]');
    
    await user.click(input);
    await waitFor(() => {
      expect(inputContainer).toHaveClass('ring-2');
    });
    
    await user.tab(); // Blur the input
    await waitFor(() => {
      expect(inputContainer).not.toHaveClass('ring-2');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<SearchBar className="custom-class" />);
    
    const searchBar = container.firstChild;
    expect(searchBar).toHaveClass('custom-class');
  });
});