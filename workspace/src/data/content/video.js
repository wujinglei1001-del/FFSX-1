import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import { comments } from './homepage';

const thumbnail = (index) =>
  `${initialConfig.assetsDir}/images/content/details/video/${index}.webp`;

const videoDetails = [
  {
    id: 1,
    get description() {
      return i18n.t(
        'ui.data.content.video.discover_the_fascinating_world_of_modern_architectur_96e73320',
      );
    },
    team: [
      {
        role: 'Educator & Narrator',
        name: 'Sophia Carter',
      },
      {
        role: 'Scriptwriter',
        name: 'Liam Thompson',
      },
      {
        role: 'Editor',
        name: 'James Patel',
      },
      {
        role: 'Producer',
        name: 'Olivia Brooks',
      },
      {
        role: 'Marketing Specialist',
        name: 'Ethan Johnson',
      },
      {
        role: 'Music/Sound Designer',
        name: 'Grace Lee',
      },
    ],
    socials: [
      {
        platform: 'Website',
        link: 'lukeskywalker.com',
      },
      {
        platform: 'X (formerly Twitter)',
        link: '@JediWalker213',
      },
      {
        platform: 'email',
        link: 'lukeskywalker@email.com',
      },
    ],
    tags: [
      'Architecture',
      'Modern',
      'Design',
      'Sustainable',
      'Modern Architecture',
      'Architect',
      'Structure',
      'Landmark',
      'Innovative Material',
      'Form',
    ],
  },
  {
    id: 2,
    get description() {
      return i18n.t(
        'ui.data.content.video.step_into_the_world_of_sustainable_living_this_video_e9895ea2',
      );
    },
    team: [
      {
        role: 'Host & Presenter',
        name: 'Alex Green',
      },
      {
        role: 'Researcher',
        name: 'Maya Singh',
      },
      {
        role: 'Videographer',
        name: 'Ben Carter',
      },
      {
        role: 'Environmental Consultant',
        name: 'Dr. Elena Petrova',
      },
      {
        role: 'Graphics Artist',
        name: 'Chris Rodriguez',
      },
      {
        role: 'Social Media Manager',
        name: 'Zoe Kim',
      },
    ],
    socials: [
      {
        platform: 'Website',
        link: 'greenbuild.org',
      },
      {
        platform: 'Instagram',
        link: '@EcoArchitects',
      },
      {
        platform: 'Email',
        link: 'contact@greenbuild.org',
      },
    ],
    tags: [
      'Sustainable Architecture',
      'Green Building',
      'Eco-friendly',
      'Biophilic Design',
      'Net-zero',
      'Renewable Energy',
      'Environmental Design',
      'Urban Planning',
      'LEED Certification',
      'Eco-materials',
    ],
  },
  {
    id: 3,
    get description() {
      return i18n.t(
        'ui.data.content.video.journey_back_in_time_to_explore_the_incredible_histo_85d8a5ef',
      );
    },
    team: [
      {
        role: 'Historian & Narrator',
        name: 'Dr. Alan Grant',
      },
      {
        role: 'Archival Researcher',
        name: 'Clara Jones',
      },
      {
        role: '3D Animator',
        name: 'Leo Martinez',
      },
      {
        role: 'Fact Checker',
        name: 'Sarah Chen',
      },
      {
        role: 'Post-Production Supervisor',
        name: 'Max Miller',
      },
      {
        role: 'Sound Engineer',
        name: 'Nina Rossi',
      },
    ],
    socials: [
      {
        platform: 'Website',
        link: 'skylinehistory.com',
      },
      {
        platform: 'YouTube',
        link: '@SkylineHistorian',
      },
      {
        platform: 'Podcast',
        link: 'TheStructuralStory',
      },
    ],
    tags: [
      'Skyscrapers',
      'Architectural History',
      'Engineering',
      'Landmarks',
      'Tall Buildings',
      'Urban History',
      'Structural Engineering',
      'Burj Khalifa',
      'Empire State Building',
      'Architectural Styles',
    ],
  },
];

