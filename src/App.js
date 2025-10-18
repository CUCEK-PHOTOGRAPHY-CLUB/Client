import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
// 1. Import your new, specifically named page
import HalloweenEventPage from './pages/HalloweenEventPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the existing homepage */}
        <Route path="/" element={<HomePage />} />
        
        {/* This is the existing dynamic route for generic events */}
        <Route path="/events/:eventId" element={<EventPage />} />
        
        {/* 2. Add the route for YOUR new page, matching the path in EventTeaser.jsx */}
        <Route path="/halloween-contest" element={<HalloweenEventPage />} />
        
        {/* You can add more routes for your main project here */}
      </Routes>
    </Router>
  );
}

export default App;
