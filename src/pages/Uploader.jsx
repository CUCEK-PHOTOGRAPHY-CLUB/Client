import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { eventsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Uploader = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customId: '',
        eventName: '',
        subtitle: '',
        description: '',
        registerLink: '',
        imageUrl: ''
    });
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const inputFieldStyles = "block w-full rounded-md border border-zinc-700 bg-zinc-900 py-2.5 px-3 text-white transition-all duration-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25";
    const errorMessageStyles = "flex items-center text-red-400 text-sm mb-4";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation updates
        if (!formData.imageUrl) {
            setErrorMessage('Please provide an image URL.');
            return;
        }
        if (!formData.customId || !formData.eventName || !formData.subtitle || !formData.description || !formData.registerLink) {
            setErrorMessage('All fields are required.');
            return;
        }
        setUploadStatus('uploading');
        setErrorMessage('');

        try {
            // Create JSON payload instead of FormData
            const payload = {
                id: formData.customId, // Use custom ID
                title: formData.eventName,
                subtitle: formData.subtitle,
                description: formData.description,
                date: new Date().toISOString(),
                location: 'TBA',
                image_url: formData.imageUrl, // Send image URL
                imageUrl: formData.imageUrl,   // Send fallback casing
                page_link: formData.registerLink,
                registerLink: formData.registerLink,
                pageLink: formData.registerLink
            };

            // Call API with JSON payload
            const response = await eventsApi.create(payload);
            console.log('API FULL Response:', response);
            console.log('API Response DATA:', response.data);

            setUploadStatus('success');

            // Redirect to the newly created event page after a short delay
            setTimeout(() => {
                // IMPORTANT: Use the ID returned by the server, as the backend requires a valid ObjectId for fetching.
                // The customId is saved as data but cannot be used as the primary key for the URL.
                const newEventId =
                    response.data?.data?.id ||
                    response.data?.data?._id ||
                    response.data?._id ||
                    response.data?.id ||
                    response.data?.event?._id ||
                    (response.data?.success && response.data?.event?.id);

                console.log("Server Returned ID:", newEventId);
                console.log("User Custom ID (Saved):", formData.customId);

                if (newEventId) {
                    navigate(`/cpcevent/${newEventId}`);
                } else {
                    console.error("Server ID missing. Defaulting to Custom ID (might fail if backend requires ObjectId):", formData.customId);
                    // Fallback to custom ID if server ID is somehow missing, though this likely leads to 500
                    navigate(`/cpcevent/${formData.customId}`);
                }
            }, 1000);

        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('error');
            setErrorMessage(error.response?.data?.message || 'Upload failed. Please try again.');
        }
    };

    return (
        <div className="w-full flex items-center justify-center p-4">
            <motion.div
                className="relative container max-w-3xl mx-auto bg-zinc-900/80 p-6 md:p-10 rounded-2xl border border-zinc-700 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                    Upload Event
                </h1>
                <p className="text-zinc-400 text-center mb-6">
                    Add a new event with an image link and details.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-8 min-h-[350px]">
                        {/* Left: Image Preview from URL */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                            <AnimatePresence mode="wait">
                                {!formData.imageUrl ? (
                                    <motion.div
                                        key="no-image"
                                        className="flex flex-col justify-center items-center w-full aspect-square rounded-lg border-2 border-dashed border-zinc-600 p-6 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <PhotoIcon className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
                                        <p className="text-zinc-400 font-medium">No Image URL provided</p>
                                        <p className="text-sm text-zinc-500 mt-2">Enter an image link on the right to see a preview.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="image-preview"
                                        className="relative w-full aspect-square"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg shadow-lg border border-zinc-700"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Invalid+Image+URL'; }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Right: Form fields */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <AnimatePresence>
                                {uploadStatus !== 'success' && (
                                    <motion.div className="flex flex-col h-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                                        <div className="mb-4">
                                            <label htmlFor="customId" className="block text-sm font-medium mb-2 text-sky-400">Custom Event ID (URL)</label>
                                            <input type="text" name="customId" id="customId" placeholder="e.g. my-awesome-event" required value={formData.customId} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div>
                                            <label htmlFor="eventName" className="block text-sm font-medium mb-2">Event Title</label>
                                            <input type="text" name="eventName" id="eventName" required value={formData.eventName} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="subtitle" className="block text-sm font-medium mb-2">Subtitle</label>
                                            <input type="text" name="subtitle" id="subtitle" required value={formData.subtitle} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Image URL</label>
                                            <input type="url" name="imageUrl" id="imageUrl" placeholder="https://example.com/image.jpg" required value={formData.imageUrl} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div className="my-4">
                                            <label htmlFor="registerLink" className="block text-sm font-medium mb-2">Register Link</label>
                                            <input type="url" name="registerLink" id="registerLink" required value={formData.registerLink} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                                            <textarea id="description" name="description" rows={4} required value={formData.description} onChange={handleInputChange} className={inputFieldStyles} />
                                        </div>
                                        <div className="mt-auto pt-4">
                                            {errorMessage && (
                                                <div className={errorMessageStyles}>
                                                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />{errorMessage}
                                                </div>
                                            )}
                                            {uploadStatus === 'uploading' && (
                                                <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-4">
                                                    <motion.div className="bg-sky-500 h-2.5 rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />
                                                </div>
                                            )}
                                            <button type="submit" disabled={uploadStatus === 'uploading'} className="w-full font-semibold py-3 px-4 rounded-lg bg-sky-500 transition-all duration-300 hover:bg-sky-400 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70">
                                                {uploadStatus === 'uploading' ? 'Uploading...' : 'Confirm & Upload'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                                {uploadStatus === 'success' && (
                                    <motion.div className="flex flex-col items-center justify-center h-full text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                                        <CheckCircleIcon className="w-24 h-24 text-green-400" />
                                        <h2 className="text-2xl font-bold mt-4">Upload Complete!</h2>
                                        <p className="text-zinc-400 mt-2">Your event has been added.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Uploader;
