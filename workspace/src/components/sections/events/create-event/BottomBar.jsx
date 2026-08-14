import { Button, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const BottomBar = ({ handleAsideOpen }) => {
  return (
    <Paper
      sx={(theme) => ({
        display: 'flex',
        px: { xs: 3, md: 5 },
        bgcolor: 'background.menu',
        height: theme.mixins.footer.sm,
      })}
    >
      <Stack
        direction="row"
        sx={{ flex: 1, gap: 1, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 0.5,
            alignItems: 'center',
          }}
        >
          <IconifyIcon
            icon="material-symbols:info-outline-rounded"
            color="info.main"
            fontSize={18}
          />
          <Typography
            variant="subtitle2"
            sx={{
              color: 'info.main',
              fontWeight: 400,
            }}
          >
            Please provide additional details
          </Typography>
        </Stack>

        <Button
          type="button"
          variant="soft"
          color="neutral"
          onClick={handleAsideOpen}
          endIcon={<IconifyIcon icon="material-symbols:chevron-right-rounded" />}
        >
          Proceed
        </Button>
      </Stack>
    </Paper>
  );
};

export default BottomBar;
