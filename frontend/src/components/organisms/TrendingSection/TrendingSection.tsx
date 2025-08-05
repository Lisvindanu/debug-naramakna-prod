import React from 'react';
import { TrendingList } from '../../molecules/TrendingList';

interface TrendingArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  imageSrc?: string;
  href?: string;
}

interface TrendingSectionProps {
  articles?: TrendingArticle[];
  className?: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  articles = [],
  className = ''
}) => {
  // Dummy data jika tidak ada articles yang diberikan
  const defaultArticles: TrendingArticle[] = [
    {
      id: '1',
      title: 'Komjen Fadil Imran Jabat Astama Ops Kapolri, Gantikan Komjen Akhmad Wiyagus',
      source: 'naramaknaNEWS',
      timeAgo: '4 jam',
      imageSrc: undefined
    },
    {
      id: '2',
      title: 'Dahlia Poland Gugat Cerai Fandy Christian',
      source: 'naramaknaHITS',
      timeAgo: '10 jam',
      imageSrc: undefined
    },
    {
      id: '3',
      title: 'Profil Irjen Asep Edi Suheri, Wakabareskrim Polri yang Kini Jabat Kapolda Metro',
      source: 'naramaknaNEWS',
      timeAgo: '4 jam',
      imageSrc: undefined
    },
    {
      id: '4',
      title: 'KRL Gangguan Lagi, Kali Ini Terjadi di Stasiun Manggarai',
      source: 'naramaknaNEWS',
      timeAgo: '6 jam',
      imageSrc: undefined
    },
    {
      id: '5',
      title: 'Pemerintah Akan Terbitkan Aturan Baru untuk E-commerce',
      source: 'naramaknaNEWS',
      timeAgo: '8 jam',
      imageSrc: undefined
    }
  ];

  const displayArticles = articles.length > 0 ? articles.slice(0, 5) : defaultArticles;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-6 bg-naramakna-gold rounded-full"></div>
          <h2 className="text-lg font-semibold text-gray-900">Trending</h2>
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

      {/* Content */}
      <div className="p-4">
        <div className="max-h-96 overflow-y-auto">
          <TrendingList articles={displayArticles} />
        </div>
      </div>
    </div>
  );
}; 