import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router';
import AuthLayout from 'layouts/auth-layout';
import ZitadelAuthLayout from 'layouts/auth-layout/ZitadelAuthLayout';
import MainLayout from 'layouts/main-layout';
import paths, { rootPaths, workbenchEntryPath } from 'routes/paths';
import AuthGuard from 'components/guard/AuthGuard';
import PageLoader from 'components/loading/PageLoader';

const App = lazy(() => import('App'));
const Workbench = lazy(() => import('pages/apps/workbench/Workbench'));
const Notifications = lazy(() => import('pages/others/Notifications'));
const Login = lazy(() => import('pages/authentication/zitadel/Login'));
const Signup = lazy(() => import('pages/authentication/zitadel/Signup'));
const VerifyEmail = lazy(() => import('pages/authentication/zitadel/VerifyEmail'));
const LoggedOut = lazy(() => import('pages/authentication/zitadel/LoggedOut'));

const ProtectedWorkspace = () => (
  <AuthGuard>
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  </AuthGuard>
);

export const productionRoutes = [
  {
    element: <App />,
    children: [
      {
        element: <ProtectedWorkspace />,
        children: [
          {
            index: true,
            element: <Workbench />,
          },
          {
            path: paths.notifications,
            element: <Notifications />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            element: (
              <ZitadelAuthLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </ZitadelAuthLayout>
            ),
            children: [
              {
                path: rootPaths.authZitadelRoot,
                children: [
                  {
                    path: paths.zitadelLogin,
                    element: <Login />,
                  },
                  {
                    path: paths.zitadelSignup,
                    element: <Signup />,
                  },
                  {
                    path: paths.zitadelVerifyEmail,
                    element: <VerifyEmail />,
                  },
                ],
              },
              {
                path: paths.zitadelLoggedOut,
                element: <LoggedOut />,
              },
              {
                path: paths.zitadelCallback,
                element: <PageLoader sx={{ height: '100vh' }} />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={workbenchEntryPath} replace />,
      },
    ],
  },
];

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export default createBrowserRouter(productionRoutes, { basename });
