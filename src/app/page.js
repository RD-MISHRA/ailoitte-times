'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NewsCard from './components/NewsCard'

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        )
        console.log('Fetched articles:', response.data) // Debugging line
        setArticles(response.data.articles)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div>
   
    {/* Main content area with max-width and padding for better layout */}
    <main className="my-32 max-w-7xl mx-auto ">
  <h1 className="text-3xl font-bold mb-6">Top Headlines</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {articles.map((article, index) => (
      <NewsCard key={index} article={article} />
    ))}
  </div>
</main>

    </div>
  )
}