import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import { publicApi } from '../services/api';

const MemberDetailsPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getAllMembers({ limit: 100 });
      
      if (response.data?.success && response.data?.data?.members) {
        setMembers(response.data.data.members);
      } else {
        setError('Failed to load members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <FiLoader className="animate-spin text-sky-500 mb-4" size={48} />
        <p className="text-xl">Loading Members...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchMembers}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (members.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-xl text-neutral-400">No members found</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto pt-24 md:pt-32 p-4 md:p-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
            Member Details
          </h1>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            Meet our talented team members and their roles
          </p>
        </motion.div>

        {/* Members Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Profile Photo */}
              <div className="flex justify-center mb-4">
                <img
                  src={member.profilePhotoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}
                  alt={member.name || member.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-sky-500/20 shadow-lg shadow-sky-500/10"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80';
                  }}
                />
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">
                {member.name || member.username}
              </h2>

              {/* Team & Position as simple text */}
              <div className="text-center mb-4 space-y-1">
                {member.position && (
                  <p className="text-zinc-400 text-sm">{member.position}</p>
                )}
                {member.team && (
                  <p className="text-zinc-500 text-xs">{member.team}</p>
                )}
                {!member.position && !member.team && member.experienceLevel && (
                  <p className="text-zinc-400 text-sm capitalize">{member.experienceLevel}</p>
                )}
              </div>

              {/* View Portfolio Button */}
              <Link
                to={`/members/${member.id}`}
                className="block w-full text-center px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors font-medium text-sm"
              >
                View Portfolio
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;