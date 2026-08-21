import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Collapse, IconButton, alertClasses } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const PromoAlert = () => {
  const { t: translateUi } = useTranslation();
  const [isAlertOpen, setIsAlertOpen] = useState(true);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <Collapse in={isAlertOpen} data-ffax-color-scheme="light">
      <Alert
        icon={false}
        variant="filled"
        severity="success"
        action={
          <IconButton
            sx={{ color: 'common.white' }}
            aria-label={translateUi('ui.sections.ecommerce.customer.homepage.close_alert_321767fb')}
            edge="start"
            onClick={handleCloseAlert}
          >
            <IconifyIcon icon="material-symbols:close-rounded" fontSize={24} />
          </IconButton>
        }
        sx={{
          px: { xs: 3, md: 5 },
          alignItems: 'center',
          borderRadius: 0,
          [`& .${alertClasses.message}`]: {
            fontWeight: 700,
            color: 'common.white',
            fontSize: { xs: 18, sm: 21 },
          },
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.homepage.get_20_off_in_your_first_699754df')}{' '}
        <Box
          component="span"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.homepage.purchase_d376ca29')}
          <Button color="neutral" variant="contained" sx={{ ml: 2 }}>
            {translateUi('ui.sections.ecommerce.customer.homepage.sign_up_0b81497c')}
          </Button>
        </Box>
      </Alert>
    </Collapse>
  );
};

export default PromoAlert;
