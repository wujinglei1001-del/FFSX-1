import { use } from 'react';
import AuthZitadelProvider, { AuthZitadelContext } from './auth-provider/AuthZitadelProvider';

const AuthProvider = ({ children }) => {
  return <AuthZitadelProvider>{children}</AuthZitadelProvider>;
};

export const useAuth = () => use(AuthZitadelContext);

export default AuthProvider;
