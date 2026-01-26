import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memberProfileApi } from '../services/api.js';
import { FiUser, FiFileText, FiCamera, FiLink, FiMapPin, FiBarChart2, FiSave, FiLoader, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useMemberAuth } from '../context/MemberAuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { } = useMemberAuth();

  const [profile, setProfile] = useState({
    bio: '',
    team: '',
    position: '',
    experience_level: 'beginner',
    profile_photo_url: '',
    location: '',
    website_url: '',
    skills: '',
    interests: '',
    social_links: { instagram: '', linkedin: '', github: '' }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await memberProfileApi.getMyProfile();
        const data = response.data.data.profile;

        // Set initial form state from DB
        setProfile({
          bio: data.bio || '',
          team: data.team || '',
          position: data.position || '',
          experience_level: data.experience_level || 'beginner',
          profile_photo_url: data.profile_photo_url || '',
          location: data.location || '',
          website_url: data.website_url || '',
          skills: data.skills ? data.skills.join(', ') : '',
          interests: data.interests ? data.interests.join(', ') : '',
          social_links: data.social_links ? (typeof data.social_links === 'string' ? JSON.parse(data.social_links) : data.social_links) : { instagram: '', linkedin: '', github: '' }
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load your profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await memberProfileApi.updateProfile({
        ...profile,
        // These are already handled as strings on change, 
        // but let's be safe for the backend
        skills: profile.skills,
        interests: profile.interests
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile. Please try again.");
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <FiLoader className="animate-spin text-sky-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-zinc-900/50 rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-sky-500/10 rounded-xl text-sky-500">
            <FiUser size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Edit Your Profile</h1>
            <p className="text-zinc-500 text-sm">Update your personal information and portfolio details</p>
          </div>
        </div>

        {/* Admin-Assigned Fields (Read-Only) */}
        {profile.team || profile.position || profile.experience_level ? (
          <div className="mb-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertCircle className="text-sky-400" />
              <h3 className="text-sm font-semibold text-sky-400">Club Assignment (Set by Admin)</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.team && (
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Team</p>
                  <span className="inline-block px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-sm font-medium">
                    {profile.team}
                  </span>
                </div>
              )}
              {profile.position && (
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Position</p>
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {profile.position}
                  </span>
                </div>
              )}
              {profile.experience_level && (
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Experience Level</p>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium capitalize">
                    {profile.experience_level}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
            <FiAlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio - Full Width */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiFileText size={16} /> Bio / Intro
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-zinc-600"
              placeholder="Tell us about yourself and your photography style..."
            ></textarea>
          </div>

          {/* Profile Photo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiCamera size={16} /> Profile Photo URL
            </label>
            <input
              type="text"
              name="profile_photo_url"
              value={profile.profile_photo_url}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiMapPin size={16} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              placeholder="Mumbai, India / Remote"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiLink size={16} /> Website / Portfolio
            </label>
            <input
              type="text"
              name="website_url"
              value={profile.website_url}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              placeholder="https://yourwork.com"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiCheckCircle size={16} /> Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              placeholder="Portrait, HDR, Drone..."
            />
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiUser size={16} /> Interests (comma separated)
            </label>
            <input
              type="text"
              name="interests"
              value={profile.interests}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              placeholder="Travel, Wildlife, Fashion..."
            />
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2 mb-3">
              <FiLink size={16} /> Social Media
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="instagram"
                value={profile.social_links.instagram || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, instagram: e.target.value }
                }))}
                ClassName="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                placeholder="Instagram URL"
              />
              <input
                type="text"
                name="linkedin"
                value={profile.social_links.linkedin || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, linkedin: e.target.value }
                }))}
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                placeholder="LinkedIn URL"
              />
              <input
                type="text"
                name="github"
                value={profile.social_links.github || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social_links: { ...prev.social_links, github: e.target.value }
                }))}
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                placeholder="GitHub URL"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-sky-900/20"
            >
              {saving ? (
                <FiLoader className="animate-spin" size={20} />
              ) : (
                <FiSave size={20} className="group-hover:scale-110 transition-transform" />
              )}
              {saving ? "Saving Changes..." : "Save Profile Details"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MyProfile;
