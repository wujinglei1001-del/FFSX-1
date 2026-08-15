import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

export const customerInfoFormSchema = yup
  .object({
    customer: yup.object({
      email: yup
        .string()
        .email()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      firstName: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      lastName: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      phoneNumber: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
    }),
  })
  .required();

const CustomerInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{
        rowGap: 3,
        my: 3,
      }}
    >
      <Grid size={12}>
        <TextField
          fullWidth
          id="email"
          type="email"
          label={translateUi('ui.sections.ecommerce.customer.checkout.email_address_36896d2e')}
          variant="filled"
          error={!!errors.customer?.email}
          helperText={errors.customer?.email?.message}
          {...register('customer.email')}
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
          id="firstName"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.first_name_3cba86b9')}
          variant="filled"
          error={!!errors.customer?.firstName}
          helperText={errors.customer?.firstName?.message}
          {...register('customer.firstName')}
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
          label={translateUi('ui.sections.ecommerce.customer.checkout.last_name_b649dc90')}
          variant="filled"
          error={!!errors.customer?.lastName}
          helperText={errors.customer?.lastName?.message}
          {...register('customer.lastName')}
        />
      </Grid>
      <Grid size={12}>
        <Stack direction="row" sx={{ gap: 2 }}>
          <TextField
            disabled
            variant="filled"
            sx={{ maxWidth: 'min-content' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ minWidth: 'unset' }}>
                    <Stack
                      direction="row"
                      sx={{
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <IconifyIcon icon="twemoji:flag-bangladesh" sx={{ fontSize: 24 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        +88
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
            label={translateUi('ui.sections.ecommerce.customer.checkout.phone_number_811a70a5')}
            variant="filled"
            error={!!errors.customer?.phoneNumber}
            helperText={errors.customer?.phoneNumber?.message}
            sx={{ '& input': { direction: 'ltr' } }}
            {...register('customer.phoneNumber')}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CustomerInfo;
