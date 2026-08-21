import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
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
          {translateUi('ffax.auth.logged_out.title')}
        </Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {translateUi('ffax.auth.logged_out.headline')}
        </Typography>
        <Typography sx={{ mb: 6 }}>
          {translateUi('ffax.auth.logged_out.message')}
        </Typography>
        <Button
          component={RouterLink}
          to={authPaths.login}
          variant="contained"
          color="primary"
          fullWidth
        >
          {translateUi('ffax.auth.logged_out.login_again')}
        </Button>
      </Box>
      <Box />
    </Stack>
  );
};

export default LoggedOut;
