import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  title: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface NavDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({
  trigger,
  items,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
    setIsOpen(false);
  };

  // Data untuk kolom tengah (Company/Information Links)
  const companyLinks = [
    'Tentang Kami',
    'Cara Menulis di naramakna',
    'Informasi Kerja Sama',
    'Bantuan',
    'Iklan'
  ];

  // Data untuk kolom kanan (Social Media Links)
  const socialMediaLinks = [
    'Instagram',
    'Facebook',
    'Tiktok',
    'Youtube',
    'Whatsapp',
    'X'
  ];

  return (
    <div className={`relative ${className}`} ref={triggerRef}>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          {/* Dark overlay for page content */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            style={{ top: '120px' }} // Start below NavHeader + NavKategori
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown positioned below NavKategori */}
          <div 
            className="fixed z-40 bg-white shadow-2xl border border-naramakna-gray-200 w-full"
            style={{ 
              top: '120px', // Below NavHeader + NavKategori
              left: 0,
              right: 0
            }}
            ref={dropdownRef}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-3 gap-8">
                
                {/* Left Column - Icons and Features */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-4">Fitur Utama</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start text-start p-3 rounded-lg hover:bg-naramakna-gray-100 cursor-pointer transition-colors duration-200"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="w-10 h-10 flex items-center justify-center mb-2">
                          {item.icon}
                        </div>
                        <div className="text-sm font-medium text-naramakna-gray-900">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-naramakna-gray-600 mt-1 text-start">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Column - Company/Information Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-4">Informasi</h3>
                  {companyLinks.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-sm text-naramakna-gray-700 hover:text-naramakna-gold py-1 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>

                {/* Right Column - Social Media Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-naramakna-gray-900 mb-4">Media Sosial</h3>
                  {socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-sm text-naramakna-gray-700 hover:text-naramakna-gold py-1 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                  
                  {/* Copyright and Version */}
                  <div className="pt-4 mt-4 border-t border-naramakna-gray-200">
                    <div className="text-xs text-naramakna-gray-500">
                      2025 © PT Solusi Komunikasi Terapan
                    </div>
                    <div className="text-xs text-naramakna-gray-500 mt-1">
                      Version 1.0.0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};