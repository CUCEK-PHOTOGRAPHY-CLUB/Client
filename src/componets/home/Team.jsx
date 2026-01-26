import React, { useState, useEffect } from 'react';
import { teamApi } from '../../services/api.js'; // Adjust path if necessary

// --- Professional Loading Skeleton for the Team Section ---
const TeamSkeleton = () => {
  return (
    <section className='relative w-full min-h-screen bg-black text-[#e3e3db] flex flex-col justify-center items-center gap-6 md:gap-10 overflow-hidden font-sans p-4 animate-pulse mt-20'>
      
      {/* --- DESKTOP SKELETON --- */}
      <div className='hidden md:flex flex-col justify-center items-center gap-10 w-full'>
        {/* Placeholder for Profile Images */}
        <div className='flex justify-center items-center -space-x-3 md:-space-x-4 lg:-space-x-5'>
          {Array.from({ length: 5 }).map((_, index) => 
            <div
              key={index}
              // Mimics the size, shape, and border of the real images
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-neutral-800 border-2 lg:border-4 border-[#e3e3db]/30"
            />
          )}
        </div>
        
        {/* Placeholder for the Name/Title Text */}
        <div className="w-72 h-14 bg-neutral-800 rounded-lg" />
      </div>

      {/* --- MOBILE SKELETON --- */}
      <div className='md:hidden flex flex-col items-center gap-6 w-full max-w-xs'>
        {/* Placeholder for list items */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <div className="w-16 h-16 rounded-full bg-neutral-800" />
            <div className="flex flex-col gap-2 flex-grow">
              <div className="w-3/4 h-6 bg-neutral-800 rounded"></div>
              <div className="w-1/2 h-4 bg-neutral-800 rounded"></div>
            </div>
          </div>
        ))}
        {/* Placeholder for the "The Squad" title on mobile */}
         <div className="mt-6 w-48 h-10 bg-neutral-800 rounded-lg" />
      </div>
    </section>
  );
};


const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true); // Ensure loading is true at the start
        const response = await teamApi.getAll();
        
        if (response.data && Array.isArray(response.data.data)) {
          // **THE FIX**: Filter out members missing crucial data to prevent errors
          const validMembers = response.data.data.filter(
            member => member && member.id && member.name && member.photoUrl
          );
          
          const sortedMembers = validMembers.sort((a, b) => a.orderIndex - b.orderIndex);
          setTeamMembers(sortedMembers);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError("Failed to load the team.");
        console.error("API Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);
  
  const handleMemberClick = (memberId) => {
    if (window.innerWidth < 768) {
        setActiveId(prevId => prevId === memberId ? null : memberId);
    }
  };

  // --- RENDER LOGIC UPDATE ---
  if (loading) {
    return <TeamSkeleton />;
  }

  if (error) {
      return (
          <section className='relative w-full min-h-screen bg-black text-red-500 flex justify-center items-center'>
              <p>{error}</p>
          </section>
      );
  }

  return (
    <section className='relative w-full min-h-screen bg-black text-[#e3e3db] flex flex-col justify-center items-center gap-6 md:gap-10 overflow-hidden font-sans p-4'>
      
      {/* Heading for The Community */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-white">
          The Community
        </h2>
        <div className="w-24 h-1 bg-[#e3e3db] mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div 
        className='hidden md:flex justify-center items-center -space-x-3 md:-space-x-4 lg:-space-x-5' 
        onMouseLeave={() => setActiveId(null)}
      >
        {teamMembers.map((member) => {
          const isActive = activeId === member.id;
          const isDimmed = activeId !== null && !isActive;

          return (
            <img
              key={member.id}
              className={`relative rounded-full object-cover cursor-pointer border-2 lg:border-4 border-[#e3e3db] transition-all duration-500 ease-in-out image-optimized ${isActive ? 'w-28 h-28 lg:w-32 lg:h-32 z-10' : 'w-16 h-16 lg:w-20 lg:h-20'} ${isDimmed ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}`}
              src={member.photoUrl} 
              alt={`Profile of ${member.name}`}
              loading="lazy"
              decoding="async"
              onMouseEnter={() => setActiveId(member.id)}
            />
          );
        })}
      </div>

      <div className='md:hidden flex flex-col items-center gap-4 w-full max-w-xs'>
        {teamMembers.length > 0 ? (
            teamMembers.map((member) => {
                const isActive = activeId === member.id;
                return (
                    <div key={member.id} className="w-full">
                        <div className="flex items-center gap-4" onClick={() => handleMemberClick(member.id)}>
                            <img
                                className={`rounded-full object-cover cursor-pointer border-2 border-[#e3e3db] transition-all duration-300 ease-in-out image-optimized ${isActive ? 'w-20 h-20' : 'w-16 h-16 opacity-70'}`}
                                src={member.photoUrl}
                                alt={`Profile of ${member.name}`}
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="flex flex-col">
                                <h3 className={`text-xl font-bold uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>{member.name}</h3>
                                {/* Bio will go in the collapsible section */}
                            </div>
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 mt-2' : 'max-h-0'}`}>
                           {/* Using bio from API data */}
                           <p className="text-sm text-gray-300 pl-[88px] pr-4">
                                {member.bio || `Details about ${member.name}.`}
                           </p>
                        </div>
                    </div>
                );
            })
        ) : (
            <p className="text-gray-400">No team members found.</p>
        )}
      </div>

      <div className="hidden md:block relative w-full h-[80px] lg:h-[100px] overflow-hidden text-center">
        {teamMembers.map((member) => (
            <div key={member.id} className={`absolute w-full h-full flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${activeId === member.id ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="text-5xl lg:text-6xl font-extrabold uppercase">{member.name}</div>
                {member.position && <div className="text-lg lg:text-xl font-medium text-gray-400 mt-1">{member.position}</div>}
            </div>
        ))}
      </div>
    </section>
  );
};

export default Team;