import { useCallback, useEffect, useState } from 'react';

export const usePlatformData = (platform, path, fallback) => {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!platform?.apiRequest) {
      setLoading(false);
      return fallback;
    }
    setLoading(true);
    try {
      const next = await platform.apiRequest(path);
      setData(next);
      setError(null);
      return next;
    } catch (requestError) {
      setError(requestError);
      return fallback;
    } finally {
      setLoading(false);
    }
  }, [fallback, path, platform]);

  useEffect(() => {
    let active = true;
    refresh().catch((requestError) => {
      if (active) setError(requestError);
    });
    return () => {
      active = false;
    };
  }, [refresh]);

  return { data, setData, loading, error, refresh };
};
