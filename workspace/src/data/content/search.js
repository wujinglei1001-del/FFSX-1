import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const blogs = (index) => `${initialConfig.assetsDir}/images/content/search/blogs/${index}.webp`;
const podcasts = (index) =>
  `${initialConfig.assetsDir}/images/content/search/podcasts/${index}.webp`;
const videos = (index) => `${initialConfig.assetsDir}/images/content/search/videos/${index}.webp`;

export const searchItems = [
  {
    id: 1,
    type: 'blogs',
    category: 'Animal',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.how_conservation_efforts_are_saving_endangered_anima_e7651703',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.across_the_globe_thousands_of_species_face_the_threa_2ba8cbab',
      );
    },
    author: 'Dr. Olivia Carter',
    date: '2024-12-31',
    thumbnail: blogs(1),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 2,
    type: 'blogs',
    category: 'Animal Behavior',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.10_fascinating_animal_behaviors_that_will_amaze_you__a1286196',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.why_do_dolphins_surf_waves_for_fun_how_do_ants_creat_3541d231',
      );
    },
    author: 'Sophia Bennett',
    date: '2024-12-31',
    thumbnail: blogs(2),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[3].avatar,
    },
  },
  {
    id: 3,
    type: 'blogs',
    category: 'Ocean Life',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.secrets_of_the_deep_amazing_marine_animals_of_the_oc_d1470f17',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.beneath_the_ocean_s_surface_lies_a_world_teeming_wit_bbce5b0c',
      );
    },
    author: 'Emma Lewis',
    date: '2024-12-28',
    thumbnail: blogs(3),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 4,
    type: 'blogs',
    category: 'Wildlife',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.the_world_s_most_powerful_animals_and_their_hunting__22958ae4',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.lions_tigers_cheetahs_and_leopards_these_apex_predat_b5fd0d76',
      );
    },
    author: 'Ethan Cole',
    date: '2024-12-28',
    thumbnail: blogs(4),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[2].avatar,
    },
  },
  {
    id: 5,
    type: 'blogs',
    category: 'Nature',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.how_humans_and_animals_can_coexist_in_a_changing_wor_e93fe309',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.as_cities_expand_and_natural_habitats_shrink_encount_abe0c9eb',
      );
    },
    author: 'Dr. Mia Carter',
    date: '2024-12-23',
    thumbnail: blogs(5),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 6,
    type: 'blogs',
    category: 'Animal',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.how_birds_migrate_thousands_of_miles_without_getting_7d19e809',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.every_year_birds_travel_thousands_of_miles_across_co_3751f83c',
      );
    },
    author: 'Dr. Lisa Morgan',
    date: '2024-12-12',
    thumbnail: blogs(6),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 7,
    type: 'blogs',
    category: 'Wildlife',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.meet_the_rare_and_mysterious_animals_of_the_amazon_r_68b0249c',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.the_amazon_rainforest_is_home_to_some_of_the_most_un_68959b44',
      );
    },
    author: 'Natalie Brooks',
    date: '2024-11-27',
    thumbnail: blogs(7),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 8,
    type: 'blogs',
    category: 'Nature',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.10_astonishingly_bizarre_animals_you_ve_probably_nev_653133ef',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.nature_is_full_of_surprises_while_everyone_knows_lio_d4a1d342',
      );
    },
    author: 'Rachel Adams',
    date: '2024-11-21',
    thumbnail: blogs(8),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 9,
    type: 'blogs',
    category: 'Photography',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.how_to_capture_stunning_wildlife_and_animal_movement_92c40e72',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.nature_is_full_of_surprises_while_everyone_knows_lio_d4a1d342',
      );
    },
    author: 'Kevin Blake',
    date: '2024-11-11',
    thumbnail: blogs(9),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 10,
    type: 'blogs',
    category: 'Folklore',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.search.legends_of_the_wild_animals_in_myths_folklore_and_cu_7c5f66fd',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.throughout_history_animals_have_played_powerful_role_f82969c6',
      );
    },
    author: 'Olivia Grant',
    date: '2024-11-21',
    thumbnail: blogs(10),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[1].avatar,
    },
  },
  {
    id: 30,
    type: 'podcasts',
    category: 'SCIENCE',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.voices_for_wildlife_stories_of_conservation_and_hope_972e610d',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Daniel Rivers',
    date: '2024-8-1',
    thumbnail: podcasts(1),
    uploadedBy: {
      name: 'Daniel Rivers',
      avatar: users[5].avatar,
    },
  },
  {
    id: 31,
    type: 'podcasts',
    category: 'SCIENCE',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.voices_for_wildlife_stories_of_conservation_and_hope_972e610d',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Dr. Marcus Hale',
    date: '2024-8-1',
    thumbnail: podcasts(2),
    isPlaylist: true,
    uploadedBy: {
      name: 'Dr. Marcus Hale',
      avatar: users[5].avatar,
    },
  },
  {
    id: 32,
    type: 'podcasts',
    category: 'SCIENCE',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.beneath_the_waves_stories_of_marine_life_and_conserv_c9b1c142',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Captain Noah Reed',
    date: '2024-8-1',
    thumbnail: podcasts(3),
    uploadedBy: {
      name: 'Captain Noah Reed',
      avatar: users[6].avatar,
    },
  },
  {
    id: 33,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.predator_chronicles_the_untamed_world_of_big_cats_3dd8cad3',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Alex Stone',
    date: '2024-8-1',
    thumbnail: podcasts(4),
    uploadedBy: {
      name: 'Alex Stone',
      avatar: users[7].avatar,
    },
  },
  {
    id: 34,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.feathered_journeys_stories_of_migration_and_survival_5f28cf7e',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'James Holloway',
    date: '2024-8-1',
    thumbnail: podcasts(5),
    uploadedBy: {
      name: 'James Holloway',
      avatar: users[8].avatar,
    },
  },
  {
    id: 35,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.into_the_wild_the_sounds_and_stories_of_the_rainfore_9322494b',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Dr. Ben Harper',
    date: '2024-8-1',
    thumbnail: podcasts(6),
    uploadedBy: {
      name: 'Dr. Ben Harper',
      avatar: users[9].avatar,
    },
  },
  {
    id: 36,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.nature_s_oddities_exploring_the_world_s_most_unique__44426533',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Tom Weston',
    date: '2024-8-1',
    thumbnail: podcasts(7),
    uploadedBy: {
      name: 'Tom Weston',
      avatar: users[10].avatar,
    },
  },
  {
    id: 37,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.wild_perspectives_the_stories_behind_iconic_animal_f_56a6d229',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Anna Roberts',
    date: '2024-8-1',
    thumbnail: podcasts(8),
    uploadedBy: {
      name: 'Anna Roberts',
      avatar: users[11].avatar,
    },
  },
  {
    id: 38,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.living_with_wildlife_finding_harmony_with_nature_81bbd466',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'Nathan Reed',
    date: '2024-8-1',
    thumbnail: podcasts(9),
    uploadedBy: {
      name: 'Nathan Reed',
      avatar: users[12].avatar,
    },
  },
  {
    id: 39,
    type: 'podcasts',
    category: 'Science',
    requiredTime: '10 min',
    episode: 'Episode 1111',
    get title() {
      return i18n.t(
        'ui.data.content.search.animal_legends_mythical_creatures_and_their_origins_626034d6',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: podcasts(10),
    uploadedBy: {
      name: 'David Sinclair',
      avatar: users[13].avatar,
    },
  },
  {
    id: 40,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.inside_wildlife_rescues_saving_animals_from_extincti_299beaaa',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(1),
    uploadedBy: {
      name: 'Wild Planet Films',
      avatar: users[9].avatar,
    },
  },
  {
    id: 41,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.why_animals_behave_the_way_they_do_nature_s_survival_d1f76d27',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(2),
    uploadedBy: {
      name: 'Nature’s Wonders Channel',
      avatar: users[8].avatar,
    },
  },
  {
    id: 42,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.exploring_the_ocean_s_most_mysterious_and_rare_creat_09c533be',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(3),
    uploadedBy: {
      name: 'Blue Abyss Explorers',
      avatar: users[3].avatar,
    },
  },
  {
    id: 43,
    type: 'videos',
    category: 'Nature',
    requiredTime: '1000 eps',
    get title() {
      return i18n.t(
        'ui.data.content.search.big_cats_in_action_how_lions_tigers_and_leopards_rul_13f6b2ef',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(4),
    isPlaylist: true,
    uploadedBy: {
      name: 'Predator Chronicles TV',
      avatar: users[13].avatar,
    },
  },
  {
    id: 44,
    type: 'videos',
    category: 'Nature',
    requiredTime: '1000 eps',
    get title() {
      return i18n.t(
        'ui.data.content.search.the_science_behind_bird_flight_and_incredible_aerial_6474e388',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(5),
    isPlaylist: true,
    uploadedBy: {
      name: 'Feathered Explorers',
      avatar: users[14].avatar,
    },
  },
  {
    id: 45,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.jungle_giants_the_largest_and_smallest_animals_of_th_318ff734',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(6),
    uploadedBy: {
      name: 'Amazon Untamed',
      avatar: users[1].avatar,
    },
  },
  {
    id: 46,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.jungle_giants_the_largest_and_smallest_animals_of_th_318ff734',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(7),
    uploadedBy: {
      name: 'Amazon Untamed',
      avatar: users[2].avatar,
    },
  },
  {
    id: 47,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.strangest_creatures_on_earth_and_their_amazing_adapt_140916a2',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(8),
    uploadedBy: {
      name: 'Tom Weston',
      avatar: users[3].avatar,
    },
  },
  {
    id: 48,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.the_challenge_of_wildlife_conservation_in_urban_envi_231c0f50',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(9),
    uploadedBy: {
      name: 'David Sinclair',
      avatar: users[4].avatar,
    },
  },
  {
    id: 49,
    type: 'videos',
    category: 'Nature',
    requiredTime: '10:23:34',
    get title() {
      return i18n.t(
        'ui.data.content.search.how_animals_shaped_legends_myths_and_ancient_beliefs_e129124e',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.search.pulvinar_faucibus_pretium_nascetur_harum_orci_tempor_4f934c5c',
      );
    },
    author: 'David Sinclair',
    date: '2024-8-1',
    thumbnail: videos(10),
    uploadedBy: {
      name: 'Alexander Quinn',
      avatar: users[7].avatar,
    },
  },
];

export const topics = [
  {
    id: 1,
    key: 'animal',
    get label() {
      return i18n.t('ui.data.content.search.animal_7389b3b7');
    },
  },
  {
    id: 2,
    key: 'animal-kingdom',
    get label() {
      return i18n.t('ui.data.content.search.animal_kingdom_42febea3');
    },
  },
  {
    id: 3,
    key: 'wild-animal',
    get label() {
      return i18n.t('ui.data.content.search.wild_animal_4f317f8a');
    },
  },
  {
    id: 4,
    key: 'wild-animal',
    get label() {
      return i18n.t('ui.data.content.search.wild_animal_4f317f8a');
    },
  },
  {
    id: 5,
    key: 'animal-name',
    get label() {
      return i18n.t('ui.data.content.search.animal_name_92619192');
    },
  },
  {
    id: 6,
    key: 'animalism',
    get label() {
      return i18n.t('ui.data.content.search.animalism_06e2e860');
    },
  },
  {
    id: 7,
    key: 'animal-control',
    get label() {
      return i18n.t('ui.data.content.search.animal_control_7c52df4d');
    },
  },
  {
    id: 8,
    key: 'animal-care',
    get label() {
      return i18n.t('ui.data.content.search.animal_care_f8f230df');
    },
  },
  {
    id: 9,
    key: 'animal-lover',
    get label() {
      return i18n.t('ui.data.content.search.animal_lover_87ced3be');
    },
  },
  {
    id: 10,
    key: 'animal-sounds',
    get label() {
      return i18n.t('ui.data.content.search.animal_sounds_b540e8b5');
    },
  },
  {
    id: 11,
    key: 'animal-tale',
    get label() {
      return i18n.t('ui.data.content.search.animal_tale_673d3082');
    },
  },
  {
    id: 12,
    key: 'animal-tale',
    get label() {
      return i18n.t('ui.data.content.search.animal_tale_673d3082');
    },
  },
  {
    id: 13,
    key: 'wild-animal',
    get label() {
      return i18n.t('ui.data.content.search.wild_animal_4f317f8a');
    },
  },
  {
    id: 14,
    key: 'animal-kingdom',
    get label() {
      return i18n.t('ui.data.content.search.animal_kingdom_42febea3');
    },
  },
  {
    id: 15,
    key: 'animalverse-social',
    get label() {
      return i18n.t('ui.data.content.search.animalverse_social_3d49df3e');
    },
  },
  {
    id: 16,
    key: 'animal-tale',
    get label() {
      return i18n.t('ui.data.content.search.animal_tale_673d3082');
    },
  },
  {
    id: 17,
    key: 'animal-photography',
    get label() {
      return i18n.t('ui.data.content.search.animal_photography_0a20d85e');
    },
  },
  {
    id: 18,
    key: 'animal-farm',
    get label() {
      return i18n.t('ui.data.content.search.animal_farm_856c6875');
    },
  },
  {
    id: 19,
    key: 'animal-farm',
    get label() {
      return i18n.t('ui.data.content.search.animal_farm_856c6875');
    },
  },
  {
    id: 20,
    key: 'animal-communications',
    get label() {
      return i18n.t('ui.data.content.search.animal_communications_4f15a7d0');
    },
  },
  {
    id: 21,
    key: 'animal',
    get label() {
      return i18n.t('ui.data.content.search.animal_7389b3b7');
    },
  },
  {
    id: 22,
    key: 'animal-control',
    get label() {
      return i18n.t('ui.data.content.search.animal_control_7c52df4d');
    },
  },
  {
    id: 23,
    key: 'animal-control',
    get label() {
      return i18n.t('ui.data.content.search.animal_control_7c52df4d');
    },
  },
  {
    id: 24,
    key: 'animal-control',
    get label() {
      return i18n.t('ui.data.content.search.animal_control_7c52df4d');
    },
  },
  {
    id: 25,
    key: 'wild-animal',
    get label() {
      return i18n.t('ui.data.content.search.wild_animal_4f317f8a');
    },
  },
  {
    id: 26,
    key: 'animal-training',
    get label() {
      return i18n.t('ui.data.content.search.animal_training_2c64213a');
    },
  },
  {
    id: 27,
    key: 'animali',
    get label() {
      return i18n.t('ui.data.content.search.animali_fe994476');
    },
  },
  {
    id: 28,
    key: 'animal-house',
    get label() {
      return i18n.t('ui.data.content.search.animal_house_f0762dfd');
    },
  },
  {
    id: 29,
    key: 'animal',
    get label() {
      return i18n.t('ui.data.content.search.animal_7389b3b7');
    },
  },
  {
    id: 30,
    key: 'animal-videos',
    get label() {
      return i18n.t('ui.data.content.search.animal_videos_cf3e16a3');
    },
  },
  {
    id: 31,
    key: 'animal-tech',
    get label() {
      return i18n.t('ui.data.content.search.animal_tech_53b3fa35');
    },
  },
  {
    id: 32,
    key: 'animal-abuse',
    get label() {
      return i18n.t('ui.data.content.search.animal_abuse_65b404cb');
    },
  },
  {
    id: 33,
    key: 'animali',
    get label() {
      return i18n.t('ui.data.content.search.animali_fe994476');
    },
  },
  {
    id: 34,
    key: 'animal-adoption',
    get label() {
      return i18n.t('ui.data.content.search.animal_adoption_7fe60c01');
    },
  },
  {
    id: 35,
    key: 'animal-tech',
    get label() {
      return i18n.t('ui.data.content.search.animal_tech_53b3fa35');
    },
  },
  {
    id: 36,
    key: 'animal-videos',
    get label() {
      return i18n.t('ui.data.content.search.animal_videos_cf3e16a3');
    },
  },
  {
    id: 37,
    key: 'animal-kingdom',
    get label() {
      return i18n.t('ui.data.content.search.animal_kingdom_42febea3');
    },
  },
  {
    id: 38,
    key: 'animal-training',
    get label() {
      return i18n.t('ui.data.content.search.animal_training_2c64213a');
    },
  },
  {
    id: 39,
    key: 'animal-photography',
    get label() {
      return i18n.t('ui.data.content.search.animal_photography_0a20d85e');
    },
  },
  {
    id: 40,
    key: 'animal-name',
    get label() {
      return i18n.t('ui.data.content.search.animal_name_92619192');
    },
  },
  {
    id: 41,
    key: 'animal-training',
    get label() {
      return i18n.t('ui.data.content.search.animal_training_2c64213a');
    },
  },
  {
    id: 42,
    key: 'animal-rescue',
    get label() {
      return i18n.t('ui.data.content.search.animal_rescue_ffd8d6dd');
    },
  },
  {
    id: 43,
    key: 'animal-rescue',
    get label() {
      return i18n.t('ui.data.content.search.animal_rescue_ffd8d6dd');
    },
  },
  {
    id: 44,
    key: 'animalism',
    get label() {
      return i18n.t('ui.data.content.search.animalism_06e2e860');
    },
  },
  {
    id: 45,
    key: 'animal-abuse',
    get label() {
      return i18n.t('ui.data.content.search.animal_abuse_65b404cb');
    },
  },
  {
    id: 46,
    key: 'animal-lover',
    get label() {
      return i18n.t('ui.data.content.search.animal_lover_87ced3be');
    },
  },
  {
    id: 47,
    key: 'animal-house',
    get label() {
      return i18n.t('ui.data.content.search.animal_house_f0762dfd');
    },
  },
  {
    id: 48,
    key: 'animal-sounds',
    get label() {
      return i18n.t('ui.data.content.search.animal_sounds_b540e8b5');
    },
  },
  {
    id: 49,
    key: 'animal-communications',
    get label() {
      return i18n.t('ui.data.content.search.animal_communications_4f15a7d0');
    },
  },
  {
    id: 50,
    key: 'animal-house',
    get label() {
      return i18n.t('ui.data.content.search.animal_house_f0762dfd');
    },
  },
  {
    id: 51,
    key: 'animal-videos',
    get label() {
      return i18n.t('ui.data.content.search.animal_videos_cf3e16a3');
    },
  },
  {
    id: 52,
    key: 'animal-photography',
    get label() {
      return i18n.t('ui.data.content.search.animal_photography_0a20d85e');
    },
  },
  {
    id: 53,
    key: 'animali',
    get label() {
      return i18n.t('ui.data.content.search.animali_fe994476');
    },
  },
  {
    id: 54,
    key: 'animali',
    get label() {
      return i18n.t('ui.data.content.search.animali_fe994476');
    },
  },
  {
    id: 55,
    key: 'animal-training',
    get label() {
      return i18n.t('ui.data.content.search.animal_training_2c64213a');
    },
  },
  {
    id: 56,
    key: 'animal-abuse',
    get label() {
      return i18n.t('ui.data.content.search.animal_abuse_65b404cb');
    },
  },
  {
    id: 57,
    key: 'animal-adoption',
    get label() {
      return i18n.t('ui.data.content.search.animal_adoption_7fe60c01');
    },
  },
  {
    id: 58,
    key: 'animal-cartoon',
    get label() {
      return i18n.t('ui.data.content.search.animal_cartoon_1cec7dfc');
    },
  },
];

export const creators = [
  {
    id: 1,
    name: 'Wild Animal Wonders',
    uploadedCount: {
      blog: 60,
      videos: 100,
      podcasts: 50,
    },
    isFollowing: true,
  },
  {
    id: 2,
    name: 'David Sinclair',
    avatar: users[3].avatar,
    uploadedCount: {
      blog: 60,
      podcasts: 150,
    },
    isFollowing: true,
  },
  {
    id: 3,
    name: 'EcoAnimal Explorer',
    avatar: users[4].avatar,
    uploadedCount: {
      videos: 13,
      podcasts: 78,
    },
    isFollowing: false,
  },
  {
    id: 4,
    name: 'Anna Roberts',
    avatar: users[5].avatar,
    uploadedCount: {
      blog: 60,
    },
    isFollowing: false,
  },
  {
    id: 5,
    name: 'Dr. Lisa Morgan',
    avatar: users[4].avatar,
    uploadedCount: {
      blog: 60,
      podcasts: 456,
    },
    isFollowing: true,
  },
  {
    id: 6,
    name: 'James Holloway',
    avatar: users[2].avatar,
    uploadedCount: {
      blog: 60,
      videos: 127,
      podcasts: 2,
    },
    isFollowing: false,
  },
  {
    id: 7,
    name: 'Urban Animal Tales',
    uploadedCount: {
      videos: 23,
      podcasts: 567,
    },
    isFollowing: false,
  },
  {
    id: 8,
    name: 'Wild Animal Wonders',
    avatar: users[6].avatar,
    uploadedCount: {
      blog: 60,
      videos: 56,
      podcasts: 34,
    },
    isFollowing: true,
  },
  {
    id: 9,
    name: 'Animal Explorer',
    avatar: users[1].avatar,
    uploadedCount: {
      blog: 60,
      videos: 283,
    },
    isFollowing: true,
  },
  {
    id: 10,
    name: 'Animal Planetarium',
    uploadedCount: {
      videos: 32,
      podcasts: 11,
    },
    isFollowing: true,
  },
];
