import React from 'react';

const About = ({ aboutData }) => {
  if (!aboutData || !aboutData.cards) return null;
  const handleCardFlip = (e) => e.currentTarget.closest('.flip-card').classList.toggle('flipped');

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-center font-creepster text-5xl md:text-7xl mb-12 text-white" style={{ textShadow: '0 0 10px var(--glow-orange)' }}>Contest Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutData.cards.map((card, index) => (
            <div key={index} className="flip-card h-96 cursor-pointer group" onClick={handleCardFlip}>
              {/* This style block provides the necessary CSS for the flip animation */}
              <style>{`
                .flip-card {
                  perspective: 1000px;
                }
                .flip-card-inner {
                  position: relative; width: 100%; height: 100%; transition: transform 0.8s; transform-style: preserve-3d;
                }
                .flip-card.flipped .flip-card-inner {
                  transform: rotateY(180deg);
                }
                .flip-card-front, .flip-card-back {
                  position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 0.5rem;
                }
                .flip-card-back {
                  transform: rotateY(180deg);
                }
                .card-bg-image {
                  background-size: cover; background-position: center; background-blend-mode: overlay; background-color: rgba(26, 11, 46, 0.4);
                }
              `}</style>
              <div className="flip-card-inner">
                <div className="flip-card-front card-bg-image p-6 flex flex-col items-center justify-end text-center border-2 border-orange-500/30 group-hover:shadow-2xl group-hover:shadow-red-500/40 transition-shadow" style={{ backgroundImage: `url('${card.frontImageUrl}')` }}>
                  <h3 className="font-creepster text-3xl text-yellow-400 mb-2">{card.title}</h3>
                  <p>Click to flip for details</p>
                </div>
                <div className="flip-card-back bg-gray-900 p-6 flex flex-col justify-center text-center border-2 border-[var(--glow-orange)] rounded-lg">
                  <h3 className="font-creepster text-3xl text-yellow-400 mb-2">{card.title}</h3>
                  <blockquote className="text-gray-300 italic">"{card.description}"</blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
