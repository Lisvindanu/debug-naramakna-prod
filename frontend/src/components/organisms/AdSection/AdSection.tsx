import React from 'react';
import { AdBanner } from '../../molecules/AdBanner';

interface AdSectionProps {
  className?: string;
  position?: 'top' | 'bottom';
  imageSrc?: string;
  altText?: string;
  href?: string;
  isPlaceholder?: boolean;
  size?: 'header' | 'regular';
}

export const AdSection: React.FC<AdSectionProps> = ({
  className = '',
  position = 'top',
  imageSrc,
  altText,
  href,
  isPlaceholder = true,
  size = 'regular'
}) => {
  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <AdBanner
        imageSrc={imageSrc}
        altText={altText}
        href={href}
        isPlaceholder={isPlaceholder}
        size={size}
      />
    </div>
  );
}; 