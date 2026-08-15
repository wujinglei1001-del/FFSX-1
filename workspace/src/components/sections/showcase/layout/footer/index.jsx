import { useTranslation } from 'react-i18next';
import { Link, Stack, Typography } from '@mui/material';
import { footerNavItems } from 'data/showcase';
import RevealText from '../../common/RevealText';

const ShowcaseFooter = () => {
  const { t: translateUi } = useTranslation();
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
          {translateUi('ui.sections.showcase.layout.footer.brought_to_you_by_6a89f6ec')}{' '}
          <Link
            href="https://themewagon.com/"
            target="_blank"
            sx={{ color: 'inherit', fontWeight: 700 }}
          >
            {translateUi('ui.sections.showcase.layout.footer.themewagon_42a442ab')}
          </Link>{' '}
          💚
        </Typography>
      </RevealText>

      <Stack direction="row" sx={{ gap: 2 }}>
        {footerNavItems.map(({ label, to }, index) => (
          <RevealText key={label} start="top 100%" delay={index * 0.1}>
            <Link
              href={to}
              target="_blank"
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
