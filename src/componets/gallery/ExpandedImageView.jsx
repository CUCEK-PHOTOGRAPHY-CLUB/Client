// src/components/gallery/ExpandedImageView.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';

const ExpandedImageView = ({ image, onClose }) => (
  <>
    {/* Background overlay */}
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md"
    />

    {/* Main modal content area */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Responsive wrapper for image and text */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-7xl max-h-[90vh]">

        {/* Image container */}
        <motion.div
          layoutId={`card-${image.uniqueId}`}
          className="relative w-full lg:w-3/5 h-auto flex-shrink-0 rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl"
        >
          <motion.img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-contain max-h-[85vh]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Text container */}
        <motion.div
          className="w-full lg:w-2/5 flex-shrink-0 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4, ease: "easeOut" } }}
          exit={{ opacity: 0, y: 20, transition: { ease: "easeIn" } }}
        >
          <h2 className="text-3xl font-bold">{image.title}</h2>
          <p className="max-w-xl mt-2 text-neutral-300 mx-auto lg:mx-0">{image.description}</p>

          {image.link && (
            <a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full font-semibold text-white transition-transform hover:scale-105"
            >
              <FaInstagram className="text-xl" />
              <span>Watch on Instagram</span>
            </a>
          )}
        </motion.div>

      </div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.25, ease: "circOut" } }}
        exit={{ scale: 0, opacity: 0, transition: { ease: "circIn" } }}
      >
        <FiX size={24} />
      </motion.button>
    </div>
  </>
);

export default ExpandedImageView;