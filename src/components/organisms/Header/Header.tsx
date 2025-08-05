// src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { Home, Bell, Menu, X } from 'lucide-react';
import { Logo } from '../../ui/Logo';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { SearchBar } from '../../molecules/SearchBar';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implementasi search logic di sini
  };

  return (
    <header className={`bg-white border-b border-gray-200 w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 xs:h-16 lg:h-18 xl:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo width={180} height={60} className="xs:w-44 lg:w-48 xl:w-52 2xl:w-56 3xl:w-60" />
          </div>

          {/* Search Bar - Responsive */}
          <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl 3xl:max-w-3xl mx-4 lg:mx-8 xl:mx-12">
            <SearchBar 
              placeholder="Cari di sini..."
              onSearch={handleSearch}
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              <IconButton aria-label="Home" variant="ghost" className="p-2 lg:p-2.5 hover:bg-gray-100">
                <Home size={20} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600" />
              </IconButton>
              
              <IconButton aria-label="Notifications" variant="ghost" className="p-2 lg:p-2.5 hover:bg-gray-100">
                <Bell size={20} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-600" />
              </IconButton>
              
              <Button variant="outline" size="sm" className="text-xs lg:text-sm px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                Masuk
              </Button>
              
              <Button variant="primary" size="sm" className="text-xs lg:text-sm px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5">
                Buat Tulisan
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <IconButton onClick={toggleMobileMenu} aria-label="Menu" variant="ghost" className="p-2 hover:bg-gray-100">
                {isMobileMenuOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
              </IconButton>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar 
                placeholder="Cari di sini..."
                onSearch={handleSearch}
              />
            </div>
            
            {/* Mobile Actions */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <IconButton aria-label="Home" variant="ghost" className="p-2 hover:bg-gray-100">
                    <Home size={20} className="text-gray-600" />
                  </IconButton>
                  
                  <IconButton aria-label="Notifications" variant="ghost" className="p-2 hover:bg-gray-100">
                    <Bell size={20} className="text-gray-600" />
                  </IconButton>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1">
                  Masuk
                </Button>
                
                <Button variant="primary" size="sm" className="flex-1">
                  Buat Tulisan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;