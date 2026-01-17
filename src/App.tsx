import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const Posts = lazy(() => import('./pages/Posts'));

const WorkDetail = lazy(
  () => import('./pages/WorkDetail'),
);
const PostDetail = lazy(
  () => import('./pages/PostDetail'),
);
const NotFound = lazy(
  () => import('./pages/NotFound'),
);

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-stone-200 border-t-cinnabar rounded-full animate-spin"></div>
  </div>
);

// AnimatedRoutes wrapper to use useLocation hook properly
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 max-w-3xl">
      <AnimatePresence mode="wait" initial={true}>
        <Suspense fallback={<PageLoader />}>
          <Routes
            location={location}
            key={location.pathname}
          >
            <Route path="/" element={<Home />} />
            <Route
              path="/works"
              element={<Works />}
            />
            <Route
              path="/works/:id"
              element={<WorkDetail />}
            />
            <Route
              path="/posts"
              element={<Posts />}
            />

            <Route
              path="/posts/:id"
              element={<PostDetail />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-ink dark:text-stone-200 transition-colors duration-500">
          <ScrollToTop />
          <Navbar />

          <main className="grow">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
