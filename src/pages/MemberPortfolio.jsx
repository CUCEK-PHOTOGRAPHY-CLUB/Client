import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { publicApi } from '../services/api.js'; // Import real API
import PortfolioHeader from '../componets/members/PortfolioHeader.jsx';
import PortfolioGallery from '../componets/members/PortfolioGallery.jsx';
import ImageModal from '../componets/members/ImageModal.jsx';
import CategoryFilter from '../componets/members/CategoryFilter.jsx';
import { FiLoader, FiEdit2, FiCamera } from 'react-icons/fi';
import { useMemberAuth } from '../context/MemberAuthContext.jsx';
import { Link } from 'react-router-dom';

const MemberPortfolio = () => {
  const { id } = useParams();
  const { member: loggedInMember } = useMemberAuth();
  const isOwner = loggedInMember && loggedInMember.id === parseInt(id);

  const [member, setMember] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredGallery, setFilteredGallery] = useState([]);

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      try {
        // Fetch profile and gallery in parallel
        const [profileRes, galleryRes] = await Promise.all([
          publicApi.getMemberProfile(id),
          publicApi.getMemberGallery(id)
        ]);

        const profileData = profileRes.data.data;

        // Map backend data to UI expectations
        const mappedMember = {
          id: profileData.id,
          name: profileData.name || profileData.username,
          role: profileData.role === 'admin' ? 'Club Administrator' : 'Club Member',
          experienceLevel: profileData.experienceLevel, // Pass experience level
          image: profileData.profilePhotoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
          quote: profileData.bio || "Capturing moments that tell a story.",
          socialLinks: profileData.socialLinks,
          websiteUrl: profileData.websiteUrl,
          gallery: galleryRes.data.data.items.map(item => ({
            id: item.id,
            category: item.category,
            title: item.title,
            src: item.imageUrl,
            description: item.description
          }))
        };

        setMember(mappedMember);
        setGallery(mappedMember.gallery);
        setFilteredGallery(mappedMember.gallery);
      } catch (err) {
        console.error("Error fetching member portfolio:", err);
        setError("Member not found or failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  useEffect(() => {
    if (member) {
      if (activeCategory === 'All') {
        setFilteredGallery(gallery);
      } else {
        setFilteredGallery(gallery.filter(image => image.category === activeCategory));
      }
    }
  }, [activeCategory, gallery, member]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <FiLoader className="animate-spin text-sky-500 mb-4" size={48} />
        <p className="text-xl">Loading Portfolio...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Oops!</h2>
        <p className="text-zinc-400 text-xl mb-8">{error || "Member not found"}</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-sky-600 rounded-full hover:bg-sky-500 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  const categories = ['All', ...new Set(gallery.map(image => image.category))];

  return (
    <>
      <div className="bg-black min-h-screen text-white md:p-20">
        <motion.div
          className="container mx-auto pt-20 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start">
            <PortfolioHeader member={member} photoCount={gallery.length} />
            {isOwner && (
              <Link
                to="/memberprofile"
                className="flex items-center gap-2 mt-8 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-colors border border-white/10"
              >
                <FiEdit2 size={16} />
                Edit Profile
              </Link>
            )}
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {gallery.length > 0 ? (
            <PortfolioGallery
              gallery={filteredGallery}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl">
              <FiCamera size={48} className="mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-zinc-400">No photos yet</h3>
              <p className="mt-2 text-center max-w-xs px-4">
                {isOwner
                  ? "Your gallery is looking a bit empty! Let's showcase your best work."
                  : "This member hasn't uploaded any photos to their portfolio yet."}
              </p>
              {isOwner && (
                <Link
                  to="/upload"
                  className="mt-6 px-6 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-500 transition-colors"
                >
                  Upload First Photo
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </>
  );
};

export default MemberPortfolio;
