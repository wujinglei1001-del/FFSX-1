import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';

const ProfileActions = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack direction="row" sx={{ gap: 1, mb: 2 }}>
      <Button
        color="primary"
        variant="soft"
        startIcon={<IconifyIcon icon="material-symbols:person-add-outline" />}
      >
        {translateUi('ui.sections.social.profile_section.profileactions.follow_66587a7a')}
      </Button>
      <Button
        color="neutral"
        variant="soft"
        startIcon={<IconifyIcon icon="material-symbols:chat-outline" />}
      >
        {translateUi('ui.sections.social.profile_section.profileactions.message_68f4145f')}
      </Button>
      <DashboardMenu
        size="medium"
        variant="soft"
        menuItems={[
          {
            label: translateUi('ui.sections.social.profile_section.profileactions.status_bae7d5be'),
          },
          {
            label: translateUi(
              'ui.sections.social.profile_section.profileactions.archive_2621c6fd',
            ),
          },
          {
            label: translateUi('ui.sections.social.profile_section.profileactions.delete_f6fdbe48'),
            sx: { color: 'error.main' },
          },
        ]}
      />
    </Stack>
  );
};

export default ProfileActions;
