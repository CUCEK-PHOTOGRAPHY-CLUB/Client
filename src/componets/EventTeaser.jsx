import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const EventTeaser = () => {
  return (
    <section 
      className="py-32 md:py-40 text-white text-center relative bg-cover bg-center min-h-screen flex items-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517405030045-45f7ad942106?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1928')` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-red-600 animate-pulse" style={{ fontFamily: "'Creepster', cursive", textShadow: '4px 4px 8px rgba(0,0,0,1), 0 0 15px #dc2626, 0 0 30px #dc2626' }}>
          Halloween Contest
        </h2>
        <Link
          to="/halloween-contest"
          className="inline-block bg-gradient-to-r from-gray-900 to-black hover:from-red-900 hover:to-black text-white font-bold py-4 px-12 rounded-full text-xl md:text-2xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl border-4 border-red-600 shadow-lg"
          style={{ fontFamily: "'Creepster', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.9)', boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}
        >
          ⚡ Join The Upside Down ⚡
        </Link>
      </div>
    </section>
  );
};

export default EventTeaser;
