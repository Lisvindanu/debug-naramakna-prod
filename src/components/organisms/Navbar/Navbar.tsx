// src/components/organisms/Navbar/Navbar.tsx
import React from 'react';
import { NavigationMenu, type NavItem } from '../../molecules/NavigationMenu';
import { CategoryNav, type CategoryItem } from '../../molecules/CategoryNav';

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  // Data kategori utama seperti Kumparan
  const mainNavItems: NavItem[] = [
    { 
      label: 'News', 
      href: '/news',
      dropdown: [
        { label: 'Politik', href: '/news/politik' },
        { label: 'Hukum', href: '/news/hukum' },
        { label: 'Ekonomi', href: '/news/ekonomi' },
        { label: 'Metro', href: '/news/metro' },
        { label: 'Internasional', href: '/news/internasional' },
      ]
    },
    { 
      label: 'Entertainment', 
      href: '/entertainment',
      dropdown: [
        { label: 'Musik', href: '/entertainment/musik' },
        { label: 'Film', href: '/entertainment/film' },
        { label: 'Celebrity', href: '/entertainment/celebrity' },
        { label: 'TV', href: '/entertainment/tv' },
      ]
    },
    { 
      label: 'Tekno & Sains', 
      href: '/tekno',
      dropdown: [
        { label: 'Teknologi', href: '/tekno/teknologi' },
        { label: 'Sains', href: '/tekno/sains' },
        { label: 'Gadget', href: '/tekno/gadget' },
        { label: 'Internet', href: '/tekno/internet' },
      ]
    },
    { 
      label: 'Bisnis', 
      href: '/bisnis',
      dropdown: [
        { label: 'Startup', href: '/bisnis/startup' },
        { label: 'Investasi', href: '/bisnis/investasi' },
        { label: 'UMKM', href: '/bisnis/umkm' },
        { label: 'Keuangan', href: '/bisnis/keuangan' },
      ]
    },
    { 
      label: 'Bola & Sports', 
      href: '/sports',
      dropdown: [
        { label: 'Sepak Bola', href: '/sports/sepakbola' },
        { label: 'Basket', href: '/sports/basket' },
        { label: 'Badminton', href: '/sports/badminton' },
        { label: 'MotoGP', href: '/sports/motogp' },
      ]
    },
    { 
      label: 'Otomotif', 
      href: '/otomotif',
      dropdown: [
        { label: 'Mobil', href: '/otomotif/mobil' },
        { label: 'Motor', href: '/otomotif/motor' },
        { label: 'Modifikasi', href: '/otomotif/modifikasi' },
        { label: 'Tips', href: '/otomotif/tips' },
      ]
    },
    { 
      label: 'Woman', 
      href: '/woman',
      dropdown: [
        { label: 'Fashion', href: '/woman/fashion' },
        { label: 'Beauty', href: '/woman/beauty' },
        { label: 'Health', href: '/woman/health' },
        { label: 'Relationship', href: '/woman/relationship' },
      ]
    },
    { 
      label: 'Food & Travel', 
      href: '/food-travel',
      dropdown: [
        { label: 'Kuliner', href: '/food-travel/kuliner' },
        { label: 'Resep', href: '/food-travel/resep' },
        { label: 'Wisata', href: '/food-travel/wisata' },
        { label: 'Hotel', href: '/food-travel/hotel' },
      ]
    },
    { 
      label: 'Mom', 
      href: '/mom',
      dropdown: [
        { label: 'Parenting', href: '/mom/parenting' },
        { label: 'Kehamilan', href: '/mom/kehamilan' },
        { label: 'Anak', href: '/mom/anak' },
        { label: 'Keluarga', href: '/mom/keluarga' },
      ]
    },
    { 
      label: 'Bolanita', 
      href: '/bolanita' 
    },
    { 
      label: 'Lainnya', 
      href: '/lainnya',
      dropdown: [
        { label: 'Lifestyle', href: '/lainnya/lifestyle' },
        { label: 'Pendidikan', href: '/lainnya/pendidikan' },
        { label: 'Kesehatan', href: '/lainnya/kesehatan' },
        { label: 'Agama', href: '/lainnya/agama' },
        { label: 'Hobi', href: '/lainnya/hobi' },
      ]
    },
  ];

  // Data layanan/kategori bawah
  const categoryItems: CategoryItem[] = [
    { label: 'Breaking News', href: '/breaking-news', variant: 'default', active: true },
    { label: 'Halal Living', href: '/halal-living', variant: 'primary' },
    { label: 'Green Initiative', href: '/green-initiative', variant: 'secondary' },
    { label: 'Video Story', href: '/video-story', variant: 'default' },
    { label: 'Trending', href: '/trending', variant: 'default' },
    { label: 'naramaknaPLUS', href: '/naramakna-plus', variant: 'default' },
    { label: 'Opini & Cerita', href: '/opini-cerita', variant: 'default' },
  ];

  return (
    <nav className={`bg-white border-b border-gray-200 w-full ${className}`}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Main Navigation - Responsive */}
        <div className="hidden lg:block py-2 xl:py-3 2xl:py-4 border-b border-gray-100">
          <NavigationMenu items={mainNavItems} className="justify-center xl:justify-start 2xl:space-x-8 3xl:space-x-12" />
        </div>

        {/* Category Navigation - Responsive */}
        <div className="py-2 xl:py-3 2xl:py-4">
          <CategoryNav items={categoryItems} className="justify-center lg:justify-start text-xs lg:text-sm xl:text-base" />
        </div>

        {/* Mobile Navigation Menu */}
        <div className="lg:hidden border-t border-gray-100 py-4">
          <div className="space-y-3">
            {mainNavItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#db9942] hover:bg-gray-50 rounded-md"
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-3 py-1 text-sm text-gray-600 hover:text-[#db9942] hover:bg-gray-50 rounded-md"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;