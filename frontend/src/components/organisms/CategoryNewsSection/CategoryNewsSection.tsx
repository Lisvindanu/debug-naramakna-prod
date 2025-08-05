import React from 'react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  imageSrc?: string;
  href?: string;
  isAd?: boolean; // Added for NewsItemComponent
}

interface CategoryNewsSectionProps {
  category: string;
  newsItems?: NewsItem[];
  className?: string;
}

export const CategoryNewsSection: React.FC<CategoryNewsSectionProps> = ({
  category,
  newsItems = [],
  className = ''
}) => {
     // Dummy data untuk kategori berita
   const defaultNewsItems: NewsItem[] = [
     {
       id: '1',
       title: 'Berita Terkini dari Kategori ' + category,
       source: 'naramaknaNEWS',
       timeAgo: '2 jam'
     },
     {
       id: '2',
       title: 'Update Terbaru ' + category,
       source: 'naramaknaNEWS',
       timeAgo: '4 jam'
     },
     {
       id: '3',
       title: 'Perkembangan ' + category + ' Terkini',
       source: 'naramaknaNEWS',
       timeAgo: '6 jam'
     },
     {
       id: '4',
       title: 'Berita Terbaru ' + category + ' Hari Ini',
       source: 'naramaknaNEWS',
       timeAgo: '1 jam'
     },
     {
       id: '5',
       title: 'Update Terkini ' + category + ' Terbaru',
       source: 'naramaknaNEWS',
       timeAgo: '3 jam'
     },
     {
       id: '6',
       title: 'Berita ' + category + ' Terpopuler Minggu Ini',
       source: 'naramaknaNEWS',
       timeAgo: '5 jam'
     },
     {
       id: '7',
       title: 'Analisis Mendalam ' + category + ' Terkini',
       source: 'naramaknaNEWS',
       timeAgo: '7 jam'
     },
     {
       id: '8',
       title: 'Fakta Menarik ' + category + ' yang Perlu Diketahui',
       source: 'naramaknaNEWS',
       timeAgo: '9 jam'
     },
     {
       id: '9',
       title: 'Update Terbaru ' + category + ' Hari Ini',
       source: 'naramaknaNEWS',
       timeAgo: '11 jam'
     },
     {
       id: '10',
       title: 'Berita ' + category + ' yang Viral di Media Sosial',
       source: 'naramaknaNEWS',
       timeAgo: '13 jam'
     }
   ];

  const displayNewsItems = newsItems.length > 0 ? newsItems : defaultNewsItems;

  const NewsItemComponent = ({ item }: { item: NewsItem }) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
        {item.imageSrc ? (
          <img 
            src={item.imageSrc} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-xs">Image</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
          {item.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">{item.source}</span>
          {item.isAd && (
            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">Ad</span>
          )}
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-500">{item.timeAgo}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-gray-50 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-naramakna-gold rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
          </div>
          <a 
            href="#" 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors duration-200"
          >
            <span>Lihat lainnya</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
                     {/* Main News Column (Left) - Single Large Article */}
           <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="relative h-full">
               {/* Full Image Background - Extends to bottom */}
               <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                 <div className="text-center">
                   <span className="text-white text-6xl font-bold">{category.charAt(0)}</span>
                   <div className="text-white text-sm mt-2">{category}</div>
                 </div>
               </div>
               
               {/* Text Overlay */}
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                 <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                   {displayNewsItems[0]?.title || `Berita Terkini dari Kategori ${category}`}
                 </h3>
                 <div className="flex items-center space-x-2 text-sm text-gray-200">
                   <span>{displayNewsItems[0]?.source || 'naramaknaNEWS'}</span>
                   <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   <span>{displayNewsItems[0]?.timeAgo || '2 jam'}</span>
                 </div>
               </div>
             </div>
           </div>

                     {/* Middle Column - Trending */}
           <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
             <div className="p-4 border-b border-gray-200">
               <div className="flex items-center space-x-2">
                 <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                 <h2 className="text-lg font-semibold text-gray-900">Trending di {category}</h2>
               </div>
             </div>
             <div className="p-4 max-h-96 overflow-y-auto scrollbar-hide">
               {displayNewsItems.slice(1, 6).map((item) => (
                 <NewsItemComponent key={item.id} item={item} />
               ))}
             </div>
           </div>

           {/* Right Column - Latest */}
           <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
             <div className="p-4 border-b border-gray-200">
               <div className="flex items-center space-x-2">
                 <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                 <h2 className="text-lg font-semibold text-gray-900">Terbaru di {category}</h2>
               </div>
             </div>
             <div className="p-4 max-h-96 overflow-y-auto scrollbar-hide">
               {displayNewsItems.slice(6, 10).map((item) => (
                 <NewsItemComponent key={item.id} item={item} />
               ))}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}; 