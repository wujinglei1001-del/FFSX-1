import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';
import RevealItems from '../common/RevealItems';

const Hero = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mt: 0,
        pt: { xs: 7, sm: 9 },
        pb: { xs: 5, sm: 10.5 },
        px: { xs: 3, md: 5 },
        minHeight: { xs: 'calc(100vh - 72px)', sm: 'calc(100vh - 96px)' },
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1400,
          position: 'relative',
          px: { xs: 0 },
          textAlign: 'center',
        }}
      >
        <Stack sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              p: { xs: 2, sm: 4 },
              position: 'relative',
              width: 1,
              maxWidth: 820,
            }}
          >
            <RevealItems
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 820,
                mx: 'auto',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.375rem', sm: '1.625rem', md: '2rem' },
                  fontFamily: '"Noto Sans SC", sans-serif',
                  fontWeight: 500,
                  textAlign: 'center',
                  lineHeight: 1.28,
                  letterSpacing: 0,
                  mb: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                  }}
                >
                  连接全球贸易中的每一个角色
                </Box>
                <Box component="span" sx={{ display: 'block' }}>
                  让每一种需求找到正确的响应
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 500,
                  mb: 4,
                  color: 'text.secondary',
                }}
              >
                FFAX 是全球贸易网络中的数字桥梁
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  maxWidth: 680,
                  mb: 5,
                  color: 'text.secondary',
                }}
              >
                通过可信准入、结构化需求、AI
                智能匹配和数字化履约，连接跨境卖家、工厂、采购商、物流、海外仓及企业服务机构。
              </Typography>

              <Stack
                direction="row"
                sx={{
                  gap: 1,
                }}
              >
                <Button variant="contained" href={paths.showcase}>
                  进入地球村
                </Button>
                <Button variant="soft" color="neutral" href={paths.landingContact}>
                  {translateUi('ui.sections.landing.homepage.hero.contact_us_4832e458')}
                </Button>
              </Stack>
            </RevealItems>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Hero;
