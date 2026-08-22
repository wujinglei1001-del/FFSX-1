import { useCallback, useMemo } from 'react';
import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axios/axiosInstance';
import useSWR from 'swr';

const normalizeNotification = (notification) => ({
  id: notification.id,
  type: notification.type || 'system',
  detail: notification.title || notification.type || '',
  readAt: notification.read_at || null,
  createdAt: notification.created_at,
  user: [],
  payload: notification.payload || {},
});

export const useNotifications = () => {
  const { data, error, isLoading, mutate } = useSWR(apiEndpoints.notifications);
  const rows = Array.isArray(data) ? data : [];
  const notifications = useMemo(() => rows.map(normalizeNotification), [rows]);

  const markRead = useCallback(
    async (id) => {
      await axiosInstance.put(apiEndpoints.notificationRead(id));
      await mutate();
    },
    [mutate],
  );

  const markAllRead = useCallback(async () => {
    const unread = notifications.filter((notification) => !notification.readAt);
    await Promise.all(
      unread.map((notification) =>
        axiosInstance.put(apiEndpoints.notificationRead(notification.id)),
      ),
    );
    await mutate();
  }, [mutate, notifications]);

  return { notifications, error, isLoading, markRead, markAllRead, mutate };
};
