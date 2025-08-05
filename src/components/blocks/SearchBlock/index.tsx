// src/components/blocks/SearchBlock/index.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Input from '../../ui/Input';
import IconButton from '../../ui/IconButton';

const SearchBlock: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const handleClear = () => {
    setSearchValue('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center">
      {/* Desktop Search */}
      <div className="hidden md:block">
        <Input
          type="search"
          placeholder="Cari di sini..."
          value={searchValue}
          onChange={handleSearch}
          icon="search"
          showClearButton={searchValue.length > 0}
          onClear={handleClear}
          className="w-80"
        />
      </div>

      {/* Mobile Search Toggle */}
      <IconButton 
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        className="md:hidden"
      >
        <Search className="w-5 h-5" />
      </IconButton>

      {/* Mobile Search Overlay */}
      {isSearchVisible && (
        <div className="absolute top-16 left-0 right-0 bg-white p-4 shadow-md md:hidden z-50">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Cari di sini..."
              value={searchValue}
              onChange={handleSearch}
              icon="search"
              showClearButton={searchValue.length > 0}
              onClear={handleClear}
              className="flex-1"
            />
            <IconButton onClick={() => setIsSearchVisible(false)}>
              <X className="w-5 h-5" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBlock;