import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  chipClasses,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import NumberTextField from 'components/base/NumberTextField';
import StyledTextField from 'components/styled/StyledTextField';

const TicketPrice = ({ handleClose }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'ticketPricing.options',
  });

  const ticketType = useWatch({
    control,
    name: 'ticketPricing.ticketType',
  });

  const handleTicketTypeChange = (value) => {
    if (value === 'free') {
      replace([]);
    } else if (fields.length === 0) {
      append({
        name: '',
        price: undefined,
        noOfTickets: undefined,
        facilities: ['Club', 'Stadium', 'Arena', 'Pool'],
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h6">
          {translateUi('ui.sections.events.create_event.aside.ticket_price_baf50f96')}
        </Typography>

        {handleClose && (
          <Button shape="circle" variant="soft" color="neutral" onClick={handleClose}>
            <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
          </Button>
        )}
      </Stack>
      <Stack sx={{ gap: 3 }}>
        <Controller
          name="ticketPricing.ticketType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              row
              value={field.value}
              onChange={(e) => {
                const newValue = e.target.value;
                field.onChange(newValue);
                handleTicketTypeChange(newValue);
              }}
            >
              <FormControlLabel
                value="free"
                control={<Radio />}
                label={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 400,
                    }}
                  >
                    {translateUi('ui.sections.events.create_event.aside.free_75f52718')}
                  </Typography>
                }
              />
              <FormControlLabel
                value="paid"
                control={<Radio />}
                label={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 400,
                    }}
                  >
                    {translateUi('ui.sections.events.create_event.aside.paid_dc9d4584')}
                  </Typography>
                }
              />
            </RadioGroup>
          )}
        />

        {ticketType === 'paid' && (
          <Stack sx={{ gap: 3, mb: fields.length > 0 ? 3 : 0 }}>
            {fields.map((item, index) => (
              <Stack
                key={item.id}
                direction="row"
                sx={{ gap: { xs: 1, lg: 2 }, alignItems: 'flex-start' }}
              >
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    type="text"
                    label={translateUi('ui.sections.events.create_event.aside.options_6bf5da9c')}
                    placeholder="VIP"
                    {...register(`ticketPricing.options.${index}.name`)}
                    error={!!errors.ticketPricing?.options?.[index]?.name}
                    helperText={errors.ticketPricing?.options?.[index]?.name?.message}
                  />
                  <Stack direction="row" sx={{ gap: 1 }}>
                    <NumberTextField
                      fullWidth
                      label={translateUi('ui.sections.events.create_event.aside.price_3e8248e3')}
                      placeholder="$0.00"
                      error={!!errors.ticketPricing?.options?.[index]?.price}
                      helperText={errors.ticketPricing?.options?.[index]?.price?.message}
                      {...register(`ticketPricing.options.${index}.price`, {
                        setValueAs: (value) => Number(value),
                      })}
                    />
                    <NumberTextField
                      fullWidth
                      label={translateUi(
                        'ui.sections.events.create_event.aside.no_of_tickets_254a4234',
                      )}
                      error={!!errors.ticketPricing?.options?.[index]?.noOfTickets}
                      helperText={errors.ticketPricing?.options?.[index]?.noOfTickets?.message}
                      {...register(`ticketPricing.options.${index}.noOfTickets`, {
                        setValueAs: (value) => Number(value),
                      })}
                    />
                  </Stack>
                  <Controller
                    name={`ticketPricing.options.${index}.facilities`}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        disableClearable
                        multiple
                        freeSolo
                        value={field.value || []}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        options={[]}
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            error={!!errors.ticketPricing?.options?.[index]?.facilities}
                            helperText={errors.ticketPricing?.options?.[index]?.facilities?.message}
                            sx={{ p: 0 }}
                          />
                        )}
                        sx={{
                          [`& .${chipClasses.label}`]: { overflow: 'visible' },
                        }}
                      />
                    )}
                  />
                </Stack>
                <IconButton color="error" onClick={() => remove(index)}>
                  <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={20} />
                </IconButton>
              </Stack>
            ))}

            {!!errors.ticketPricing?.options && (
              <Typography color="error" variant="body2">
                {errors.ticketPricing?.options.message}
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
      {ticketType === 'paid' && (
        <Button
          onClick={() =>
            append({
              name: '',
              price: 0,
              noOfTickets: 0,
              facilities: ['Club', 'Stadium', 'Arena', 'Pool'],
            })
          }
          color="neutral"
          size="small"
          variant="text"
          startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
        >
          {translateUi('ui.sections.events.create_event.aside.add_another_option_c6f492f1')}
        </Button>
      )}
    </Box>
  );
};

export default TicketPrice;
