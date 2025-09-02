// src/components/members/PortfolioHeader.js

import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHeader = ({ member, photoCount }) => {
  return (
    <motion.div 
      className="flex flex-row items-center p-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
      />
      <div className="ml-6">
        <h2 className="text-4xl font-bold tracking-tight">{member.name}</h2>
        <p className="text-zinc-400 mt-1 text-lg">{member.role}</p>
        <p className="text-zinc-500 mt-2 text-sm font-mono">{photoCount} Works</p>
      </div>
    </motion.div>
  );
};

export default PortfolioHeader;