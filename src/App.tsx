import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './localization';

// Import pages (we'll create these next)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const TrackBookingPage = React.lazy(() => import('./pages/TrackBookingPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Layout components (we'll create these next)
const Layout = React.lazy(() => import('./components/Layout/Layout'));

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="book" element={<BookingPage />} />
              <Route path="track" element={<TrackBookingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </LanguageProvider>
  );
};

export default App;
