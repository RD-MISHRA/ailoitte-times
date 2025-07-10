import { render, screen } from '@testing-library/react';
import NewsCard from './NewsCard';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Optional: Mock Next.js router in case it's used
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NewsCard Component', () => {
  const mockArticle = {
    title: 'Test News Title',
    description: 'This is a test description for the news article to ensure the component works.',
    urlToImage: 'https://example.com/image.jpg',
    source: {
      name: 'Example News Source',
    },
  };

  it('renders the article title', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
  });

  it('renders the article description (sliced)', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument();
  });

  it('renders the source name', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText(/Source: Example News Source/)).toBeInTheDocument();
  });

  it('renders the article image', () => {
    render(<NewsCard article={mockArticle} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockArticle.urlToImage);
    expect(image).toHaveAttribute('alt', mockArticle.title);
  });

  it('renders the "Read more" link with encoded data', () => {
    render(<NewsCard article={mockArticle} />);
    const link = screen.getByRole('link', { name: /Read more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
    expect(link.getAttribute('href')).toContain('/DetailedView?data=');
  });
});
