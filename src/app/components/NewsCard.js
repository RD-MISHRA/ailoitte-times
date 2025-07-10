

'use client'
import Link from 'next/link'

export default function NewsCard({ article }) {
  const encoded = encodeURIComponent(JSON.stringify(article))

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 p-4 flex gap-4 text-sm h-48 overflow-hidden items-start">
      {article.urlToImage && (
        <div className="flex-shrink-0 w-36 h-36">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col justify-between">
        <h2 className="font-extrabold text-md leading-tight text-gray-800 line-clamp-4 hover:line-clamp-none transition-all duration-300">
          {article.title}
        </h2>

        <p className="text-xs text-gray-700 mt-1 line-clamp-3">
          {article.description?.slice(0, 260)}...
        </p>

        {article.source?.name && (
          <p className="text-xs text-green-600 mt-1">
            Source: {article.source.name}
          </p>
        )}

        
        <Link
          href={`/DetailedView?data=${encoded}`}
          className="text-indigo-600 hover:text-indigo-800 font-semibold mt-2 inline-block text-xs self-start"
        >
          Read more &rarr;
        </Link>
      </div>
    </div>
  )
}
