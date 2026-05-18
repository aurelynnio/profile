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
  <div className="loading-state min-h-[50vh]">
    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-faint">
      <div className="h-8 w-8 rounded-full border-4 border-stone-200 border-t-cinnabar animate-spin dark:border-stone-700 dark:border-t-cinnabar-light" />
      <span>Loading</span>
    </div>
  </div>
);

// AnimatedRoutes wrapper to use useLocation hook properly
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="page-shell">
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
        <div className="app-shell min-h-screen flex flex-col font-sans text-ink dark:text-stone-200 transition-colors duration-500">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(178,75,51,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(212,117,89,0.08),transparent_50%)]" />
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
