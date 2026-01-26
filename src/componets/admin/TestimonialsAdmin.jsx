// src/components/admin/TestimonialsAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiUser, FiImage, FiMessageSquare, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi';
import { testimonialsApi } from '../../services/api.js';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';

// --- Testimonial-Specific Components ---

const TestimonialListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4 w-full">
            <img 
              src={item.imageUrl || 'https://placehold.co/50x50'} 
              alt={item.name} 
              className="w-14 h-14 rounded-full object-cover bg-slate-700 flex-shrink-0" 
            />
            <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate">{item.name}</p>
                <p className="text-sm text-slate-400 italic truncate">"{item.text}"</p>
            </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

const TestimonialForm = ({ currentItem, setCurrentItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
            id="test-name" 
            label="Name" 
            icon={<FiUser />} 
            value={currentItem.name || ''} 
            onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} 
            required
        />
        {/* SIMPLIFICATION: Standardized on 'imageUrl' */}
        <AdminInput 
            id="test-image" 
            label="Avatar URL (Defaults to placeholder)" 
            icon={<FiImage />} 
            value={currentItem.imageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} 
            onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })} 
            required
        />
        <div className="md:col-span-2">
            <AdminTextArea 
                id="test-text" 
                label="Testimonial Text" 
                icon={<FiMessageSquare />} 
                value={currentItem.text || ''} 
                onChange={e => setCurrentItem({ ...currentItem, text: e.target.value })} 
                required
            />
        </div>
    </div>
);

// --- Main Admin Component ---

const TestimonialsAdmin = () => {
    // This component now fetches and manages its own state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await testimonialsApi.getAll();
            // Assuming the API returns a simple array at response.data.data
            setItems(response.data.data); 
        } catch (err) {
            console.error('Failed to fetch testimonials:', err);
            setError('Could not load testimonials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-300 rounded-md">{error}</div>;

    return (
        <AdminCrudController
            title="Testimonials"
            items={items}
            FormComponent={TestimonialForm}
            ListItemComponent={TestimonialListItem}
            // SIMPLIFICATION: Using 'imageUrl' directly, which matches the API field name.
            initialFormState={{ id: null, name: '', text: '', imageUrl: '' }}
            api={testimonialsApi}
            onDataChange={fetchData}
            // The mapping props are no longer needed, which makes the component cleaner.
        />
    );
};

export default TestimonialsAdmin;