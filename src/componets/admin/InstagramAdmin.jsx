// src/components/admin/InstagramAdmin.jsx

import React, { useState, useEffect } from 'react';
import { FiInstagram, FiImage, FiEdit, FiTrash2, FiLink, FiLoader, FiFileText } from 'react-icons/fi';
import { instagramApi } from '../../services/api.js';

import AdminCrudController from './AdminCrudController.jsx';
import AdminInput from './AdminInput.jsx';
import AdminTextArea from './AdminTextArea.jsx';

// --- Instagram-Specific Components ---

const InstagramListItem = ({ item, onEdit, onDelete }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/50 p-4 rounded-lg gap-4 border border-slate-700">
        <div className="flex items-center gap-4 w-full">
            <a href={item.postUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <img 
                    src={item.imageUrl || 'https://placehold.co/150x150/111827/FFFFFF?text=Insta'} 
                    alt="Instagram Post Thumbnail" 
                    className="w-16 h-16 rounded-md object-cover bg-slate-700 transition-transform hover:scale-105"
                />
            </a>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate">{item.caption || 'Instagram Post'}</p>
                {item.postUrl && (
                    <a href={item.postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-sky-400 flex items-center gap-1.5 break-all">
                        <FiLink size={12}/> 
                        <span className="truncate">{item.postUrl}</span>
                    </a>
                )}
            </div>
        </div>
        <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
            <button onClick={() => onEdit(item)} className="text-slate-400 hover:text-sky-400 transition-colors"><FiEdit size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 size={18} /></button>
        </div>
    </div>
);

const InstagramForm = ({ currentItem, setCurrentItem }) => (
    <div className="space-y-6">
        <AdminTextArea
            id="insta-caption"
            label="Caption (Optional)"
            icon={<FiFileText />}
            value={currentItem.caption || ''}
            onChange={e => setCurrentItem({ ...currentItem, caption: e.target.value })}
            placeholder="Add a caption for this Instagram post..."
        />
        <AdminInput
            id="insta-link"
            label="Instagram Post URL"
            icon={<FiInstagram />}
            value={currentItem.postUrl || ''}
            onChange={e => setCurrentItem({ ...currentItem, postUrl: e.target.value })}
            required
        />
        <AdminInput
            id="insta-image"
            label="Custom Image URL (Optional, defaults to post image)"
            icon={<FiImage />}
            value={currentItem.imageUrl || ''}
            onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
        />
    </div>
);


// --- Main Admin Component ---

const InstagramAdmin = () => {
    // This component now fetches and manages its own state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await instagramApi.getAll();
            // Assuming the API returns a simple array at response.data.data
            setItems(response.data.data);
        } catch (err) {
            console.error('Failed to fetch Instagram posts:', err);
            setError('Could not load Instagram posts. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading && !items.length) return <div className="flex justify-center items-center h-40"><FiLoader className="animate-spin text-sky-500" size={40} /></div>;
    if (error) return <div className="p-4 bg-red-900/50 text-red-30, caption: ''0 rounded-md">{error}</div>;

    return (
        <AdminCrudController
            title="Instagram Posts"
            items={items}
            FormComponent={InstagramForm}
            ListItemComponent={InstagramListItem}
            initialFormState={{ id: null, postUrl: '', imageUrl: '' }}
            api={instagramApi}
            onDataChange={fetchData}
            // No mapping props are needed as the form state uses the API field names
        />
    );
};

export default InstagramAdmin;