import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonNewsCard from './SkeletonNewsCard';

describe('SkeletonNewsCard', () => {
  test('renders with correct structure and classes', () => {
    render(<SkeletonNewsCard />);
    
    // Check main container
    const container = screen.getByTestId('skeleton-news-card');
    expect(container).toHaveClass('bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow-sm', 'p-4', 'flex', 'gap-4', 'text-sm', 'h-48', 'overflow-hidden', 'items-start', 'animate-pulse');

    // Check image placeholder
    const imagePlaceholder = screen.getByTestId('image-placeholder');
    expect(imagePlaceholder).toHaveClass('flex-shrink-0', 'w-36', 'h-36', 'bg-gray-300', 'rounded-lg');

    // Check content container
    const contentContainer = screen.getByTestId('content-container');
    expect(contentContainer).toHaveClass('flex-1', 'overflow-hidden', 'flex', 'flex-col', 'justify-between');

    // Check title placeholders
    const titlePlaceholders = [
      screen.getByTestId('title-placeholder-1'),
      screen.getByTestId('title-placeholder-2'),
    ];
    expect(titlePlaceholders).toHaveLength(2);
    expect(titlePlaceholders[0]).toHaveClass('h-6', 'bg-gray-300', 'rounded', 'w-full', 'mb-2');
    expect(titlePlaceholders[1]).toHaveClass('h-6', 'bg-gray-300', 'rounded', 'w-11/12', 'mb-2');

    // Check description placeholders
    const descriptionPlaceholders = [
      screen.getByTestId('description-placeholder-1'),
      screen.getByTestId('description-placeholder-2'),
    ];
    expect(descriptionPlaceholders).toHaveLength(2);
    expect(descriptionPlaceholders[0]).toHaveClass('h-4', 'bg-gray-300', 'rounded', 'w-full', 'mb-1');
    expect(descriptionPlaceholders[1]).toHaveClass('h-4', 'bg-gray-300', 'rounded', 'w-5/6');

    // Check metadata placeholder
    const metadataPlaceholder = screen.getByTestId('metadata-placeholder');
    expect(metadataPlaceholder).toHaveClass('h-3', 'bg-gray-300', 'rounded', 'w-1/3', 'mt-2');

    // Check button placeholder
    const buttonPlaceholder = screen.getByTestId('button-placeholder');
    expect(buttonPlaceholder).toHaveClass('h-4', 'bg-gray-300', 'rounded', 'w-1/4', 'mt-4', 'self-start');
  });

  test('renders with correct number of placeholder elements', () => {
    render(<SkeletonNewsCard />);
    
    const placeholders = [
      screen.getByTestId('image-placeholder'),
      screen.getByTestId('title-placeholder-1'),
      screen.getByTestId('title-placeholder-2'),
      screen.getByTestId('description-placeholder-1'),
      screen.getByTestId('description-placeholder-2'),
      screen.getByTestId('metadata-placeholder'),
      screen.getByTestId('button-placeholder'),
    ];
    expect(placeholders).toHaveLength(7); // 1 image, 2 title, 2 description, 1 metadata, 1 button
  });
});