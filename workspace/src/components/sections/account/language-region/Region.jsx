import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import {
  dateFormats,
  listSortOrders,
  numberFormats,
  regions,
  weekDays,
} from 'data/account/language-region';
import StyledTextField from 'components/styled/StyledTextField';

const Region = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <Stack sx={{ gap: 3, mb: 5 }}>
      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <Autocomplete
            aria-labelledby="region-autocomplete-label"
            disablePortal
            fullWidth
            options={regions}
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                label={translateUi('ui.sections.account.language_region.region.region_0f217179')}
                placeholder={regions[0]}
                sx={{ width: { sm: 0.5 }, pr: { sm: 0.5 } }}
              />
            )}
          />
        )}
      />
      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.language_region.region.temperature_0a9062a9')}
        </Typography>
        <Controller
          name="temperature"
          control={control}
          render={({ field }) => (
            <RadioGroup row aria-labelledby="temperature-radio-button-group-label" {...field}>
              <FormControlLabel
                value="celcius"
                control={<Radio />}
                label={translateUi('ui.sections.account.language_region.region.celsius_781e3854')}
              />
              <FormControlLabel
                value="fahrenheit"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.language_region.region.fahrenheit_3f60318d',
                )}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.language_region.region.measurement_system_515a10d2')}
        </Typography>
        <Controller
          name="measurementSystem"
          control={control}
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby="measurement-system-radio-button-group-label"
              {...field}
            >
              <FormControlLabel
                value="metric"
                control={<Radio />}
                label={translateUi('ui.sections.account.language_region.region.metric_b2bb7604')}
              />
              <FormControlLabel value="us" control={<Radio />} label="US" />
              <FormControlLabel value="uk" control={<Radio />} label="UK" />
            </RadioGroup>
          )}
        />
      </FormControl>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, width: 1 }}>
        <Controller
          name="firstDayOfWeek"
          control={control}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="first-day-of-week-autocomplete-label"
              disablePortal
              options={weekDays}
              fullWidth
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={translateUi(
                    'ui.sections.account.language_region.region.first_day_of_week_8bdd9523',
                  )}
                  placeholder={weekDays[0]}
                />
              )}
            />
          )}
        />
        <Controller
          name="dateFormat"
          control={control}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="date-format-autocomplete-label"
              disablePortal
              options={dateFormats}
              fullWidth
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={translateUi(
                    'ui.sections.account.language_region.region.date_format_94ee8869',
                  )}
                  placeholder={dateFormats[0]}
                />
              )}
            />
          )}
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, width: 1 }}>
        <Controller
          name="numberFormat"
          control={control}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="number-format-autocomplete-label"
              disablePortal
              options={numberFormats}
              fullWidth
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={translateUi(
                    'ui.sections.account.language_region.region.number_format_ebe7cbe4',
                  )}
                  placeholder={numberFormats[0]}
                />
              )}
            />
          )}
        />
        <Controller
          name="listSortOrder"
          control={control}
          render={({ field }) => (
            <Autocomplete
              aria-labelledby="list-sort-order-autocomplete-label"
              disablePortal
              options={listSortOrders}
              fullWidth
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label={translateUi(
                    'ui.sections.account.language_region.region.list_sort_order_74c7141a',
                  )}
                  placeholder={listSortOrders[0]}
                />
              )}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

export default Region;
