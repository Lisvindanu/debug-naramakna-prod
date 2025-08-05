import React, { useState, useRef } from 'react';
import { PollingCard } from '../../molecules/PollingCard';

interface PollingOption {
  id: string;
  text: string;
  percentage?: number;
}

interface PollingData {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  imageSrc?: string;
  options: PollingOption[];
  totalVotes: number;
  daysLeft: number;
  date: string;
}

interface PollingSectionProps {
  polls?: PollingData[];
  className?: string;
}

export const PollingSection: React.FC<PollingSectionProps> = ({
  polls = [],
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dummy data untuk polling
  const defaultPolls: PollingData[] = [
    {
      id: '1',
             title: 'Polling: Danantara Hapus Tantiem Komisaris BUMN, Sudah Tepat?',
       source: 'naramaknaBISNIS',
       timeAgo: '6 hari',
      options: [
        { id: '1-1', text: 'Sudah tepat' },
        { id: '1-2', text: 'Tidak' }
      ],
      totalVotes: 459,
      daysLeft: 6,
      date: '4 Agt 2025'
    },
    {
      id: '2',
             title: 'Polling: Apakah Kamu Sudah Mencoba Main Padel?',
       source: 'naramaknaBISNIS',
       timeAgo: '4 hari',
      options: [
        { id: '2-1', text: 'Sudah' },
        { id: '2-2', text: 'Belum, tapi penasaran' },
        { id: '2-3', text: 'Enggak tertarik' }
      ],
      totalVotes: 949,
      daysLeft: 4,
      date: '3 Agt 2025'
    },
    {
      id: '3',
             title: 'Polling: Sudah Beli Apa Saja di GIIAS 2025?',
       source: 'naramaknaOTO',
       timeAgo: '2 hari',
      options: [
        { id: '3-1', text: 'Mobil', percentage: 24.39 },
        { id: '3-2', text: 'Motor', percentage: 2.60 },
        { id: '3-3', text: 'Aksesoris/Tools', percentage: 8.62 },
        { id: '3-4', text: 'Sparepart', percentage: 1.46 },
        { id: '3-5', text: 'Cuma lihat-lihat doang', percentage: 62.93 }
      ],
      totalVotes: 1250,
      daysLeft: 2,
      date: '1 Agt 2025'
    },
    {
      id: '4',
             title: 'Polling: Apakah Kamu Setuju dengan Kebijakan Baru Pemerintah?',
       source: 'naramaknaBISNIS',
       timeAgo: '1 hari',
      options: [
        { id: '4-1', text: 'Setuju' },
        { id: '4-2', text: 'Tidak setuju' },
        { id: '4-3', text: 'Netral' }
      ],
      totalVotes: 789,
      daysLeft: 1,
      date: '31 Jul 2025'
    },
    {
      id: '5',
             title: 'Polling: Platform Streaming Favorit Kamu?',
       source: 'naramaknaHITS',
       timeAgo: '3 hari',
      options: [
        { id: '5-1', text: 'Netflix' },
        { id: '5-2', text: 'Disney+' },
        { id: '5-3', text: 'Viu' },
        { id: '5-4', text: 'YouTube Premium' },
        { id: '5-5', text: 'Lainnya' }
      ],
      totalVotes: 1567,
      daysLeft: 3,
      date: '29 Jul 2025'
    }
  ];

  const displayPolls = polls.length > 0 ? polls : defaultPolls;

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 320 + 24; // w-80 + space-x-6
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newScrollLeft = Math.min(container.scrollLeft + itemWidth, maxScroll);
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setCurrentIndex(Math.min(currentIndex + 1, displayPolls.length - 1));
    }
  };

  return (
    <div className={`bg-gray-50 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
                          <div className="flex items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-1 h-6 bg-naramakna-gold rounded-full"></div>
                      <h2 className="text-xl font-semibold text-gray-900">Polling</h2>
                    </div>
                  </div>

                 {/* Polling Cards */}
         <div className="relative">
           <div 
             ref={scrollContainerRef}
             className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
           >
             {displayPolls.map((poll) => (
               <div key={poll.id} className="flex-shrink-0 w-80">
                 <PollingCard
                   id={poll.id}
                   title={poll.title}
                   source={poll.source}
                   timeAgo={poll.timeAgo}
                   imageSrc={poll.imageSrc}
                   options={poll.options}
                   totalVotes={poll.totalVotes}
                   daysLeft={poll.daysLeft}
                   date={poll.date}
                 />
               </div>
             ))}
           </div>

           {/* Floating Navigation Button - Hidden on mobile */}
           <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:block">
             <button 
               onClick={handleNext}
               disabled={currentIndex >= displayPolls.length - 1}
               className="w-10 h-10 bg-naramakna-gold text-white rounded-full shadow-lg hover:bg-naramakna-gold/80 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}; 