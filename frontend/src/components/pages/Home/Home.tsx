// Halaman utama/homepage dengan feed artikel dan video
import React from 'react';
import { Navbar } from '../../organisms/Navbar';
import { AdSection } from '../../organisms/AdSection/AdSection';
import { PollingSection } from '../../organisms/PollingSection/PollingSection';
import { VideoSection } from '../../organisms/VideoSection/VideoSection';
import { NewsSection } from '../../organisms/NewsSection/NewsSection';
import { DynamicCategorySections } from '../../organisms/DynamicCategorySections/DynamicCategorySections';
import { MainContentSection } from '../../organisms/MainContentSection/MainContentSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Component */}
      <Navbar />

      {/* Ad Section */}
      <AdSection size='header'/>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* MainContentSection  */}
        <MainContentSection />

        {/* Ad Section */}
        <AdSection size='header'/>

        {/* Video Section */}
        <VideoSection />
        
        {/* Polling Section */}
        <PollingSection />

        {/* Ad Section */}
        <AdSection size='regular'/>
        
        {/* News Section */}
        <NewsSection />
        
        {/* Dynamic Category Sections */}
        <DynamicCategorySections />
      </div>
    </div>
  );
};
