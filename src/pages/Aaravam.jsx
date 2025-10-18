import React from 'react';
import WorkGrid from '../componets/aaravam/WorkGrid'; // Ensure this path is correct

function App() {
  return (
    <div className="min-h-screen mt-30 p-4 sm:p-8 md:p-12 mb-50">
      <header className="mb-8 md:mb-12 text-center md:text-left">
        {/* --- need to remove--- */}
        {/* --- GRADIENT UPDATED --- */}
        {/* Switched from blue/cyan to a festive amber/orange/emerald gradient */}
        <h1 className="
          text-5xl md:text-7xl font-black tracking-tighter 
          bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 
          text-transparent bg-clip-text
        ">
          AARAVAM '25
        </h1>
        
        <p className="text-gray-400 mt-4 max-w-2xl text-lg mx-auto md:mx-0">
           Onam @ CUCEK celebrates tradition and togetherness with vibrant pookkalam, cultural performances, fun games, and Onasadya. This gallery captures joyful moments, colors, and the festive spirit of Onam at CUCEK.
        </p>

        {/* --- BUTTON AND GLOW EFFECT UPDATED --- */}
        <div className="mt-8">
          <a
            href="https://drive.google.com/drive/folders/1Eab3BHur2kJV9q9sQ40UftVVzoY7jCyE?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block px-8 py-3 rounded-full
              text-lg font-bold text-white
              bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 /* Matching gradient */
              transition-all duration-300 ease-in-out
              transform-gpu
              hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 /* Orange glow effect */
              focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black
            "
          >
            Click here to find your photos
          </a>
        </div>
      </header>

      <main>
        <WorkGrid />
      </main>
    </div>
  );
}

export default App;