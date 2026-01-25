// src/components/admin/EventsAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiType, FiImage, FiLink, FiCalendar, FiFileText, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import { eventsApi } from '../../services/api.js';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';


// --- Event-Specific Components ---

const EventListItem = ({ item, onEdit, onDelete }) => {
    // Safely format the date, providing a fallback for invalid dates
    const formattedDate = item.eventDate
        ? new Date(item.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        : 'No date provided';

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
            <div className="flex items-center gap-4">
                <img 
                    src={item.imageUrl || 'https://via.placeholder.com/100x50'} 
                    alt={item.title} 
                    className="w-24 h-12 rounded-md object-cover bg-slate-700 flex-shrink-0"
                />
                <div>
                    <p className="font-bold text-white break-all">{item.title}</p>
                    <p className="text-sm text-slate-400">{formattedDate}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-auto">
                <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
                <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
            </div>
        </div>
    );
};

const EventForm = ({ currentItem, setCurrentItem }) => {
    // Helper function to format date for the datetime-local input
    const toDateTimeLocal = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        // Adjust for timezone offset to display correctly in the user's local time
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput id="event-title" label="Event Title" icon={<FiType />} value={currentItem.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} required />
            <AdminInput id="event-date" label="Event Date and Time" type="datetime-local" icon={<FiCalendar />} value={toDateTimeLocal(currentItem.eventDate)} onChange={e => setCurrentItem({ ...currentItem, eventDate: e.target.value ? new Date(e.target.value).toISOString() : '' })} required />
            <div className="md:col-span-2">
                 <AdminInput id="event-image" label="Image URL" icon={<FiImage />} value={currentItem.imageUrl || ''} onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} required />
            </div>
            <div className="md:col-span-2">
                <AdminInput id="event-link" label="Event Page Link (e.g., Instagram)" icon={<FiLink />} value={currentItem.pageLink || ''} onChange={e => setCurrentItem({ ...currentItem, pageLink: e.target.value })} />
            </div>
            <div className="md:col-span-2">
                <AdminTextArea id="event-desc" label="Description" icon={<FiFileText />} value={currentItem.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} required />
            </div>
        </div>
    );
};


// --- Main Admin Component ---

const EventsAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await eventsApi.getAll();
            // --- FIX APPLIED HERE ---
            // The actual data is a direct array inside `response.data.data`
            const events = response.data.data;
            // Sort by eventDate in descending order (newest first)
            const sortedEvents = events.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
            setItems(sortedEvents);
        } catch (err) {
            setError('Failed to fetch events.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // Map data just before sending it to the API to match backend field names (snake_case)
    const apiWithMapping = {
        ...eventsApi,
        create: (data) => eventsApi.create({
            ...data,
            page_link: data.pageLink,
            event_date: data.eventDate,
            image_url: data.imageUrl,
        }),
        update: (id, data) => eventsApi.update(id, {
            ...data,
            page_link: data.pageLink,
            event_date: data.eventDate,
            image_url: data.imageUrl,
        }),
    }

    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <div>
            <AdminCrudController
                title="Events"
                items={items}
                FormComponent={EventForm}
                ListItemComponent={EventListItem}
                initialFormState={{
                    id: null,
                    title: '',
                    description: '',
                    imageUrl: '',
                    pageLink: '',
                    eventDate: '',
                }}
                api={apiWithMapping}
                onDataChange={fetchData}
            />
            {/* No pagination controls are needed as the API response is not paginated */}
        </div>
    );
};

export default EventsAdmin;