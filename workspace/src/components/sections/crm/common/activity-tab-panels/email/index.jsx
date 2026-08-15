import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import EmailAccordion from './EmailAccordion';

const EmailTabPanel = ({ emailData }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, px: { xs: 0 } }}>
      <SimpleBar sx={{ maxHeight: 504 }}>
        <Stack
          sx={{
            gap: 1,
          }}
        >
          {emailData.map((email) => (
            <EmailAccordion key={email.id} email={email} />
          ))}
        </Stack>
      </SimpleBar>
      <Stack
        direction="row"
        sx={{
          gap: 0.5,
          mt: 3,
        }}
      >
        <Button
          size="small"
          shape={!upSm ? 'square' : undefined}
          variant="soft"
          color="neutral"
          sx={{ gap: 0.5 }}
        >
          <IconifyIcon icon="material-symbols:reply-rounded" sx={{ fontSize: 16 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.reply_6c2bb735')}
            </Box>
          )}
        </Button>
        <Button
          size="small"
          shape={!upSm ? 'square' : undefined}
          variant="soft"
          color="neutral"
          sx={{ gap: 0.5 }}
        >
          <IconifyIcon icon="material-symbols:forward-rounded" sx={{ fontSize: 16 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.forward_ba4e7226')}
            </Box>
          )}
        </Button>
        <Button
          size="small"
          shape={!upSm ? 'square' : undefined}
          variant="soft"
          color="neutral"
          sx={{ gap: 0.5 }}
        >
          <IconifyIcon icon="material-symbols:archive-outline-rounded" sx={{ fontSize: 16 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.archive_2621c6fd')}
            </Box>
          )}
        </Button>
        <Button
          size="small"
          shape={!upSm ? 'square' : undefined}
          variant="soft"
          color="neutral"
          sx={{ gap: 0.5 }}
        >
          <IconifyIcon icon="material-symbols:all-inbox-outline-rounded" sx={{ fontSize: 16 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.open_inbox_f95cf966')}
            </Box>
          )}
        </Button>
      </Stack>
    </Container>
  );
};

export default EmailTabPanel;
