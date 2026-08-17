import { Navigate, useLocation } from 'react-router';
import { useAuth } from 'providers/AuthProvider';
import paths from 'routes/paths';
import PageLoader from 'components/loading/PageLoader';

const AuthGurad = ({ children }) => {
  const { sessionUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader sx={{ height: '100vh' }} />;
  }

  return sessionUser ? (
    children
  ) : (
    <Navigate
      to={paths.defaultJwtLogin}
      replace
      state={{ from: `${location.pathname}${location.search}${location.hash}` }}
    />
  );
};

export default AuthGurad;
