import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './NavBar';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar Component', () => {
  let push;

  beforeEach(() => {
    push = jest.fn();
    useRouter.mockReturnValue({ push });
  });

  it('renders logo and site title', () => {
    render(<Navbar />);
    expect(screen.getByText('AiloitteTimes')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'AiloitteTimes Logo');
  });

  it('renders all category links', () => {
    render(<Navbar />);
    const categories = [
      'Home', 'Business', 'Technology', 'Entertainment', 'Sports',
      'Science', 'Health', 'Politics', 'Finance', 'General'
    ];
    categories.forEach(category => {
      expect(screen.getAllByText(category)[0]).toBeInTheDocument();
    });
  });

  it('performs search and navigates to search page', () => {
    render(<Navbar />);

    const input = screen.getAllByPlaceholderText('Search news...')[0];
    fireEvent.change(input, { target: { value: 'bitcoin' } });

    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith('/search/bitcoin');
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);

    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);

    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
  });
});
