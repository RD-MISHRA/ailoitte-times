/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HomePage from './page';

jest.mock('axios');

const mockArticles = [
  {
    title: 'Sample News 1',
    description: 'Description 1',
    urlToImage: 'https://example.com/image1.jpg',
    source: { name: 'Mock Source' },
    url: 'https://example.com/news1',
  },
  {
    title: 'Sample News 2',
    description: 'Description 2',
    urlToImage: 'https://example.com/image2.jpg',
    source: { name: 'Mock Source 2' },
    url: 'https://example.com/news2',
  },
];

describe('HomePage', () => {
  it('renders news articles fetched from API', async () => {
    axios.get.mockResolvedValue({
      data: {
        articles: mockArticles,
        totalResults: 2,
      },
    });

    render(<HomePage />);

    // Wait for articles to load
    await waitFor(() => {
      expect(screen.getByText('Sample News 1')).toBeInTheDocument();
      expect(screen.getByText('Sample News 2')).toBeInTheDocument();
    });
  });

  it('displays an error message if fetch fails', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: 'Invalid API key' },
      },
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Authentication Error/i)).toBeInTheDocument();
    });
  });
});
