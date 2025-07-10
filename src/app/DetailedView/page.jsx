'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';


const calculateReadTime = (content) => {
  if (!content) return 0;
  const wordsPerMinute = 200; 
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
};

export default function FullArticlePage() {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const encoded = searchParams.get('data');
    if (!encoded) {
      setError('No article data provided.');
      return;
    }
    try {
      const parsed = JSON.parse(decodeURIComponent(encoded));
      if (!parsed.title || !parsed.source) {
        setError('Invalid article data.');
        return;
      }
      setArticle(parsed);
    } catch (err) {
      console.error('Failed to parse article data:', err);
      setError('Error loading article.');
    }
  }, [searchParams]);

  
  const readTime = useMemo(() => {
    return calculateReadTime(article?.description || article?.content);
  }, [article]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 text-red-600 border border-red-300">
          <h2 className="text-xl font-semibold mb-4">Oops! Something went wrong.</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-40 max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg my-8">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
        {article.title}
      </h1>
      <p className="text-md text-gray-600 mb-6 flex flex-wrap gap-2">
        <span>By {article.author || 'Unknown'}</span>
        <span>| Source: {article.source?.name || 'N/A'}</span>
        <span>| {new Date(article.publishedAt).toLocaleString()}</span>
        {readTime > 0 && (
          <span className="font-semibold text-gray-700">| {readTime}-min read</span>
        )}
      </p>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-auto rounded-xl mb-8 shadow-md transition-transform duration-300 hover:scale-[1.02]"
        />
      )}

      <div className="prose prose-lg text-gray-800 leading-relaxed mb-8">
        <p className="text-lg">
          {article.description || article.content || 'No content available.'}
        </p>
        {article.content && article.content.includes('[+') && (
          <p className="text-gray-600 italic mt-4">
            (Content truncated. Read more at the source.)
          </p>
        )}
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
      >
        Read full article on original site
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}