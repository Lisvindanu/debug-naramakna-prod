// src/components/molecules/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../ui/Input';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cari di sini...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-lg ${className}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        leftIcon={<Search size={18} />}
        className="w-full"
      />
    </form>
  );
};

export default SearchBar;