import { Box, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={[
          {
            columnGap: 2,
            rowGap: 0.5,
            bgcolor: 'background.default',
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            height: ({ mixins }) => mixins.footer,
            py: 1,
            px: { xs: 3, md: 5 },
            textAlign: { xs: 'center', sm: 'left' },
          },
        ]}
      >
        <Typography
          variant="caption"
          component="p"
          sx={{
            lineHeight: 1.6,
            fontWeight: 'light',
            color: 'text.secondary',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            component="span"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            Thank you for creating with
            <Box
              component="strong"
              sx={{
                mx: 0.5,
              }}
            >
              FFA-X{' '}
            </Box>
          </Box>

          <Box
            component="span"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            <Box
              component="span"
              sx={{
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              |
            </Box>{' '}
            {dayjs().year()} ©
            <Box component="span" sx={{ mx: 0.5 }}>
              FFA-X
            </Box>
          </Box>
        </Typography>

        <Typography
          variant="caption"
          component="p"
          sx={{
            fontWeight: 'light',
            color: 'text.secondary',
          }}
        >
          v{import.meta.env.VITE_APP_VERSION}
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
