import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import i18n from 'locales/i18n';
import { useAuth } from 'providers/AuthProvider';
import { loadMicroApp } from 'qiankun';
import { MICRO_APPS, getMicroAppEntry } from './manifest';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const MARKETPLACE_API_BASE = import.meta.env.VITE_MARKETPLACE_API_URL || '/marketplace-api';

const MicroAppHost = ({ appId }) => {
  const containerRef = useRef(null);
  const microAppRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const { getAccessToken, sessionUser } = useAuth();

  useEffect(() => {
    const definition = MICRO_APPS[appId];
    if (!definition || !containerRef.current || !sessionUser) return undefined;
    let disposed = false;

    const apiRequest = async (path, init = {}) => {
      const token = await getAccessToken();
      const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const payload = response.status === 204 ? null : await response.json();
      if (!response.ok) {
        const requestError = new Error(payload?.error || 'request_failed');
        requestError.status = response.status;
        throw requestError;
      }
      return payload?.data ?? payload;
    };

    const marketplaceRequest = async (path, init = {}) => {
      const token = await getAccessToken();
      const response = await fetch(`${MARKETPLACE_API_BASE}${path}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const payload = response.status === 204 ? null : await response.json();
      if (!response.ok) {
        const requestError = new Error(
          payload?.message || payload?.error || 'marketplace_request_failed',
        );
        requestError.status = response.status;
        throw requestError;
      }
      return payload;
    };

    const mount = async () => {
      setLoading(true);
      setError(null);
      try {
        const instance = loadMicroApp(
          {
            name: definition.name,
            entry: getMicroAppEntry(definition),
            container: containerRef.current,
            props: {
              getAccessToken,
              apiRequest,
              marketplaceRequest,
              tenantId: sessionUser.organization,
              userId: sessionUser.id,
              roles: sessionUser.roles || [],
              locale: i18n.language,
              theme: theme.palette.mode,
              navigate,
              notify: (event) =>
                window.dispatchEvent(new CustomEvent('ffax:notification', { detail: event })),
            },
          },
          {
            singular: false,
            sandbox: { strictStyleIsolation: false, experimentalStyleIsolation: true },
          },
        );
        microAppRef.current = instance;
        await instance.mountPromise;
        if (!disposed) setLoading(false);
      } catch (mountError) {
        if (!disposed) {
          setLoading(false);
          setError(mountError);
        }
      }
    };

    mount();
    return () => {
      disposed = true;
      const instance = microAppRef.current;
      microAppRef.current = null;
      if (instance?.getStatus?.() !== 'NOT_MOUNTED') instance?.unmount?.();
    };
  }, [appId, getAccessToken, navigate, sessionUser, theme.palette.mode]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 120px)', position: 'relative' }}>
      {loading && (
        <Box
          sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 1 }}
        >
          <CircularProgress size={28} />
        </Box>
      )}
      {error && <Alert severity="error">微应用加载失败：{error.message}</Alert>}
      <Box ref={containerRef} data-ffax-microapp={appId} sx={{ minHeight: 'inherit' }} />
    </Box>
  );
};

export default MicroAppHost;
