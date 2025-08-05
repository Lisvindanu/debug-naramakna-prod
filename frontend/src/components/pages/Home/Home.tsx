// Halaman utama/homepage dengan feed artikel dan video
import React, { useState } from 'react';
import { NavHeader } from '../../molecules/NavHeader';
import { NavKategori } from '../../molecules/NavKategori';
import { NavService } from '../../molecules/NavService';
import { AdSection } from '../../organisms/AdSection';
import { TrendingSection } from '../../organisms/TrendingSection';
import { MainContentSection } from '../../organisms/MainContentSection';
import { PollingSection } from '../../organisms/PollingSection';
import { VideoSection } from '../../organisms/VideoSection';
import { NewsSection } from '../../organisms/NewsSection';
import { CategoryNewsSection } from '../../organisms/CategoryNewsSection';
import { SearchInput } from '../../atoms/SearchInput';
import { Button } from '../../atoms/Button';
import { Logo } from '../../atoms/Logo';

export const Home: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    setIsSearchModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <>
      {/* Mobile Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          {/* Overlay */}
          <div className="absolute inset-0" onClick={toggleSearchModal}></div>
          
          {/* Modal Content - Positioned near navbar */}
          <div className="absolute top-20 left-4 right-4">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200">
              <div className="p-4">
                <SearchInput 
                  placeholder="Cari artikel, kategori, atau topik..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white shadow-md border-b border-naramakna-gray-200 sticky top-0 z-40">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <NavHeader />
          <NavKategori />
          <NavService />
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Logo />
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSearchModal}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Half Screen Height */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
              
                             {/* Menu Content */}
               <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-lg">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-naramakna-gray-200">
                    <h3 className="text-lg font-semibold">Menu</h3>
                    <button
                      onClick={toggleMobileMenu}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    
                    {/* Action Buttons - Vertical Layout */}
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Masuk
                      </Button>
                      <Button variant="primary" size="sm" className="w-full">
                        Buat Tulisan
                      </Button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-naramakna-gray-200"></div>

                    {/* NavKategori Items */}
                    <div>
                      <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-3">Kategori</h3>
                      <div className="space-y-2">
                        {['News', 'Entertainment', 'Tekno & Sains', 'Bisnis', 'Bola & Sports', 'Otomotif', 'Woman', 'Food & Travel', 'Mom', 'Bolanita'].map((category, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-sm text-naramakna-gray-700 hover:text-naramakna-gold py-2 transition-colors duration-200"
                          >
                            {category}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-naramakna-gray-200"></div>

                    {/* NavService Items */}
                    <div>
                      <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-3">Layanan</h3>
                      <div className="space-y-2">
                        {['Breaking News', 'Halal Living', 'Green Initiative', 'Video Story', 'Trending', 'naramakna PLUS', 'Opini & Cerita'].map((service, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-sm text-naramakna-gray-700 hover:text-naramakna-gold py-2 transition-colors duration-200"
                          >
                            {service}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-naramakna-gray-200"></div>

                    {/* Social Media */}
                    <div>
                      <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-3">Media Sosial</h3>
                      <div className="space-y-2">
                        {['Instagram', 'Facebook', 'Tiktok', 'Youtube', 'Whatsapp', 'X'].map((social, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-sm text-naramakna-gray-700 hover:text-naramakna-gold py-2 transition-colors duration-200"
                          >
                            {social}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-naramakna-gray-200"></div>

                    {/* Copyright */}
                    <div className="text-xs text-naramakna-gray-500 space-y-1">
                      <div>2025 © PT Solusi Komunikasi Terapan</div>
                      <div>Version 1.0.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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

      {/* News Section */}
      <NewsSection />

      {/* Regular Ad Section (728x90) */}
      <AdSection position="bottom" size="regular" />

                        {/* Category News Sections */}
                  <CategoryNewsSection category="Entertainment" />
                  <CategoryNewsSection category="Tekno & Sains" />
                  <CategoryNewsSection category="Bisnis" />

                  {/* Main Ad Section (970x250) */}
                  <AdSection position="bottom" size="header" />

                  {/* Additional Category News Section */}
                  <CategoryNewsSection category="Bola & Sports" />
                </>
              );
            };
