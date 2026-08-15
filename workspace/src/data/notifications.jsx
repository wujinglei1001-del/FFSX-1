import { Typography } from '@mui/material';
import { initialConfig } from 'config';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { users } from './users';

export const notificationBadge = {
  birthday: { color: 'warning.main', icon: 'material-symbols:cake-rounded' },
  friend_request: { color: 'success.main', icon: 'material-symbols:person-add-rounded' },
  commented: { color: 'primary.main', icon: 'material-symbols:mode-comment-rounded' },
  following: { color: 'primary.main', icon: 'material-symbols:person-add-rounded' },
  reaction_love: { color: 'error.light', icon: 'material-symbols-light:favorite-rounded' },
  reaction_smile: { color: 'transparent', icon: 'noto:grinning-face-with-smiling-eyes' },
  photos: { color: 'primary.main', icon: 'material-symbols:imagesmode-rounded' },
  group_invitation: { color: 'primary.main', icon: 'material-symbols:group-rounded' },
  tagged: { color: 'primary.main', icon: 'material-symbols:sell' },
};

export const notifications = [
  {
    id: 1,
    type: 'birthday',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.jolyon_wagg_a9a74599')}
        </Typography>{' '}
        {i18n.t('common.and')}{' '}
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.1_other_841be999')}
        </Typography>{' '}
        {i18n.t(
          'ui.data.notifications.friend_have_birthdays_today_wish_them_to_celebrate_t_b953d63b',
        )}
      </>
    ),
    readAt: null,
    user: [users[6], users[15]],
    createdAt: dayjs().subtract(1, 'm').toDate(),
  },
  {
    id: 2,
    type: 'commented',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.bianca_castapheore_0389f593')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.commented_on_your_photo_snowy_looks_amazing_here_791940d3')}
      </>
    ),
    readAt: null,
    user: [users[6]],
    createdAt: dayjs().subtract(20, 'm').toDate(),
    images: [`${initialConfig.assetsDir}/images/notifications/1.webp`],
  },
  {
    id: 3,
    type: 'friend_request',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.nestor_702e79af')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.sent_you_a_friend_request_ac72c5eb')}
      </>
    ),
    readAt: new Date(),
    user: [users[4]],
    createdAt: dayjs().subtract(2, 'h').toDate(),
  },
  {
    id: 4,
    type: 'following',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.cuthbert_calculus_5f8406b6')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.started_following_you_fe780beb')}
      </>
    ),
    readAt: new Date(),
    user: [users[7]],
    createdAt: dayjs().subtract(3, 'm').toDate(),
  },
  {
    id: 5,
    type: 'reaction_love',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.irma_4d607b38')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.reacted_to_your_post_happy_birthday_buddy_6136f1ee')}
      </>
    ),
    readAt: new Date(),
    user: [users[15]],
    createdAt: dayjs().subtract(1, 'd').toDate(),
  },
  {
    id: 6,
    type: 'commented',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.irma_4d607b38')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.commented_on_your_post_thank_you_3017c110')}
      </>
    ),
    readAt: new Date(),
    user: [users[15]],
    createdAt: dayjs().subtract(1, 'd').toDate(),
  },
  {
    id: 7,
    type: 'reaction_smile',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.thomson_thompson_53be4bc4')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.reacted_to_your_photo_f3be017b')}
      </>
    ),
    readAt: new Date(),
    user: [users[1]],
    createdAt: dayjs().subtract(1, 'd').toDate(),
  },
  {
    id: 12,
    type: 'friend_request',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.fushiguro_megumi_9933c8d7')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.sent_you_a_friend_request_ac72c5eb')}
      </>
    ),
    readAt: new Date(),
    user: [users[6]],
    createdAt: dayjs().subtract(1, 'd').toDate(),
  },
  {
    id: 8,
    type: 'photos',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.general_alcazar_d8065bce')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.added_6_new_photos_cc8eb2c2')}
      </>
    ),
    readAt: new Date(),
    user: [users[3]],
    createdAt: dayjs().subtract(2, 'd').toDate(),
  },
  {
    id: 9,
    type: 'group_invitation',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.jolyon_wagg_a9a74599')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.invited_you_to_the_join_the_group_best_comics_7399210c')}
      </>
    ),
    readAt: new Date(),
    user: [users[15]],
    createdAt: dayjs().subtract(2, 'd').toDate(),
  },
  {
    id: 10,
    type: 'tagged',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.bianca_castapheore_0389f593')}
        </Typography>{' '}
        {i18n.t(
          'ui.data.notifications.tagged_you_in_a_post_these_are_couple_of_photos_from_c6a274d0',
        )}
      </>
    ),
    readAt: new Date(),
    user: [users[6]],
    createdAt: dayjs().subtract(2, 'd').toDate(),
  },
  {
    id: 11,
    type: 'reaction_smile',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.peggy_alcazar_a0b37b2f')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.reacted_to_your_photo_f3be017b')}
      </>
    ),
    readAt: new Date(),
    user: [users[12]],
    images: [`${initialConfig.assetsDir}/images/notifications/1.webp`],
    createdAt: dayjs().subtract(3, 'd').toDate(),
  },
  {
    id: 13,
    type: 'friend_request',
    detail: (
      <>
        <Typography
          variant="body2"
          component="span"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
          }}
        >
          {i18n.t('ui.data.notifications.tsukumo_yuki_f38524e3')}
        </Typography>{' '}
        {i18n.t('ui.data.notifications.sent_you_a_friend_request_ac72c5eb')}
      </>
    ),
    readAt: new Date(),
    user: [users[10]],
    createdAt: dayjs().subtract(1, 'd').toDate(),
  },
];
