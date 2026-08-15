import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';
import NumberTextField from 'components/base/NumberTextField';
import { useScheduleColors } from 'components/sections/scheduler/SchedulePanel/useSchedulerColors';
import SettingsToggle from 'components/sections/scheduler/SettingsToggle';
import StyledTextField from 'components/styled/StyledTextField';

const ScheduleConfig = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { colorMap } = useScheduleColors();

  const { value, unit } = watch('alertBefore');

  const handleIncrement = () => {
    setValue('alertBefore', { value: value + 1, unit });
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue('alertBefore', { value: value - 1, unit });
    }
  };

  const handleUnitChange = (event) => {
    const selectedUnit = event.target.value;
    setValue('alertBefore', { value, unit: selectedUnit });
  };

  return (
    <SettingsToggle
      title={translateUi(
        'ui.sections.scheduler.schedulepanel.scheduleconfig.appointment_schedule_7b928107',
      )}
      icon="material-symbols:schedule-outline"
      defaultOpen
    >
      <Stack sx={{ gap: 3, mb: 4 }}>
        <StyledTextField
          fullWidth
          label={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.event_title_072cbaea',
          )}
          error={!!errors.title}
          helperText={errors?.title?.message}
          {...register('title')}
        />
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  label={translateUi(
                    'ui.sections.scheduler.schedulepanel.scheduleconfig.duration_1370004d',
                  )}
                  select
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                  {...field}
                >
                  <MenuItem value="1hr">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.1_hour_f030c3d6',
                    )}
                  </MenuItem>
                  <MenuItem value="2hr">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.2_hours_2046e49e',
                    )}
                  </MenuItem>
                  <MenuItem value="5hr">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.5_hours_1fe288aa',
                    )}
                  </MenuItem>
                </StyledTextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Controller
              name="timeZone"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  fullWidth
                  label={translateUi(
                    'ui.sections.scheduler.schedulepanel.scheduleconfig.time_zone_eea79afd',
                  )}
                  select
                  error={!!errors.timeZone}
                  helperText={errors.timeZone?.message}
                  {...field}
                >
                  <MenuItem value="PST">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.pacific_time_pst_edbde6db',
                    )}
                  </MenuItem>
                  <MenuItem value="CST">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.central_cst_b2e3ff55',
                    )}
                  </MenuItem>
                  <MenuItem value="EST">
                    {translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.eastern_est_6dc562d3',
                    )}
                  </MenuItem>
                </StyledTextField>
              )}
            />
          </Grid>
        </Grid>
        <StyledTextField
          fullWidth
          placeholder={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.add_description_c3f451c2',
          )}
          label={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.description_55f8ebc8',
          )}
          multiline
          rows={3}
          sx={{
            [`& .${inputBaseClasses.root}`]: {
              py: 0.5,
              [`& .${inputBaseClasses.input}`]: {
                py: 0.5,
              },
            },
          }}
          {...register('description')}
        />
      </Stack>
      <Stack sx={{ gap: 3, mb: 4 }}>
        <StyledTextField
          label={translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.virtual_8e7daa12')}
          placeholder={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.add_meeting_link_8e37591f',
          )}
          error={!!errors.virtualLink}
          helperText={errors.virtualLink?.message}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="end">
                    <IconifyIcon icon="material-symbols:content-copy-outline" fontSize={20} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...register('virtualLink')}
        />
        <StyledTextField
          label={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.physical_919b82a0',
          )}
          placeholder={translateUi(
            'ui.sections.scheduler.schedulepanel.scheduleconfig.location_d219c681',
          )}
          error={!!errors.location}
          helperText={errors.location?.message}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="end">
                    <IconifyIcon icon="material-symbols:pin-drop-outline" fontSize={20} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...register('location')}
        />

        <Stack sx={{ gap: 0.5, alignItems: 'flex-start' }}>
          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                fullWidth
                multiple
                limitTags={2}
                disableClearable
                options={users.slice(0, 5)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderValue={(selectedOptions, getItemProps) =>
                  selectedOptions.map((option, index) => {
                    const { key, ...itemRest } = getItemProps({ index });

                    return (
                      <Chip
                        key={key}
                        variant="outlined"
                        label={option.name}
                        avatar={<Avatar src={option.avatar} />}
                        {...itemRest}
                      />
                    );
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
                    sx={{ flexGrow: 1 }}
                    label={translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.add_guests_d7aacd94',
                    )}
                    placeholder={translateUi(
                      'ui.sections.scheduler.schedulepanel.scheduleconfig.user_id_23bf49da',
                    )}
                    error={!!errors.guests}
                    helperText={errors.guests?.message}
                    {...params}
                  />
                )}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
              />
            )}
          />

          <Button
            size="small"
            endIcon={
              <IconifyIcon
                icon="material-symbols:outgoing-mail-outline"
                height={18}
                width={18}
                sx={{ mt: '2px' }}
              />
            }
          >
            {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.send_e_vite_d970e332')}
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ gap: 3 }}>
        <div>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.scheduler.schedulepanel.scheduleconfig.pre_meeting_alerts_7de68d50',
            )}
          </Typography>
          <Controller
            name="preMeetingAlert"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.scheduler.schedulepanel.scheduleconfig.email_84add5b2',
                  )}
                />
                <FormControlLabel
                  value="notifications"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.scheduler.schedulepanel.scheduleconfig.notifications_753a22b2',
                  )}
                />
              </RadioGroup>
            )}
          />

          <Stack direction="row" sx={{ gap: 1 }}>
            <Button color="neutral" variant="soft" shape="square" onClick={handleDecrement}>
              <IconifyIcon icon="material-symbols:remove-rounded" fontSize={20} />
            </Button>
            <Controller
              name="alertBefore.value"
              control={control}
              render={({ field }) => (
                <NumberTextField
                  {...field}
                  value={value}
                  variant="custom"
                  sx={{
                    maxWidth: 64,
                    [`& .${inputBaseClasses.input}`]: {
                      textAlign: 'center',
                    },
                  }}
                  onChange={(e) => setValue('alertBefore', { value: Number(e.target.value), unit })}
                />
              )}
            />
            <Button color="neutral" variant="soft" shape="square" onClick={handleIncrement}>
              <IconifyIcon icon="material-symbols:add-rounded" fontSize={20} />
            </Button>
            <StyledTextField
              select
              fullWidth
              value={unit}
              onChange={handleUnitChange}
              sx={{ flexGrow: 1 }}
            >
              <MenuItem value="minute">
                {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.minutes_092f99ea')}
              </MenuItem>
              <MenuItem value="hr">
                {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.hour_c37cf838')}
              </MenuItem>
              <MenuItem value="day">
                {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.day_987b9ced')}
              </MenuItem>
            </StyledTextField>
          </Stack>
        </div>

        <div>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.color_1d0c8304')}
          </Typography>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                {Object.entries(colorMap).map(([key, cssColor]) => (
                  <FormControlLabel
                    key={key}
                    value={cssColor}
                    control={
                      <Radio
                        icon={
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 4,
                              bgcolor: cssColor,
                            }}
                          />
                        }
                        checkedIcon={
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 4,
                              bgcolor: cssColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                            }}
                          >
                            <IconifyIcon
                              icon="material-symbols:check-small-rounded"
                              sx={{
                                fontSize: 18,
                                color: 'white',
                              }}
                            />
                          </Box>
                        }
                        sx={{ p: 0 }}
                      />
                    }
                    label=""
                    sx={{ ml: 0, mr: 1 }}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </div>
        <Controller
          name="appointmentType"
          control={control}
          render={({ field }) => (
            <StyledTextField
              fullWidth
              label={translateUi(
                'ui.sections.scheduler.schedulepanel.scheduleconfig.appointment_type_d60f67c2',
              )}
              select
              error={!!errors.appointmentType}
              helperText={errors.appointmentType?.message}
              {...field}
            >
              <MenuItem value="design">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.scheduleconfig.design_consultation_3d988128',
                )}
              </MenuItem>
              <MenuItem value="follow-up">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.scheduleconfig.follow_up_meeting_b7e7bdb4',
                )}
              </MenuItem>
              <MenuItem value="review">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.scheduleconfig.project_review_96032beb',
                )}
              </MenuItem>
              <MenuItem value="support">
                {translateUi(
                  'ui.sections.scheduler.schedulepanel.scheduleconfig.technical_support_4e09a610',
                )}
              </MenuItem>
            </StyledTextField>
          )}
        />
        <div>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {translateUi('ui.sections.scheduler.schedulepanel.scheduleconfig.access_2f81a22d')}
          </Typography>
          <Controller
            name="access"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} sx={{ gap: 1 }}>
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label={
                    <Stack sx={{ gap: 1, mt: '3px' }}>
                      <Typography variant="subtitle2">
                        {translateUi(
                          'ui.sections.scheduler.schedulepanel.scheduleconfig.private_237dfa0a',
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {translateUi(
                          'ui.sections.scheduler.schedulepanel.scheduleconfig.only_admins_and_linked_clients_can_book_1176775c',
                        )}
                      </Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label={
                    <Stack sx={{ gap: 1, mt: '3px' }}>
                      <Typography variant="subtitle2">
                        {translateUi(
                          'ui.sections.scheduler.schedulepanel.scheduleconfig.public_dc5eb704',
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {translateUi(
                          'ui.sections.scheduler.schedulepanel.scheduleconfig.anyone_with_the_link_can_book_883e0d99',
                        )}
                      </Typography>
                    </Stack>
                  }
                />
              </RadioGroup>
            )}
          />
        </div>
      </Stack>
    </SettingsToggle>
  );
};

export default ScheduleConfig;
