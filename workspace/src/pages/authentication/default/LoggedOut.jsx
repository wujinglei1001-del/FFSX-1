import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { authPaths } from 'routes/paths';

const LoggedOut = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        flex: 1,
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: 4, md: 10 },
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }} />
      <Box sx={{ maxWidth: 370 }}>
        <Typography variant="h4">
          {translateUi(
            'ui.pages.authentication.default.loggedout.you_have_been_logged_out_9b572515',
          )}
        </Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {translateUi('ui.pages.authentication.default.loggedout.see_you_soon_05204645')}
        </Typography>
        <Typography sx={{ mb: 6 }}>
          {translateUi(
            'ui.pages.authentication.default.loggedout.we_are_sad_to_see_you_go_away_but_hey_you_can_log_ba_04afaac9',
          )}
        </Typography>
        <Button variant="contained" href={authPaths.login} color="primary" fullWidth>
          {translateUi('ui.pages.authentication.default.loggedout.log_back_in_153267a6')}
        </Button>
      </Box>
      <Box />
    </Stack>
  );
};

export default LoggedOut;
