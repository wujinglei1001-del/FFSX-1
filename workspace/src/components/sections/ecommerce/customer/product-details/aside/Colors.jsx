import { useTranslation } from 'react-i18next';
import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  toggleButtonClasses,
} from '@mui/material';
import { productColorVariants } from 'data/e-commerce/products';

const Colors = ({ selectedVariantKey, handleSelectedVariantKey, sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, ...sx }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.available_in_32051b38')}
      </Typography>
      <ToggleButtonGroup
        value={selectedVariantKey}
        exclusive
        onChange={(_, value) => handleSelectedVariantKey(value)}
        aria-label={translateUi(
          'ui.sections.ecommerce.customer.product_details.product_color_selection_fdfa94fc',
        )}
        sx={{
          gap: { xs: 2, sm: 3 },
          bgcolor: 'transparent',
          [`& .${toggleButtonClasses.root}`]: {
            border: (theme) => `2px solid ${theme.vars.palette.background.default} !important`,
          },
        }}
      >
        {productColorVariants.map(({ id, name, color }) => (
          <ToggleButton
            key={id}
            value={id}
            aria-label={name}
            sx={{
              height: 56,
              width: 56,
              borderRadius: '8px !important',
              boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.divider}`,
              [`&, &:hover, &.${toggleButtonClasses.selected}, &.${toggleButtonClasses.selected}:hover`]:
                { bgcolor: `${color} !important` },
              [`&.${toggleButtonClasses.selected}`]: {
                boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.primary.main}`,
              },
            }}
          />
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};

export default Colors;
