// src/components/blocks/SearchBlock/index.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchBar } from '../../molecules/SearchBar';
import { IconButton } from '../../ui/IconButton';

const SearchBlock: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implementasi search logic di sini
  };

  return (
    <div className="flex items-center">
      {/* Desktop Search */}
      <div className="hidden md:block w-80">
        <SearchBar
          placeholder="Cari di sini..."
          onSearch={handleSearch}
        />
      </div>

      {/* Mobile Search Toggle */}
      <IconButton 
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        className="md:hidden"
        aria-label="Toggle search"
      >
        <Search size={20} />
      </IconButton>

      {/* Mobile Search Overlay */}
      {isSearchVisible && (
        <div className="absolute top-16 left-0 right-0 bg-white p-4 shadow-md md:hidden z-50">
          <div className="flex items-center space-x-2">
            <SearchBar
              placeholder="Cari di sini..."
              onSearch={handleSearch}
              className="flex-1"
            />
            <IconButton 
              onClick={() => setIsSearchVisible(false)}
              aria-label="Close search"
            >
              <X size={20} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBlock;