import React from 'react';
import {
    FiImage, FiCalendar, FiUsers, FiMessageSquare,
    FiInstagram, FiStar, FiFilm,
    FiUserPlus, FiUserCheck
} from 'react-icons/fi';

export const SIDEBAR_ITEMS = [
    { id: 'hero', label: 'Hero', icon: <FiStar size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <FiImage size={20} /> },
    { id: 'events', label: 'Events', icon: <FiCalendar size={20} /> },
    { id: 'team', label: 'Team', icon: <FiUsers size={20} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare size={20} /> },
    { id: 'instagram', label: 'Instagram', icon: <FiInstagram size={20} /> },
    { id: 'users', label: 'Admin Management', icon: <FiUsers size={20} /> },
    { id: 'videos', label: 'Videos', icon: <FiFilm size={20} /> },
    { id: 'joining-requests', label: 'Joining Requests', icon: <FiUserPlus size={20} /> },
    { id: 'event-upload', label: 'Event Upload', icon: <FiCalendar size={20} /> },
    { id: 'member-management', label: 'Member Management', icon: <FiUserCheck size={20} /> },
];
