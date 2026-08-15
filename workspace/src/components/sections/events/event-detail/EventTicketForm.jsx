import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  formHelperTextClasses,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import NumberTextField from 'components/base/NumberTextField';

export const EventTicketFormSchema = yup.object({
  ticketType: yup.string(),
  firstName: yup
    .string()
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.this_field_is_required_dedbaded'),
    ),
  lastName: yup
    .string()
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.this_field_is_required_dedbaded'),
    ),
  email: yup
    .string()
    .required(i18n.t('ui.sections.events.event_detail.eventticketform.email_is_required_4da1d591'))
    .email(
      i18n.t(
        'ui.sections.events.event_detail.eventticketform.email_must_be_a_valid_email_612a8b2a',
      ),
    ),
  emailConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('email'), undefined],
      i18n.t('ui.sections.events.event_detail.eventticketform.emails_must_match_8be86a3d'),
    )
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.please_confirm_your_email_4d0734c4'),
    ),
  phoneNumber: yup
    .string()
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.this_field_is_required_dedbaded'),
    ),
  dateOfBirth: yup
    .string()
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.this_field_is_required_dedbaded'),
    ),
  quantity: yup
    .number()
    .required(
      i18n.t('ui.sections.events.event_detail.eventticketform.this_field_is_required_dedbaded'),
    )
    .min(
      1,
      i18n.t(
        'ui.sections.events.event_detail.eventticketform.quantity_must_be_greater_than_0_ef165e2f',
      ),
    ),
});
const EventTicketForm = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={2}
      sx={{
        [`& .${formHelperTextClasses.root}`]: {
          mt: 0.5,
        },
        ...sx,
      }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <TextField
          fullWidth
          id="firstName"
          type="text"
          label={translateUi('ui.sections.events.event_detail.eventticketform.first_name_7e568a90')}
          variant="filled"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <TextField
          fullWidth
          id="lastName"
          type="text"
          label={translateUi('ui.sections.events.event_detail.eventticketform.last_name_adec36a8')}
          variant="filled"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="email"
          type="email"
          label={translateUi('ui.sections.events.event_detail.eventticketform.email_84add5b2')}
          variant="filled"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="emailConfirmation"
          type="email"
          label={translateUi(
            'ui.sections.events.event_detail.eventticketform.re_enter_email_8e2c00a1',
          )}
          variant="filled"
          error={!!errors.emailConfirmation}
          helperText={errors.emailConfirmation?.message}
          {...register('emailConfirmation')}
        />
      </Grid>
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 1 }}>
          <TextField
            disabled
            variant="filled"
            sx={{ maxWidth: 'min-content' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ minWidth: 'unset' }}>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                      <IconifyIcon icon="twemoji:flag-bangladesh" sx={{ fontSize: 24 }} />
                      <Typography variant="caption" sx={{ display: 'block' }}>
                        {translateUi(
                          'ui.sections.events.event_detail.eventticketform.code_adac6937',
                        )}
                        <br />
                        <Typography variant="body2">+88</Typography>
                      </Typography>
                    </Stack>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            id="phoneNumber"
            type="tel"
            label={translateUi(
              'ui.sections.events.event_detail.eventticketform.phone_number_8961d3bf',
            )}
            variant="filled"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            sx={{ '& input': { direction: 'ltr' } }}
            {...register('phoneNumber')}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <FormControl variant="filled" fullWidth={true}>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  label={translateUi(
                    'ui.sections.events.event_detail.eventticketform.date_of_birth_9518425f',
                  )}
                  disableFuture
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                  onChange={(newValue) => {
                    const formattedDate = newValue?.format('DD/MM/YYYY');
                    field.onChange(formattedDate || '');
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth?.message,
                    },
                  }}
                />
              );
            }}
          />
        </FormControl>
      </Grid>
      <Grid size={12}>
        <NumberTextField
          helperText={errors.quantity?.message ? errors.quantity?.message : 'Maximum 5 people'}
          fullWidth
          id="quantity"
          type="number"
          label={translateUi('ui.sections.events.event_detail.eventticketform.quantity_44f6af69')}
          variant="filled"
          error={!!errors.quantity}
          {...register(`quantity`, {
            setValueAs: (value) => Number(value),
          })}
        />
      </Grid>
    </Grid>
  );
};
export default EventTicketForm;
