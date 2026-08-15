import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  inputBaseClasses,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import InvoiceDetailsFormSections from './InvoiceDetailsFormSections';

const InvoiceDetailsForm = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3} sx={{ width: 1, mb: 5, mt: 4 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <InvoiceDetailsFormSections
          title={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.invoice_details_2325ca61',
          )}
        >
          <Grid container spacing={1} sx={{ width: 1 }}>
            <Grid size={6}>
              <StyledTextField
                type="number"
                placeholder={translateUi(
                  'ui.sections.invoice.create_invoice.invoice_details.invoice_number_254500c3',
                )}
                variant="filled"
                size="large"
                {...register('invoiceDetails.invoiceNumber')}
                error={!!errors.invoiceDetails?.invoiceNumber}
                helperText={errors.invoiceDetails?.invoiceNumber?.message}
                fullWidth
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="invoiceDetails.status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="currencyLabel">
                      {translateUi(
                        'ui.sections.invoice.create_invoice.invoice_details.status_bae7d5be',
                      )}
                    </InputLabel>
                    <Select
                      {...field}
                      id="status"
                      labelId="status"
                      label={translateUi(
                        'ui.sections.invoice.create_invoice.invoice_details.status_bae7d5be',
                      )}
                      error={!!errors.invoiceDetails?.status}
                      fullWidth
                    >
                      <MenuItem value="draft">
                        {translateUi(
                          'ui.sections.invoice.create_invoice.invoice_details.draft_23d33e22',
                        )}
                      </MenuItem>
                      <MenuItem value="sent">
                        {translateUi(
                          'ui.sections.invoice.create_invoice.invoice_details.sent_35f49dcf',
                        )}
                      </MenuItem>
                      <MenuItem value="paid">
                        {translateUi(
                          'ui.sections.invoice.create_invoice.invoice_details.paid_dc9d4584',
                        )}
                      </MenuItem>
                      <MenuItem value="late">
                        {translateUi(
                          'ui.sections.invoice.create_invoice.invoice_details.late_4310ed54',
                        )}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.invoiceDetails?.status && (
                <FormHelperText error sx={{ mx: '14px' }}>
                  {errors.invoiceDetails.status.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </InvoiceDetailsFormSections>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InvoiceDetailsFormSections
          title={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.deadline_2b12f369',
          )}
        >
          <Grid container spacing={1} sx={{ width: 1 }}>
            <Grid size={6}>
              <Controller
                name="deadline.issueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={translateUi(
                      'ui.sections.invoice.create_invoice.invoice_details.issue_date_72072fe9',
                    )}
                    format="DD/MM/YYYY"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toDate() : null);
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.deadline?.issueDate,
                        helperText: errors.deadline?.issueDate?.message,
                      },
                    }}
                    sx={{
                      width: 1,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="deadline.dueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={translateUi(
                      'ui.sections.invoice.create_invoice.invoice_details.due_date_a1b308ec',
                    )}
                    format="DD/MM/YYYY"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue && newValue.toDate());
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.deadline?.dueDate,
                        helperText: errors.deadline?.dueDate?.message,
                      },
                    }}
                    sx={{
                      width: 1,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </InvoiceDetailsFormSections>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InvoiceDetailsFormSections
          title={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.order_charges_6dfc103d',
          )}
        >
          <Grid container spacing={1} sx={{ width: 1 }}>
            <Grid size={6}>
              <Controller
                name="orderCharges.currency"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="currencyLabel">
                      {translateUi(
                        'ui.sections.invoice.create_invoice.invoice_details.currency_e070de22',
                      )}
                    </InputLabel>
                    <Select
                      {...field}
                      id="currency"
                      labelId="currency"
                      label={translateUi(
                        'ui.sections.invoice.create_invoice.invoice_details.currency_e070de22',
                      )}
                      error={!!errors.orderCharges?.currency}
                      fullWidth
                    >
                      <MenuItem value="usd">USD</MenuItem>
                      <MenuItem value="bdt">BDT</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              {errors.orderCharges?.currency && (
                <FormHelperText error sx={{ mx: '14px' }}>
                  {errors.orderCharges.currency.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid size={6}>
              <StyledTextField
                type="number"
                placeholder={translateUi(
                  'ui.sections.invoice.create_invoice.invoice_details.shipping_cost_3ff0465a',
                )}
                variant="filled"
                size="large"
                error={!!errors.orderCharges?.shippingCost}
                helperText={errors.orderCharges?.shippingCost?.message}
                {...register('orderCharges.shippingCost')}
                fullWidth
                slotProps={{
                  input: {
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </InvoiceDetailsFormSections>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InvoiceDetailsFormSections
          title={translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.adjustments_ce5b2f72',
          )}
        >
          <Grid container spacing={1} sx={{ width: 1 }}>
            <Grid size={6}>
              <StyledTextField
                type="number"
                placeholder={translateUi(
                  'ui.sections.invoice.create_invoice.invoice_details.discount_b524936d',
                )}
                variant="filled"
                size="large"
                error={!!errors.adjustment?.discount}
                helperText={errors.adjustment?.discount?.message}
                {...register('adjustment.discount')}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon
                          icon={'material-symbols:percent'}
                          sx={{
                            fontSize: 14,
                            color: 'text.secondary',
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <StyledTextField
                type="number"
                placeholder={translateUi(
                  'ui.sections.invoice.create_invoice.invoice_details.tax_9be70f66',
                )}
                variant="filled"
                size="large"
                error={!!errors.adjustment?.tax}
                helperText={errors.adjustment?.tax?.message}
                {...register('adjustment.tax')}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon
                          icon={'material-symbols:percent'}
                          sx={{
                            fontSize: 14,
                            color: 'text.secondary',
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      [`& .${inputBaseClasses.input}`]: {
                        color: 'text.secondary',
                        padding: '9px 16px !important',
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </InvoiceDetailsFormSections>
      </Grid>
    </Grid>
  );
};
export default InvoiceDetailsForm;
