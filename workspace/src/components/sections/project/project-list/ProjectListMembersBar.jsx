import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import InviteDialog from 'components/common/InviteDialog';
import ProjectMembersAvatarGroup from 'components/sections/project/common/ProjectMembersAvatarGroup';
import {
  projectAdmins,
  projectMemberUsers,
} from 'components/sections/project/common/projectMemberStyles';

const ProjectListMembersBar = ({
  inviteButtonIcon = 'material-symbols:person-add-outline',
  onOpenMembersMenu,
  onInvite,
  sx,
}) => {
  const { t: translateUi } = useTranslation();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const handleInviteClick = () => {
    if (onInvite) {
      onInvite();
      return;
    }
    setInviteDialogOpen(true);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'center',
          flexWrap: 'nowrap',
          minWidth: 0,
          ...sx,
        }}
      >
        <ProjectMembersAvatarGroup
          members={projectAdmins}
          max={projectAdmins.length + 1}
          compactSlice={projectAdmins.length}
          sx={{ mr: 1, flexShrink: 0 }}
        />

        <Divider orientation="vertical" sx={{ height: 16, alignSelf: 'center', flexShrink: 0 }} />

        <ProjectMembersAvatarGroup
          members={projectMemberUsers}
          max={8}
          compactMax={5}
          onSurplusClick={onOpenMembersMenu}
          sx={{ mr: 1, flexShrink: 0 }}
        />

        <Button
          shape="circle"
          variant="soft"
          color="neutral"
          aria-label={translateUi(
            'ui.sections.project.project_list.projectlistmembersbar.invite_member_645d4af8',
          )}
          onClick={handleInviteClick}
        >
          <IconifyIcon icon={inviteButtonIcon} fontSize={20} />
        </Button>

        <DashboardMenu
          shape="circle"
          variant="text"
          sx={{ ml: 'auto', minWidth: 40, minHeight: 40, flexShrink: 0 }}
          icon={
            <IconifyIcon
              icon="material-symbols:more-horiz"
              fontSize={20}
              sx={{ color: 'text.primary' }}
            />
          }
        />
      </Stack>

      <InviteDialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)} />
    </>
  );
};

export default memo(ProjectListMembersBar);
