// src/components/sections/NavbarSection/index.tsx
import React, { useState } from 'react';
import Logo from '../../ui/Logo';
import SearchBlock from '../../blocks/SearchBlock';
import NavigationBlock from '../../blocks/NavigationBlock';
import ServiceBlock from '../../blocks/ServiceBlock';
import UserActionsBlock from '../../blocks/UserActionsBlock';

const NavbarSection: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Block - Desktop */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBlock />
          </div>

          {/* User Actions */}
          <div className="flex-shrink-0">
            <UserActionsBlock onMenuToggle={handleMenuToggle} />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-200">
          <NavigationBlock 
            isOpen={isMobileMenuOpen} 
            onClose={handleMenuClose} 
          />
        </div>
      </div>

      {/* Service Menu */}
      <ServiceBlock />
    </header>
  );
};

export default NavbarSection;