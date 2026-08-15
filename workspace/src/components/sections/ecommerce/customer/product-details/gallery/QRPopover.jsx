import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Popover, popoverClasses } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const QRPopover = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleQRClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleQRClose = () => {
    setAnchorEl(null);
  };

  const isQROpen = Boolean(anchorEl);
  const QRId = isQROpen ? 'qr-popover' : undefined;

  return (
    <>
      <Button
        variant="soft"
        color="neutral"
        size="small"
        startIcon={
          <IconifyIcon icon="material-symbols:qr-code-scanner-rounded" fontSize="18px !important" />
        }
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
        onClick={handleQRClick}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.try_in_your_room_54e838d5')}
      </Button>
      <Popover
        id={QRId}
        open={isQROpen}
        anchorEl={anchorEl}
        onClose={handleQRClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            borderRadius: 4,
            p: 3,
          },
        }}
      >
        <Image
          src={`${assetsDir}/images/ecommerce/misc/1.webp`}
          alt={translateUi('ui.sections.ecommerce.customer.product_details.themewagon_qr_ec4c6a54')}
          sx={{ width: 164, display: 'block' }}
        />
      </Popover>
    </>
  );
};

export default QRPopover;
