import { Link, Stack, Typography } from '@mui/material';
import { publicFooterNavItems } from 'data/ffax-public';
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
          <Link href="/" sx={{ color: 'inherit', fontWeight: 700 }}>
            FFA-X
          </Link>{' '}
          💚
        </Typography>
      </RevealText>

      <Stack direction="row" sx={{ gap: 2 }}>
        {publicFooterNavItems.map(({ label, to }, index) => (
          <RevealText key={label} start="top 100%" delay={index * 0.1}>
            <Link
              href={to}
              variant="subtitle2"
              sx={{ color: 'common.white', fontWeight: 600 }}
            >
              {label}
            </Link>
          </RevealText>
        ))}
      </Stack>
    </Stack>
  );
};

export default ShowcaseFooter;
