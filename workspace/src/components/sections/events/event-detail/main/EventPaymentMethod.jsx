import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
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

const paymentMethods = [
  {
    id: 'card',
    icon: 'material-symbols:credit-card-outline',
    get title() {
      return i18n.t('ui.sections.events.event_detail.main.pay_via_card_dbb485c3');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.events.event_detail.main.pay_with_your_debit_or_credit_card_89ccb9b6',
      );
    },
  },
  {
    id: 'cod',
    icon: 'material-symbols:payments-outline-rounded',
    get title() {
      return i18n.t('ui.sections.events.event_detail.main.cash_on_delivery_eda24c69');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.events.event_detail.main.pay_when_you_receive_your_product_a1d752d8',
      );
    },
  },
];
export const EventPaymentMethodSchema = yup.object().shape({
  method: yup
    .string()
    .oneOf(
      ['cod', 'card', 'bkash'],
      i18n.t('ui.sections.events.event_detail.main.please_select_a_valid_payment_method_e5cb14f0'),
    )
    .required(i18n.t('ui.sections.events.event_detail.main.this_field_is_required_dedbaded')),
  cardDetails: yup
    .object({
      cardNumber: yup
        .string()
        .required(i18n.t('ui.sections.events.event_detail.main.this_field_is_required_dedbaded')),
      name: yup
        .string()
        .required(i18n.t('ui.sections.events.event_detail.main.this_field_is_required_dedbaded')),
      expiryDate: yup
        .string()
        .required(i18n.t('ui.sections.events.event_detail.main.this_field_is_required_dedbaded')),
      cvc: yup
        .string()
        .required(i18n.t('ui.sections.events.event_detail.main.this_field_is_required_dedbaded')),
    })
    .nullable()
    .when('method', {
      is: 'card',
      then: (schema) => schema.required(),
      otherwise: (schema) =>
        schema
          .nullable()
          .notRequired()
          .transform(() => null),
    }),
});
const EventPaymentMethod = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const method = useWatch({ control, name: 'method' });
  const {
    config: { assetsDir },
  } = useSettingsContext();
  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.5 }}>
          {translateUi(
            'ui.sections.events.event_detail.main.please_choose_a_payment_method_1e12d895',
          )}
        </Typography>

        <Controller
          rules={{ required: true }}
          name="method"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} value={field.value || 'card'}>
              <List
                disablePadding
                dense
                sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}
              >
                {paymentMethods.map(({ id, icon, title, subtitle }) => (
                  <ListItem
                    key={id}
                    sx={{
                      cursor: 'pointer',
                      py: 2,
                      px: 4,
                      bgcolor: field.value === id ? 'primary.lighter' : 'background.elevation2',
                      borderRadius: 12,
                      gap: 3,
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
                    <Radio checked={field.value === id} />
                  </ListItem>
                ))}
              </List>
            </RadioGroup>
          )}
        />
      </Box>
      {method === 'card' && (
        <Grid container rowSpacing={3} columnSpacing={1} sx={{ mb: 5, pb: '1px' }}>
          <Grid size={12}>
            <Stack
              direction="row"
              sx={{
                gap: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {translateUi('ui.sections.events.event_detail.main.supported_cards_7ccc3a06')}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  gap: 1,
                }}
              >
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
              label={translateUi('ui.sections.events.event_detail.main.card_number_6747e707')}
              type="text"
              variant="filled"
              error={!!errors.cardDetails?.cardNumber}
              helperText={errors.cardDetails?.cardNumber?.message}
              {...register('cardDetails.cardNumber')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.events.event_detail.main.full_name_eeb69208')}
              type="text"
              variant="filled"
              error={!!errors.cardDetails?.name}
              helperText={errors.cardDetails?.name?.message}
              {...register('cardDetails.name')}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              control={control}
              name="cardDetails.expiryDate"
              render={({ field: { onChange } }) => (
                <DateField
                  fullWidth
                  label={translateUi('ui.sections.events.event_detail.main.expiry_date_6b440cd5')}
                  format="MM/YY"
                  onChange={(date) => onChange(date?.format('MM/YY'))}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="CVC"
              type="text"
              variant="filled"
              error={!!errors.cardDetails?.cvc}
              helperText={errors.cardDetails?.cvc?.message}
              {...register('cardDetails.cvc')}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default EventPaymentMethod;
