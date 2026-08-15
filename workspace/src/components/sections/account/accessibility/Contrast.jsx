import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import ThemeSwitcher from './ThemeSwitcher';

const Contrast = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ gap: 1, mb: 5 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
        {translateUi('ui.sections.account.accessibility.contrast.themes_94d5186b')}
      </Typography>
      <ThemeSwitcher />
    </Stack>
  );
};

export default Contrast;
