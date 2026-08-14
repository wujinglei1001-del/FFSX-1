import { avatarGroupClasses } from '@mui/material';
import { users } from 'data/users';

export const PROJECT_LIST_FILTERS = ['Recently opened', 'Running', 'Done', 'Cancelled'];

export const projectMembers = users.map((user) => ({
  id: user.id,
  name: user.name,
  avatar: user.avatar,
  email: user.email,
  status: user.status,
}));

export const projectAdmins = projectMembers.slice(0, 2);

export const projectMemberUsers = projectMembers.slice(2);

export const projectAvatarGroupSx = (avatarSize = 32) => ({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  [`& .${avatarGroupClasses.avatar}`]: {
    width: avatarSize,
    height: avatarSize,
    bgcolor: 'neutral.lighter',
    color: 'neutral.dark',
  },
});
