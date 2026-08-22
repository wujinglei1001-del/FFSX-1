import { createContext, use, useCallback, useEffect, useState } from 'react';
import { removeItemFromStore } from 'lib/utils';
import { firebaseAuth } from 'services/firebase/firebase';
import { useGetCurrentUser } from 'services/swr/api-hooks/useAuthApi';

export const AuthJwtContext = createContext({});

const AuthJwtProvider = ({ children }) => {
  const [sessionUser, setSessionUser] = useState(null);

  const { data } = useGetCurrentUser();

  const setSession = useCallback(
    (user, token) => {
      setSessionUser(user);
      if (token) {
        localStorage.setItem('auth_token', token);
      }
    },
    [setSessionUser],
  );

  const signout = useCallback(() => {
    setSessionUser(null);
    removeItemFromStore('session_user');
    removeItemFromStore('auth_token');
    if (sessionUser?.provider === 'firebase') {
      firebaseAuth.signOut();
    }
  }, [setSessionUser, sessionUser]);

  useEffect(() => {
    if (data) {
      setSession(data);
    }
  }, [data]);

  return (
    <AuthJwtContext value={{ sessionUser, setSessionUser, setSession, signout }}>
      {children}
    </AuthJwtContext>
  );
};

export const useAuth = () => use(AuthJwtContext);

export default AuthJwtProvider;
