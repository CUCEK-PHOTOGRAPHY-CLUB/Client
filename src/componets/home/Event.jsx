import React, { useState, useEffect, useRef } from 'react';
import { EventCard } from "./EventCard";
import { eventsApi } from "../../services/api.js"; // Adjust path if necessary

// --- Loading Skeleton for Single Large Event Card ---
const EventSectionSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      {/* Single Large Card Skeleton */}
      <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
        <div className="flex flex-col md:flex-row">
          {/* Image Placeholder - Left Side */}
          <div className="md:w-1/2 h-64 md:h-96 bg-neutral-800"></div>

          {/* Content Placeholder - Right Side */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Title Placeholder */}
              <div className="w-4/5 h-8 md:h-10 bg-neutral-800 rounded"></div>

              {/* Description Placeholders */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-neutral-800 rounded"></div>
                <div className="w-full h-4 bg-neutral-800 rounded"></div>
                <div className="w-5/6 h-4 bg-neutral-800 rounded"></div>
                <div className="w-4/5 h-4 bg-neutral-800 rounded"></div>
              </div>
            </div>

            {/* Button Placeholder */}
            <div className="w-40 h-12 bg-neutral-800 rounded-lg mt-6"></div>
          </div>
        </div>
      </div>

      {/* Pagination Dots Placeholder */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-8 h-2 bg-neutral-800 rounded-full"></div>
        <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
        <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
      </div>
    </div>
  );
};


const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventsApi.getAll();
        const eventsData = response.data?.data;

        if (eventsData && Array.isArray(eventsData)) {
          // Filter out any events missing essential data before processing
          const validEvents = eventsData.filter(event =>
            event && event.id && event.title && event.imageUrl && event.eventDate
          );

          const formattedEvents = validEvents
            .filter(event => event.isActive)
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
            .map(event => ({
              id: event.id,
              title: event.title,
              description: event.description,
              image: event.imageUrl,
              eventDate: event.eventDate,
              date: new Date(event.eventDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            }));

          setEvents(formattedEvents);
        } else {
          throw new Error("Invalid data format received from the API.");
        }
      } catch (err) {
        setError("Could not load upcoming events.");
        console.error("API Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Check scroll state
  useEffect(() => {
    const checkScrollState = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollState);
      checkScrollState(); // Check initial state
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollState);
      }
    };
  }, [events]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.offsetWidth; // Scroll exactly one card width

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // --- RENDER LOGIC UPDATE ---
  const renderContent = () => {
    // Display the professional skeleton UI while loading
    if (loading) {
      return <EventSectionSkeleton />;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }


    if (events.length === 0) {
      return <p className="text-center text-gray-400">No upcoming events right now. Check back later!</p>;
    }

    // Render single large event card with carousel navigation
    return (
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow - Larger and more prominent */}
        <button
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          className="hidden md:block absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 shadow-xl"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Single Event Card Container */}
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
          >
            {events.map((event, index) => (
              <div
                key={event.id}
                className="w-full flex-shrink-0 px-2 scroll-snap-start"
              >
                <EventCard event={event} index={index} isLarge={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Larger and more prominent */}
        <button
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          className="hidden md:block absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 shadow-xl"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  container.scrollTo({ left: index * container.offsetWidth, behavior: 'smooth' });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${index === 0
                ? 'w-8 bg-blue-500'
                : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-black via-zinc-900 to-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileinview={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Events
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join us for exciting events and make unforgettable memories
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default EventSection;