import { useTranslation } from 'react-i18next';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { kebabCase } from 'lib/utils';

const PageBreadcrumb = ({ items, sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Breadcrumbs
      aria-label={translateUi('ui.sections.common.pagebreadcrumb.breadcrumb_6e5ce570')}
      sx={{ ...sx }}
    >
      {items.map(({ label, url, active }) => (
        <Typography
          key={kebabCase(label)}
          variant="body2"
          aria-current={active ? 'page' : undefined}
          component={active ? 'span' : Link}
          href={!active ? url : undefined}
          sx={{
            color: active ? 'text.primary' : 'primary.main',
            fontWeight: 'medium',
          }}
        >
          {label}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default PageBreadcrumb;
