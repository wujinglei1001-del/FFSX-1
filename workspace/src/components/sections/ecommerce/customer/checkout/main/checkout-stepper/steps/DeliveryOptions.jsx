import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import * as yup from 'yup';

const deliveryOptions = [
  {
    id: 1,
    category: 'Standard DDP',
    estimatedArrival: {
      date: '24-26 feb',
      days: '5-15 days',
    },
    cost: 4.49,
  },
  {
    id: 2,
    category: 'Express DDP',
    estimatedArrival: {
      date: '24-26 feb',
      days: '2-6 days',
    },
    cost: 6.49,
  },
  {
    id: 3,
    category: 'Standard DDU',
    estimatedArrival: {
      date: '24-26 feb',
      days: '5-15 days',
    },
    cost: 5.49,
  },
  {
    id: 4,
    category: 'Express DDU',
    estimatedArrival: {
      date: '24-26 feb',
      days: '2-6 days',
    },
    cost: 10.49,
  },
];

export const deliveryOptionFormSchema = yup
  .object({
    deliveryOption: yup
      .string()
      .required(
        i18n.t('ui.sections.ecommerce.customer.checkout.please_select_a_delivery_option_1537ed83'),
      ),
  })
  .required();

const DeliveryOptions = () => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container sx={{ my: 3 }}>
      <Grid
        sx={{
          display: { xs: 'none', sm: 'block' },
          mb: 3,
        }}
        size={12}
        container
      >
        <Grid container>
          <Grid size={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.checkout.category_a3c686e7')}
            </Typography>
          </Grid>
          <Grid size={5}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.checkout.estimated_arrival_9446222d')}
            </Typography>
          </Grid>
          <Grid sx={{ textAlign: 'end' }} size={3}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.checkout.shipping_cost_3ff0465a')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <FormControl>
          <Controller
            name="deliveryOption"
            control={control}
            render={({ field: { value, ...rest } }) => (
              <RadioGroup value={value || ''} {...rest}>
                <Grid
                  container
                  sx={{
                    rowGap: 1,
                  }}
                >
                  {deliveryOptions.map((option) => (
                    <Grid key={`option-${option.id}`} size={12}>
                      <Box
                        sx={{
                          borderRadius: 4,
                          bgcolor: 'background.elevation1',
                          p: 3,
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            alignItems: 'center',
                            rowGap: 3,
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid
                            size={{
                              xs: 12,
                              sm: 4,
                            }}
                          >
                            <Stack
                              direction="row"
                              sx={{
                                gap: 2,
                                alignItems: 'center',
                              }}
                            >
                              <FormControlLabel
                                value={option.category}
                                control={<Radio />}
                                label={option.category}
                              />
                            </Stack>
                          </Grid>
                          <Grid
                            size={{
                              xs: 'auto',
                              sm: 5,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: 'text.secondary',
                                mb: 1,
                              }}
                            >
                              {translateUi(
                                'ui.sections.ecommerce.customer.checkout.receive_by_743ee91a',
                              )}
                              {option.estimatedArrival.date}
                            </Typography>
                            <Chip
                              label={option.estimatedArrival.days}
                              variant="soft"
                              color="success"
                            />
                          </Grid>
                          <Grid
                            sx={{ textAlign: 'end' }}
                            size={{
                              xs: 'auto',
                              sm: 3,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: 'text.secondary',
                              }}
                            >
                              {currencyFormat(option.cost)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          />
          {errors.deliveryOption && (
            <FormHelperText error>{errors.deliveryOption?.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DeliveryOptions;
