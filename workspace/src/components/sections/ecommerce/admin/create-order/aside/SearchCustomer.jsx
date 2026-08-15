import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import SearchTextField from 'components/common/SearchTextField';

const SearchCustomer = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        width: 1,
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
        {translateUi(
          'ui.sections.ecommerce.admin.create_order.search_or_create_a_customer_f0fef194',
        )}
      </Typography>
      <SearchTextField
        fullWidth
        variant="filled"
        label={translateUi('ui.sections.ecommerce.admin.create_order.search_with_name_cf41aa9b')}
      />
    </Box>
  );
};

export default SearchCustomer;
