import { useTranslation } from 'react-i18next';
import { Box, TextField, Typography, inputBaseClasses } from '@mui/material';

const AdditionalDetails = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.create_order.additional_details_ab6ed1e3')}
      </Typography>
      <TextField
        fullWidth
        id="productWarnings"
        type="text"
        label={translateUi('ui.sections.ecommerce.admin.create_order.product_warnings_e012acf9')}
        variant="filled"
        multiline
        rows={2}
        sx={{ mb: 2, [`& .${inputBaseClasses.input}`]: { pt: 0 } }}
      />
      <TextField
        fullWidth
        id="checkoutAlerts"
        type="text"
        label={translateUi('ui.sections.ecommerce.admin.create_order.checkout_alerts_de6db6ec')}
        variant="filled"
      />
    </Box>
  );
};

export default AdditionalDetails;
