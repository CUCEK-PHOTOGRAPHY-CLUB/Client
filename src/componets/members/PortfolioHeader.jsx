// src/components/members/PortfolioHeader.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PortfolioHeader = ({ member, photoCount }) => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start p-4 mb-8 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 w-full sm:ml-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">{member.name}</h2>
          {member.experienceLevel && (
            <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded text-[10px] uppercase tracking-widest font-bold">
              {member.experienceLevel}
            </span>
          )}
        </div>
        <p className="text-base sm:text-lg text-zinc-300 mt-1">{member.bio}</p> 
        <p className="text-zinc-400 mt-1 text-base sm:text-lg">{member.role}</p>
        <div className="flex gap-3 sm:gap-4 mt-2 flex-wrap items-center text-xs sm:text-sm rounded-lg  bg-sky-800/40 px-3 sm:px-4 py-2 sm:py-2.5 w-fit">
          <span className="text-zinc-400 font-mono">{photoCount} Works</span>
          <div className="h-5 w-[2px] bg-zinc-600"></div>
          <button 
            onClick={() => toggleSection('skills')}
            aria-expanded={activeSection === 'skills'}
            aria-controls="skills-section"
            className="cursor-pointer text-zinc-400 font-mono hover:text-zinc-300 transition-colors focus:outline-none focus:text-zinc-300"
          >
            {member.skills.length} Skills
          </button>
          <div className="h-5 w-[2px] bg-zinc-600"></div>
          <button 
            onClick={() => toggleSection('interests')}
            aria-expanded={activeSection === 'interests'}
            aria-controls="interests-section"
            className="cursor-pointer text-zinc-400 font-mono hover:text-zinc-300 transition-colors focus:outline-none focus:text-zinc-300"
          >
            {member.interests.length} Interests
          </button>
        </div>
        {activeSection === 'skills' && (
          <div id="skills-section" className="mt-3 flex flex-wrap gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-3 shadow-xl">
            {member.skills.map((skill, index) => (
              <span key={index} className="text-xs text-zinc-400 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                {skill}
              </span>
            ))}
          </div>
        )}
        {activeSection === 'interests' && (
          <div id="interests-section" className="mt-3 flex flex-wrap gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-3 shadow-xl">
            {member.interests.map((interest, index) => (
              <span key={index} className="text-xs text-zinc-400 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PortfolioHeader;