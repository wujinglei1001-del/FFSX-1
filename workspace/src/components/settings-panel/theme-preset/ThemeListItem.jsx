import { useTranslation } from 'react-i18next';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { THEME_TRANSLATION_KEYS } from 'theme/palettes';
import { ThemeRadio, themeListRowSx } from './ThemeRadio';

const ThemeListItem = ({
  preset,
  palette,
  isSelected,
  onSelect,
  variant = 'default',
  isNested = false,
}) => {
  const { t: translateUi } = useTranslation();
  const colors = [palette.primary?.main, palette.background?.menu];

  return (
    <ListItem disablePadding>
      <ListItemButton
        dense
        selected={isSelected}
        onClick={() => onSelect(preset)}
        sx={themeListRowSx(variant, isNested)}
      >
        <ListItemIcon>
          <ThemeRadio checked={isSelected} />
        </ListItemIcon>

        <ListItemText
          primary={translateUi(THEME_TRANSLATION_KEYS[preset], { defaultValue: preset })}
        />

        <Stack
          direction="row"
          sx={{
            gap: 0.5,
          }}
        >
          {colors.map((bg, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: 0.5,
                border: 1,
                borderColor: 'divider',
                bgcolor: bg,
              }}
            />
          ))}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default ThemeListItem;
