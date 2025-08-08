import React from 'react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  imageSrc?: string;
  href?: string;
  isAd?: boolean;
}

interface NewsSectionProps {
  newsItem?: NewsItem;
  trendingItems?: NewsItem[];
  latestItems?: NewsItem[];
  className?: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  newsItem,
  trendingItems = [],
  latestItems = [],
  className = ''
}) => {
  // Dummy data untuk news utama (left column)
  const defaultNewsItem: NewsItem = {
    id: '1',
    title: 'Perjalanan eFishery: Dari Startup Sederhana, Jadi Unicorn lalu Kolaps',
    source: 'naramaknaNEWS',
    timeAgo: '51 menit'
  };

  // Dummy data untuk trending (middle column)
  const defaultTrendingItems: NewsItem[] = [
    {
      id: '1',
      title: 'Mutasi Pejabat Polri: Komjen Syahardiantono Jadi Kabareskrim',
      source: 'naramaknaNEWS',
      timeAgo: '5 jam'
    },
    {
      id: '2',
      title: 'Hasil Autopsi Jasad Paskibra Terkubur Tanpa Busana di Madina: Mati Lemas',
      source: 'naramaknaNEWS',
      timeAgo: '12 jam'
    },
    {
      id: '3',
      title: 'Panser Anoa TNI Bersiaga di Kejagung, Ada Apa?',
      source: 'naramaknaNEWS',
      timeAgo: '3 jam'
    }
  ];

  // Dummy data untuk latest (right column)
  const defaultLatestItems: NewsItem[] = [
    {
      id: '1',
      title: 'Gizi Anak Jadi Prioritas, BGN Support Penuh Program Sekolah Rakyat',
      source: 'naramaknaNEWS',
      timeAgo: '46 menit'
    },
    {
      id: '2',
      title: 'Foto: Fast Boat Dolpin II di Bali Alami Kecelakaan, 2 WNA Tewas & 1 ABK Hilang',
      source: 'naramaknaNEWS',
      timeAgo: '51 menit'
    },
    {
      id: '3',
      title: 'Update Terbaru: Perkembangan Teknologi di Indonesia',
      source: 'naramaknaNEWS',
      timeAgo: '1 jam'
    },
    {
      id: '4',
      title: 'Berita Ekonomi: Pertumbuhan Pasar Modal Hari Ini',
      source: 'naramaknaNEWS',
      timeAgo: '2 jam'
    },
    {
      id: '5',
      title: 'Olahraga: Hasil Pertandingan Liga Indonesia',
      source: 'naramaknaNEWS',
      timeAgo: '3 jam'
    }
  ];

  const displayNewsItem = newsItem || defaultNewsItem;
  const displayTrendingItems = trendingItems.length > 0 ? trendingItems : defaultTrendingItems;
  const displayLatestItems = latestItems.length > 0 ? latestItems : defaultLatestItems;

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
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 text-left">
          {item.title}
        </h3>
        <div className="flex items-center space-x-2 text-left">
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
            <h2 className="text-xl font-semibold text-gray-900">News</h2>
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
            <div className="relative h-64 lg:h-full">
              {/* Full Image Background - Extends to bottom */}
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-white text-6xl font-bold">e</span>
                  <div className="text-white text-sm mt-2">eFishery</div>
                </div>
              </div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <h3 className="text-lg font-semibold text-white mb-3 leading-tight text-left">
                  Perjalanan eFishery: Dari Startup Sederhana, Jadi Unicorn lalu Kolaps
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-200">
                  <span>naramaknaNEWS</span>
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>51 menit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Trending */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">Populer di News</h2>
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto scrollbar-hide">
              {displayTrendingItems.map((item) => (
                <NewsItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right Column - Latest */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">Terbaru di News</h2>
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto scrollbar-hide">
              {displayLatestItems.map((item) => (
                <NewsItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}; 