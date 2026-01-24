import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for Nav Links ---
const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Works', href: '/gallery' },
  { title: 'Join', href: '/join' },
  { title: 'Film Scene Recreation', href: '/film-recreation' },
  { title: 'Videos', href: '/videos' },
];

// --- Mobile Menu Component (Unchanged) ---
const MobileMenu = ({ links, isOpen, setIsOpen, isMemberAuthenticated, handleMemberLogout, member }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg"
      >
        <motion.div
          className="flex flex-col items-center justify-center h-full gap-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          {links.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-medium text-gray-200 hover:text-white transition-colors"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {link.title}
            </motion.a>
          ))}
          {isMemberAuthenticated ? (
            <>
              <motion.a
                href={`/members/${member?.id}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium text-sky-400 hover:text-sky-300 transition-colors"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + links.length * 0.1 }}
              >
                My Portfolio
              </motion.a>
              <motion.button
                onClick={() => { handleMemberLogout(); setIsOpen(false); }}
                className="mt-4 border border-red-500/30 px-6 py-2 rounded-full text-lg font-medium text-red-400"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + links.length * 0.1 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium text-white hover:text-sky-400 transition-colors"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + links.length * 0.1 }}
              >
                Member Login
              </Link>
              <motion.button
                className="mt-4 border border-white/30 px-6 py-2 rounded-full text-lg font-medium backdrop-blur-sm transition-all duration-200 hover:bg-white/20 text-white"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + links.length * 0.1 }}
              >
                Contact
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

import { useMemberAuth } from '../context/MemberAuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

// --- Main Navigation Component (MODIFIED) ---
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isMemberAuthenticated, memberLogout, member } = useMemberAuth();
  const navigate = useNavigate();

  const handleMemberLogout = async () => {
    await memberLogout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 text-white">
        <motion.div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ease-in-out"
          animate={{
            backgroundColor: hasScrolled ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
            backdropFilter: hasScrolled ? 'blur(16px)' : 'blur(0px)',
            border: hasScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)',
          }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="font-bold text-lg md:text-xl tracking-wide" // Slightly adjusted text size
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a href="/">CUCEK PHOTOGRAPHY CLUB</a>
          </motion.div>

          {/* --- THE FIX IS HERE --- */}
          {/* This new container groups the links and button together. */}
          <div className="hidden md:flex items-center gap-8">
            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
              {navLinks.map((link) => (
                <a key={link.title} href={link.href} className="relative group">
                  <span className="group-hover:text-white transition-colors">{link.title}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </a>
              ))}
            </div>

            {/* Desktop Member/Contact Buttons */}
            {isMemberAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to={`/members/${member?.id}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 transition-all"
                >
                  My Portfolio
                </Link>
                <button
                  onClick={handleMemberLogout}
                  className="border border-red-500/30 px-4 py-2 rounded-full text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <motion.button
                  className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <motion.div animate={isMenuOpen ? "open" : "closed"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.line x1="4" y1="8" x2="20" y2="8" stroke="white" strokeWidth="2" variants={{ closed: { d: "M 4 8 L 20 8" }, open: { d: "M 6 18 L 18 6" } }} />
                  <motion.line x1="4" y1="16" x2="20" y2="16" stroke="white" strokeWidth="2" variants={{ closed: { d: "M 4 16 L 20 16" }, open: { d: "M 6 6 L 18 18" } }} />
                </svg>
              </motion.div>
            </button>
          </div>
        </motion.div>
      </nav>
      {/* Render Mobile Menu */}
      <MobileMenu
        links={navLinks}
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        isMemberAuthenticated={isMemberAuthenticated}
        handleMemberLogout={handleMemberLogout}
        member={member}
      />
    </>
  );
};

export default Nav;