// src/components/pages/HomePage/index.tsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section - Fully Responsive */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32 w-full">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="text-center">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold text-gray-900 mb-4 lg:mb-6 xl:mb-8">
              <span className="text-black">nara</span>
              <span className="text-[#db9942]">makna</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-600 mb-6 lg:mb-8 xl:mb-10 max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
              Bicara Fakta Lewat Berita - Platform berita terpercaya dari PT Solusi Komunikasi Terapan
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 xl:gap-6 justify-center">
              <button className="bg-[#db9942] text-white px-6 sm:px-8 lg:px-10 xl:px-12 py-3 lg:py-4 xl:py-5 rounded-lg font-medium hover:bg-[#c8883a] transition-colors text-sm lg:text-base xl:text-lg">
                Baca Berita Terbaru
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 sm:px-8 lg:px-10 xl:px-12 py-3 lg:py-4 xl:py-5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm lg:text-base xl:text-lg">
                Tentang Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Content - Fully Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-white w-full">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="text-center mb-8 lg:mb-12 xl:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-3 lg:mb-4 xl:mb-6">
              Navbar Naramakna Demo
            </h2>
            <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600 max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
              Navbar telah dibangun menggunakan Atomic Design pattern dengan komponen yang responsif dan mudah dikustomisasi
            </p>
          </div>

          {/* Fitur Navbar - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mb-12 lg:mb-16 xl:mb-20">
            <div className="text-center p-4 lg:p-6 xl:p-8 2xl:p-10 bg-gray-50 rounded-lg">
              <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-3 lg:mb-4 xl:mb-6">🎨</div>
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 mb-2 lg:mb-3">Atomic Design</h3>
              <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-600">Struktur komponen terorganisir: Atoms, Molecules, Organisms</p>
            </div>
            
            <div className="text-center p-4 lg:p-6 xl:p-8 2xl:p-10 bg-gray-50 rounded-lg">
              <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-3 lg:mb-4 xl:mb-6">📱</div>
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 mb-2 lg:mb-3">Responsif</h3>
              <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-600">Mobile-first untuk semua ukuran layar: 14", 17", 24", 27", tablet, mobile</p>
            </div>
            
            <div className="text-center p-4 lg:p-6 xl:p-8 2xl:p-10 bg-gray-50 rounded-lg md:col-span-2 xl:col-span-1">
              <div className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-3 lg:mb-4 xl:mb-6">🔍</div>
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 mb-2 lg:mb-3">Search Ready</h3>
              <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-600">Search bar terintegrasi dengan UI yang clean dan modern</p>
            </div>
          </div>

          {/* Screen Size Guide */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 lg:p-8 xl:p-10 2xl:p-12 mb-8 lg:mb-12 xl:mb-16">
            <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-800 mb-4 lg:mb-6 text-center">
              📏 Optimized untuk Semua Layar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">Mobile</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">375px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">Tablet</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">768px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">14"</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">1024px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">17"</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">1280px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">24"</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">1536px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">27"</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">1920px+</div>
              </div>
              <div className="bg-white p-3 lg:p-4 rounded-lg shadow-sm">
                <div className="text-xs lg:text-sm font-medium text-gray-600">Ultra</div>
                <div className="text-lg lg:text-xl font-bold text-[#db9942]">2560px+</div>
              </div>
            </div>
          </div>

          {/* Placeholder untuk konten berita */}
          <div className="bg-gray-100 rounded-lg p-8 lg:p-12 xl:p-16 2xl:p-20 text-center">
            <h3 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-700 mb-3 lg:mb-4 xl:mb-6">Konten Berita</h3>
            <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-600 mb-4 lg:mb-6 xl:mb-8">Area ini akan digunakan untuk menampilkan artikel dan berita terbaru</p>
            <div className="w-12 lg:w-16 xl:w-20 2xl:w-24 h-1 lg:h-1.5 xl:h-2 bg-[#db9942] mx-auto"></div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;