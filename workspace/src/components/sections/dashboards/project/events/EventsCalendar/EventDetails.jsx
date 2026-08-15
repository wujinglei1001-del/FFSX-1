import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Stack,
  autocompleteClasses,
  filledInputClasses,
} from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const EventDetails = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const eventType = watch('eventType');

  return (
    <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
      <Stack direction="row" sx={{ gap: 1, width: 1, minWidth: 0 }}>
        <FormControl sx={{ minWidth: 90 }}>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <StyledTextField
                label={translateUi('ui.sections.dashboards.project.events.event_type_23f657cb')}
                select
                {...field}
                error={!!errors.eventType}
                helperText={errors.eventType?.message}
              >
                <MenuItem value="online">
                  {translateUi('ui.sections.dashboards.project.events.online_c3e839df')}
                </MenuItem>
                <MenuItem value="physical">
                  {translateUi('ui.sections.dashboards.project.events.physical_919b82a0')}
                </MenuItem>
                <MenuItem value="hybrid">
                  {translateUi('ui.sections.dashboards.project.events.hybrid_8e01f6bc')}
                </MenuItem>
              </StyledTextField>
            )}
          />
        </FormControl>
        <FormControl sx={{ flex: 1, minWidth: 0 }}>
          <Controller
            control={control}
            name="notificationMinutesBefore"
            render={({ field }) => (
              <StyledTextField
                select
                label={translateUi('ui.sections.dashboards.project.events.notification_c18f8f25')}
                {...field}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconifyIcon icon="material-symbols:notifications-active-outline-rounded" />
                      </InputAdornment>
                    ),
                  },
                }}
              >
                <MenuItem value={15}>
                  {translateUi('ui.sections.dashboards.project.events.15_minutes_before_4bba5a72')}
                </MenuItem>
                <MenuItem value={30}>
                  {translateUi('ui.sections.dashboards.project.events.30_minutes_before_3eef06b7')}
                </MenuItem>
                <MenuItem value={45}>
                  {translateUi('ui.sections.dashboards.project.events.45_minutes_before_6bb473a4')}
                </MenuItem>
                <MenuItem value={60}>
                  {translateUi('ui.sections.dashboards.project.events.60_minutes_before_252d11fc')}
                </MenuItem>
              </StyledTextField>
            )}
          />
        </FormControl>
        <Button
          shape="square"
          size="medium"
          color="neutral"
          sx={{ gap: 0.5, alignSelf: 'flex-end' }}
        >
          <IconifyIcon
            icon="material-symbols:notification-add-outline-rounded"
            sx={{ fontSize: 18 }}
          />
        </Button>
      </Stack>
      {(eventType === 'online' || eventType === 'hybrid') && (
        <StyledTextField
          label={translateUi('ui.sections.dashboards.project.events.virtual_8e7daa12')}
          fullWidth
          placeholder={translateUi(
            'ui.sections.dashboards.project.events.add_meeting_link_8e37591f',
          )}
          error={!!errors.virtualLink}
          helperText={errors.virtualLink?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:videocam-outline-rounded" />
                </InputAdornment>
              ),
            },
          }}
          {...register('virtualLink')}
        />
      )}
      {(eventType === 'physical' || eventType === 'hybrid') && (
        <StyledTextField
          label={translateUi('ui.sections.dashboards.project.events.physical_919b82a0')}
          fullWidth
          placeholder={translateUi('ui.sections.dashboards.project.events.add_location_80fb1d44')}
          error={!!errors.physical}
          helperText={errors.physical?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:location-on-outline-rounded" />
                </InputAdornment>
              ),
            },
          }}
          {...register('physical')}
        />
      )}

      <Stack
        direction="row"
        sx={{
          gap: 1,
          width: 1,
          minWidth: 0,
          alignItems: 'flex-end',
        }}
      >
        <Controller
          control={control}
          name="members"
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              fullWidth
              multiple
              limitTags={2}
              disableClearable
              options={users.slice(0, 5)}
              onChange={(_, newValue) => onChange(newValue)}
              value={value}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderValue={(value, getItemProps) =>
                value.map((option, index) => {
                  const { key, ...rest } = getItemProps({ index });

                  return <Chip key={key} variant="outlined" label={option.name} {...rest} />;
                })
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;

                return (
                  <li
                    key={key}
                    {...optionProps}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {option.name}
                    {selected && (
                      <IconifyIcon icon="material-symbols:check-rounded" sx={{ fontSize: 18 }} />
                    )}
                  </li>
                );
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={translateUi('ui.sections.dashboards.project.events.add_guests_d7aacd94')}
                  placeholder={translateUi(
                    'ui.sections.dashboards.project.events.user_id_23bf49da',
                  )}
                  error={!!errors.members}
                  helperText={errors.members?.message}
                />
              )}
              slotProps={{
                popper: {
                  sx: {
                    "& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true']": {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused': {
                      backgroundColor: 'background.elevation1',
                    },
                    "& .MuiAutocomplete-listbox .MuiAutocomplete-option[aria-selected='true'].Mui-focused":
                      {
                        backgroundColor: 'background.elevation1',
                      },
                  },
                },
              }}
              sx={{
                flex: 1,
                minWidth: 0,
                [`& .${autocompleteClasses.inputRoot}.${filledInputClasses.root}`]: {
                  pt: 1,
                },
              }}
            />
          )}
        />
        <Button variant="soft" size="medium" sx={{ textWrap: 'nowrap', minWidth: 'max-content' }}>
          {translateUi('ui.sections.dashboards.project.events.send_e_vite_d970e332')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default EventDetails;
