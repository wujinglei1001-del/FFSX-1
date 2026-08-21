import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';

const PricingHeader = ({ isYearly, handleSwitchChange, onButtonChange, displayMode }) => {
  const { t: translateUi } = useTranslation();
  const renderPricingSwitch = (
    <Stack direction="row" sx={{ gap: 1, alignSelf: { xs: 'flex-start', lg: 'flex-end' } }}>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {translateUi('ui.sections.pricing.pricingheader.monthly_pricing_7749a476')}
      </Typography>
      <Switch checked={isYearly} onChange={handleSwitchChange} />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
        }}
      >
        {translateUi('ui.sections.pricing.pricingheader.annual_pricing_1a5ea46f')}
      </Typography>
    </Stack>
  );

  const renderPricingButtons = (
    <Stack direction="row" sx={{ gap: { xs: 1, sm: 2 }, alignSelf: 'flex-end', width: 1 }}>
      <Button
        fullWidth
        variant="soft"
        size="large"
        color={isYearly ? 'primary' : 'neutral'}
        onClick={() => onButtonChange?.(true)}
      >
        {translateUi('ui.sections.pricing.pricingheader.yearly_7622eb5a')}
      </Button>{' '}
      <Button
        fullWidth
        variant="soft"
        size="large"
        color={!isYearly ? 'primary' : 'neutral'}
        onClick={() => onButtonChange?.(false)}
      >
        {translateUi('ui.sections.pricing.pricingheader.monthly_d31edb7b')}
      </Button>
    </Stack>
  );

  return (
    <Stack
      direction={{ xs: 'column', lg: displayMode === 'column' ? 'row' : 'column' }}
      sx={{
        px: { xs: 3, md: 5 },
        pt: { xs: 3, md: 5 },
        pb: 5,
        justifyContent: 'space-between',
        rowGap: { xs: 3, lg: 6 },
        columnGap: { xs: 3, lg: 0 },
      }}
    >
      <Box sx={{ maxWidth: 510 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ gap: 2, mb: 3, alignItems: { xs: 'flex-start', sm: 'center' } }}
        >
          <Typography variant="h4">
            {translateUi('ui.sections.pricing.pricingheader.pricing_options_11f37114')}
          </Typography>
          <Chip
            label={translateUi('ui.sections.pricing.pricingheader.free_for_30_days_e546f0e2')}
            variant="soft"
            color="warning"
          />
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi(
            'ui.sections.pricing.pricingheader.get_the_power_control_and_customization_you_need_to__0319e14f',
          )}
        </Typography>

        <Link href={paths.landingContact}>
          {translateUi('ui.sections.pricing.pricingheader.have_questions_chat_with_us_1eb18566')}
        </Link>
      </Box>
      {displayMode === 'column' ? renderPricingSwitch : renderPricingButtons}
    </Stack>
  );
};

export default PricingHeader;
