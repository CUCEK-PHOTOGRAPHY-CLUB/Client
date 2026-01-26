// src/components/admin/VideoAdmin.jsx

import React, { useState, useEffect } from 'react';
import { 
    FiLink, FiType, FiEdit, FiTrash2, FiFilm, FiCalendar, 
    FiFileText, FiList, FiEye, FiEyeOff, FiUser, FiLoader 
} from 'react-icons/fi';
import { videoApi, eventsApi, usersApi } from '../../services/api.js';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';

// --- Reusable Helper Components ---

const PaginationControls = ({ paginationInfo, onPageChange }) => {
    if (!paginationInfo || paginationInfo.totalPages <= 1) return null;
    return (
        <div className="flex justify-between items-center mt-6">
            <button onClick={() => onPageChange(paginationInfo.currentPage - 1)} disabled={!paginationInfo.hasPrevPage} className="px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 hover:bg-slate-600 transition-colors">Previous</button>
            <span className="text-sm text-slate-400">Page {paginationInfo.currentPage} of {paginationInfo.totalPages}</span>
            <button onClick={() => onPageChange(paginationInfo.currentPage + 1)} disabled={!paginationInfo.hasNextPage} className="px-4 py-2 bg-slate-700 rounded-md text-sm font-semibold disabled:opacity-50 hover:bg-slate-600 transition-colors">Next</button>
        </div>
    );
};

const FormToggle = ({ label, enabled, onChange, icon }) => (
    <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
        <button 
            type="button" 
            onClick={onChange} 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full border ${ enabled ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-slate-700/50 border-slate-600 text-slate-300' }`}
        >
            {icon}{enabled ? 'Visible' : 'Hidden'}
        </button>
    </div>
);

// --- FIX: Robust YouTube Thumbnail Extractor ---
const getYouTubeThumbnail = (url) => {
    // Return a default placeholder if the URL is invalid
    if (!url || typeof url !== 'string') {
        return 'https://placehold.co/150x84/1e293b/94a3b8?text=Video';
    }
    
    let videoId;
    try {
        const urlObj = new URL(url);
        // Handle standard youtube.com links (e.g., ...watch?v=VIDEO_ID)
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            videoId = urlObj.searchParams.get('v');
        } 
        // Handle shortened youtu.be links (e.g., youtu.be/VIDEO_ID)
        else if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        }

        if (videoId) {
            // Use 'mqdefault' for a good quality thumbnail
            return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }
    } catch (e) {
        // Silently ignore errors from invalid URLs
    }
    
    // Return placeholder if parsing fails
    return 'https://placehold.co/150x84/1e293b/94a3b8?text=Invalid+URL';
};

// --- Video-Specific Components ---

const VideoListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4 min-w-0">
            {/* Use the helper function to get the thumbnail */}
            <img 
                src={getYouTubeThumbnail(item.videoLink)} 
                alt={item.title} 
                className="w-24 h-16 rounded-md object-cover bg-slate-700 flex-shrink-0" 
            />
            <div className="flex-grow min-w-0">
                <p className="font-bold text-white truncate">{item.title}</p>
                {item.event_name && <p className="text-xs text-slate-400">Event: {item.event_name}</p>}
                <div className={`flex items-center gap-2 mt-1 text-xs ${item.isActive ? 'text-green-400' : 'text-slate-500'}`}>
                    {item.isActive ? <FiEye /> : <FiEyeOff />}
                    <span>{item.isActive ? 'Visible' : 'Hidden'}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-auto">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors">
                <FiEdit size={18} />
            </button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <FiTrash2 size={18} />
            </button>
        </div>
    </div>
);

