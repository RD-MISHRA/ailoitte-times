// HomePage.jsx
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NewsCard from './components/NewsCard'
import SkeletonNewsCard from './components/SkeletonNewsCard'

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState(null)
  const pageSize = 9

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
        )

        setArticles(response.data.articles)
        setTotalResults(response.data.totalResults)
      } catch (err) {
        console.error('Error fetching news:', err)
        if (err.response) {
          const status = err.response.status;
          const message = err.response.data.message || 'An unknown error occurred.';

          if (status === 401) {
            setError(`Authentication Error: ${message}. Please check your API key.`);
          } else if (status === 429) {
            setError(`Rate Limit Exceeded: ${message}. Please wait and try again.`);
          } else if (status >= 400 && status < 500) {
            setError(`Client Error (${status}): ${message}`);
          } else if (status >= 500) {
            setError(`Server Error (${status}): ${message}`);
          } else {
            setError(`HTTP Error (${status}): ${message}`);
          }
        } else if (err.request) {
          setError('Network Error: No response received from the server. Please check your internet connection.');
        } else {
          setError(`Request Error: ${err.message}`);
        }
        setArticles([]);
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [page])

  const handleNextPage = () => {
    if (page * pageSize < totalResults) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div>
      <main className="my-32 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Top Headlines</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: pageSize }).map((_, index) => (
              <SkeletonNewsCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg mt-8 p-4 bg-red-100 border border-red-400 rounded">
            <p className="font-bold">Error Loading News:</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-700 text-lg mt-8">
                No news found for the current criteria.
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold py-2">
                Page {page} of {Math.ceil(totalResults / pageSize)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page * pageSize >= totalResults}
                className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}