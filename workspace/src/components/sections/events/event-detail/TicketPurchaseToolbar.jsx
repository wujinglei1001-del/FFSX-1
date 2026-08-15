import { useTranslation } from 'react-i18next';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const TicketPurchaseToolbar = ({ onPurchaseClick }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={({ mixins }) => ({
        display: 'flex',
        position: 'sticky',
        zIndex: 999,
        width: 1,
        bottom: 0,
        bgcolor: 'background.menu',
        height: mixins.footer.sm,
      })}
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          px: { xs: 3, md: 5 },
          py: 1,
          maxWidth: 1280,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">10$ - 200$</Typography>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button variant="soft" shape="square" color="neutral">
            <IconifyIcon icon="material-symbols:favorite-outline-rounded" width={20} height={20} />
          </Button>
          <Button variant="contained" onClick={onPurchaseClick}>
            {translateUi('ui.sections.events.event_detail.ticketpurchasetoolbar.purchase_160f06d4')}
          </Button>
        </Stack>
      </Container>
    </Paper>
  );
};

export default TicketPurchaseToolbar;
