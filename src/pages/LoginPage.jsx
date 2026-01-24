// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useMemberAuth } from '../context/MemberAuthContext'; // 1. Import the new auth hook
import { useNavigate } from 'react-router-dom'; // 2. Import for redirection

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Changed 'status' to 'loading' for clarity
  const [error, setError] = useState('');

  const { memberLogin } = useMemberAuth(); // 3. Get the login function from context
  const navigate = useNavigate(); // 4. Get the navigate function for redirection

  const inputFieldStyles = "w-full rounded-md border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-3 text-white transition-all duration-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25";

  // 5. Updated handleSubmit to be async and call the real API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the login function from our context
      const user = await memberLogin({ email, password });

      // On success, redirect to the member's public portfolio page
      if (user && user.id) {
        navigate(`/members/${user.id}`);
      } else {
        // Fallback if ID is missing
        navigate('/memberprofile');
      }
    } catch (err) {
      // If the context throws an error, display it
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      // Always stop the loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg"></div>

      <motion.div
        className="relative w-full max-w-md bg-zinc-900/80 p-8 rounded-2xl border border-zinc-700 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">Member Login</h1>
          <p className="text-zinc-400">Welcome to the CPC Photography Club</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                className="flex items-center p-3 mb-4 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                <FiAlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputFieldStyles} />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputFieldStyles} />
          </div>

          <button
            type="submit"
            disabled={loading} // 6. Updated button state
            className="w-full flex justify-center font-semibold py-3 px-4 rounded-lg bg-sky-500 transition-all duration-300 hover:bg-sky-400 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;