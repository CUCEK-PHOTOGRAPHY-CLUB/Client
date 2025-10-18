import React from 'react';

const Footer = ({ logoUrl }) => {
  if (!logoUrl) return null;
  return (
    <footer className="bg-gray-900 py-8 px-4 text-center text-gray-400">
      <div className="container mx-auto">
        <div className="flex justify-center items-center mb-4">
          <img src={logoUrl} alt="CUCEK Photography Club Logo" className="w-12 h-12 mr-4 rounded-full" />
          <span className="text-xl font-creepster text-white">CUCEK PHOTOGRAPHY CLUB</span>
        </div>
        <div className="space-x-6 mb-4">
            <a href="#home" className="hover:text-[var(--glow-orange)] transition-colors">Home</a>
            <a href="#about" className="hover:text-[var(--glow-orange)] transition-colors">About</a>
            <a href="#past-glories" className="hover:text-[var(--glow-orange)] transition-colors">Past Glories</a>
            <a href="#contact" className="hover:text-[var(--glow-orange)] transition-colors">Contact</a>
        </div>
        <p>&copy; 2025 CUCEK Photography Club. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
