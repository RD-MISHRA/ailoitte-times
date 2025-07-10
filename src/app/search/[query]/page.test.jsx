import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SearchResultsPage from './page';
import { useParams } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

global.fetch = jest.fn();

describe('SearchResultsPage', () => {
  const mockArticles = Array.from({ length: 3 }).map((_, i) => ({
    title: `Search Result ${i + 1}`,
    description: `Description for result ${i + 1}`,
    urlToImage: `https://example.com/image${i + 1}.jpg`,
    source: { name: `Source ${i + 1}` },
  }));

  beforeEach(() => {
    useParams.mockReturnValue({ query: 'bitcoin' });
    fetch.mockReset();
  });

  it('renders loading skeletons initially', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 9 }),
    });

    render(<SearchResultsPage />);

    expect(screen.getByTestId('search-results-heading')).toHaveTextContent('Search Results for: "bitcoin"');
    expect(screen.getAllByTestId('skeleton-news-card').length).toBeGreaterThan(0);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('displays articles after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 9 }),
    });

    render(<SearchResultsPage />);

    await waitFor(() => {
      expect(screen.getByText((content, element) => 
        element?.textContent === 'Source: Source 1'
      )).toBeInTheDocument();
      expect(screen.getByText('Search Result 1')).toBeInTheDocument();
    });
  });

  it('shows error on API failure (401)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid API key' }),
    });

    render(<SearchResultsPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/Authentication Error: Invalid API key/i)
      ).toBeInTheDocument()
    );
  });

  it('shows empty state when no results found', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: [], totalResults: 0 }),
    });

    render(<SearchResultsPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/No news found for your search/i)
      ).toBeInTheDocument()
    );
  });

  it('pagination next button works correctly', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 30 }),
    });

    render(<SearchResultsPage />);
    await waitFor(() => screen.getByText(/Page 1 of/i));

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('disables previous button on first page', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 30 }),
    });

    render(<SearchResultsPage />);

    await waitFor(() => {
      const prevBtn = screen.getByRole('button', { name: /previous/i });
      expect(prevBtn).toBeDisabled();
    });
  });
});