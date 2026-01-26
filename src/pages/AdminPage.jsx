// src/pages/admin/AdminPage.jsx

import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

// 1. CORRECTED PATHS: 'componets' is now 'components'
import GalleryAdmin from '../componets/admin/GalleryAdmin.jsx';
import HeroAdmin from '../componets/admin/HeroAdmin.jsx';
import EventsAdmin from '../componets/admin/EventsAdmin.jsx';
import TeamAdmin from '../componets/admin/TeamAdmin.jsx';
import TestimonialsAdmin from '../componets/admin/TestimonialsAdmin.jsx';
import InstagramAdmin from '../componets/admin/InstagramAdmin.jsx';
import UserManagementAdmin from '../componets/admin/UserManagementAdmin.jsx';
import VideoAdmin from '../componets/admin/VideoAdmin.jsx';
import JoiningRequestsAdmin from '../componets/admin/JoiningRequestsAdmin.jsx';
import Uploader from './Uploader.jsx'; // Import the Uploader component
import MemberManagementAdmin from '../componets/admin/MemberManagementAdmin.jsx';

// Import layout components with corrected paths
import AdminSidebar, { SIDEBAR_ITEMS } from '../layout/AdminSidebar.jsx';
import AdminHeader from '../layout/AdminHeader.jsx';

// --- A "Router" component to select which admin panel to show ---
const ContentPanel = ({ activeTab }) => {
    // 2. SIMPLIFIED LOGIC: This component now only decides which self-contained
    // component to render. All data fetching is handled by the children.
    switch (activeTab) {
        case 'gallery': return <GalleryAdmin />;
        case 'hero': return <HeroAdmin />;
        case 'events': return <EventsAdmin />;
        case 'team': return <TeamAdmin />;
        case 'testimonials': return <TestimonialsAdmin />;
        case 'instagram': return <InstagramAdmin />;
        case 'users': return <UserManagementAdmin />;
        case 'videos': return <VideoAdmin />;
        case 'videos': return <VideoAdmin />;
        case 'joining-requests': return <JoiningRequestsAdmin />;
        case 'event-upload': return <Uploader />;
        case 'member-management': return <MemberManagementAdmin />;
        default: return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center text-slate-500">Select a category from the sidebar to begin.</div>
            </div>
        );
    }
};

const AdminFooter = () => (
    <footer className="w-full p-4 mt-8 text-center border-t text-slate-500 text-sm border-slate-700">
        <p>&copy; {new Date().getFullYear()} CPC Admin Dashboard. All Rights Reserved.</p>
    </footer>
);

const AdminPage = () => {
    // Start on 'joining-requests' for convenience as it's an important tab.
    const [activeTab, setActiveTab] = useState('joining-requests');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // The main page is now stateless regarding content, which is cleaner.
    const currentTabLabel = SIDEBAR_ITEMS.find(item => item.id === activeTab)?.label || 'Dashboard';

    return (
        <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans">
            <div className="flex h-screen">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div className="flex flex-col flex-1 w-full">
                    <AdminHeader
                        pageTitle={currentTabLabel}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />

                    {/* The main scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                        <main className="p-4 md:p-6 lg:p-8">
                            {/* 3. ENHANCED HEADER DESIGN */}
                            <div className="pb-6 mb-8 border-b border-slate-700">
                                <h1 className="text-3xl font-bold text-white">{currentTabLabel}</h1>
                                <p className="mt-1 text-slate-400">View and manage all {currentTabLabel.toLowerCase()} here.</p>
                            </div>

                            <ContentPanel activeTab={activeTab} />
                        </main>

                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;