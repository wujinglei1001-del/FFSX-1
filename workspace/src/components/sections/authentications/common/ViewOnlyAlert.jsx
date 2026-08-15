import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Collapse, Link, Typography, alertClasses } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const ViewOnlyAlert = ({ docLink, sx }) => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity="info"
        sx={{
          maxWidth: 480,
          [`& .${alertClasses.action}`]: {
            pl: 0,
          },
          ...sx,
        }}
        icon={<IconifyIcon icon="material-symbols:info-outline-rounded" />}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          {translateUi(
            'ui.sections.authentications.common.viewonlyalert.this_is_a_view_only_page_bd3fb96e',
          )}
        </Typography>
        <Typography variant="body2">
          {translateUi(
            'ui.sections.authentications.common.viewonlyalert.please_follow_the_4bc8b248',
          )}
          <Link href={docLink} sx={{ mx: 0.5 }}>
            {translateUi('ui.sections.authentications.common.viewonlyalert.documentation_ba2a1650')}
          </Link>
          {translateUi(
            'ui.sections.authentications.common.viewonlyalert.to_implement_it_in_your_projects_after_getting_full__b7cd607f',
          )}
        </Typography>
      </Alert>
    </Collapse>
  );
};

export default ViewOnlyAlert;
