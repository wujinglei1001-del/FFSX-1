import { Divider, Stack, Tooltip } from '@mui/material';
import { initialConfig } from 'config';
import { cssVarRgba } from 'lib/utils';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { darkShadows } from 'theme/shadows';
import Image from 'components/base/Image';

const techLogos = [
  { src: `${initialConfig.assetsDir}/images/logo/12.svg`, title: 'JavaScript' },
  { src: `${initialConfig.assetsDir}/images/logo/13.svg`, title: 'TypeScript' },
  { src: `${initialConfig.assetsDir}/images/logo/14.svg`, title: 'Figma' },
  {
    src: `${initialConfig.assetsDir}/images/logo/15.svg`,
    get title() {
      return i18n.t('ui.sections.showcase.hero.techstack.vite_47e69e75');
    },
  },
];

const mainTechs = [
  {
    src: `${initialConfig.assetsDir}/images/logo/16.svg`,
    get title() {
      return i18n.t('ui.sections.showcase.hero.techstack.nextjs_16_a94cc4a6');
    },
  },
  {
    src: `${initialConfig.assetsDir}/images/logo/17.svg`,
    get title() {
      return i18n.t('ui.sections.showcase.hero.techstack.react_19_d39c9c67');
    },
  },
  {
    src: `${initialConfig.assetsDir}/images/logo/18.svg`,
    get title() {
      return i18n.t('ui.sections.showcase.hero.techstack.mui_v9_6d4e79dd');
    },
  },
];

const TechStack = () => {
  const { up } = useBreakpoints();
  const size = up('sm') ? 30 : 22;

  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" />}
      sx={({ vars }) => ({
        bgcolor: cssVarRgba(vars.palette.common.whiteChannel, 0.04),
        borderRadius: 3.5,
        p: 2,
        gap: { xs: 1, sm: 2 },
        boxShadow: darkShadows[0],
      })}
    >
      <Stack
        direction="row"
        sx={{
          gap: { xs: 1, sm: 1.5 },
        }}
      >
        {techLogos.map(({ src, title }) => (
          <Tooltip key={title} title={title} placement="top">
            <Image src={src} width={size} height={size} />
          </Tooltip>
        ))}
      </Stack>
      {mainTechs.map(({ src, title }) => (
        <Tooltip key={title} title={title} placement="top">
          <Image src={src} height={size} />
        </Tooltip>
      ))}
    </Stack>
  );
};

export default TechStack;
