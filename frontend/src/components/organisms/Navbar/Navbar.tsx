import React, { useState } from 'react';
import { NavHeader } from '../../molecules/NavHeader';
import { NavKategori } from '../../molecules/NavKategori';
import { NavService } from '../../molecules/NavService';
import { AdSection } from '../AdSection';
import { TrendingSection } from '../TrendingSection';
import { MainContentSection } from '../MainContentSection';
import { PollingSection } from '../PollingSection';
import { VideoSection } from '../VideoSection';
import { CategorySection } from '../CategorySection';
import { SearchInput } from '../../atoms/SearchInput';
import { Button } from '../../atoms/Button';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // Implementasi pencarian nanti
  };

  return (
    <>
      <nav className="bg-white shadow-md border-b border-naramakna-gray-200 sticky top-0 z-40">
        {/* Header Section */}
        <NavHeader />

        {/* NavKategori Section */}
        <NavKategori />

        {/* NavService Section */}
        <NavService />

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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
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
                  {['News', 'Entertainment', 'Tekno & Sains', 'Bisnis', 'Bola & Sports', 'Otomotif', 'Woman', 'Food & Travel', 'Mom', 'Bolanita'].map((category, index) => (
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
                  {['Breaking News', 'Halal Living', 'Green Initiative', 'Video Story', 'Trending', 'naramakna PLUS', 'Opini & Cerita'].map((service, index) => (
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
                  {[
                    { title: 'Video Story', description: 'Tonton video berita terkini' },
                    { title: 'Galeri Foto', description: 'Lihat koleksi foto berita' },
                    { title: 'Kabar Daerah', description: 'Berita dari berbagai daerah' },
                    { title: 'Polling', description: 'Ikuti polling dan survey' }
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center px-3 py-2 text-sm font-medium text-naramakna-gray-700 hover:text-naramakna-gold hover:bg-naramakna-gray-100 rounded-md transition-colors duration-200"
                    >
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

      {/* Header Ad Section (970x250) */}
      <AdSection position="top" size="header" />

      {/* Main Content Area with Trending Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <MainContentSection />
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-2">
            <TrendingSection />
          </div>
        </div>
      </div>

      {/* Polling Section */}
      <PollingSection />

      {/* Video Section */}
      <VideoSection />

      {/* Category Section */}
      <CategorySection />

      {/* Regular Ad Section (728x90) */}
      <AdSection position="bottom" size="regular" />
    </>
  );
};