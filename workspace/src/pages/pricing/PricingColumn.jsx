import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { pricing } from 'data/pricing';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import PricingHeader from 'components/sections/pricing/PricingHeader';
import PricingCard from 'components/sections/pricing/column/PricingCard';
import PricingCardWide from 'components/sections/pricing/column/PricingCardWide';

const PricingColumn = () => {
  const { t: translateUi } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  const { between } = useBreakpoints();

  const isBetween = between('sm', 'lg');

  const handleSwitchChange = (event) => {
    setIsYearly(event.target.checked);
  };

  return (
    <>
      <PricingHeader
        displayMode="column"
        isYearly={isYearly}
        handleSwitchChange={handleSwitchChange}
      />
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        sx={{ px: { xs: 3, md: 5 }, alignItems: 'center', justifyContent: 'center' }}
      >
        {pricing
          .slice(0, 3)
          .map((item) =>
            isBetween ? (
              <PricingCardWide key={item.id} data={item} isYearly={isYearly} />
            ) : (
              <PricingCard key={item.id} data={item} isYearly={isYearly} />
            ),
          )}
      </Stack>

      <Box sx={{ my: 5 }}>
        <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
          {translateUi('ui.pages.pricing.pricingcolumn.confused_still_882d7b8d')}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          {translateUi('ui.pages.pricing.pricingcolumn.try_the_113c4f19')}
          <Link href="#!">
            {translateUi('ui.pages.pricing.pricingcolumn.basic_version_of_aurora_41f5188b')}
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default PricingColumn;
