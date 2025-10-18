import React, { useState, useEffect } from 'react';

const Hero = ({ heroData }) => {
  const [timeLeft, setTimeLeft] = React.useState({});

  useEffect(() => {
    // Set a fixed target date for the countdown
    const countdownDate = new Date("October 22, 2025 23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
      } else {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
          minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
          seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0'),
        });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (!heroData || !heroData.backgroundImageUrl) return null;

  return (
    <section 
      id="home" 
      className="h-screen w-full flex flex-col justify-center items-center text-center p-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url('${heroData.backgroundImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-purple)] via-[rgba(26,11,46,0.7)] to-[rgba(26,11,46,0.5)]"></div>
      <div className="relative z-10">
        <p className="text-lg md:text-2xl mb-2 text-gray-300">CUCEK Photography Club Presents</p>
        <h1 className="font-creepster text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white uppercase" style={{ textShadow: '0 0 15px var(--glow-orange)' }}>
           Halloween CoZplay Contest
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-md md:text-lg text-gray-200">
          Step into the dark side. Recreate your favorite horror characters in a cinematic photoshoot and bring your nightmares to life.
        </p>
        <div className="text-2xl md:text-4xl mt-8 font-creepster text-white space-x-2 md:space-x-6 tracking-wider">
          {timeLeft.expired ? (
            <span className='text-4xl'>Submissions Closed!</span>
          ) : (
            <React.Fragment>
              <span><span style={{ textShadow: '0 0 10px var(--glow-orange)' }}>{timeLeft.days || '00'}</span> Days</span>
              <span><span style={{ textShadow: '0 0 10px var(--glow-orange)' }}>{timeLeft.hours || '00'}</span> Hours</span>
              <span><span style={{ textShadow: '0 0 10px var(--glow-orange)' }}>{timeLeft.minutes || '00'}</span> Mins</span>
              <span><span style={{ textShadow: '0 0 10px var(--glow-orange)' }}>{timeLeft.seconds || '00'}</span> Secs</span>
            </React.Fragment>
          )}
        </div>
        <a
          href="https://forms.gle/2LoAfq7o2BM17pTY8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-[var(--glow-orange)] text-white font-bold font-special-elite py-3 px-8 rounded-full text-xl uppercase tracking-widest transition-all duration-300 border-2 border-white/50 shadow-lg shadow-[var(--glow-orange)]/30 hover:bg-[var(--glow-yellow)] hover:shadow-2xl hover:shadow-[var(--glow-yellow)]/50 hover:scale-105"
        >
          Register Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
