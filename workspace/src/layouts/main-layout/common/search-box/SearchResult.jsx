import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import paths from 'routes/paths';
import SimpleBar from 'simplebar-react';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from './SearchTextField';

const collectNavigationItems = (items, section = '') =>
  items.flatMap((item) => {
    const itemSection = item.subheader || item.name || section;

    if (item.items) {
      return collectNavigationItems(item.items, itemSection);
    }

    if (!item.active || !item.path) return [];

    return [
      {
        key: item.key || item.pathName || item.path,
        name: item.name || item.pathName || item.path,
        path: item.path,
        icon: item.icon,
        section,
        external: item.external === true,
      },
    ];
  });

const SearchResult = ({ handleClose, navigation = [] }) => {
  const { t: translateUi, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const navigationItems = useMemo(
    () => collectNavigationItems(navigation),
    [i18n.resolvedLanguage, navigation],
  );
  const normalizedQuery = query.trim().toLocaleLowerCase(i18n.resolvedLanguage);
  const results = navigationItems.filter((item) =>
    `${item.name} ${item.section} ${item.path}`
      .toLocaleLowerCase(i18n.resolvedLanguage)
      .includes(normalizedQuery),
  );

  return (
    <>
      <SearchField
        handleClose={handleClose}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <SimpleBar style={{ maxHeight: 600, minHeight: 0, width: '100%' }}>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 'medium' }}>
            {translateUi('ffax.search.navigation')}
          </Typography>
        </Box>
        <Divider />

        {results.length > 0 ? (
          <List disablePadding sx={{ py: 1 }}>
            {results.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  {...(item.external
                    ? { component: 'a', href: item.path }
                    : { component: RouterLink, to: item.path })}
                  onClick={handleClose}
                  sx={{ gap: 1, px: 3, py: 1.25, borderRadius: 0 }}
                >
                  <ListItemIcon>
                    <IconifyIcon
                      icon={item.icon || 'material-symbols:arrow-forward-rounded'}
                      fontSize={22}
                      color="primary.main"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={item.path}
                    slotProps={{
                      primary: { variant: 'subtitle2', color: 'text.primary' },
                      secondary: { variant: 'caption', color: 'text.disabled' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 4 }}>
            {translateUi('ffax.search.no_results')}
          </Typography>
        )}

        <Divider />
        <Stack direction="row" sx={{ gap: 2, px: 3, py: 2 }}>
          <Link href={paths.landingContact} underline="none" onClick={handleClose}>
            {translateUi('ffax.public.navigation.contact')}
          </Link>
          <Link href={paths.landingAbout} underline="none" onClick={handleClose}>
            {translateUi('ffax.public.navigation.about')}
          </Link>
        </Stack>
      </SimpleBar>
    </>
  );
};

export const SearchField = ({ handleClose, value, onChange }) => {
  const initialFocusRef = useRef(null);

  useEffect(() => {
    initialFocusRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <SearchTextField
      fullWidth
      value={value}
      onChange={onChange}
      sx={{
        [`& .${inputBaseClasses.root}`]: {
          borderRadius: '4px 4px 0 0',
          border: 1,
          borderColor: 'transparent',
          [`&.${inputBaseClasses.focused}`]: {
            outline: 'none',
            border: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderColor: 'primary.main',
            boxShadow: 'none',
          },
        },
      }}
      slotProps={{
        input: {
          inputProps: {
            ref: initialFocusRef,
            autoComplete: 'off',
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" edge="end" onClick={handleClose}>
                <IconifyIcon icon="material-symbols:close-rounded" color="grey.500" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchResult;
