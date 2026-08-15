import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { initialConfig } from 'config';
import i18n from 'locales/i18n';

const image = (name) => `${initialConfig.assetsDir}/images/events/${name}.webp`;

export const eventInfo = {
  get title() {
    return i18n.t('ui.data.events.louder_together_a_musical_night_with_nemesis_and_cry_246d59a3');
  },
  date: 'Saturday, 29 May, 2024',
  startTime: '5:00pm',
  endTime: '10:00pm',
  organizerName: 'Rocker’s Heaven',
  location: 'Maverick Convention Center, 56335 Ardella Greens Apt. 511, East Maeville, Arizona',
  mapLink: '#!',
};

export const description = {
  content: (
    <>
      <Typography variant="body1" sx={{ fontWeight: 700, mb: 3, color: 'text.secondary' }}>
        {i18n.t('ui.data.events.louder_together_nightsky_dawn_c3bff783')}
      </Typography>
      <Typography variant="body1">
        {i18n.t('ui.data.events.get_ready_for_an_otherworldly_musical_journey_as_the_504a333a')}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700, my: 3 }}>
        {i18n.t('ui.data.events.what_to_expect_e42fb505')}
      </Typography>
      <List dense disablePadding sx={{ mt: 3 }}>
        <ListItem disablePadding disableGutters sx={{ mb: 2 }}>
          <ListItemText
            disableTypography
            sx={{ m: 0 }}
            primary={
              <Stack direction="row" sx={{ columnGap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'text.secondary',
                  }}
                >
                  1.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                  }}
                >
                  <Typography
                    component="span"
                    variant={'subtitle1'}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      display: 'inline-block',
                      mr: 0.5,
                    }}
                  >
                    {i18n.t('ui.data.events.harmonious_convergence_a5570ccc')}
                  </Typography>
                  {i18n.t(
                    'ui.data.events.nightsky_s_ethereal_melodies_will_blend_seamlessly_w_35de14bf',
                  )}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        <ListItem disablePadding disableGutters sx={{ mb: 2 }}>
          <ListItemText
            disableTypography
            sx={{ m: 0 }}
            primary={
              <Stack direction="row" sx={{ columnGap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'text.secondary',
                  }}
                >
                  2.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                  }}
                >
                  <Typography
                    component="span"
                    variant={'subtitle1'}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      display: 'inline-block',
                      mr: 0.5,
                    }}
                  >
                    {i18n.t('ui.data.events.stellar_setlists_505e7518')}
                  </Typography>{' '}
                  {i18n.t(
                    'ui.data.events.nightsky_will_unveil_their_latest_nebula_inspired_co_78b9c72a',
                  )}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        <ListItem disablePadding disableGutters sx={{ mb: 2 }}>
          <ListItemText
            disableTypography
            sx={{ m: 0 }}
            primary={
              <Stack direction="row" sx={{ columnGap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'text.secondary',
                  }}
                >
                  3.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                  }}
                >
                  <Typography
                    component="span"
                    variant={'subtitle1'}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      display: 'inline-block',
                      mr: 0.5,
                    }}
                  >
                    {i18n.t('ui.data.events.interstellar_visuals_be97e291')}
                  </Typography>{' '}
                  {i18n.t(
                    'ui.data.events.brace_yourself_for_mesmerizing_visuals_projected_ont_4accd1b2',
                  )}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemText
            disableTypography
            sx={{ m: 0 }}
            primary={
              <Stack direction="row" sx={{ columnGap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'text.secondary',
                  }}
                >
                  4.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                  }}
                >
                  <Typography
                    component="span"
                    variant={'subtitle1'}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      display: 'inline-block',
                      mr: 0.5,
                    }}
                  >
                    {i18n.t('ui.data.events.cosmic_attire_19855456')}
                  </Typography>{' '}
                  {i18n.t(
                    'ui.data.events.attendees_are_encouraged_to_dress_in_celestial_theme_07e7503d',
                  )}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      </List>

      <Typography variant="body1" sx={{ fontWeight: 700, my: 3 }}>
        {i18n.t('ui.data.events.why_louder_together_9e4ae18f')}
      </Typography>
      <Typography variant="body1">
        {i18n.t('ui.data.events.because_when_nightsky_and_dawn_collide_the_universe__afaa248d')}
      </Typography>
    </>
  ),
  image: image('details/2'),
};

export const schedule = {
  info: [
    {
      get label() {
        return i18n.t('ui.data.events.gate_open_1eaf673c');
      },
      time: '4:30pm',
    },
    {
      get label() {
        return i18n.t('ui.data.events.event_start_31159653');
      },
      time: '05:30pm',
    },
    {
      get label() {
        return i18n.t('ui.data.events.event_end_d3976d39');
      },
      time: '09:30pm',
    },
  ],
  image: { src: image('details/3'), alt: 'Event banner with performers' },
};

export const performerList = {
  performers: [
    'Band 1',
    'Band 2',
    'Band 3',
    'Band 4',
    'Band 5',
    'NightSky',
    'Dawn',
    'Mystery appearance ✨',
  ],
  image: { src: image('details/4'), alt: 'Band1 performing on stage' },
};

