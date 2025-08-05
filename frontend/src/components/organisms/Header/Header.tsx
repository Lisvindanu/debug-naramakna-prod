// frontend/src/components/organisms/Header/Header.tsx
import React, { useState } from 'react';
import { Home, Bell, Menu, X } from 'lucide-react';
import { Logo } from '../../atoms/Logo';
import { Button } from '../../atoms/Button';
import { IconButton } from '../../atoms/IconButton';
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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo width={120} height={35} />
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <SearchBar 
              placeholder="Cari di sini..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <IconButton aria-label="Home" variant="ghost" className="p-1.5 hover:bg-gray-100 rounded-full">
                <Home size={18} className="text-gray-600" />
              </IconButton>
              
              <IconButton aria-label="Notifications" variant="ghost" className="p-1.5 hover:bg-gray-100 rounded-full">
                <Bell size={18} className="text-gray-600" />
              </IconButton>
              
              <Button variant="outline" size="sm" className="text-sm px-3 py-1.5 border-[#19b3a6] text-[#19b3a6] bg-white hover:bg-[#19b3a6] hover:text-white transition-colors">
                Masuk
              </Button>
              
              <Button variant="primary" size="sm" className="text-sm px-3 py-1.5 bg-[#19b3a6] hover:bg-[#17a398] text-white">
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