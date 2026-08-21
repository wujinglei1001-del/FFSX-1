import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, createBrowserRouter, useLocation } from 'react-router';
import { useConfigFromQuery } from 'hooks/useConfigFromQuery';
import LandingLayout from 'layouts/landing-layout';
import PageLoader from 'components/loading/PageLoader';
import paths, { rootPaths } from 'routes/paths';

const Showcase = lazy(() => import('pages/Showcase'));
const AboutUs = lazy(() => import('pages/landing/AboutUs'));
const Contact = lazy(() => import('pages/landing/Contact'));
const LandingFAQ = lazy(() => import('pages/landing/LandingFAQ'));

const RootShell = () => {
  const { pathname } = useLocation();

  useConfigFromQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    const root = document.documentElement;
    const showcase = pathname === rootPaths.root;

    root.style.overscrollBehavior = showcase ? 'none' : 'auto';
    root.style.filter = 'none';

    return () => {
      root.style.overscrollBehavior = 'auto';
      root.style.filter = 'auto';
    };
  }, [pathname]);

  return <Outlet />;
};

const suspense = (element) => (
  <Suspense fallback={<PageLoader sx={{ minHeight: '100vh' }} />}>{element}</Suspense>
);

const routes = [
  {
    element: <RootShell />,
    children: [
      {
        path: rootPaths.root,
        element: suspense(<Showcase />),
      },
      {
        path: rootPaths.root,
        element: suspense(
          <LandingLayout>
            <Outlet />
          </LandingLayout>,
        ),
        children: [
          {
            path: paths.landingAbout,
            element: <AboutUs />,
          },
          {
            path: paths.landingContact,
            element: <Contact />,
          },
          {
            path: paths.landingFaq,
            element: <LandingFAQ />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={rootPaths.root} replace />,
      },
    ],
  },
];

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export default createBrowserRouter(routes, { basename });
