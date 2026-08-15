import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { kebabCase } from 'lib/utils';

const ProductDescription = ({ descriptions }) => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.description_55f8ebc8')}
      </Typography>
      {descriptions.map(({ title, description }) => (
        <Box
          key={kebabCase(title)}
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.5,
              fontWeight: 700,
              mb: 1,
            }}
          >
            {title} :
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default ProductDescription;
