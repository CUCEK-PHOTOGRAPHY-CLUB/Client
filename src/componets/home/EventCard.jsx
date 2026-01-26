import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const EventCard = ({ event, index, isLarge = false }) => {
  // Check if event date is in the past
  const isPastEvent = new Date(event.eventDate) < new Date();

  if (isLarge) {
    // Large card view for single carousel display
    return (
      <Link to={`/event/${event.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 rounded-3xl">
        <motion.div
          key={event.id}
          className="h-full relative bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 group"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
        >
          {/* Background Glow on Hover */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Horizontal Layout for Large Card */}
          <div className="h-full flex flex-col md:flex-row">
            {/* Event Image - Larger and more prominent */}
            <div className="relative md:w-1/2 h-64 md:h-96 overflow-hidden flex-shrink-0 bg-zinc-800">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              {/* Date Badge Overlay */}
              <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-300 text-[10px] uppercase tracking-wide">
                    {isPastEvent ? 'Registration closed on' : 'Registration closes on'}
                  </span>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Content - Spacious and prominent */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                  {event.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm line-clamp-6">
                  {event.description}
                </p>
              </div>

              {/* Register Now Button */}
              <button
                disabled={isPastEvent}
                className={`w-full md:w-auto font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-base ${isPastEvent
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transform group-hover:scale-105 hover:shadow-blue-500/50'
                  }`}
              >
                {isPastEvent ? 'Event Ended' : 'Register Now'}
                {!isPastEvent && <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />}
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // If somehow isLarge is false (shouldn't happen), return the large view anyway
  return (
    <Link to={`/event/${event.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 rounded-3xl">
      <motion.div
        key={event.id}
        className="h-full relative bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 group"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
      >
        <div className="h-full flex flex-col md:flex-row">
          <div className="relative md:w-1/2 h-64 md:h-96 overflow-hidden flex-shrink-0 bg-zinc-800">
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg">
              <div className="flex flex-col gap-1">
                <span className="text-gray-300 text-[10px] uppercase tracking-wide">
                  {isPastEvent ? 'Registration closed on' : 'Registration closes on'}
                </span>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                {event.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm line-clamp-6">
                {event.description}
              </p>
            </div>
            <button
              disabled={isPastEvent}
              className={`w-full md:w-auto font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-base ${isPastEvent
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transform group-hover:scale-105 hover:shadow-blue-500/50'
                }`}
            >
              {isPastEvent ? 'Event Ended' : 'Register Now'}
              {!isPastEvent && <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};