const VideoForm = ({ currentItem, setCurrentItem, events, users, loadingEvents, loadingUsers }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput id="vid-title" label="Video Title" icon={<FiType />} value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
        <AdminInput id="vid-link" label="YouTube Video URL" icon={<FiLink />} value={currentItem.videoLink || ''} onChange={e => setCurrentItem({ ...currentItem, videoLink: e.target.value })} />
        <div className="md:col-span-2"><AdminTextArea id="vid-desc" label="Description" icon={<FiFileText />} value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} /></div>
        <div>
            <label htmlFor="vid-event" className="block text-sm font-medium text-slate-400 mb-2">Associate with Event</label>
            <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><FiCalendar /></div>
                <select id="vid-event" value={currentItem.eventId || ''} onChange={e => setCurrentItem({ ...currentItem, eventId: e.target.value })} disabled={loadingEvents} className="w-full bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 py-2 pl-10 pr-4 appearance-none">
                    <option value="">{loadingEvents ? 'Loading...' : 'None'}</option>
                    {events.map(e => (<option key={e.id} value={e.id}>{e.title}</option>))}
                </select>
            </div>
        </div>
        <div>
            <label htmlFor="vid-user" className="block text-sm font-medium text-slate-400 mb-2">Credit a User</label>
            <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><FiUser /></div>
                <select id="vid-user" value={currentItem.userId || ''} onChange={e => setCurrentItem({ ...currentItem, userId: e.target.value })} disabled={loadingUsers} className="w-full bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 py-2 pl-10 pr-4 appearance-none">
                    <option value="">{loadingUsers ? 'Loading...' : 'None'}</option>
                    {users.map(u => (<option key={u.id} value={u.id}>{u.username}</option>))}
                </select>
            </div>
        </div>
        <AdminInput id="vid-order" label="Order Index" type="number" icon={<FiList />} value={currentItem.orderIndex !== undefined ? currentItem.orderIndex : 0} onChange={e => setCurrentItem({ ...currentItem, orderIndex: parseInt(e.target.value, 10) || 0 })} />
        <FormToggle label="Visibility" enabled={!!currentItem.isActive} onChange={() => setCurrentItem({ ...currentItem, isActive: !currentItem.isActive })} icon={currentItem.isActive ? <FiEye /> : <FiEyeOff />} />
    </div>
);


// --- Main Component ---
const VideoAdmin = () => {
    // Main state for videos
    const [items, setItems] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for dropdown data
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    // Data Fetching
    const fetchData = async (page = 1) => {
        setLoading(true); setError(null);
        try {
            const response = await videoApi.getAll(page, 10);
            const apiData = response.data.data;
            setItems(apiData.data || []);
            setPaginationInfo({ currentPage: apiData.page, totalPages: apiData.totalPages, totalItems: apiData.total, hasNextPage: apiData.page < apiData.totalPages, hasPrevPage: apiData.page > 1 });
            setCurrentPage(page);
        } catch (err) { setError('Failed to fetch videos.'); console.error(err); } 
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchData(1);
        const fetchDataForDropdowns = async () => {
            try {
                const [eventsResponse, usersResponse] = await Promise.all([ eventsApi.getAll(1, 1000), usersApi.getAll(1, 1000) ]);
                setEvents(eventsResponse.data.data || []);
                setUsers(usersResponse.data.data.users || []);
            } catch (error) { console.error("Failed to fetch dropdown data:", error); } 
            finally { setLoadingEvents(false); setLoadingUsers(false); }
        };
        fetchDataForDropdowns();
    }, []);

    const handlePageChange = (newPage) => { if (paginationInfo && newPage > 0 && newPage <= paginationInfo.totalPages) { fetchData(newPage); } };
    
    // --- Logic for Controller ---
    const CustomForm = (props) => (<VideoForm {...props} events={events} users={users} loadingEvents={loadingEvents} loadingUsers={loadingUsers} />);
    const validateForm = (item) => { if (!item.title?.trim()) return 'Video Title is required.'; if (!item.videoLink?.trim()) return 'YouTube Video URL is required.'; try { new URL(item.videoLink); } catch (_) { return 'The Video URL is not valid.'; } return null; };
    const apiWithMapping = { ...videoApi, create: (data) => videoApi.create({ ...data, eventId: data.eventId || null, userId: data.userId || null }), update: (id, data) => videoApi.update(id, { ...data, eventId: data.eventId || null, userId: data.userId || null }) };
    const mapFromApiToForm = (item) => ({ ...item, eventId: events.find(e => e.title === item.event_name)?.id || '' });

    // --- Render ---
    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <div>
            <AdminCrudController
                title="Video Management"
                items={items}
                FormComponent={CustomForm}
                ListItemComponent={VideoListItem}
                validateForm={validateForm}
                initialFormState={{ id: null, title: '', description: '', videoLink: '', isActive: true, orderIndex: 0, eventId: '', userId: '' }}
                api={apiWithMapping}
                onDataChange={() => fetchData(currentPage)}
                mapFromApi={mapFromApiToForm}
            />
            <PaginationControls paginationInfo={paginationInfo} onPageChange={handlePageChange} />
        </div>
    );
};

export default VideoAdmin;