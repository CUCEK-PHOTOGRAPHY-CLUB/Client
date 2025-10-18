import React, { useState, useEffect, useLayoutEffect } from 'react';

// Import all the section components
import Preloader from '../componets/event/Preloader.jsx';
import Hero from '../componets/event/Hero.jsx';
import About from '../componets/event/About.jsx';
import PastGlories from '../componets/event/PastGlories.jsx';
import Register from '../componets/event/Register.jsx';
import Contact from '../componets/event/Contact.jsx';
import Footer from '../componets/event/Footer.jsx';

const HalloweenEventPage = () => {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay to show preloader
        await new Promise(resolve => setTimeout(resolve, 1000));

        // This is the mock data from your preview, which powers the components.
        const data = {
          logoUrl: '/logo/whitelogo.svg', // Placeholder, adjust if needed
          hero: { backgroundImageUrl: 'https://images.unsplash.com/photo-1572521165321-4ff6715d1b24?q=80&w=2070&auto=format&fit=crop' },
          about: {
            cards: [
              { title: "Horror Icons Reimagined", frontImageUrl: "https://images.unsplash.com/photo-1542289637-937001634409?q=80&w=1974&auto=format&fit=crop", description: "Choose a character from your favorite horror movie or series. Your goal is to recreate them with chilling accuracy through a cinematic photoshoot." },
              { title: "The Perfect Scene", frontImageUrl: "https://images.unsplash.com/photo-1598360886538-745906334e33?q=80&w=1974&auto=format&fit=crop", description: "The background tells its own story. Design a spine-chilling set that complements your character and enhances the cinematic quality of your photo." },
              { title: "Behind The Screams", frontImageUrl: "https://images.unsplash.com/photo-1505692009949-c96853a4b6a9?q=80&w=2070&auto=format&fit=crop", description: "Document your creative process! Submit a BTS video showcasing the making of your photoshoot, from costume and makeup to the final shot." }
            ]
          },
          pastGlories: {
            images: [
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+1', style: { width: '25%', top: '5%', left: '5%', transform: 'rotate(-8deg)', zIndex: 1 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+2', style: { width: '20%', top: '20%', left: '28%', transform: 'rotate(5deg)', zIndex: 3 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+3', style: { width: '28%', top: '8%', left: '50%', transform: 'rotate(10deg)', zIndex: 2 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+4', style: { width: '22%', top: '45%', left: '12%', transform: 'rotate(3deg)', zIndex: 4 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+5', style: { width: '26%', top: '50%', left: '40%', transform: 'rotate(-5deg)', zIndex: 5 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+6', style: { width: '20%', top: '35%', left: '75%', transform: 'rotate(8deg)', zIndex: 6 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+7', style: { width: '24%', top: '70%', left: '5%', transform: 'rotate(-10deg)', zIndex: 7 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+8', style: { width: '22%', top: '75%', left: '30%', transform: 'rotate(4deg)', zIndex: 8 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+9', style: { width: '25%', top: '65%', left: '55%', transform: 'rotate(9deg)', zIndex: 9 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+10', style: { width: '18%', top: '78%', left: '80%', transform: 'rotate(-7deg)', zIndex: 10 } },
                { src: 'https://placehold.co/300x400/1A0B2E/FFFFFF?text=Glory+11', style: { width: '15%', top: '0%', left: '35%', transform: 'rotate(-4deg)', zIndex: 0 } },
            ]
          }
        };
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventData();
  }, []);

  // This effect controls how long the preloader is visible for a smooth transition
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 200); // Reduced delay from 1500ms to 200ms
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="font-special-elite halloween-theme">
      {/* This style block ensures the custom fonts are correctly applied to the Tailwind classes */}
      <style>{`
        .font-creepster {
          font-family: "Creepster", cursive;
        }
        .font-special-elite {
          font-family: "Special Elite", cursive;
        }
      `}</style>
      <Preloader isLoaded={isLoaded} />
      {!isLoading && eventData && (
        <main>
          <Hero heroData={eventData.hero} />
          <About aboutData={eventData.about} />
          <PastGlories pastGloriesData={eventData.pastGlories} />
          <Register />
          <Contact />
          <Footer logoUrl={eventData.logoUrl} />
        </main>
      )}
      {/* Fallback loading text if something goes wrong */}
      {isLoading && !isLoaded && (
         <div className="h-screen flex justify-center items-center"><p>Loading Content...</p></div>
      )}
    </div>
  );
};

export default HalloweenEventPage;
