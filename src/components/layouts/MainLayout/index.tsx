// src/components/layouts/MainLayout/index.tsx
import React from 'react';
import NavbarSection from '../../sections/NavbarSection';
import FooterSection from '../../sections/FooterSection';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showFooter = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <NavbarSection />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <FooterSection />}
    </div>
  );
};

export default MainLayout;