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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border border-naramakna-gray-200 py-4 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid gap-1 px-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-naramakna-gray-100 cursor-pointer transition-colors duration-200"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-naramakna-gray-900 truncate">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs text-naramakna-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};