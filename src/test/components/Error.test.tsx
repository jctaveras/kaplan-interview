import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../../components/error';

describe('Error Component', () => {
  test('should render a unordered list', () => {
    const { container } = render(<Error messages={[]} />);
    
    expect(container.firstChild).toHaveClass('errors');
    expect(container.firstChild?.nodeName).toBe('UL')
  });

  test('should render an empty undorder list', () => {
    const { container } = render(<Error messages={[]} />);

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  test('should render the error messages', () => {
    const messages = [
      'Test Error #1',
      'Called to API failed'
    ]

    render(<Error messages={messages} />);
    expect(screen.getByText(messages[0])).toBeInTheDocument();
    expect(screen.getByText(messages[1])).toBeInTheDocument();
  });
});
