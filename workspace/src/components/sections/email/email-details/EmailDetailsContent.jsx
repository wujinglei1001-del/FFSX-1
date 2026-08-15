import { useTranslation } from 'react-i18next';
import { Avatar, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEmailContext } from 'providers/EmailProvider';
import Image from 'components/base/Image';

const EmailDetailsContent = () => {
  const { t: translateUi } = useTranslation();
  const {
    emailState: { email },
  } = useEmailContext();

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 400, my: 3 }}>
        {email?.subject}
      </Typography>
      <Stack direction="row" sx={{ gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Avatar alt={email?.user.name} src={email?.user.avatar} sx={{ width: 32, height: 32 }} />
        <div>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {email?.user.name}
          </Typography>
          <Typography variant="caption" component="p" sx={{ mb: 0.5 }}>
            {email?.user.email}
          </Typography>
          <Typography variant="caption" sx={{ mr: 0.5, color: 'text.disabled' }}>
            {translateUi('ui.sections.email.email_details.emaildetailscontent.to_7e7fbc81')}{' '}
          </Typography>
          <Typography variant="caption">
            {translateUi(
              'ui.sections.email.email_details.emaildetailscontent.me_anotherperson_email_com_31f7b058',
            )}
          </Typography>
        </div>
        <Typography variant="body2" sx={{ ml: 'auto' }}>
          {dayjs(email?.time).fromNow()}
        </Typography>
      </Stack>
      {email?.details}
      {email?.attachments && (
        <Stack sx={{ gap: 2, alignItems: 'start', mt: 3 }}>
          {email.attachments.map(
            (attachment) =>
              attachment.fileType === 'image' && (
                <Image key={attachment.id} src={attachment.file} alt="" />
              ),
          )}
        </Stack>
      )}
    </>
  );
};

export default EmailDetailsContent;
