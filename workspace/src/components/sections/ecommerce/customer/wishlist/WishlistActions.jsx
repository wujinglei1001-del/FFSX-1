import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const WishlistActions = () => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const downSm = down('sm');

  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 5,
      }}
    >
      <Button
        variant="soft"
        color="neutral"
        startIcon={<IconifyIcon icon="material-symbols:add-rounded" fontSize="20px !important" />}
      >
        {translateUi('ui.sections.ecommerce.customer.wishlist.invite_people_e1eb97af')}
      </Button>

      <Button
        variant="soft"
        color="neutral"
        sx={{ ml: 'auto' }}
        shape={downSm ? 'square' : undefined}
      >
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          <IconifyIcon icon="material-symbols:share-outline" fontSize={20} />

          {!downSm && 'Share list with others'}
        </Stack>
      </Button>
      <Button variant="soft" color="neutral">
        {translateUi('ui.sections.ecommerce.customer.wishlist.more_4bab2d8f')}
      </Button>
    </Stack>
  );
};

export default WishlistActions;
