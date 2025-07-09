'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NewsCard from '../components/NewsCard' // Adjust path if needed

export default function CategoryPage() {
  const { category } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=b396ed2f9ff24be9896fe215fb35a376`
      )
      const data = await response.json()
      setArticles(data.articles || [])
      setLoading(false)
    }

    fetchNews()
  }, [category])

  return (
    <main className="my-32  px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No news found for {category}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, idx) => (
            <NewsCard key={idx} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}
