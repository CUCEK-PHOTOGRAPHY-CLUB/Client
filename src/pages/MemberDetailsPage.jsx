import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const MemberDetailsPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for all members
  const mockMembers = [
    {
      id: 1,
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      team: "Photography Team",
      position: "Lead Photographer"
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      team: "Editorial Team",
      position: "Content Creator"
    },
    {
      id: 3,
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      team: "Technical Team",
      position: "Video Editor"
    },
    {
      id: 4,
      name: "Sarah Williams",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      team: "Design Team",
      position: "Graphic Designer"
    },
    {
      id: 5,
      name: "Michael Brown",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      team: "Photography Team",
      position: "Senior Photographer"
    },
    {
      id: 6,
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      team: "Social Media Team",
      position: "Social Media Manager"
    },
    {
      id: 7,
      name: "David Wilson",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      team: "Photography Team",
      position: "Portrait Specialist"
    },
    {
      id: 8,
      name: "Lisa Anderson",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
      team: "Event Team",
      position: "Event Coordinator"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    
    setTimeout(() => {
      setMembers(mockMembers);
      setLoading(false);
    }, 500);
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <FiLoader className="animate-spin text-sky-500 mb-4" size={48} />
        <p className="text-xl">Loading Members...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto pt-20 p-4 md:p-8 max-w-7xl">
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
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-sky-500/20 shadow-lg shadow-sky-500/10"
                />
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">
                {member.name}
              </h2>

              {/* Team & Position as simple text */}
              <div className="text-center mb-4 space-y-1">
                <p className="text-zinc-400 text-sm">{member.position}</p>
                <p className="text-zinc-500 text-xs">{member.team}</p>
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