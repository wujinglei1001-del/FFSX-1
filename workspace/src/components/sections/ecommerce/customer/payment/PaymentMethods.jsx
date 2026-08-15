import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DateField } from '@mui/x-date-pickers';
import i18n from 'locales/i18n';
import { useSettingsContext } from 'providers/SettingsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const paymentMethodsSchema = yup
  .object({
    method: yup
      .string()
      .oneOf(
        ['cod', 'card', 'bkash'],
        i18n.t(
          'ui.sections.ecommerce.customer.payment.please_select_a_valid_payment_method_e5cb14f0',
        ),
      )
      .required(i18n.t('ui.sections.ecommerce.customer.payment.this_field_is_required_dedbaded')),
    cardNumber: yup.string().when('method', {
      is: 'card',
      then: (schema) =>
        schema.required(
          i18n.t('ui.sections.ecommerce.customer.payment.this_field_is_required_dedbaded'),
        ),
    }),
    fullName: yup.string().when('method', {
      is: 'card',
      then: (schema) =>
        schema.required(
          i18n.t('ui.sections.ecommerce.customer.payment.this_field_is_required_dedbaded'),
        ),
    }),
    expiryDate: yup.string().when('method', {
      is: 'card',
      then: (schema) =>
        schema.required(
          i18n.t('ui.sections.ecommerce.customer.payment.this_field_is_required_dedbaded'),
        ),
    }),
    cvc: yup.string().when('method', {
      is: 'card',
      then: (schema) =>
        schema.required(
          i18n.t('ui.sections.ecommerce.customer.payment.this_field_is_required_dedbaded'),
        ),
    }),
  })
  .required();
const paymentMethods = [
  {
    id: 'card',
    icon: 'material-symbols-light:credit-card-outline',
    get title() {
      return i18n.t('ui.sections.ecommerce.customer.payment.pay_via_card_dbb485c3');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.ecommerce.customer.payment.pay_with_your_debit_or_credit_card_89ccb9b6',
      );
    },
  },
  {
    id: 'cod',
    icon: 'material-symbols-light:payments-outline-rounded',
    get title() {
      return i18n.t('ui.sections.ecommerce.customer.payment.cash_on_delivery_eda24c69');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.ecommerce.customer.payment.pay_when_you_receive_your_product_a1d752d8',
      );
    },
  },
];
const PaymentMethods = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  const methods = useForm({
    resolver: yupResolver(paymentMethodsSchema),
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;
  const values = useWatch({ control });
  const onSubmit = (data) => {
    const { method, ...rest } = data;
    const filteredData = method === 'card' ? { method, ...rest } : { method };
    console.log(filteredData);
    methods.reset();
  };
  return (
    <Box component="form" id="paymentForm" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi(
          'ui.sections.ecommerce.customer.payment.please_choose_a_payment_method_1e12d895',
        )}
      </Typography>
      <Box
        sx={{
          mb: 5,
        }}
      >
        <Controller
          rules={{ required: true }}
          name="method"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} value={field.value || ''}>
              <List dense>
                {paymentMethods.map(({ id, icon, title, subtitle }) => (
                  <ListItem
                    key={id}
                    sx={{
                      cursor: 'pointer',
                      py: 2,
                      px: 4,
                      bgcolor: field.value === id ? 'primary.lighter' : 'background.elevation2',
                      borderRadius: 12,
                      mb: 2,
                      gap: 2,
                      '&:last-of-type': { mb: 0 },
                    }}
                    onClick={() => field.onChange(id)}
                  >
                    <IconifyIcon icon={icon} color="primary.dark" fontSize={38} />
                    <ListItemText
                      primary={title}
                      secondary={subtitle}
                      slotProps={{
                        primary: {
                          sx: {
                            fontWeight: 700,
                            fontSize: '16px !important',
                          },
                        },
                        secondary: {
                          sx: {
                            fontSize: '12px !important',
                          },
                        },
                      }}
                    />
                    <FormControlLabel
                      control={<Radio checked={field.value === id} />}
                      value={id}
                      label=""
                      sx={{ m: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            </RadioGroup>
          )}
        />
      </Box>
      {values.method === 'card' && (
        <Grid
          container
          spacing={3}
          sx={{
            mb: 7,
          }}
        >
          <Grid size={12}>
            <Stack direction="row" sx={{ gap: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                }}
              >
                {translateUi('ui.sections.ecommerce.customer.payment.supported_cards_7ccc3a06')}
              </Typography>
              <Stack direction="row" sx={{ gap: 1 }}>
                <Image src={`${assetsDir}/images/logo/10.svg`} height={24} />
                <Image src={`${assetsDir}/images/logo/9.svg`} height={24} />
                <Image src={`${assetsDir}/images/logo/8.svg`} height={24} />
                <Image src={`${assetsDir}/images/logo/7.svg`} height={24} />
              </Stack>
            </Stack>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="cardNumber"
              label={translateUi('ui.sections.ecommerce.customer.payment.card_number_6747e707')}
              type="text"
              variant="filled"
              error={!!errors.cardNumber}
              helperText={errors.cardNumber?.message}
              {...register('cardNumber')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="fullName"
              label={translateUi('ui.sections.ecommerce.customer.payment.full_name_eeb69208')}
              type="text"
              variant="filled"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register('fullName')}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="expiryDate"
              render={({ field: { onChange } }) => (
                <DateField
                  fullWidth
                  label={translateUi('ui.sections.ecommerce.customer.payment.expiry_date_6b440cd5')}
                  format="MM/YY"
                  onChange={(date) => onChange(date?.format('MM/YY'))}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="cvc"
              control={control}
              defaultValue=""
              render={({ field: { onChange, ...rest } }) => (
                <TextField
                  fullWidth
                  label="CVC"
                  variant="filled"
                  error={!!errors.cvc}
                  helperText={errors.cvc?.message}
                  slotProps={{
                    htmlInput: {
                      maxLength: 3,
                    },
                  }}
                  {...rest}
                  onChange={(e) => {
                    if (/^\d{0,3}$/.test(e.target.value)) {
                      onChange(e);
                    } else {
                      onChange('');
                    }
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default PaymentMethods;
