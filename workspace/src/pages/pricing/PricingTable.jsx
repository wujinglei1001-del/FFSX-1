import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Link, Typography } from '@mui/material';
import PricingHeader from 'components/sections/pricing/PricingHeader';
import PricingTableContent from 'components/sections/pricing/table/PricingTableContent';
import paths from 'routes/paths';

const PricingTable = () => {
  const { t: translateUi } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);

  const handleButtonChange = (value) => {
    setIsYearly(value);
  };

  return (
    <div>
      <PricingHeader isYearly={isYearly} onButtonChange={handleButtonChange} displayMode="table" />
      <PricingTableContent isYearly={isYearly} />
      <Box sx={{ my: 5, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {translateUi('ui.pages.pricing.pricingtable.confused_still_882d7b8d')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 400,
          }}
        >
          {translateUi('ui.pages.pricing.pricingtable.try_the_113c4f19')}
          <Link href={paths.zitadelSignup}>
            {translateUi('ui.pages.pricing.pricingtable.basic_version_of_ffax_41f5188b')}
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default PricingTable;
