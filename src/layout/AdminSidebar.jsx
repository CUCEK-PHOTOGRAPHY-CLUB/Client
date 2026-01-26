import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx'; // Make sure path is correct
import {
    FiImage, FiCalendar, FiUsers, FiMessageSquare,
    FiInstagram, FiStar, FiLogOut, FiGrid, FiFilm,
    FiUserPlus
} from 'react-icons/fi';

// --- Centralized Configuration for Sidebar ---
// EXPORT this so AdminPage can access it
export const SIDEBAR_ITEMS = [
    { id: 'hero', label: 'Hero', icon: <FiStar size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <FiImage size={20} /> },
    { id: 'events', label: 'Events', icon: <FiCalendar size={20} /> },
    { id: 'team', label: 'Team', icon: <FiUsers size={20} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare size={20} /> },
    { id: 'instagram', label: 'Instagram', icon: <FiInstagram size={20} /> },
    { id: 'users', label: 'User Management', icon: <FiUsers size={20} /> },
    { id: 'videos', label: 'Videos', icon: <FiFilm size={20} /> },
    { id: 'joining-requests', label: 'Joining Requests', icon: <FiUserPlus size={20} /> },
    { id: 'event-upload', label: 'Event Upload', icon: <FiCalendar size={20} /> },
];

const TabButton = ({ id, label, icon, activeTab, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`flex items-center w-full gap-3 py-3 px-4 rounded-lg text-base transition-all duration-200 ${activeTab === id
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
    const { logout } = useAuth();

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '-100%' },
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
            {/* Logo/Header */}
            <div className="px-6 py-5 border-b border-slate-700 flex items-center gap-3">
                <FiGrid className="text-sky-400" size={24} />
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {SIDEBAR_ITEMS.map((item) => (
                    <TabButton
                        key={item.id}
                        {...item}
                        activeTab={activeTab}
                        onClick={(tabId) => {
                            setActiveTab(tabId);
                            setIsSidebarOpen(false); // Close sidebar on mobile after click
                        }}
                    />
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={logout}
                    className="w-full bg-slate-700 hover:bg-red-600/80 text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3"
                >
                    <FiLogOut /> <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* --- MOBILE SIDEBAR with Overlay --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 z-30 bg-black/60 md:hidden"
                        />
                        {/* Mobile Menu */}
                        <motion.aside
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-72 z-40 md:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden md:flex flex-col w-72 flex-shrink-0">
                <SidebarContent />
            </aside>
        </>
    );
};

export default AdminSidebar;