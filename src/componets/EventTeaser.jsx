import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const EventTeaser = () => {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-500" style={{ fontFamily: "'Creepster', cursive" }}>
          Halloween Contest
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          What if Stranger Things... happened at CUCEK?
        </p>
        <Link
          to="/halloween-contest"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Join The Upside Down
        </Link>
      </div>
    </section>
  );
};

export default EventTeaser;
