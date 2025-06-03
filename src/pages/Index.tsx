
import React from 'react';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black font-inter overflow-hidden relative">
      {/* Background Image - responsive */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/lovable-uploads/75838767-2b1b-4c4a-a8d4-3686ad0af0cb.png")',
          backgroundPosition: 'center left'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Music Player Space - Ready for implementation */}
      <div className="absolute top-4 left-4 z-20">
        {/* TODO: Add music player component here */}
        <div className="hidden">
          {/* Music player will be implemented here */}
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Text content */}
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-wider">
                DR. PABLO BERINI LEMGRUBER
              </h1>
              <p className="text-xl text-gray-300 mb-12 tracking-widest">
                MEDICINA 2025
              </p>
              
              {/* Countdown Timer */}
              <div className="flex justify-center lg:justify-start">
                <CountdownTimer />
              </div>
            </div>

            {/* Right side - Content area (can be used for additional content if needed) */}
            <div className="hidden lg:block">
              {/* This space is available for additional content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
