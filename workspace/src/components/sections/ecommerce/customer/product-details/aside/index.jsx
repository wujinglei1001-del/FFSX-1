import { useTranslation } from 'react-i18next';
import { Link, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Colors from './Colors';
import Materials from './Materials';
import OrderCustomization from './OrderCustomization';
import Price from './Price';
import PurchaseDetails from './PurchaseDetails';
import Quantity from './Quantity';

const ProductDetailsAside = ({ selectedVariantKey, handleSelectedVariantKey }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper>
      <Grid container>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 12,
            xl: 6,
          }}
        >
          <Price sx={{ height: 1 }} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 12,
            xl: 6,
          }}
        >
          <Quantity sx={{ height: 1 }} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 12,
          }}
        >
          <Colors
            sx={{ height: 1 }}
            selectedVariantKey={selectedVariantKey}
            handleSelectedVariantKey={handleSelectedVariantKey}
          />
        </Grid>
        <Grid size={12}>
          <Materials />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 12,
          }}
        >
          <PurchaseDetails sx={{ height: 1 }} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 12,
          }}
        >
          <OrderCustomization sx={{ height: 1 }} />
        </Grid>
        <Grid size={12}>
          <Paper sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" sx={{ gap: 3 }}>
              <IconifyIcon
                icon="material-symbols:verified-user-outline-rounded"
                sx={{ fontSize: 32, color: 'success.main' }}
              />
              <div>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {translateUi(
                    'ui.sections.ecommerce.customer.product_details.10_year_limited_warranty_989955bc',
                  )}
                </Typography>
                <Link href={paths.landingFaq} variant="subtitle2">
                  {translateUi(
                    'ui.sections.ecommerce.customer.product_details.terms_and_conditions_applicable_25cc1be2',
                  )}
                </Link>
              </div>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetailsAside;
