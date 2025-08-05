// Komponen untuk display banner iklan
import React from 'react';

interface AdBannerProps {
  className?: string;
  imageSrc?: string;
  altText?: string;
  href?: string;
  isPlaceholder?: boolean;
  size?: 'header' | 'regular'; // header: 970x250, regular: 728x90
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  imageSrc,
  altText = 'Advertisement',
  href,
  isPlaceholder = true,
  size = 'regular'
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'header':
        return 'w-full max-w-[970px] h-[250px] md:w-[970px]';
      case 'regular':
      default:
        return 'w-full max-w-[728px] h-[90px] md:w-[728px]';
    }
  };

  const getPlaceholderText = () => {
    switch (size) {
      case 'header':
        return '970 x 250';
      case 'regular':
      default:
        return '728 x 90';
    }
  };

  if (isPlaceholder) {
    return (
      <div className={`${getSizeClasses()} bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-gray-500 font-medium">Advertisement Banner</div>
          <div className="text-gray-400 text-sm">{getPlaceholderText()}</div>
          <div className="text-gray-400 text-xs mt-1">
            Placeholder: {imageSrc || 'No image specified'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getSizeClasses()} ${className}`}>
      {href ? (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block w-full h-full"
        >
          <img 
            src={imageSrc} 
            alt={altText}
            className="w-full h-full object-cover"
          />
        </a>
      ) : (
        <img 
          src={imageSrc} 
          alt={altText}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
