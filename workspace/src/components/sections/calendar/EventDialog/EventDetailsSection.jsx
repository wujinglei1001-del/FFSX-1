import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Button, InputAdornment, MenuItem, Stack } from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const EventDetailsSection = ({ eventType, errors }) => {
  const { t: translateUi } = useTranslation();
  const { control, register } = useFormContext();
  return (
    <Stack sx={{ gap: 2 }}>
      <Controller
        name="eventType"
        control={control}
        render={({ field }) => (
          <StyledTextField
            label={translateUi(
              'ui.sections.calendar.eventdialog.eventdetailssection.event_type_23f657cb',
            )}
            select
            error={!!errors.eventType}
            helperText={errors.eventType?.message}
            {...field}
            value={field.value || ''}
          >
            <MenuItem value="online">
              {translateUi('ui.sections.calendar.eventdialog.eventdetailssection.online_c3e839df')}
            </MenuItem>
            <MenuItem value="physical">
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.physical_919b82a0',
              )}
            </MenuItem>
            <MenuItem value="hybrid">
              {translateUi('ui.sections.calendar.eventdialog.eventdetailssection.hybrid_8e01f6bc')}
            </MenuItem>
          </StyledTextField>
        )}
      />
      {(eventType === 'online' || eventType === 'hybrid') && (
        <StyledTextField
          label={translateUi(
            'ui.sections.calendar.eventdialog.eventdetailssection.virtual_8e7daa12',
          )}
          fullWidth
          placeholder={translateUi(
            'ui.sections.calendar.eventdialog.eventdetailssection.add_meeting_link_8e37591f',
          )}
          error={!!errors.url}
          helperText={errors.url?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:videocam-outline-rounded" />
                </InputAdornment>
              ),
            },
          }}
          {...register('url')}
        />
      )}
      {(eventType === 'physical' || eventType === 'hybrid') && (
        <StyledTextField
          label={translateUi(
            'ui.sections.calendar.eventdialog.eventdetailssection.physical_919b82a0',
          )}
          fullWidth
          placeholder={translateUi(
            'ui.sections.calendar.eventdialog.eventdetailssection.add_location_80fb1d44',
          )}
          error={!!errors.location}
          helperText={errors.location?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:location-on-outline-rounded" />
                </InputAdornment>
              ),
            },
          }}
          {...register('location')}
        />
      )}
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'flex-end',
        }}
      >
        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <Autocomplete
              fullWidth
              multiple
              options={users}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={field.value
                ?.map((id) => users.find((user) => user.id.toString() === id))
                .filter((user) => user !== undefined)}
              onChange={(_, newValue) =>
                field.onChange(newValue?.map((user) => user.id.toString()) || [])
              }
              renderInput={(params) => {
                return (
                  <StyledTextField
                    {...params}
                    label={translateUi(
                      'ui.sections.calendar.eventdialog.eventdetailssection.add_guests_7385488d',
                    )}
                    placeholder={translateUi(
                      'ui.sections.calendar.eventdialog.eventdetailssection.user_id_23bf49da',
                    )}
                    sx={{ flexGrow: 1 }}
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...params.slotProps?.input,
                        startAdornment: (
                          <>
                            <InputAdornment position="end" sx={{ ml: 0 }}>
                              <IconifyIcon
                                fontSize={20}
                                icon="material-symbols:account-circle"
                                sx={{ color: 'text.secondary' }}
                              />
                            </InputAdornment>
                            {params.slotProps?.input?.startAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          )}
        />
        <Button variant="soft" size="medium" sx={{ textWrap: 'nowrap', minWidth: 'max-content' }}>
          {translateUi('ui.sections.calendar.eventdialog.eventdetailssection.send_e_vite_d970e332')}
        </Button>
      </Stack>
      <Controller
        name="notifyInMinutes"
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledTextField
            select
            value={value || 0}
            onChange={(e) => onChange(e.target.value)}
            label={translateUi(
              'ui.sections.calendar.eventdialog.eventdetailssection.notification_c18f8f25',
            )}
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
            <MenuItem value={0} disabled>
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.do_not_notify_1a59a6aa',
              )}
            </MenuItem>
            <MenuItem value={15}>
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.15_minutes_before_4bba5a72',
              )}
            </MenuItem>
            <MenuItem value={30}>
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.30_minutes_before_3eef06b7',
              )}
            </MenuItem>
            <MenuItem value={45}>
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.45_minutes_before_6bb473a4',
              )}
            </MenuItem>
            <MenuItem value={60}>
              {translateUi(
                'ui.sections.calendar.eventdialog.eventdetailssection.60_minutes_before_252d11fc',
              )}
            </MenuItem>
          </StyledTextField>
        )}
      />
      <Button
        variant="text"
        color="neutral"
        size="small"
        startIcon={
          <IconifyIcon icon="material-symbols:notification-add-outline" height={18} width={18} />
        }
        sx={{ alignSelf: 'flex-start' }}
      >
        {translateUi(
          'ui.sections.calendar.eventdialog.eventdetailssection.add_notification_aaaa16cd',
        )}
      </Button>
    </Stack>
  );
};
export default EventDetailsSection;
