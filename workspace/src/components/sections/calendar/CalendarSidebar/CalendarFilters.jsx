import {
  FormControlLabel,
  FormGroup,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
} from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import TogglePanel from 'components/sections/calendar/CalendarSidebar/TogglePanel';
import StyledTextField from 'components/styled/StyledTextField';

const CalendarFilters = () => (
  <TogglePanel
    title={i18n.t('ui.sections.calendar.calendarsidebar.calendarfilters.search_filters_45551ab2')}
    defaultOpen
  >
    <FormGroup sx={{ gap: 3 }}>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <FormControlLabel
          control={<Switch defaultChecked size="small" />}
          label={i18n.t(
            'ui.sections.calendar.calendarsidebar.calendarfilters.online_events_only_ab68ab7e',
          )}
          sx={{ gap: 1.5, mx: 0, color: 'text.secondary' }}
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label={i18n.t(
            'ui.sections.calendar.calendarsidebar.calendarfilters.repeated_events_7a462a2a',
          )}
          sx={{ gap: 1.5, mx: 0, color: 'text.secondary' }}
        />
      </Stack>

      <Stack
        sx={{
          gap: 1,
        }}
      >
        <StyledTextField
          select
          fullWidth
          defaultValue="personal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon
                    icon="material-symbols:supervisor-account-outline"
                    sx={{ color: 'text.secondary' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        >
          <MenuItem value="personal">
            {i18n.t(
              'ui.sections.calendar.calendarsidebar.calendarfilters.hosted_by_anyone_d681acd3',
            )}
          </MenuItem>
          <MenuItem value="me">
            {i18n.t('ui.sections.calendar.calendarsidebar.calendarfilters.hosted_by_me_ad34d28d')}
          </MenuItem>
          <MenuItem value="team">
            {i18n.t(
              'ui.sections.calendar.calendarsidebar.calendarfilters.hosted_by_my_team_8c34b9a1',
            )}
          </MenuItem>
          <MenuItem value="organization">
            {i18n.t(
              'ui.sections.calendar.calendarsidebar.calendarfilters.hosted_by_my_organization_3581cce6',
            )}
          </MenuItem>
        </StyledTextField>
        <StyledTextField
          fullWidth
          placeholder={i18n.t(
            'ui.sections.calendar.calendarsidebar.calendarfilters.guest_id_f5f4d126',
          )}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon
                    icon="material-symbols:account-circle"
                    sx={{ color: 'text.secondary' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <StyledTextField
          fullWidth
          placeholder={i18n.t(
            'ui.sections.calendar.calendarsidebar.calendarfilters.location_d219c681',
          )}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon
                    icon="material-symbols:pin-drop-outline"
                    sx={{ color: 'text.secondary' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </FormGroup>
  </TogglePanel>
);

export default CalendarFilters;
