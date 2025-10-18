import React from 'react';

const Lightbox = ({ imageSrc, onClose }) => {
  // If no image source is provided, don't render anything
  if (!imageSrc) {
    return null;
  }

  return (
    <div 
      id="lightbox" 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-purple/95 backdrop-blur-sm"
      onClick={onClose} // Close lightbox when clicking on the background
    >
      <div className="relative max-w-4xl max-h-[90vh] p-4">
        {/* Stop propagation so clicking the image doesn't close the lightbox */}
        <img 
          src={imageSrc} 
          alt="Enlarged gallery view" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-glow-orange/30"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-5xl font-bold hover:text-glow-orange transition-colors"
        aria-label="Close lightbox"
      >
        &times;
      </button>
    </div>
  );
};

export default Lightbox;

