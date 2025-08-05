// src/components/sections/NavbarSection/index.tsx
import React from 'react';
import { Header } from '../../organisms/Header';
import { Navbar } from '../../organisms/Navbar';

const NavbarSection: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Header dengan Logo, Search, dan User Actions */}
      <Header />
      
      {/* Navbar dengan Menu Kategori dan Layanan */}
      <Navbar />
    </div>
  );
};

export default NavbarSection;