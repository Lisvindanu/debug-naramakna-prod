// src/components/pages/HomePage/index.tsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import HeroSection from '../../sections/HeroSection';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Demo Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Demo Navbar Naramakna
              </h2>
              <p className="text-lg text-gray-600">
                Navbar telah dibangun menggunakan struktur komponen yang lebih intuitif
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  🎨 UI Components
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  Komponen dasar yang dapat digunakan kembali
                </p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Logo - Branding component</li>
                  <li>• Button - Berbagai variant & size</li>
                  <li>• Input - Search & form inputs</li>
                  <li>• NavLink - Navigation dengan dropdown</li>
                  <li>• IconButton - Button dengan icon</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  🧩 Blocks Components
                </h3>
                <p className="text-green-700 text-sm mb-3">
                  Gabungan UI components untuk fitur tertentu
                </p>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• SearchBlock - Pencarian responsif</li>
                  <li>• NavigationBlock - Menu kategori</li>
                  <li>• ServiceBlock - Menu layanan</li>
                  <li>• UserActionsBlock - Aksi user</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">
                  📦 Sections Components
                </h3>
                <p className="text-purple-700 text-sm mb-3">
                  Bagian besar halaman dengan fungsi lengkap
                </p>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• NavbarSection - Header lengkap</li>
                  <li>• HeroSection - Banner utama</li>
                  <li>• FooterSection - Footer lengkap</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  🏗️ Layouts & Pages
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  Template dan halaman lengkap
                </p>
                <ul className="text-sm text-orange-600 space-y-1">
                  <li>• MainLayout - Layout utama</li>
                  <li>• ArticleLayout - Layout artikel</li>
                  <li>• HomePage - Halaman beranda</li>
                </ul>
              </div>
            </div>

            {/* Features Showcase */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                ✨ Fitur yang Sudah Tersedia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Navbar responsif desktop & mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Search bar dengan animasi smooth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Dropdown menu pada kategori</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Mobile hamburger menu slide</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Service menu dengan hover effects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Sticky navbar saat scroll</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">Struktur komponen yang terorganisir</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm">TypeScript dengan proper typing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;