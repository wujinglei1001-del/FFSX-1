import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { IconButton, Typography } from '@mui/material';
import { useEmailContext } from 'providers/EmailProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import CardHeaderAction from 'components/common/CardHeaderAction';

const EmailListPagination = () => {
  const { t: translateUi } = useTranslation();
  const { resizableWidth } = useEmailContext();
  const { id } = useParams();

  return (
    <CardHeaderAction>
      <Typography
        variant="caption"
        sx={[
          { color: 'text.secondary', display: 'none' },
          (!id || resizableWidth > 500) && { display: { sm: 'inline-flex' } },
        ]}
      >
        24{' '}
        <Typography variant="caption" sx={{ mx: 0.5 }}>
          {translateUi('ui.sections.email.email_list.email_list_header.out_of_5ee0bb55')}
        </Typography>{' '}
        3,234
      </Typography>
      <IconButton size="small">
        <IconifyIcon
          flipOnRTL
          icon="material-symbols:chevron-left-rounded"
          sx={{ fontSize: 20, color: 'text.primary' }}
        />
      </IconButton>
      <IconButton size="small">
        <IconifyIcon
          flipOnRTL
          icon="material-symbols:chevron-right-rounded"
          sx={{ fontSize: 20, color: 'text.primary' }}
        />
      </IconButton>
    </CardHeaderAction>
  );
};

export default EmailListPagination;
