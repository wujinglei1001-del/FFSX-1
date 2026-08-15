import { initialConfig } from 'config';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { users } from './users';

const image = (index) => `${initialConfig.assetsDir}/images/chat/${index}.webp`;

export const conversations = [
  {
    id: 'M50KOJQ44LIOB21M',
    recipients: [users[5]],
    messages: [
      {
        id: 1,
        senderId: 5,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.do_you_know_the_director_francis_ford_coppola_movies_2516ab5e',
          );
        },
        createdAt: dayjs().subtract(23, 'h').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 5,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.tell_me_about_his_best_works_7b855e15');
        },
        createdAt: dayjs().subtract(23, 'h').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.yeah_the_godfather_1972_is_one_of_the_best_34a19499');
        },
        createdAt: dayjs().subtract(3, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.now_you_come_to_me_and_you_say_don_corleone_give_me__2a765d3f',
          );
        },
        createdAt: dayjs().subtract(5, 'm').toDate(),
        reactions: [
          {
            emoji: '❤️',
            userId: 5,
          },
        ],
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.sent_my_photos_i_am_sharing_the_movie_link_25440cfc');
        },
        createdAt: dayjs().subtract(6, 'm').toDate(),
        reactions: [
          {
            emoji: '❤️',
            userId: 5,
          },
        ],
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 5,
        type: 'received',
        attachments: {
          media: [
            { type: 'image', src: image(1) },
            { type: 'image', src: image(2) },
            { type: 'image', src: image(3) },
          ],
        },
        createdAt: dayjs().subtract(7, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 5,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.thanks_i_m_going_to_watch_the_movie_and_check_the_ph_df5db26d',
          );
        },
        createdAt: dayjs().subtract(8, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        attachments: {
          files: [
            {
              name: 'The Godfather(1972).zip',
              format: 'zip',
            },
          ],
        },
        createdAt: dayjs().subtract(9, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: true,
  },
  {
    id: 'M50KOUB205NA3LKZ',
    recipients: [users[0]],
    messages: [
      {
        id: 1,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.hey_guess_what_i_m_planning_a_weekend_tour_to_the_mo_e3065bf6',
          );
        },
        createdAt: dayjs().subtract(10, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.seriously_that_sounds_amazing_which_mountains_are_yo_bde25168',
          );
        },
        createdAt: dayjs().subtract(11, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.the_blue_ridge_mountains_i_ve_heard_the_views_are_br_45c43fa8',
          );
        },
        createdAt: dayjs().subtract(12, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.oh_yeah_sent_me_pictures_028271f6');
        },
        createdAt: dayjs().subtract(13, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.what_s_the_plan_e45540c2');
        },
        createdAt: dayjs().subtract(14, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 0,
        type: 'received',
        attachments: {
          media: [
            { type: 'image', src: image(4) },
            { type: 'image', src: image(5) },
            { type: 'image', src: image(6) },
            { type: 'image', src: image(7) },
          ],
        },
        reactions: [
          {
            emoji: '❤️',
            userId: 14,
          },
        ],
        createdAt: dayjs().subtract(15, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.we_d_leave_saturday_morning_hike_a_few_trails_maybe__3cd88f09',
          );
        },
        createdAt: dayjs().subtract(16, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.they_re_stunning_084c4640');
        },
        createdAt: dayjs().subtract(17, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 9,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.camping_huh_do_we_need_to_bring_our_own_gear_or_are__414ba246',
          );
        },
        createdAt: dayjs().subtract(18, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 10,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.i_ve_got_a_tent_and_sleeping_bags_you_d_just_need_yo_c625b076',
          );
        },
        createdAt: dayjs().subtract(19, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 11,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.sweet_are_we_driving_or_carpooling_bc596cfe');
        },
        createdAt: dayjs().subtract(20, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 12,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.i_thought_we_could_carpool_to_save_on_gas_c3aec60a');
        },
        createdAt: dayjs().subtract(21, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 13,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.plus_it_s_more_fun_with_music_and_road_trip_snacks_a4e27c2a');
        },
        createdAt: dayjs().subtract(22, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 14,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.totally_agree_count_me_in_i_ll_pack_my_stuff_and_bri_5f9891a6',
          );
        },
        createdAt: dayjs().subtract(23, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 15,
        senderId: 0,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.awesome_it_s_going_to_be_so_much_fun_let_s_finalize__5e0ed15a',
          );
        },
        createdAt: dayjs().subtract(24, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 16,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.sounds_like_a_plan_can_t_wait_d1b23024');
        },
        createdAt: dayjs().subtract(25, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: false,
  },
  {
    id: 'M50KP6BYT9KLCVOZ',
    conversationName: 'Note Ninjas 🥷',
    recipients: [users[1], users[8], users[11], users[15]],
    messages: [
      {
        id: 1,
        senderId: 1,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.hey_everyone_quick_update_about_tomorrow_s_exam_a_lo_779bd6e8',
          );
        },
        createdAt: dayjs().subtract(26, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 11,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.yeah_it_s_too_soon_i_barely_started_studying_can_we__03f16303',
          );
        },
        createdAt: dayjs().subtract(27, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 8,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.same_here_i_have_back_to_back_assignments_to_submit__59f73446',
          );
        },
        createdAt: dayjs().subtract(28, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        type: 'received',
        senderId: 1,
        get text() {
          return i18n.t(
            'ui.data.chat.i_spoke_to_the_professor_about_rescheduling_unfortun_f1a40779',
          );
        },
        reactions: [
          {
            userId: 8,
            emoji: '😢',
          },
          {
            userId: 11,
            emoji: '😡',
          },
        ],
        createdAt: dayjs().subtract(29, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 15,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.ugh_seriously_32b4f32e');
        },
        createdAt: dayjs().subtract(30, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        type: 'received',
        senderId: 15,
        get text() {
          return i18n.t('ui.data.chat.didn_t_they_consider_that_we_have_other_exams_too_8db82a47');
        },
        createdAt: dayjs().subtract(31, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 1,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.trust_me_i_tried_my_best_to_convince_them_i_even_bro_771b335d',
          );
        },
        createdAt: dayjs().subtract(32, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.thanks_for_trying_cr_it_s_just_frustrating_0ef3026b');
        },
        createdAt: dayjs().subtract(33, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 9,
        type: 'received',
        senderId: 11,
        get text() {
          return i18n.t('ui.data.chat.frustrating_is_an_understatement_c453b3e6');
        },
        createdAt: dayjs().subtract(34, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 10,
        type: 'received',
        senderId: 11,
        get text() {
          return i18n.t('ui.data.chat.you_should_ve_pushed_harder_ad66a7cd');
        },
        createdAt: dayjs().subtract(35, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 11,
        type: 'received',
        senderId: 11,
        get text() {
          return i18n.t(
            'ui.data.chat.what_s_the_point_of_being_the_cr_if_you_can_t_handle_adea5b86',
          );
        },
        createdAt: dayjs().subtract(36, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 12,
        type: 'received',
        senderId: 1,
        get text() {
          return i18n.t(
            'ui.data.chat.i_understand_you_re_upset_amelia_but_i_really_did_ev_5a7b53f4',
          );
        },
        createdAt: dayjs().subtract(37, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 13,
        type: 'received',
        senderId: 8,
        get text() {
          return i18n.t(
            'ui.data.chat.amelia_it_s_not_like_the_cr_has_magical_powers_to_ch_74af2230',
          );
        },
        createdAt: dayjs().subtract(38, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 14,
        type: 'received',
        senderId: 11,
        get text() {
          return i18n.t('ui.data.chat.still_it_feels_like_not_enough_effort_was_made_d24a2c8c');
        },
        createdAt: dayjs().subtract(39, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 15,
        type: 'received',
        senderId: 1,
        get text() {
          return i18n.t(
            'ui.data.chat.i_m_sorry_you_feel_that_way_if_you_want_you_can_talk_67390f89',
          );
        },
        createdAt: dayjs().subtract(40, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 16,
        type: 'sent',
        senderId: 14,
        get text() {
          return i18n.t(
            'ui.data.chat.let_s_not_blame_lucy_it_s_a_tough_situation_and_they_ac1ca919',
          );
        },
        createdAt: dayjs().subtract(41, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 17,
        type: 'received',
        senderId: 15,
        get text() {
          return i18n.t(
            'ui.data.chat.yeah_it_s_not_fair_to_take_it_out_on_them_let_s_focu_b5c576b4',
          );
        },
        createdAt: dayjs().subtract(42, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 18,
        senderId: 11,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.fine_whatever_7a313a51');
        },
        createdAt: dayjs().subtract(43, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 19,
        senderId: 1,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.thanks_everyone_i_know_it_s_stressful_but_we_ll_get__0ca59ec3',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 20,
        senderId: 1,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.if_anyone_needs_help_with_the_material_let_me_know_2676ef30');
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 21,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.let_s_organize_that_study_group_and_just_power_throu_580699d7',
          );
        },
        reactions: [
          {
            userId: 11,
            emoji: '👍',
          },
          {
            userId: 15,
            emoji: '❤️',
          },
        ],
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 22,
        senderId: 1,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.sounds_good_let_s_focus_on_that_we_ve_got_this_725a1c10');
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: null,
      },
    ],
    unreadMessages: 1,
    starred: false,
  },
  {
    id: 'M50KPH8HTAIWIK60',
    recipients: [users[15]],
    messages: [
      {
        id: 1,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.hey_michael_i_heard_you_re_taking_a_leave_of_absence_8698f5f0',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 15,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.yeah_everything_s_fine_i_just_need_some_time_to_sort_7de1607c',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.that_makes_sense_taking_care_of_yourself_is_importan_46ff3ec2',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t('ui.data.chat.how_long_will_you_be_away_d0fcd6f6');
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 15,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.probably_a_semester_i_ve_already_spoken_with_the_cou_ff188ae0',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 15,
        type: 'received',
        get text() {
          return i18n.t(
            'ui.data.chat.of_course_i_ll_still_hang_out_and_keep_up_with_what__c29a98be',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 14,
        type: 'sent',
        get text() {
          return i18n.t(
            'ui.data.chat.totally_understandable_if_you_need_anything_or_just__1b32c14f',
          );
        },
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 15,
        type: 'received',
        get text() {
          return i18n.t('ui.data.chat.thanks_that_means_a_lot_i_ll_see_you_around_078e8b8d');
        },
        reactions: [
          {
            userId: 14,
            emoji: '❤️',
          },
        ],
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: false,
  },
];
