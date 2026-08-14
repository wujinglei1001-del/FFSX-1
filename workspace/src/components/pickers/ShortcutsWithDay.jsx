import { List, ListItem, ListItemButton, Stack, Typography, listItemClasses } from '@mui/material';
import { useIsValidValue, usePickerContext } from '@mui/x-date-pickers/hooks';
import dayjs from 'dayjs';

const formatRightLabel = (value) => {
  const dateValue = dayjs(value);
  if (!dateValue.isValid()) return '';
  return dateValue.format('ddd');
};

const ShortcutsWithDay = ({ items, changeImportance = 'set', ...rest }) => {
  const { setValue, value: currentValue } = usePickerContext();
  const isValidValue = useIsValidValue();
  if (!items?.length) return null;

  const currentDay = dayjs(currentValue);

  return (
    <List
      dense
      {...rest}
      sx={[
        (theme) => ({
          width: 220,
          padding: theme.spacing(1),
          marginRight: theme.spacing(2),
          borderRight: `1px solid ${theme.vars.palette.divider}`,
          [`& .${listItemClasses.root}`]: {
            marginBottom: theme.spacing(0.25),
          },
        }),
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {items.map((item) => {
        const nextValue = item.getValue({ isValid: isValidValue });
        const disabled = !isValidValue(nextValue);
        const right = formatRightLabel(nextValue);
        const nextDay = dayjs(nextValue);
        const selected =
          !disabled &&
          currentDay.isValid() &&
          nextDay.isValid() &&
          currentDay.isSame(nextDay, 'day');
        const shortcutContext = {
          label: item.label,
          ...(item.id ? { id: item.id } : {}),
        };

        return (
          <ListItem key={item.id ?? item.label} disableGutters sx={{ p: 0 }}>
            <ListItemButton
              disabled={disabled}
              onClick={() => setValue(nextValue, { changeImportance, shortcut: shortcutContext })}
              sx={(theme) => ({
                borderRadius: theme.spacing(1),
                px: 1.25,
                ...(selected && {
                  backgroundColor: theme.vars.palette.primary.lighter,
                  '&:hover': {
                    backgroundColor: theme.vars.palette.primary.lighter,
                  },
                }),
              })}
            >
              <Stack
                sx={{
                  width: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 400 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 400 }}>
                  {right}
                </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ShortcutsWithDay;
