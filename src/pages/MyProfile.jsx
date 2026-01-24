import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memberProfileApi } from '../services/api.js';
import { FiUser, FiFileText, FiCamera, FiLink, FiMapPin, FiBarChart2, FiSave, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    experience_level: 'beginner',
    profile_photo_url: '',
    location: '',
    website_url: '',
    skills: '',
    interests: ''
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
          experience_level: data.experience_level || 'beginner',
          profile_photo_url: data.profile_photo_url || '',
          location: data.location || '',
          website_url: data.website_url || '',
          skills: data.skills ? data.skills.join(', ') : '',
          interests: data.interests ? data.interests.join(', ') : ''
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
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-sky-500/10 rounded-xl text-sky-500">
            <FiUser size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Edit Your Profile</h1>
            <p className="text-zinc-500">How your portfolio appears to the club and public.</p>
          </div>
        </div>

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

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <FiBarChart2 size={16} /> Experience Level
            </label>
            <select
              name="experience_level"
              value={profile.experience_level}
              onChange={handleChange}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all appearance-none"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
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
