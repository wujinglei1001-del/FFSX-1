import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Stack, Tab, Tabs, Typography, tabsClasses } from '@mui/material';
import { useThemeMode } from 'hooks/useThemeMode';
import { basic, grey } from 'theme/colors/base';
import IconifyIcon from 'components/base/IconifyIcon';

const ThemeSwitcher = () => {
  const { t: translateUi } = useTranslation();
  const { setThemePreset, isDark } = useThemeMode();
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="contrast"
        render={({ field }) => (
          <Tabs
            sx={{
              [`& .${tabsClasses.indicator}`]: {
                display: 'none',
              },
              [`& .${tabsClasses.list}`]: {
                gap: 2,
              },
            }}
            value={field.value === 'dark' ? 'default-dark' : 'default-light'}
            onBlur={field.onBlur}
            onChange={(_event, newValue) => {
              const contrastValue = newValue === 'default-dark' ? 'dark' : 'light';
              field.onChange(contrastValue);
              setThemePreset(newValue);
            }}
          >
            <Tab
              value="default-light"
              disableRipple
              sx={(theme) => ({
                flexDirection: 'row',
                gap: 2,
                borderRadius: 2,
                bgcolor: basic.white,
                border: '1px solid',
                ...theme.applyStyles('dark', {
                  border: 0,
                }),
              })}
              label={
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      color: grey[800],
                    }}
                  >
                    {translateUi('ui.sections.account.accessibility.themeswitcher.aa_2c419ecc')}
                  </Typography>
                  <Stack
                    component={Paper}
                    background={2}
                    variant="elevation"
                    elevation={0}
                    direction="column-reverse"
                    sx={{
                      alignItems: 'center',
                      width: 64,
                      height: 72,
                      p: 1,
                      border: '0 !important',
                      boxShadow: 'none !important',
                      bgcolor: `${grey[100]} !important`,
                    }}
                  >
                    <Box
                      sx={{ width: 23, height: 8, bgcolor: 'primary.main', borderRadius: 0.5 }}
                    />
                  </Stack>

                  {!isDark && (
                    <IconifyIcon
                      icon="material-symbols:check-circle-rounded"
                      sx={{
                        color: 'primary.main',
                        fontSize: 24,
                        position: 'absolute',
                        top: 5,
                        right: 5,
                      }}
                    />
                  )}
                </>
              }
            />
            <Tab
              value="default-dark"
              disableRipple
              sx={(theme) => ({
                flexDirection: 'row',
                gap: 2,
                bgcolor: grey[950],
                borderRadius: 2,
                border: 0,
                ...theme.applyStyles('dark', {
                  border: '1px solid',
                }),
              })}
              label={
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      color: grey[100],
                    }}
                  >
                    {translateUi('ui.sections.account.accessibility.themeswitcher.aa_2c419ecc')}
                  </Typography>
                  <Stack
                    component={Paper}
                    background={2}
                    variant="elevation"
                    elevation={0}
                    direction="column-reverse"
                    sx={{
                      alignItems: 'center',
                      width: 64,
                      height: 72,
                      p: 1,
                      border: '0 !important',
                      boxShadow: 'none !important',
                      bgcolor: `${grey[800]} !important`,
                    }}
                  >
                    <Box
                      sx={{ width: 23, height: 8, bgcolor: 'primary.main', borderRadius: 0.5 }}
                    />
                  </Stack>

                  {isDark && (
                    <IconifyIcon
                      icon="material-symbols:check-circle-rounded"
                      sx={{
                        color: 'primary.main',
                        fontSize: 24,
                        position: 'absolute',
                        top: 5,
                        right: 5,
                      }}
                    />
                  )}
                </>
              }
            />
          </Tabs>
        )}
      />
      <Stack direction="row" sx={{ gap: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ minWidth: 116, fontWeight: 400, color: 'text.secondary' }}
        >
          {translateUi('ui.sections.account.accessibility.themeswitcher.light_a36ef8ab')}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ minWidth: 116, fontWeight: 400, color: 'text.secondary' }}
        >
          {translateUi('ui.sections.account.accessibility.themeswitcher.dark_ae1ef014')}
        </Typography>
      </Stack>
    </>
  );
};
export default ThemeSwitcher;
