// app/search/[query]/page.jsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NewsCard from '@/app/components/NewsCard'
import SkeletonNewsCard from '@/app/components/SkeletonNewsCard'

export default function SearchResultsPage() {
  const { query } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState(null)
  const pageSize = 9

  const displayQuery = decodeURIComponent(query)

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true)
      setError(null)
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            query
          )}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
        )

        if (!res.ok) {
          const errorData = await res.json();
          const status = res.status;
          const message = errorData.message || 'An unknown error occurred.';

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
          setArticles([]);
          setTotalResults(0);
          return;
        }

        const data = await res.json()
        setArticles(data.articles || [])
        setTotalResults(data.totalResults || 0)
      } catch (err) {
        console.error('Error fetching search results:', err)
        if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
          setError('Network Error: Could not connect to the news server. Please check your internet connection.');
        } else {
          setError(`Request Error: ${err.message || 'An unexpected error occurred.'}`);
        }
        setArticles([])
        setTotalResults(0)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, page])

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
    <div className="my-20 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Search Results for: "<span className="text-red-700">{displayQuery}</span>"
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <SkeletonNewsCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg mt-8 p-4 bg-red-100 border border-red-400 rounded">
          <p className="font-bold">Error Loading News:</p>
          <p>{error}</p>
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No news found for your search. Try a different query.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold py-2">
              Page {page} of {Math.ceil(totalResults / pageSize)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page * pageSize >= totalResults}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