export const videos = [
  {
    id: 1,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_future_of_architecture_smart_homes_and_sustainab_32e888cf',
      );
    },
    duration: '23:34',
    thumbnail: thumbnail(1),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Architecture',
    author: users[0],
    uploaderInfo: {
      uploadedDate: '2024-8-1',
      followers: 100,
      content: 20,
    },
    engagement: {
      likes: 14200,
      comments: 34,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 2,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.breaking_the_mold_unconventional_building_materials_bf39f1a5',
      );
    },
    duration: '1:22:04',
    thumbnail: thumbnail(2),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Modern',
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2024-7-28',
      followers: 1000,
      content: 18,
    },
    engagement: {
      likes: 14300,
      comments: 34,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 3,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.how_minimalist_architecture_is_redefining_urban_spac_de3c3ab6',
      );
    },
    duration: '3:34',
    thumbnail: thumbnail(3),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Design',
    author: users[3],
    uploaderInfo: {
      uploadedDate: '2024-7-29',
      followers: 300,
      content: 23,
    },
    engagement: {
      likes: 1400,
      comments: 4,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 4,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.top_10_most_adorable_animal_habitats_built_by_humans_5c51b6ef',
      );
    },
    duration: '10:23:34',
    thumbnail: thumbnail(4),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[4],
    uploaderInfo: {
      uploadedDate: '2024-10-30',
      followers: 300,
      content: 23,
    },
    engagement: {
      likes: 1400,
      comments: 4,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 5,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.blending_nature_with_design_the_principles_of_biophi_7d7f51d1',
      );
    },
    duration: '10:23:34',
    thumbnail: thumbnail(5),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[5],
    uploaderInfo: {
      uploadedDate: '2024-10-2',
      followers: 3400,
      content: 23,
    },
    engagement: {
      likes: 14050,
      comments: 4,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 6,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.cultural_influence_in_modern_architecture_a_global_p_c3864f3c',
      );
    },
    duration: '10:23:34',
    thumbnail: thumbnail(6),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[6],
    uploaderInfo: {
      uploadedDate: '2024-12-30',
      followers: 3000,
      content: 13,
    },
    engagement: {
      likes: 14000,
      comments: 33,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 7,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.revolutionary_skyscrapers_engineering_marvels_of_the_13f42e17',
      );
    },
    duration: '2:00:09',
    thumbnail: thumbnail(7),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[8],
    uploaderInfo: {
      uploadedDate: '2024-10-29',
      followers: 300,
      content: 23,
    },
    engagement: {
      likes: 1400,
      comments: 4,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 8,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_power_of_adaptive_reuse_transforming_old_structu_475f829c',
      );
    },
    duration: '1:00:10',
    thumbnail: thumbnail(8),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[4],
    uploaderInfo: {
      uploadedDate: '2024-11-15',
      followers: 30045,
      content: 45,
    },
    engagement: {
      likes: 12000,
      comments: 45,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 9,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.sustainable_design_innovations_building_a_greener_to_90aec673',
      );
    },
    duration: '5:45',
    thumbnail: thumbnail(16),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[12],
    uploaderInfo: {
      uploadedDate: '2024-5-20',
      followers: 10000,
      content: 230,
    },
    engagement: {
      likes: 34400,
      comments: 8,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 10,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.urban_planning_for_the_future_creating_livable_and_e_5de50da2',
      );
    },
    duration: '15:20',
    thumbnail: thumbnail(18),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[11],
    uploaderInfo: {
      uploadedDate: '2024-4-1',
      followers: 300000,
      content: 238,
    },
    engagement: {
      likes: 140000,
      comments: 400,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 11,
    type: 'playlist',
    get title() {
      return i18n.t(
        'ui.data.content.video.historic_buildings_reimagined_preservation_and_moder_88258b98',
      );
    },
    duration: '8:30',
    thumbnail: thumbnail(23),
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    category: 'Sustainable',
    author: users[5],
    uploaderInfo: {
      uploadedDate: '2024-9-30',
      followers: 300,
      content: 23,
    },
    engagement: {
      likes: 1400,
      comments: 4,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 12,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_evolution_of_skyscrapers_from_past_to_present_53686d73',
      );
    },
    duration: '10:23:34',
    thumbnail: thumbnail(9),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-09-10',
      followers: 15000,
      content: 75,
    },
    engagement: {
      likes: 12000,
      comments: 150,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 13,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.sustainable_architecture_how_green_buildings_shape_t_ca0bba36',
      );
    },
    duration: '22:34',
    thumbnail: thumbnail(10),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-09-12',
      followers: 50000,
      content: 200,
    },
    engagement: {
      likes: 2500,
      comments: 300,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 14,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.lights_colors_and_music_the_magic_of_global_festival_ec018fc9',
      );
    },
    duration: '56:33',
    thumbnail: thumbnail(11),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-09-08',
      followers: 100000,
      content: 500,
    },
    engagement: {
      likes: 5000,
      comments: 700,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 15,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.inside_the_world_s_most_stunning_modern_architectura_f7d2d466',
      );
    },
    duration: '1:21:04',
    thumbnail: thumbnail(12),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-09-05',
      followers: 75000,
      content: 300,
    },
    engagement: {
      likes: 4000,
      comments: 500,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 16,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.ancient_vs_modern_how_architecture_has_transformed_o_447bd64e',
      );
    },
    duration: '8:20:13',
    thumbnail: thumbnail(13),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-09-01',
      followers: 20000,
      content: 100,
    },
    engagement: {
      likes: 23000,
      comments: 120,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 17,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.10_iconic_buildings_that_redefined_architectural_inn_8cbe4db5',
      );
    },
    duration: '2:23:45',
    thumbnail: thumbnail(14),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-28',
      followers: 30000,
      content: 150,
    },
    engagement: {
      likes: 15000,
      comments: 200,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 18,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_art_of_minimalist_architecture_less_is_more_in_d_1101ba8b',
      );
    },
    duration: '25:34',
    thumbnail: thumbnail(15),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-25',
      followers: 45000,
      content: 180,
    },
    engagement: {
      likes: 2000,
      comments: 250,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 19,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.exploring_futuristic_architecture_cities_of_tomorrow_f3d20c8c',
      );
    },
    duration: '10:25',
    thumbnail: thumbnail(16),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-20',
      followers: 60000,
      content: 220,
    },
    engagement: {
      likes: 30000,
      comments: 400,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 20,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.how_technology_is_transforming_the_future_of_sculptu_8916a9ab',
      );
    },
    duration: '3:39:21',
    thumbnail: thumbnail(17),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-15',
      followers: 25000,
      content: 110,
    },
    engagement: {
      likes: 13000,
      comments: 180,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 21,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.top_5_smart_homes_that_blend_technology_with_modern__cc505466',
      );
    },
    duration: '9:11',
    thumbnail: thumbnail(18),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-10',
      followers: 40000,
      content: 160,
    },
    engagement: {
      likes: 22000,
      comments: 250,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 22,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_evolution_of_sculpture_from_ancient_to_modern_ma_a52d1ab0',
      );
    },
    duration: '1:26:34',
    thumbnail: thumbnail(19),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-05',
      followers: 80000,
      content: 350,
    },
    engagement: {
      likes: 45000,
      comments: 600,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 23,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.why_brutalist_architecture_is_making_a_bold_comeback_ff90d0b6',
      );
    },
    duration: '2:01',
    thumbnail: thumbnail(20),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-01',
      followers: 18000,
      content: 90,
    },
    engagement: {
      likes: 900,
      comments: 100,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 24,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.architectural_marvels_how_engineering_shapes_urban_s_5eab3d7e',
      );
    },
    duration: '1:45:04',
    thumbnail: thumbnail(21),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-28',
      followers: 65000,
      content: 250,
    },
    engagement: {
      likes: 35000,
      comments: 450,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 25,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.how_traditional_architecture_inspires_modern_city_de_0595049d',
      );
    },
    duration: '47:14',
    thumbnail: thumbnail(22),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-25',
      followers: 35000,
      content: 140,
    },
    engagement: {
      likes: 18000,
      comments: 220,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 26,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.biophilic_design_bringing_nature_into_urban_architec_b242a6af',
      );
    },
    duration: '32:35',
    thumbnail: thumbnail(23),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-20',
      followers: 55000,
      content: 210,
    },
    engagement: {
      likes: 29100,
      comments: 350,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 27,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.gothic_to_contemporary_tracing_the_styles_of_archite_c9b03e26',
      );
    },
    duration: '44:04',
    thumbnail: thumbnail(24),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-15',
      followers: 90000,
      content: 400,
    },
    engagement: {
      likes: 35000,
      comments: 750,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 28,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.adaptive_reuse_turning_old_buildings_into_modern_mas_4a3b015b',
      );
    },
    duration: '56:00',
    thumbnail: thumbnail(25),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-10',
      followers: 48000,
      content: 190,
    },
    engagement: {
      likes: 28000,
      comments: 300,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 29,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_history_behind_famous_cultural_and_religious_fes_c4c50e06',
      );
    },
    duration: '14:55',
    thumbnail: thumbnail(26),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-07-05',
      followers: 70000,
      content: 280,
    },
    engagement: {
      likes: 4000,
      comments: 550,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 30,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.modern_bridges_engineering_wonders_of_the_21st_centu_3356016a',
      );
    },
    duration: '12:45',
    thumbnail: thumbnail(19),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[4],
    uploaderInfo: {
      uploadedDate: '2025-09-14',
      followers: 32000,
      content: 140,
    },
    engagement: {
      likes: 2100,
      comments: 180,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 31,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.famous_sculptures_that_changed_the_art_world_e743ecf2');
    },
    duration: '8:23',
    thumbnail: thumbnail(7),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[11],
    uploaderInfo: {
      uploadedDate: '2025-09-11',
      followers: 27000,
      content: 115,
    },
    engagement: {
      likes: 5400,
      comments: 230,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 32,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.the_secret_behind_ancient_temples_5e101b10');
    },
    duration: '1:05:12',
    thumbnail: thumbnail(23),
    category: 'History',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[2],
    uploaderInfo: {
      uploadedDate: '2025-09-09',
      followers: 41000,
      content: 200,
    },
    engagement: {
      likes: 8600,
      comments: 320,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 33,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.10_festivals_around_the_world_you_must_see_ca54d6af');
    },
    duration: '33:55',
    thumbnail: thumbnail(2),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[7],
    uploaderInfo: {
      uploadedDate: '2025-09-07',
      followers: 50000,
      content: 220,
    },
    engagement: {
      likes: 4200,
      comments: 290,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 34,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_rise_of_smart_cities_future_living_explained_2cef1d7c',
      );
    },
    duration: '22:14',
    thumbnail: thumbnail(14),
    category: 'Technology',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[15],
    uploaderInfo: {
      uploadedDate: '2025-09-03',
      followers: 67000,
      content: 280,
    },
    engagement: {
      likes: 15300,
      comments: 450,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 35,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.renaissance_art_explained_in_15_minutes_8015d460');
    },
    duration: '15:00',
    thumbnail: thumbnail(5),
    category: 'Art',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[10],
    uploaderInfo: {
      uploadedDate: '2025-08-31',
      followers: 38000,
      content: 160,
    },
    engagement: {
      likes: 7400,
      comments: 210,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 36,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.the_tallest_buildings_completed_in_2025_88f18260');
    },
    duration: '10:29',
    thumbnail: thumbnail(26),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[6],
    uploaderInfo: {
      uploadedDate: '2025-08-29',
      followers: 60000,
      content: 300,
    },
    engagement: {
      likes: 22000,
      comments: 500,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 37,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.exploring_futuristic_transport_systems_dcaebf59');
    },
    duration: '19:35',
    thumbnail: thumbnail(11),
    category: 'Technology',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[13],
    uploaderInfo: {
      uploadedDate: '2025-08-27',
      followers: 52000,
      content: 190,
    },
    engagement: {
      likes: 13000,
      comments: 350,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 38,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.hidden_stories_of_medieval_castles_a97123ea');
    },
    duration: '48:02',
    thumbnail: thumbnail(3),
    category: 'History',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[9],
    uploaderInfo: {
      uploadedDate: '2025-08-24',
      followers: 45000,
      content: 175,
    },
    engagement: {
      likes: 9400,
      comments: 260,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 39,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.unveiling_the_secrets_of_ancient_sculptors_b3671264');
    },
    duration: '28:54',
    thumbnail: thumbnail(17),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[5],
    uploaderInfo: {
      uploadedDate: '2025-08-21',
      followers: 39000,
      content: 150,
    },
    engagement: {
      likes: 8200,
      comments: 240,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 40,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.festivals_that_celebrate_human_creativity_c06a2841');
    },
    duration: '1:15:09',
    thumbnail: thumbnail(8),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[12],
    uploaderInfo: {
      uploadedDate: '2025-08-18',
      followers: 43000,
      content: 210,
    },
    engagement: {
      likes: 11200,
      comments: 300,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 41,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.revolutionary_architecture_of_the_future_d89a4dff');
    },
    duration: '42:18',
    thumbnail: thumbnail(1),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[8],
    uploaderInfo: {
      uploadedDate: '2025-08-14',
      followers: 70000,
      content: 330,
    },
    engagement: {
      likes: 18500,
      comments: 470,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 42,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.the_artistic_journey_of_marble_sculptures_e0e3a079');
    },
    duration: '9:37',
    thumbnail: thumbnail(25),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[1],
    uploaderInfo: {
      uploadedDate: '2025-08-10',
      followers: 21000,
      content: 120,
    },
    engagement: {
      likes: 5100,
      comments: 170,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 43,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.cultural_festivals_that_unite_the_world_b6322009');
    },
    duration: '2:01:45',
    thumbnail: thumbnail(9),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[14],
    uploaderInfo: {
      uploadedDate: '2025-08-07',
      followers: 62000,
      content: 260,
    },
    engagement: {
      likes: 19200,
      comments: 520,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 44,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.iconic_cathedrals_through_the_ages_9a2e1325');
    },
    duration: '57:08',
    thumbnail: thumbnail(20),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[3],
    uploaderInfo: {
      uploadedDate: '2025-08-03',
      followers: 58000,
      content: 230,
    },
    engagement: {
      likes: 14900,
      comments: 390,
    },
    details: videoDetails[2],
    comments,
  },
  {
    id: 45,
    type: 'related',
    get title() {
      return i18n.t(
        'ui.data.content.video.the_transformation_of_city_skylines_in_50_years_cd6e1ede',
      );
    },
    duration: '36:21',
    thumbnail: thumbnail(13),
    category: 'Architecture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[2],
    uploaderInfo: {
      uploadedDate: '2025-07-30',
      followers: 84000,
      content: 340,
    },
    engagement: {
      likes: 26500,
      comments: 680,
    },
    details: videoDetails[0],
    comments,
  },
  {
    id: 46,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.the_hidden_symbolism_in_ancient_festivals_2b037d2f');
    },
    duration: '18:09',
    thumbnail: thumbnail(6),
    category: 'Festive',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[7],
    uploaderInfo: {
      uploadedDate: '2025-07-27',
      followers: 53000,
      content: 210,
    },
    engagement: {
      likes: 7200,
      comments: 260,
    },
    details: videoDetails[1],
    comments,
  },
  {
    id: 47,
    type: 'related',
    get title() {
      return i18n.t('ui.data.content.video.famous_sculptures_and_the_stories_they_tell_50bb8f23');
    },
    duration: '1:02:48',
    thumbnail: thumbnail(21),
    category: 'Sculpture',
    videoSrc: `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`,
    author: users[10],
    uploaderInfo: {
      uploadedDate: '2025-07-22',
      followers: 29000,
      content: 130,
    },
    engagement: {
      likes: 9800,
      comments: 310,
    },
    details: videoDetails[2],
    comments,
  },
];
