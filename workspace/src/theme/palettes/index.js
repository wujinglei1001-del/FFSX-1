import { arcticPalette } from './arctic';
import { darkPalette, lightPalette } from './base';
import { draculaPalette } from './dracula';
import { emberPalette } from './ember';
import { luxuryPalette } from './luxury';
import { midnightPalette } from './midnight';
import { naturePalette } from './nature';
import { retroPalette } from './retro';

export const THEME_DISPLAY_NAMES = {
  'default-light': 'Light',
  'default-dark': 'Dark',
  luxury: 'Luxury',
  retro: 'Retro',
  arctic: 'Arctic',
  nature: 'Nature',
  ember: 'Ember',
  dracula: 'Dracula',
  midnight: 'Midnight',
};

export const THEME_TRANSLATION_KEYS = {
  'default-light': 'theme_presets.light',
  'default-dark': 'theme_presets.dark',
  luxury: 'theme_presets.luxury',
  retro: 'theme_presets.retro',
  arctic: 'theme_presets.arctic',
  nature: 'theme_presets.nature',
  ember: 'theme_presets.ember',
  dracula: 'theme_presets.dracula',
  midnight: 'theme_presets.midnight',
};

export const lightPalettes = {
  'default-light': lightPalette,
  luxury: luxuryPalette,
  retro: retroPalette,
  arctic: arcticPalette,
  nature: naturePalette,
};

export const darkPalettes = {
  'default-dark': darkPalette,
  ember: emberPalette,
  dracula: draculaPalette,
  midnight: midnightPalette,
};

export const allPalettes = {
  ...lightPalettes,
  ...darkPalettes,
};
