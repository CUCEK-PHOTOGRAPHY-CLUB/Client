import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { heroApi } from '../../services/api.js';

const imageVariants = {
  initial: { opacity: 0, scale: 1.1, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } },
  exit: { opacity: 0, scale: 1.1, x: -50, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } },
};

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
};

// Helper to optimize image URLs based on provider
const getOptimizedImageUrl = (url, width = 1920) => {
  if (!url) return '';

  // Cloudinary Optimization
  if (url.includes('cloudinary.com')) {
    // Check if valid cloudinary url
    if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  }

  // Unsplash Optimization
  if (url.includes('images.unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}q=80&w=${width}&auto=format`;
  }

  // Generic/Unknown provider - return as is
  return url;
};

// --- Professional Loading Skeleton Component ---
const HeroLoadingSkeleton = () => (
  <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden bg-black">
    {/* Background Skeleton with Shimmer Effect */}
    <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 via-neutral-900/50 to-black/50" />
      <div className="absolute top-0 left-[-150%] h-full w-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>

    {/* Text and Controls Skeleton */}
    <div className="relative z-20 max-w-5xl w-full text-center px-4 animate-pulse">
      {/* Title Placeholder */}
      <div className="h-10 md:h-16 w-3/4 max-w-2xl bg-white/10 rounded-lg mx-auto" />
      {/* Subtitle Placeholder */}
      <div className="mt-6 h-6 md:h-8 w-full max-w-xl bg-white/10 rounded-lg mx-auto" />
    </div>

    {/* Bottom Controls Placeholder */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 animate-pulse">
      <div className="p-2 h-10 w-10 rounded-full bg-white/10"></div>
      <div className="w-48 h-1 bg-white/10 rounded-full"></div>
      <div className="p-2 h-10 w-10 rounded-full bg-white/10"></div>
    </div>
  </section>
);


const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await heroApi.getAll();
        const imagesArray = response.data.data;

        if (Array.isArray(imagesArray)) {
          setHeroImages(imagesArray.slice(0, 5));
        } else {
          throw new Error("API response did not contain a valid array of images.");
        }

      } catch (error) {
        console.error("Error fetching hero images:", error);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  const nextImage = useCallback(() => {
    if (heroImages.length === 0) return;
    setImageIndex((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevImage = useCallback(() => {
    if (heroImages.length === 0) return;
    setImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    if (heroImages.length > 0) {
      const timer = setInterval(nextImage, 6000);
      return () => clearInterval(timer);
    }
  }, [heroImages.length, nextImage]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [imageIndex]);

  // Preload next image logic
  useEffect(() => {
    if (heroImages.length > 0) {
      const nextIdx = (imageIndex + 1) % heroImages.length;
      const nextImage = heroImages[nextIdx];
      if (nextImage) {
        const img = new Image();
        const rawUrl = (isMobile && nextImage.mobileImageUrl) ? nextImage.mobileImageUrl : nextImage.imageUrl;
        img.src = getOptimizedImageUrl(rawUrl, isMobile ? 800 : 1920);
      }
    }
  }, [imageIndex, heroImages, isMobile]);

  if (loading) {
    return <HeroLoadingSkeleton />;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-red-500">{error}</div>;
  }

  if (heroImages.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white">No images found.</div>
  }

  const currentImage = heroImages[imageIndex];
  // Calculate display URL safely
  const rawImageUrl = (isMobile && currentImage.mobileImageUrl) ? currentImage.mobileImageUrl : currentImage.imageUrl;
  const displayImageUrl = getOptimizedImageUrl(rawImageUrl, isMobile ? 800 : 1920);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={imageIndex}
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img
            key={imageIndex}
            src={displayImageUrl}
            alt={currentImage.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            data-critical="true"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="100vw"
            style={{
              filter: isImageLoaded ? 'none' : 'blur(10px)',
              transform: isImageLoaded ? 'scale(1)' : 'scale(1.1)',
              transition: 'all 0.5s ease-in-out'
            }}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-neutral-900">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/60 via-neutral-900/60 to-black/60" />
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-20 max-w-5xl text-center px-4">
        <motion.div key={imageIndex} variants={textVariants} initial="initial" animate="animate">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
            style={{ textShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.title}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"
            style={{ textShadow: '0px 2px 8px rgba(0, 0, 0, 0.5)' }}
            variants={textVariants}
          >
            {currentImage.subtitle}
          </motion.p>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={prevImage} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><FiChevronLeft size={24} /></button>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            key={imageIndex}
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
        <button onClick={nextImage} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><FiChevronRight size={24} /></button>
      </div>
    </section>
  );
};

export default Hero;