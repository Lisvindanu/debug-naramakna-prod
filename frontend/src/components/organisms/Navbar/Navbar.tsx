import React, { useState } from 'react';
import { Logo } from '../../atoms/Logo';
import { Button } from '../../atoms/Button';
import { SearchInput } from '../../atoms/SearchInput';
import { NavDropdown } from '../../molecules/NavDropdown';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data untuk dropdown "Lainnya"
  const lainnyaItems = [
    {
      title: 'Video Story',
      description: 'Tonton video berita terkini',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 6h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: 'Galeri Foto',
      description: 'Lihat koleksi foto berita',
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Kabar Daerah',
      description: 'Berita dari berbagai daerah',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Polling',
      description: 'Ikuti polling dan survey',
      icon: (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Zodiak',
      description: 'Ramalan bintang harian',
      icon: (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  // Kategori utama
  const categories = [
    'News',
    'Entertainment', 
    'Tekno & Sains',
    'Bisnis',
    'Bola & Sports',
    'Otomotif',
    'Woman',
    'Food & Travel',
    'Mom',
    'Bolanita'
  ];

  // Layanan
  const services = [
    'Breaking News',
    'Halal Living',
    'Green Initiative',
    'Video Story',
    'Trending',
    'naramakna PLUS',
    'Opini & Cerita'
  ];

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // Implementasi pencarian nanti
  };

  const handleLogoClick = () => {
    console.log('Logo clicked - redirect to home');
    // Redirect ke home page nanti
  };

  return (
    <nav className="bg-white shadow-md border-b border-naramakna-gray-200 sticky top-0 z-40">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="xl" onClick={handleLogoClick} />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchInput 
              placeholder="Cari di sini..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Button>
            <Button variant="outline" size="sm">
              Masuk
            </Button>
            <Button variant="primary" size="sm">
              Buat Tulisan
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-naramakna-gray-700 hover:text-naramakna-gold hover:bg-naramakna-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-naramakna-gold"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="hidden md:block bg-white border-b border-naramakna-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold whitespace-nowrap transition-colors duration-200 flex-shrink-0"
              >
                {category}
              </a>
            ))}
            
            {/* Dropdown untuk "Lainnya" */}
            <NavDropdown
              trigger={
                <div className="flex items-center text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold whitespace-nowrap transition-colors duration-200">
                  Lainnya
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
              items={lainnyaItems}
            />
          </div>
        </div>
      </div>

      {/* Services Navigation */}
      <div className="hidden md:block bg-naramakna-gray-50 border-b border-naramakna-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 h-10 overflow-x-auto">
            {services.map((service, index) => (
              <a
                key={index}
                href="#"
                className={`text-xs font-medium whitespace-nowrap transition-colors duration-200 flex-shrink-0 px-3 py-1 rounded-full ${
                  service === 'Breaking News' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : service === 'Halal Living'
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : service === 'Green Initiative'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'text-naramakna-gray-600 hover:text-naramakna-gold hover:bg-white'
                }`}
              >
                {service}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-naramakna-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchInput 
                placeholder="Cari di sini..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex space-x-2 mb-4">
              <Button variant="ghost" size="sm" className="flex-1">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Masuk
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Buat Tulisan
              </Button>
            </div>

            {/* Mobile Categories */}
            <div className="border-t border-naramakna-gray-200 pt-3">
              <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-2">Kategori</h3>
              <div className="space-y-1">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold hover:bg-naramakna-gray-100 rounded-md transition-colors duration-200"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Services */}
            <div className="border-t border-naramakna-gray-200 pt-3">
              <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-2">Layanan</h3>
              <div className="space-y-1">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-3 py-2 text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold hover:bg-naramakna-gray-100 rounded-md transition-colors duration-200"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Lainnya */}
            <div className="border-t border-naramakna-gray-200 pt-3">
              <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-2">Lainnya</h3>
              <div className="space-y-1">
                {lainnyaItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold hover:bg-naramakna-gray-100 rounded-md transition-colors duration-200"
                  >
                    <div className="mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <div>{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-naramakna-gray-500 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};