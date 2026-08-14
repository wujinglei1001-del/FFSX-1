import { Box, Stack, Typography } from '@mui/material';
import { footerNavItems } from 'data/showcase';
import RevealText from '../../common/RevealText';

const ShowcaseFooter = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={(theme) => ({
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme.spacing(2, 5, 5, 5),
        rowGap: 2,
      })}
    >
      <RevealText start="top 100%">
        <Typography
          variant="subtitle2"
          sx={{
            color: 'common.white',
            fontWeight: 400,
          }}
        >
          Brought to you by{' '}
          <Box component="span" sx={{ color: 'inherit', fontWeight: 700 }}>
            FFA-X
          </Box>{' '}
          💚
        </Typography>
      </RevealText>

      <Stack direction="row" sx={{ gap: 2 }}>
        {footerNavItems.map(({ label }, index) => (
          <RevealText key={label} start="top 100%" delay={index * 0.1}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 600 }}>
              {label}
            </Typography>
          </RevealText>
        ))}
      </Stack>
    </Stack>
  );
};

export default ShowcaseFooter;
