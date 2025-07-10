import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CategoryPage from './page';
import { useParams } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

global.fetch = jest.fn();

describe('CategoryPage', () => {
  const mockArticles = Array.from({ length: 3 }).map((_, i) => ({
    title: `Test Article ${i + 1}`,
    description: `Description for article ${i + 1}`,
    urlToImage: `https://example.com/image${i + 1}.jpg`,
    source: { name: `Source ${i + 1}` },
    publishedAt: new Date().toISOString(),
    url: 'https://example.com',
  }));

  beforeEach(() => {
    useParams.mockReturnValue({ category: 'technology' });
    fetch.mockReset();
  });

  it('renders loading skeletons initially', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 10 }),
    });

    render(<CategoryPage />);

    // ✅ Expect 9 skeleton cards during loading
    expect(screen.getAllByTestId('skeleton-news-card').length).toBe(9);

    // ✅ Wait until fetch completes
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('displays news articles after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 9 }),
    });

    render(<CategoryPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Article 1/)).toBeInTheDocument();
      expect(screen.getByText(/Source 1/)).toBeInTheDocument();
    });
  });

  it('displays error message on failed fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid API key' }),
    });

    render(<CategoryPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/Authentication Error: Invalid API key/i)
      ).toBeInTheDocument()
    );
  });

  it('displays no news found if article array is empty', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: [], totalResults: 0 }),
    });

    render(<CategoryPage />);
    await waitFor(() =>
      expect(
        screen.getByText(/No news found for this category/i)
      ).toBeInTheDocument()
    );
  });

  it('pagination buttons behave correctly', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ articles: mockArticles, totalResults: 30 }),
    });

    render(<CategoryPage />);
    await waitFor(() => screen.getByText(/Page 1 of/i));

    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).not.toBeDisabled();

    const prevBtn = screen.getByRole('button', { name: /previous/i });
    expect(prevBtn).toBeDisabled();

    fireEvent.click(nextBtn);
    expect(fetch).toHaveBeenCalledTimes(2); // Page 2 fetch
  });
});
