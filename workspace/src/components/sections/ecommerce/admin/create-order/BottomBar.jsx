import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';

const BottomBar = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      background={1}
      sx={(theme) => ({
        display: 'flex',
        position: 'sticky',
        zIndex: 10,
        bottom: 0,
        px: { xs: 3, md: 5 },
        height: theme.mixins.footer.sm,
        justifyContent: 'flex-end',
      })}
    >
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignSelf: 'center',
        }}
      >
        <Button type="button" variant="soft" color="neutral">
          {translateUi('ui.sections.ecommerce.admin.create_order.save_draft_cc1316dd')}
        </Button>
        <Button type="button" variant="contained">
          {translateUi('ui.sections.ecommerce.admin.create_order.create_order_0289c84e')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default BottomBar;
