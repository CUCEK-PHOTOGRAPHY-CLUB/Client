import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import filmbg from '../assets/FilmSceneRec/filmbg.png';

const EventTeaser = () => {
  return (
    <section
      className="py-32 md:py-40 text-white text-center relative bg-cover bg-center min-h-screen flex items-center"
      style={{ backgroundImage: `url(${filmbg})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 mb-6 tracking-tighter">
          Film Scene Recreation
          <span className="block text-3xl md:text-5xl text-neutral-600 mt-2">2.0</span>
        </h2>
        <Link
          to="/film-recreation"
          className="font-light text-lg md:text-2xl uppercase tracking-wide text-white pointer-events-auto relative z-20 cursor-pointer mt-12 inline-block px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 hover:scale-105 transition-transform duration-300"
          style={{

            color: 'white',
          }}>

          Check it out !!
        </Link>
      </div>
    </section>
  );
};

export default EventTeaser;
