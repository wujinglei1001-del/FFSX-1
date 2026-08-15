import { useTranslation } from 'react-i18next';
import { Stack, Switch, Typography, switchClasses } from '@mui/material';
import { cssVarRgba } from 'lib/utils';

const SectionModeToggle = ({ checked, onChange }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 700 }}>
        {translateUi('ui.sections.showcase.common.sectionmodetoggle.light_a36ef8ab')}
      </Typography>
      <Switch
        disableRipple
        checked={checked}
        onChange={onChange}
        sx={{
          [`& .${switchClasses.thumb}`]: {
            bgcolor: ({ vars }) => cssVarRgba(vars.palette.common.whiteChannel, 0.16),
          },
          [`& .${switchClasses.track}`]: {
            bgcolor: ({ vars }) => `${cssVarRgba(vars.palette.grey['950Channel'], 0.8)} !important`,
          },
          position: 'relative',
          overflow: 'visible',
          zIndex: 1,

          '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #ffffff10, #ffffff60)',
          },
        }}
      />
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: 'common.white',
        }}
      >
        {translateUi('ui.sections.showcase.common.sectionmodetoggle.dark_ae1ef014')}
      </Typography>
    </Stack>
  );
};

export default SectionModeToggle;
