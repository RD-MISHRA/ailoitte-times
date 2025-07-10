// components/SkeletonNewsCard.jsx
import React from 'react';

export default function SkeletonNewsCard() {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex gap-4 text-sm h-48 overflow-hidden items-start animate-pulse"
      data-testid="skeleton-news-card"
    >
      <div
        className="flex-shrink-0 w-36 h-36 bg-gray-300 rounded-lg"
        data-testid="image-placeholder"
      ></div>

      <div
        className="flex-1 overflow-hidden flex flex-col justify-between"
        data-testid="content-container"
      >
        <div
          className="h-6 bg-gray-300 rounded w-full mb-2"
          data-testid="title-placeholder-1"
        ></div>
        <div
          className="h-6 bg-gray-300 rounded w-11/12 mb-2"
          data-testid="title-placeholder-2"
        ></div>

        <div
          className="h-4 bg-gray-300 rounded w-full mb-1"
          data-testid="description-placeholder-1"
        ></div>
        <div
          className="h-4 bg-gray-300 rounded w-5/6"
          data-testid="description-placeholder-2"
        ></div>

        <div
          className="h-3 bg-gray-300 rounded w-1/3 mt-2"
          data-testid="metadata-placeholder"
        ></div>

        <div
          className="h-4 bg-gray-300 rounded w-1/4 mt-4 self-start"
          data-testid="button-placeholder"
        ></div>
      </div>
    </div>
  );
}
