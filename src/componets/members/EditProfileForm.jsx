import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiGlobe, FiCamera, FiInstagram, FiLinkedin, FiGithub, FiSave, FiX, FiAlertCircle } from 'react-icons/fi';
import { memberProfileApi } from '../../services/api';
import { useMemberAuth } from '../../context/MemberAuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = () => {
    const { member, refreshMember } = useMemberAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        bio: '',
        skills: [],
        interests: [],
        profile_photo_url: '',
        location: '',
        website_url: '',
        social_links: {
            instagram: '',
            linkedin: '',
            github: '',
        }
    });

    // Skills and interests input
    const [skillInput, setSkillInput] = useState('');
    const [interestInput, setInterestInput] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await memberProfileApi.getMyProfile();

            if (response.data.success) {
                const profile = response.data.data.profile;

                // Parse social links if it's a string
                let socialLinks = { instagram: '', linkedin: '', github: '' };
                if (profile.social_links) {
                    try {
                        socialLinks = typeof profile.social_links === 'string'
                            ? JSON.parse(profile.social_links)
                            : profile.social_links;
                    } catch (e) {
                        console.error('Error parsing social links:', e);
                    }
                }

                setFormData({
                    bio: profile.bio || '',
                    skills: profile.skills || [],
                    interests: profile.interests || [],
                    profile_photo_url: profile.profile_photo_url || '',
                    location: profile.location || '',
                    website_url: profile.website_url || '',
                    social_links: socialLinks
                });
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()]
            });
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skill)
        });
    };

    const handleAddInterest = () => {
        if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
            setFormData({
                ...formData,
                interests: [...formData.interests, interestInput.trim()]
            });
            setInterestInput('');
        }
    };

    const handleRemoveInterest = (interest) => {
        setFormData({
            ...formData,
            interests: formData.interests.filter(i => i !== interest)
        });
    };

    const handleSocialLinkChange = (platform, value) => {
        setFormData({
            ...formData,
            social_links: {
                ...formData.social_links,
                [platform]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await memberProfileApi.updateProfile(formData);

            if (response.data.success) {
                setSuccess(true);
                if (refreshMember) refreshMember();

                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate(`/portfolio/${member.id}`);
                }, 2000);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent mb-4"></div>
                    <p className="text-slate-300">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-2">Edit Profile</h1>
                    <p className="text-slate-400 mb-8">Update your personal information and portfolio details</p>

                    {/* Admin-Assigned Fields (Read-Only) */}
                    {member && (
                        <div className="mb-8 p-6 bg-zinc-900/50 border border-white/10 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <FiAlertCircle className="text-sky-500" />
                                <h2 className="text-lg font-semibold text-slate-200">Club Assignment</h2>
                                <span className="text-xs text-slate-500">(Set by Admin)</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {member.team && (
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Team</p>
                                        <span className="inline-block px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-sm font-medium">
                                            {member.team}
                                        </span>
                                    </div>
                                )}
                                {member.position && (
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Position</p>
                                        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                                            {member.position}
                                        </span>
                                    </div>
                                )}
                                {member.experience_level && (
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Experience Level</p>
                                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium capitalize">
                                            {member.experience_level}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400">
                            Profile updated successfully! Redirecting...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Photo */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="flex items-center gap-2 text-slate-200 font-medium mb-3">
                                <FiCamera /> Profile Photo URL
                            </label>
                            <input
                                type="url"
                                value={formData.profile_photo_url}
                                onChange={(e) => setFormData({ ...formData, profile_photo_url: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
                                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                            {formData.profile_photo_url && (
                                <div className="mt-4">
                                    <img
                                        src={formData.profile_photo_url}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-sky-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="flex items-center gap-2 text-slate-200 font-medium mb-3">
                                <FiUser /> Bio
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Tell us about yourself, your photography journey, and what inspires you..."
                                rows={4}
                                maxLength={500}
                                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                            />
                            <p className="text-xs text-slate-500 mt-2">{formData.bio.length}/500 characters</p>
                        </div>

                        {/* Skills */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="text-slate-200 font-medium mb-3 block">Photography Skills</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                    placeholder="Add a skill (e.g., Portrait, Landscape)"
                                    className="flex-1 px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-sm"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="hover:text-red-400 transition-colors"
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="text-slate-200 font-medium mb-3 block">Interests</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={interestInput}
                                    onChange={(e) => setInterestInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                                    placeholder="Add an interest (e.g., Wildlife Photography)"
                                    className="flex-1 px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddInterest}
                                    className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                                    >
                                        {interest}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveInterest(interest)}
                                            className="hover:text-red-400 transition-colors"
                                        >
                                            <FiX size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="flex items-center gap-2 text-slate-200 font-medium mb-3">
                                <FiMapPin /> Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="City, State or Country"
                                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        {/* Website */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <label className="flex items-center gap-2 text-slate-200 font-medium mb-3">
                                <FiGlobe /> Portfolio Website
                            </label>
                            <input
                                type="url"
                                value={formData.website_url}
                                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                placeholder="https://your-portfolio.com"
                                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
                            <h3 className="text-slate-200 font-medium mb-4">Social Media</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                                        <FiInstagram /> Instagram
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.social_links.instagram}
                                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                        placeholder="https://instagram.com/yourusername"
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                                        <FiLinkedin /> LinkedIn
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.social_links.linkedin}
                                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                                        <FiGithub /> GitHub (for Tech Team)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.social_links.github}
                                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                        placeholder="https://github.com/yourusername"
                                        className="w-full px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave /> Save Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProfileForm;
