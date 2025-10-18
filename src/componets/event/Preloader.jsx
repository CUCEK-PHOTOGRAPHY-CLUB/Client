import React from 'react';

const Preloader = ({ isLoaded }) => {
  return (
    <div 
      className={`fixed inset-0 bg-[var(--bg-purple)] z-[1000] flex justify-center items-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
    >
      <div className="font-creepster text-5xl text-white">
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.1s', color: '#FF6347' }}>L</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.2s', color: '#F59E0B' }}>O</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.3s', color: '#4ade80' }}>A</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.4s', color: '#60a5fa' }}>D</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.5s', color: '#FF6347' }}>I</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.6s', color: '#F59E0B' }}>N</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.7s' }}>G</span>
        <span style={{ animation: 'blink 1.5s infinite', animationDelay: '0.8s' }}>...</span>
      </div>
    </div>
  );
};

export default Preloader;