export const organizerEvents = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.events.galactic_ice_cream_festival_b22c6bb1');
    },
    image: image('1'),
    priceRange: '$50 - $300',
    get description() {
      return i18n.t('ui.data.events.experience_an_unforgettable_evening_with_live_perfor_6aa2fb8c');
    },
    date: 'Monday, 2 Dec, 2024',
    time: '5:00pm - 10:00pm',
    location: 'Arizona, USA',
  },
  {
    id: 2,
    get title() {
      return i18n.t('ui.data.events.neon_lantern_parade_df1cea5e');
    },
    image: image('2'),
    priceRange: '$20 - $250',
    get description() {
      return i18n.t('ui.data.events.join_us_to_explore_your_creativity_with_hands_on_art_800e2fc0');
    },
    date: 'Thursday, 16 Dec, 2024',
    time: '6:00pm - 10:00pm',
    location: 'New York, USA',
  },
  {
    id: 3,
    get title() {
      return i18n.t('ui.data.events.mystery_puzzle_race_4ca7f6cf');
    },
    image: image('3'),
    priceRange: '$10 - $200',
    get description() {
      return i18n.t('ui.data.events.discover_the_latest_advancements_in_technology_and_n_01b68315');
    },
    date: 'Monday, 20 Dec, 2024',
    time: '5:00pm - 12:00pm',
    location: 'Dothan, USA',
  },
  {
    id: 4,
    get title() {
      return i18n.t('ui.data.events.robot_talent_show_76b2dd09');
    },
    image: image('details/3'),
    priceRange: '$10 - $150',
    get description() {
      return i18n.t('ui.data.events.savor_a_variety_of_gourmet_dishes_prepared_by_renown_11396b6d');
    },
    date: 'Sunday, 13 October, 2024',
    time: '5:00pm - 10:00pm',
    location: 'LA, USA',
  },
];

export const organizerInfo = {
  name: 'Rocker’s Heaven',
  followers: 2400,
  phone: '+362-124-62326',
  email: 'eventorganizer@email.com',
  get description() {
    return i18n.t('ui.data.events.rockers_heaven_is_your_go_to_for_unforgettable_event_dcb5b889');
  },
};

export const eventTermsConditions = {
  terms: [
    {
      id: 1,
      get description() {
        return i18n.t('ui.data.events.no_printed_copy_will_be_allowed_at_the_venue_entry_40f92ea1');
      },
    },
    {
      id: 2,
      get description() {
        return i18n.t('ui.data.events.each_ticket_is_valid_for_only_one_person_5b43cc2f');
      },
    },
    {
      id: 3,
      get description() {
        return i18n.t(
          'ui.data.events.you_must_provide_a_valid_ticket_to_gain_access_to_th_1520a421',
        );
      },
    },
    {
      id: 4,
      get description() {
        return i18n.t(
          'ui.data.events.at_entry_ticket_holders_need_to_show_valid_photo_ide_22adb405',
        );
      },
    },
    {
      id: 5,
      get description() {
        return i18n.t(
          'ui.data.events.a_token_of_verification_will_be_provided_at_the_entr_f7b5022e',
        );
      },
    },
    {
      id: 6,
      get description() {
        return i18n.t(
          'ui.data.events.any_kind_of_alcohol_drugs_tobacco_products_and_intox_dd9e9ac4',
        );
      },
    },
    {
      id: 7,
      get description() {
        return i18n.t(
          'ui.data.events.if_any_individual_seems_like_a_security_threat_or_cr_db590d76',
        );
      },
    },
    {
      id: 8,
      get description() {
        return i18n.t(
          'ui.data.events.the_organizers_reserve_the_right_to_conduct_security_76984840',
        );
      },
    },
    {
      id: 9,
      get description() {
        return i18n.t(
          'ui.data.events.cctv_and_film_cameras_will_be_operational_at_the_ven_3c46532d',
        );
      },
    },
    {
      id: 10,
      get description() {
        return i18n.t(
          'ui.data.events.the_organizers_will_not_take_responsibility_for_the__d75e3720',
        );
      },
    },
    {
      id: 11,
      get description() {
        return i18n.t(
          'ui.data.events.electrical_devices_such_as_mobile_phone_chargers_blu_69bf912f',
        );
      },
    },
    {
      id: 12,
      get description() {
        return i18n.t(
          'ui.data.events.no_bags_will_be_allowed_inside_the_venue_women_are_s_f6adf2bf',
        );
      },
    },
    {
      id: 13,
      get description() {
        return i18n.t(
          'ui.data.events.no_sharp_pointed_or_weaponry_objects_are_allowed_at__5d3c9576',
        );
      },
    },
    {
      id: 14,
      get description() {
        return i18n.t(
          'ui.data.events.no_outside_food_or_drinks_will_be_allowed_food_and_d_fbdf6bea',
        );
      },
    },
    {
      id: 15,
      get description() {
        return i18n.t(
          'ui.data.events.each_ticket_holder_will_be_assigned_a_designated_zon_577eaba5',
        );
      },
    },
    {
      id: 16,
      get description() {
        return i18n.t(
          'ui.data.events.tickets_cannot_be_refunded_unless_the_event_is_cance_07a810a6',
        );
      },
    },
    {
      id: 17,
      get description() {
        return i18n.t(
          'ui.data.events.it_is_your_responsibility_to_ascertain_whether_an_ev_c77bb283',
        );
      },
    },
    {
      id: 18,
      get description() {
        return i18n.t(
          'ui.data.events.organizers_reserve_the_right_to_make_amendments_rega_9ca9875d',
        );
      },
    },
    {
      id: 19,
      get description() {
        return i18n.t(
          'ui.data.events.there_will_be_no_parking_facility_from_the_organizer_13dfd2c0',
        );
      },
    },
  ],
  images: [
    { id: 1, src: image('details/5'), alt: 'Band1 performing on stage' },
    { id: 2, src: image('details/6'), alt: 'Band2 rocking the crowd' },
  ],
};
