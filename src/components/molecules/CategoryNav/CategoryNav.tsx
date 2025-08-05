// src/components/molecules/CategoryNav/CategoryNav.tsx
import React from 'react';

export interface CategoryItem {
  label: string;
  href: string;
  variant?: 'default' | 'primary' | 'secondary';
  active?: boolean;
}

export interface CategoryNavProps {
  items: CategoryItem[];
  className?: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  items,
  className = '',
}) => {
  const getVariantClasses = (variant: string = 'default', active: boolean = false) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 text-center whitespace-nowrap flex-shrink-0';
    
    const variantClasses = {
      default: active 
        ? 'text-[#db9942] bg-[#db9942]/10' 
        : 'text-gray-700 hover:text-[#db9942]',
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-emerald-500 text-white hover:bg-emerald-600',
    };
    
    return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]}`;
  };

  return (
    <div className={`flex items-center gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={getVariantClasses(item.variant, item.active)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default CategoryNav;