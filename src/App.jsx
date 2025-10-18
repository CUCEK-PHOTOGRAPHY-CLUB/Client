// src/App.jsx

import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import { Analytics } from "@vercel/analytics/react"


// Your components
import Nav from './componets/Navbar.jsx';
import Footer from './componets/Footer.jsx';
import LoadingPage from './pages/LoadingPage.jsx';

// Context and Protected Routes
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './componets/admin/ProtectedRoute.jsx';


// Your Lazily Loaded Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const JoinPage = lazy(() => import('./pages/JoinPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const Aaravam = lazy(() => import('./pages/Aaravam.jsx'));
const EventPage = lazy(() => import('./pages/EventPage.jsx'));
const VideoListing = lazy(() => import('./pages/VideoListing.jsx'));
const VideoDetailsPage = lazy(() => import('./pages/VideoDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const Teampage = lazy(() => import('./pages/Teampage.jsx'));
const Alumni = lazy(() => import('./pages/Alumni.jsx'));

const MemberPortfolio = lazy(() => import('./pages/MemberPortfolio.jsx'));
const PhotoUploadPage = lazy(() => import('./pages/PhotoUploadPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const StorePage = lazy(() => import('./pages/StorePage.jsx'));
const HalloweenEventPage = lazy(() => import('./pages/HalloweenEventPage.jsx'));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className='flex flex-col min-h-screen w-full bg-neutral-950'>
      <Analytics />
      <AuthProvider>
        {!isAdminRoute && <Nav />}
        <ToastContainer />
        <main className="flex-1">
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route
                path="/admin"
                element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
              />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/login" element={<AdminLoginPage />} />
              <Route path="/aaravam" element={<Aaravam />} />
              <Route path="/halloween-contest" element={<HalloweenEventPage />} />
              <Route path="/event/:eventId" element={<EventPage />} />
              <Route path="*" element={<NotFoundPage />} /> 
              {/*<Route path="/teampage" element={<Teampage />} />
              <Route path="/alumni" element={<Alumni />} /> 
              <Route path="/videos" element={<VideoListing />} />
              <Route path="/video/:id" element={<VideoDetailsPage />} />
              <Route path="/members/:id" element={<MemberPortfolio />} />
              <Route path="/upload" element={<PhotoUploadPage />} />
              <Route path="/auth" element={<LoginPage />} />
              <Route path="/store" element={<StorePage />} />*/}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </AuthProvider>
    </div>  
  );
}

export default App;