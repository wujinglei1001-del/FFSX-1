import banner from 'assets/images/background/12.webp';
import { initialConfig } from 'config';
import dayjs from 'dayjs';
import { generateUniqueId } from 'lib/utils';
import i18n from 'locales/i18n';
import { users } from './users';

const image = (index) => `${initialConfig.assetsDir}/images/social/photos/${index}.webp`;

export const profileData = {
  ...users[3],
  bannerImage: banner,
  bio: '🌟 Jedi Master, Rebel Alliance Hero, Lightsaber Enthusiast, Farmboy-turned-Galactic Legend, Defeated the Empire - May the Force be with you! 💫',
  websiteUrl: 'kugisakinobara.com',
  username: 'KugisakiNobara123',
  following: 60,
  followers: 11200000,
  followingUsers: [
    { ...users[2], id: 1, following: 120, followers: 850000, followingStatus: true },
    { ...users[4], id: 2, following: 95, followers: 2300000, followingStatus: true },
    { ...users[0], id: 3, following: 300, followers: 15000, followingStatus: false },
    { ...users[3], id: 4, following: 45, followers: 760000, followingStatus: false },
    { ...users[5], id: 5, following: 210, followers: 1350000, followingStatus: false },
    { ...users[15], id: 6, following: 180, followers: 420000, followingStatus: false },
  ],

  posts: [
    {
      id: generateUniqueId(),
      type: 'post',
      author: users[3],
      message: {
        get text() {
          return i18n.t(
            'ui.data.social.this_image_captures_the_essence_of_tranquility_with__b5261e00',
          );
        },
        attachments: [{ src: image(18), type: 'image' }],
      },
      createdAt: dayjs().subtract(1, 'month').subtract(5, 'day').toISOString(),
      engagement: {
        likes: 14200,
        comments: 4,
        shares: 129,
      },
      comments: [
        {
          id: generateUniqueId(),
          type: 'comment',
          author: users[4],
          message: {
            get text() {
              return i18n.t(
                'ui.data.social.hey_there_thanks_for_sharing_your_thoughts_it_s_grea_347e92ad',
              );
            },
          },
          createdAt: dayjs()
            .subtract(1, 'month')
            .subtract(4, 'day')
            .subtract(8, 'hour')
            .subtract(13, 'minute')
            .toISOString(),
          engagement: {
            likes: 9800,
          },
          replies: [
            {
              id: generateUniqueId(),
              type: 'reply',
              author: users[5],
              message: {
                get text() {
                  return i18n.t(
                    'ui.data.social.join_us_on_this_journey_our_community_is_filled_with_fadd0e04',
                  );
                },
              },
              createdAt: dayjs()
                .subtract(1, 'month')
                .subtract(4, 'day')
                .subtract(7, 'hour')
                .subtract(8, 'minute')
                .toISOString(),
              engagement: {
                likes: 2000,
              },
            },
            {
              id: generateUniqueId(),
              type: 'reply',
              author: users[6],
              message: {
                get text() {
                  return i18n.t(
                    'ui.data.social.welcome_to_our_platform_here_you_can_explore_a_varie_f50e2096',
                  );
                },
              },
              createdAt: dayjs()
                .subtract(1, 'month')
                .subtract(2, 'day')
                .subtract(3, 'hour')
                .subtract(44, 'minute')
                .toISOString(),
              engagement: {
                likes: 1000,
              },
            },
            {
              id: generateUniqueId(),
              type: 'reply',
              author: users[7],
              message: {
                get text() {
                  return i18n.t(
                    'ui.data.social.get_ready_to_unlock_new_possibilities_with_our_innov_aa529c3a',
                  );
                },
              },
              createdAt: dayjs()
                .subtract(1, 'month')
                .subtract(2, 'day')
                .subtract(2, 'hour')
                .subtract(21, 'minute')
                .toISOString(),
              engagement: {
                likes: 38,
              },
            },
          ],
        },
        {
          id: generateUniqueId(),
          type: 'comment',
          author: users[8],
          message: {
            get text() {
              return i18n.t(
                'ui.data.social.thanks_for_sharing_your_thoughts_on_the_image_i_real_9f329b49',
              );
            },
          },
          createdAt: dayjs()
            .subtract(1, 'month')
            .subtract(4, 'day')
            .subtract(5, 'hour')
            .subtract(51, 'minute')
            .toISOString(),
          engagement: {
            likes: 79,
          },
          replies: [],
        },
        {
          id: generateUniqueId(),
          type: 'comment',
          author: users[9],
          message: {
            get text() {
              return i18n.t(
                'ui.data.social.i_love_how_you_interpreted_the_image_it_really_captu_81575762',
              );
            },
          },
          createdAt: dayjs()
            .subtract(1, 'month')
            .subtract(3, 'day')
            .subtract(8, 'hour')
            .subtract(5, 'minute')
            .toISOString(),
          engagement: {
            likes: 345,
          },
          replies: [],
        },
        {
          id: generateUniqueId(),
          type: 'comment',
          author: users[10],
          message: {
            get text() {
              return i18n.t(
                'ui.data.social.this_image_beautifully_captures_the_essence_of_tranq_58a48d92',
              );
            },
          },
          createdAt: dayjs()
            .subtract(1, 'month')
            .subtract(1, 'day')
            .subtract(4, 'hour')
            .subtract(27, 'minute')
            .toISOString(),
          engagement: {
            likes: 67,
          },
          replies: [
            {
              id: generateUniqueId(),
              type: 'reply',
              author: users[5],
              message: {
                get text() {
                  return i18n.t(
                    'ui.data.social.you_re_absolutely_right_that_picture_is_amazing_the__8bf66d68',
                  );
                },
              },
              createdAt: dayjs().subtract(25, 'day').subtract(8, 'hour').toISOString(),
              engagement: {
                likes: 450,
              },
            },
          ],
        },
      ],
    },
    {
      author: users[4],
      id: generateUniqueId(),
      type: 'post',
      message: {
        get text() {
          return i18n.t(
            'ui.data.social.this_tour_features_stunning_views_that_highlight_nat_2befd21b',
          );
        },
        attachments: [
          { src: image(19), type: 'image' },
          { src: image(20), type: 'image' },
          { src: image(21), type: 'image' },
          { src: image(22), type: 'image' },
          { src: image(23), type: 'image' },
          { src: image(1), type: 'image' },
          { src: image(2), type: 'image' },
          { src: image(3), type: 'image' },
          { src: image(4), type: 'image' },
          { src: image(5), type: 'image' },
        ],
      },
      createdAt: dayjs().subtract(5, 'day').subtract(3, 'hour').toISOString(),
      engagement: {
        likes: 900,
        comments: 0,
        shares: 90,
      },
      comments: [],
    },
    {
      author: users[2],
      id: generateUniqueId(),
      type: 'post',
      message: {
        get text() {
          return i18n.t(
            'ui.data.social.our_tour_was_incredible_from_stunning_landscapes_to__0d1b0864',
          );
        },
      },
      createdAt: dayjs()
        .subtract(6, 'year')
        .add(1, 'day')
        .add(1, 'hour')
        .add(44, 'minute')
        .toISOString(),
      engagement: {
        likes: 100,
        comments: 0,
        shares: 24,
      },
      comments: [],
    },
    {
      author: users[3],
      id: generateUniqueId(),
      type: 'post',
      message: {
        get text() {
          return i18n.t(
            'ui.data.social.this_place_is_a_captivating_hidden_gem_its_lush_gree_5e534e41',
          );
        },
      },
      createdAt: dayjs()
        .subtract(4, 'year')
        .subtract(1, 'day')
        .add(6, 'hour')
        .add(51, 'minute')
        .toISOString(),
      engagement: {
        likes: 900,
        comments: 1,
        shares: 23,
      },
      comments: [
        {
          id: generateUniqueId(),
          type: 'comment',
          author: users[10],
          message: {
            get text() {
              return i18n.t(
                'ui.data.social.i_also_visited_that_place_here_s_a_picture_i_took_wh_b1eae1ca',
              );
            },
            attachments: [{ src: image(17), type: 'image' }],
          },
          createdAt: dayjs().subtract(30, 'day').subtract(8, 'hour').toISOString(),
          engagement: {
            likes: 2001,
          },
          replies: [],
        },
      ],
    },
  ],

  photos: [
    image(1),
    image(2),
    image(3),
    image(4),
    image(5),
    image(6),
    image(7),
    image(8),
    image(9),
    image(10),
    image(11),
    image(12),
    image(13),
    image(14),
    image(15),
    image(16),
  ],
};
