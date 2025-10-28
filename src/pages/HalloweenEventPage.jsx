import React, { useState, useEffect } from 'react';

// Import all the section components
import Preloader from '../componets/event/Preloader.jsx';
import Hero from '../componets/event/Hero.jsx';
// No need to import a separate Sponsorship component
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
        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = {
          logoUrl: '/logo/whitelogo.svg',
          // 1. ADD THE SPONSORSHIP IMAGE URL TO YOUR DATA
          sponsorshipImageUrl: 'https://i.postimg.cc/xTdSBWwF/sponsorship.png',
          hero: { backgroundImageUrl: 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070' },
          about: {
            cards: [
              { title: "Horror Icons Reimagined", frontImageUrl: "https://images.unsplash.com/photo-1598983870677-01e066a0b901?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070", description: "Choose a character from your favorite horror movie or series. Your goal is to recreate them with chilling accuracy through a cinematic photoshoot." },
              { title: "The Perfect Scene", frontImageUrl: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974", description: "The background tells its own story. Design a spine-chilling set that complements your character and enhances the cinematic quality of your photo." },
              { title: "Behind The Screams", frontImageUrl: "https://images.unsplash.com/photo-1603516863860-7d5c93a83fe8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070", description: "Document your creative process! Submit a BTS video showcasing the making of your photoshoot, from costume and makeup to the final shot." }
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

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="font-special-elite halloween-theme">
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

          {/* 2. ADD THE SPONSORSHIP POSTER SECTION DIRECTLY HERE */}
          <section className="bg-[#0e0e0e] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center">
                <img
                  src={eventData.sponsorshipImageUrl}
                  alt="Halloween Cozplay Event Sponsor Poster"
                  className="w-full max-w-2xl rounded-lg object-contain shadow-[0_0_5px_#fff,0_0_10px_#fff,0_0_15px_#ff0000,0_0_20px_#ff0000,0_0_25px_#ff0000,0_0_30px_#ff0000,0_0_35px_#ff0000] transition-all duration-300 hover:shadow-[0_0_10px_#fff,0_0_20px_#fff,0_0_30px_#ff0000,0_0_40px_#ff0000,0_0_50px_#ff0000,0_0_60px_#ff0000,0_0_70px_#ff0000]"
                />
              </div>
            </div>
          </section>

          <About aboutData={eventData.about} />
          <PastGlories pastGloriesData={eventData.pastGlories} />
          <Register />
          <Contact />
          <Footer logoUrl={eventData.logoUrl} />
        </main>
      )}
      {isLoading && !isLoaded && (
         <div className="h-screen flex justify-center items-center"><p>Loading Content...</p></div>
      )}
    </div>
  );
};

export default HalloweenEventPage;