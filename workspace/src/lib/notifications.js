const asObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};

const asInternalHref = (value) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : undefined;

const normalizeUsers = (payload) => {
  if (Array.isArray(payload.users) && payload.users.length) {
    return payload.users.map((user, index) => ({
      id: user.id || `notification-user-${index}`,
      name: user.name || 'FFA-X',
      avatar: user.avatar || undefined,
    }));
  }

  return [
    {
      id: payload.actor_id || 'ffax-system',
      name: payload.actor_name || 'FFA-X',
      avatar: payload.actor_avatar || undefined,
    },
  ];
};

const notificationTranslationKeys = {
  'offer.created': 'ffax.notifications.types.offer_created',
};

export const normalizeNotifications = (rows, translate) =>
  (Array.isArray(rows) ? rows : []).map((notification) => {
    const payload = asObject(notification.payload);
    const images = Array.isArray(payload.images)
      ? payload.images.filter((image) => typeof image === 'string')
      : [];
    const translationKey = notificationTranslationKeys[notification.type];
    const translatedDetail =
      translationKey && typeof translate === 'function' ? translate(translationKey) : '';

    return {
      id: notification.id,
      type: notification.type || 'default',
      title: notification.title || '',
      detail:
        payload.message ||
        payload.detail ||
        payload.description ||
        translatedDetail ||
        notification.title ||
        '',
      readAt: notification.read_at || notification.readAt || null,
      createdAt: notification.created_at || notification.createdAt,
      href: asInternalHref(payload.href),
      images: images.length ? images : undefined,
      user: normalizeUsers(payload),
    };
  });
