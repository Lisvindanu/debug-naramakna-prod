// src/components/organisms/Navbar/Navbar.tsx
import React from 'react';
import { NavigationMenu, type NavItem } from '../../molecules/NavigationMenu';
import { CategoryNav, type CategoryItem } from '../../molecules/CategoryNav';

export interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  // Data kategori utama dengan dropdown untuk "Lainnya"
  const mainNavItems: NavItem[] = [
    { label: 'News', href: '/news' },
    { label: 'Entertainment', href: '/entertainment' },
    { label: 'Tekno & Sains', href: '/tekno' },
    { label: 'Bisnis', href: '/bisnis' },
    { label: 'Bola & Sports', href: '/sports' },
    { label: 'Otomotif', href: '/otomotif' },
    { label: 'Woman', href: '/woman' },
    { label: 'Food & Travel', href: '/food-travel' },
    { label: 'Mom', href: '/mom' },
    { label: 'Bolanita', href: '/bolanita' },
    { 
      label: 'Lainnya', 
      href: '/lainnya',
      dropdown: [
        { label: 'Lifestyle', href: '/lainnya/lifestyle' },
        { label: 'Pendidikan', href: '/lainnya/pendidikan' },
        { label: 'Kesehatan', href: '/lainnya/kesehatan' },
        { label: 'Agama', href: '/lainnya/agama' },
        { label: 'Hobi', href: '/lainnya/hobi' },
        { label: 'Kuliner', href: '/lainnya/kuliner' },
        { label: 'Otomotif Klasik', href: '/lainnya/otomotif-klasik' },
        { label: 'Properti', href: '/lainnya/properti' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-2 gap-2">
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#db9942] hover:bg-gray-50 rounded-md text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;