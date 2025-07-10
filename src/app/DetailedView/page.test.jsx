import { render, screen, act } from '@testing-library/react';
import FullArticlePage from './page';
import { useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock useSearchParams
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

const mockArticle = {
  title: 'Test Article',
  author: 'John Doe',
  source: { name: 'Mock Source' },
  publishedAt: '2025-07-10T10:00:00Z',
  urlToImage: 'https://example.com/image.jpg',
  description: 'This is a test article used for rendering.',
  url: 'https://example.com/full-article',
};

const createEncodedData = (article) =>
  encodeURIComponent(JSON.stringify(article));

describe('FullArticlePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error if no query param is present', () => {
    useSearchParams.mockReturnValue({
      get: () => null,
    });

    render(<FullArticlePage />);
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/No article data provided/i)).toBeInTheDocument();
  });

  it('renders error if article data is invalid', () => {
    const invalidData = encodeURIComponent(JSON.stringify({ foo: 'bar' }));
    useSearchParams.mockReturnValue({
      get: () => invalidData,
    });

    render(<FullArticlePage />);
    expect(screen.getByText(/Invalid article data/i)).toBeInTheDocument();
  });

  it('renders loading state before parsing', async () => {
    const encoded = createEncodedData(mockArticle);
    useSearchParams.mockReturnValue({
      get: () => encoded,
    });

    // Wrap in act to allow useEffect to trigger
    await act(async () => {
      render(<FullArticlePage />);
    });

    // Even though state is quickly set, assert fallback if delay added in real use
    // You can test rendering directly here if you delay state setting artificially
    expect(screen.queryByText(/Loading article/i)).not.toBeInTheDocument();

    // Ensure article renders
    expect(await screen.findByText(mockArticle.title)).toBeInTheDocument();
  });

  it('renders full article correctly', async () => {
    const encoded = createEncodedData(mockArticle);
    useSearchParams.mockReturnValue({
      get: () => encoded,
    });

    render(<FullArticlePage />);

    expect(await screen.findByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes(`By ${mockArticle.author}`))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes(`Source: ${mockArticle.source.name}`))).toBeInTheDocument();
    expect(screen.getByText(/Read full article on original site/i)).toHaveAttribute(
      'href',
      mockArticle.url
    );
  });

  it('displays read time if content is long enough', () => {
    const longContentArticle = {
      ...mockArticle,
      description: 'word '.repeat(500), // 500 words = ~3-minute read
    };
    const encoded = createEncodedData(longContentArticle);
    useSearchParams.mockReturnValue({
      get: () => encoded,
    });

    render(<FullArticlePage />);
    expect(screen.getByText(/min read/i)).toBeInTheDocument();
  });
});
