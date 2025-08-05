// frontend/src/components/molecules/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cari berita, topik, atau kata kunci...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className={`relative flex items-center transition-all duration-200 ${
        isFocused ? 'ring-2 ring-naramakna-gold ring-opacity-50' : ''
      } rounded-lg border border-gray-300 bg-white`}>
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 text-sm border-0 rounded-lg focus:outline-none focus:ring-0 placeholder-gray-500"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </form>
  );
};