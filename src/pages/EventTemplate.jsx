import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { eventsApi } from '../services/api';
import bg1 from '../assets/FilmSceneRec/bg1.png'; // Fallback image

const EventTemplate = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const fetchEvent = async () => {
            console.log("Fetching event with ID:", eventId);
            try {
                // Assuming eventsApi.getOne returns the event object directly or in response.data
                const response = await eventsApi.getOne(eventId);
                console.log("API RAW Response:", response);

                // Handle different response structures
                // Fix: The actual event object is likely inside response.data.data based on Uploader success
                const eventData = response.data?.data || response.data || response;
                console.log("Final Event Data Used:", eventData);

                if (!eventData) {
                    throw new Error("No data received from API");
                }

                setEvent(eventData);
            } catch (err) {
                console.error("Failed to fetch event:", err);
                console.error("Error details:", err.response || err.message);
                setError("Failed to load event details. Check console for more info.");
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 79, 190, 0.15), 
      transparent 80%
    )
  `;

    if (loading) return <div className="text-white flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 flex items-center justify-center min-h-screen">{error}</div>;
    if (!event) return <div className="text-white flex items-center justify-center min-h-screen">Event not found</div>;

    // Robust data mapping
    const title = event.title || event.name || "Untitled Event";
    // Check if subtitle exists, otherwise fallback to nothing or check description if formatted
    const subtitle = event.subtitle || "";
    const description = event.description || "No description provided.";
    const registerLink = event.registerLink || event.register_link || event.pageLink || event.page_link || "#";
    const bgImage = event.image || event.imageUrl || event.image_url || bg1;

    return (
        <div
            onMouseMove={handleMouseMove}
            className="text-white font-sans min-h-screen overflow-x-hidden"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* --- BACKGROUND EFFECT --- */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 transition duration-300"
                style={{ background }}
            />

            {/* --- SECTION 1: HEADER --- */}
            <section className="relative h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center px-4"
                >
                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 mb-6 tracking-tighter">
                        {title}
                        {subtitle && (
                            <span className="block text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 mb-6 tracking-tighter">
                                {subtitle}
                            </span>
                        )}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-2xl text-white max-w-2xl font-light tracking-wide uppercase"
                    >
                        {description}
                    </motion.p>
                    <motion.a
                        href={registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.6)",
                            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="font-light text-lg md:text-2xl uppercase tracking-wide text-white pointer-events-auto relative z-20 cursor-pointer mt-12 inline-block px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                    >
                        Register Now
                    </motion.a>
                </motion.div>


            </section>
        </div>
    );
};

export default EventTemplate;
