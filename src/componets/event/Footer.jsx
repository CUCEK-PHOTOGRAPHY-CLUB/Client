import React from 'react';

const Footer = ({ logoUrl }) => {
  if (!logoUrl) return null;
  return (
    <footer 
      className="py-8 px-4 text-center text-gray-400 relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1477516561410-f0b5dd8319e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932')` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex justify-center items-center mb-4">
          <img src={logoUrl} alt="CUCEK Photography Club Logo" className="w-12 h-12 mr-4 rounded-full" />
          <span className="text-xl font-creepster text-white">CUCEK PHOTOGRAPHY CLUB</span>
        </div>
        <div className="space-x-6 mb-4">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#past-glories" className="hover:text-red-500 transition-colors">Past Glories</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
        </div>
        <p>&copy; 2025 CUCEK Photography Club. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
