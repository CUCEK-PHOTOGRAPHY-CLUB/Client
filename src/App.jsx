// src/App.jsx

import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import { Analytics } from "@vercel/analytics/react"

// Layout Components
// FIX: Corrected typo 'componets' to 'components'
import Nav from './componets/Navbar.jsx';
import Footer from './componets/Footer.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import Home from './pages/Home.jsx';

// Contexts and Protected Route Components
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './componets/admin/ProtectedRoute.jsx';
import { MemberAuthProvider } from './context/MemberAuthContext.jsx';
import MemberProtectedRoute from './componets/members/MemberProtectedRoute.jsx';

// --- ALL LAZILY LOADED PAGES ---
// This entire block was missing from the previous snippet, causing the error.
// Home is now imported synchronously for better SEO
const AboutPage = lazy(() => import('./pages/About.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const JoinPage = lazy(() => import('./pages/JoinPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx')); // <-- The missing import
const Aaravam = lazy(() => import('./pages/Aaravam.jsx'));
const EventPage = lazy(() => import('./pages/EventPage.jsx'));
const VideoListing = lazy(() => import('./pages/VideoListing.jsx'));
const VideoDetailsPage = lazy(() => import('./pages/VideoDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const Teampage = lazy(() => import('./pages/Teampage.jsx'));
const Alumni = lazy(() => import('./pages/Alumni.jsx'));
const MemberPortfolio = lazy(() => import('./pages/MemberPortfolio.jsx'));
const PhotoUploadPage = lazy(() => import('./pages/PhotoUploadPage.jsx'));
const Uploader = lazy(() => import('./pages/Uploader.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const EventTemplate = lazy(() => import('./pages/EventTemplate.jsx'));
const StorePage = lazy(() => import('./pages/StorePage.jsx'));
const MyProfile = lazy(() => import('./pages/MyProfile.jsx'));
const HalloweenEventPage = lazy(() => import('./pages/HalloweenEventPage.jsx'));
const FilmRecreationPage = lazy(() => import('./pages/FilmRecreationPage.jsx'));
const MemberDetailsPage = lazy(() => import('./pages/MemberDetailsPage.jsx'));

function App() {
  const location = useLocation();
  // Hide Nav and Footer on admin and auth pages for a cleaner interface
  const isSpecialRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className='flex flex-col min-h-screen w-full bg-neutral-950'>
      <Analytics />
      <AuthProvider>
        <MemberAuthProvider>
          {!isSpecialRoute && <Nav />}
          <ToastContainer />
          <main className="flex-1">
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                {/* --- Admin Routes --- */}
                <Route
                  path="/admin"
                  element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
                />
                <Route path="/login" element={<AdminLoginPage />} />

                {/* --- Member Login Page --- */}
                <Route path="/auth" element={<LoginPage />} />

                {/* --- MEMBER PROTECTED ROUTES --- */}
                <Route
                  path="/memberprofile"
                  element={<MemberProtectedRoute><MyProfile /></MemberProtectedRoute>}
                />
                <Route
                  path="/upload"
                  element={<MemberProtectedRoute><PhotoUploadPage /></MemberProtectedRoute>} />
                <Route path="/event-upload" element={<ProtectedRoute><Uploader /></ProtectedRoute>} />


                {/* --- Public Routes --- */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/aaravam" element={<Aaravam />} />
                <Route path="/halloween-contest" element={<HalloweenEventPage />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/teampage" element={<Teampage />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/videos" element={<VideoListing />} />
                <Route path="/video/:id" element={<VideoDetailsPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/film-recreation" element={<FilmRecreationPage />} />
                <Route path='/members/:id' element={<MemberPortfolio />} />
                <Route path='/member-details' element={<MemberDetailsPage />} />
                <Route path="/cpcevent/:eventId" element={<EventTemplate />} />

                {/* Catch-all Not Found Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          {!isSpecialRoute && <Footer />}
        </MemberAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default App;