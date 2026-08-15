import { useTranslation } from 'react-i18next';
import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';

const Address = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 5,
        p: { xs: 3, md: 5 },
      }}
    >
      <div>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          {translateUi('ui.sections.ecommerce.admin.create_order.1_shipping_address_0833d141')}
        </Typography>
        <Stack sx={{ gap: 2 }}>
          <Stack sx={{ gap: 1 }}>
            <TextField
              fullWidth
              id="streetAddress"
              type="text"
              label={translateUi(
                'ui.sections.ecommerce.admin.create_order.street_address_497a500a',
              )}
            />
            <TextField
              fullWidth
              id="townCity"
              type="text"
              label={translateUi('ui.sections.ecommerce.admin.create_order.town_city_51d6d30f')}
            />
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <TextField
              fullWidth
              id="postCode"
              type="text"
              label={translateUi('ui.sections.ecommerce.admin.create_order.postcode_ef4d9e99')}
            />
            <TextField
              fullWidth
              id="country"
              type="text"
              label={translateUi('ui.sections.ecommerce.admin.create_order.country_d523ebbd')}
            />
            <TextField
              fullWidth
              id="state"
              type="text"
              label={translateUi('ui.sections.ecommerce.admin.create_order.state_a7250206')}
            />
          </Stack>
        </Stack>
      </div>
      <div>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi('ui.sections.ecommerce.admin.create_order.1_billing_address_ef220ca5')}
          </Typography>

          <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
            {translateUi('ui.sections.ecommerce.admin.create_order.edit_5301648d')}
          </Button>
        </Stack>
        <FormControlLabel
          control={<Checkbox />}
          label={translateUi(
            'ui.sections.ecommerce.admin.create_order.same_as_shipping_address_1fba3432',
          )}
        />
      </div>
    </Stack>
  );
};

export default Address;
