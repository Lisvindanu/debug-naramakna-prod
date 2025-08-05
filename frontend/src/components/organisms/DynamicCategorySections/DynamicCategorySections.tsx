import React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { CategoryNewsSection } from '../CategoryNewsSection';
import { AdSection } from '../AdSection';

interface DynamicCategorySectionsProps {
  className?: string;
  minPostCount?: number; // Minimum posts required to show category
  maxSections?: number; // Maximum number of sections to display
  excludeCategories?: string[]; // Categories to exclude (already shown elsewhere)
}

export const DynamicCategorySections: React.FC<DynamicCategorySectionsProps> = ({
  className = '',
  minPostCount = 2, // Show categories with at least 2 posts
  maxSections = 10, // Show up to 10 categories
  excludeCategories = []
}) => {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className={`space-y-8 ${className}`}>
        {/* Loading skeleton */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="h-64 bg-gray-300 rounded"></div>
                  <div className="h-64 bg-gray-300 rounded"></div>
                  <div className="h-64 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !categories.length) {
    return null; // Silent fail, no sections
  }

  // Filter and sort categories
  const eligibleCategories = categories
    .filter(cat => 
      cat.count >= minPostCount && 
      !excludeCategories.includes(cat.slug)
    )
    .sort((a, b) => b.count - a.count) // Sort by popularity
    .slice(0, maxSections); // Limit number of sections

  if (eligibleCategories.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {eligibleCategories.map((category, index) => (
        <React.Fragment key={category.slug}>
          {/* Category News Section */}
          <CategoryNewsSection 
            category={category.slug}
            categoryDisplayName={category.name}
          />
          
          {/* Insert ad after every 3rd section */}
          {(index + 1) % 3 === 0 && (
            <AdSection position="middle" size="regular" />
          )}
        </React.Fragment>
      ))}
      
      {/* Final ad section at the bottom */}
      <AdSection position="bottom" size="header" />
    </div>
  );
};