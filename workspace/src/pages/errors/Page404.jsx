import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import animation404Dark from 'assets/json/404-dark.json';
import animation404 from 'assets/json/404.json';
import { useThemeMode } from 'hooks/useThemeMode';
import Lottie from 'lottie-react';
import paths from 'routes/paths';

const Page404 = () => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: { xs: 2.5, sm: 5 },
      }}
    >
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            mb: 10,
            width: {
              xs: 300,
              sm: 500,
              md: 800,
              lg: 1046,
            },
            height: 'auto',
          }}
        >
          <Lottie
            animationData={isDark ? animation404Dark : animation404}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'text.disabled',
              fontWeight: 'medium',
              mb: 2,
            }}
          >
            {translateUi('ui.pages.errors.page404.page_not_found_bc3023b3')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 'normal',
              mb: 5,
            }}
          >
            {translateUi('ui.pages.errors.page404.no_worries_let_s_take_you_back_fd551e2c')}{' '}
            <Box
              component="br"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            />
            {translateUi('ui.pages.errors.page404.while_our_bear_is_searching_everywhere_1fb7d139')}
          </Typography>

          <Button variant="contained" href={paths.ecommerce} size="large" sx={{ px: 7 }}>
            {translateUi('ui.pages.errors.page404.go_back_home_2de04546')}{' '}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Page404;
