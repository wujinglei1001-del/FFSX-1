import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import { StripedBackground } from '../../../common/StripedBackground';
import { BentoCardHeader } from './BentoCard';

const ModernUI = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      component={StripedBackground}
      fadeWidth="0%"
      sx={{
        gap: { xs: 2, md: 4 },
        height: 1,
      }}
    >
      <BentoCardHeader
        title={translateUi(
          'ui.sections.landing.homepage.features.modern_and_beautiful_ui_8b1d37e1',
        )}
        subtitle={translateUi(
          'ui.sections.landing.homepage.features.create_stunning_websites_e592584c',
        )}
        sx={{ pt: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}
      />
      <Box
        sx={{
          p: 2,
          borderRadius: 2.5,
          bgcolor: 'menu',
          mb: -2,
          mx: { xs: 2, md: 3 },
          zIndex: 0,
        }}
      >
        <Stack
          sx={{
            gap: 1.5,
          }}
        >
          <Stack
            sx={{
              gap: 1,
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {translateUi('ui.sections.landing.homepage.features.birthday_a6b9d69f')}
              </Typography>
              <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 14 }} />
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: 13,
                lineClamp: 2,
              }}
            >
              {translateUi(
                'ui.sections.landing.homepage.features.provide_your_birthday_to_ensure_you_get_the_right_co_c12c2030',
              )}
            </Typography>
          </Stack>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 0.75,
              }}
            >
              <FormControl size="small" fullWidth>
                <InputLabel id="date-label">
                  {translateUi('ui.sections.landing.homepage.features.date_eb9a4bc1')}
                </InputLabel>
                <Select
                  labelId="date-label"
                  id="date"
                  label={translateUi('ui.sections.landing.homepage.features.date_eb9a4bc1')}
                  disabled
                  value=""
                />
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel id="month-label">
                  {translateUi('ui.sections.landing.homepage.features.month_082bc378')}
                </InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  label={translateUi('ui.sections.landing.homepage.features.month_082bc378')}
                  disabled
                  value=""
                />
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel id="year-label">
                  {translateUi('ui.sections.landing.homepage.features.year_879e3232')}
                </InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  label={translateUi('ui.sections.landing.homepage.features.date_eb9a4bc1')}
                  disabled
                  value=""
                />
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              sx={{
                gap: 0.75,
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="soft" color="neutral">
                {translateUi('ui.sections.landing.homepage.features.discard_36fff63c')}
              </Button>
              <Button variant="contained">
                {translateUi('ui.sections.landing.homepage.features.confirm_04a21221')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
export default ModernUI;
