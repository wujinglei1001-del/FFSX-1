import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  filledInputClasses,
  listItemSecondaryActionClasses,
  menuClasses,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import MemberProfilePopper from 'components/common/MemberProfilePopper';
import StyledTextField from 'components/styled/StyledTextField';

const defaultRole = 'Admin';

const buildRoleByKey = (members) => {
  const roleMap = {};
  members.forEach((member) => {
    const key = String(member.id ?? member.name);
    roleMap[key] = defaultRole;
  });
  return roleMap;
};

const getMemberKey = (member) => String(member.id ?? member.name);

const MemberListItem = memo(
  ({ member, role, onRoleChange, onRemove, onRowMouseEnter, onRowMouseLeave }) => {
    const { avatar, name, id } = member;
    const key = String(id ?? name);

    const handleMouseEnter = (event) => {
      onRowMouseEnter(event, member);
    };

    const handleRoleChange = (event) => {
      onRoleChange(key, event.target.value);
    };

    const handleRemove = () => {
      onRemove(key);
    };

    return (
      <ListItem
        disablePadding
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onRowMouseLeave}
        secondaryAction={
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <StyledTextField
              select
              size="small"
              value={role}
              onChange={handleRoleChange}
              sx={(theme) => ({
                minWidth: 90,
                color: 'text.secondary',
                [`& .${filledInputClasses.root}`]: {
                  bgcolor: 'transparent',
                  '&:focus-within': {
                    bgcolor: theme.vars.palette.primary.lighter,
                  },
                },
              })}
            >
              <MenuItem value="Member">
                {i18n.t('ui.sections.project.project_list.memberslistmenu.member_6853c98a')}
              </MenuItem>
              <MenuItem value="Admin">
                {i18n.t('ui.sections.project.project_list.memberslistmenu.admin_4e7afebc')}
              </MenuItem>
              <MenuItem value="Guest">
                {i18n.t('ui.sections.project.project_list.memberslistmenu.guest_face83ee')}
              </MenuItem>
            </StyledTextField>

            <Button
              size="small"
              shape="circle"
              color="neutral"
              aria-label={`Remove ${name}`}
              onClick={handleRemove}
              sx={{ flexShrink: 0 }}
            >
              <IconifyIcon icon="material-symbols:close-rounded" fontSize={18} />
            </Button>
          </Stack>
        }
        sx={{
          pr: 22,
          [`& .${listItemSecondaryActionClasses.root}`]: {
            right: 24,
          },
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 1,
            py: '11px',
            pl: 3,
          }}
        >
          <ListItemAvatar sx={{ minWidth: 32 }}>
            <Avatar src={avatar} alt={name} sx={{ height: 24, width: 24 }} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 400,
                  lineClamp: 1,
                  wordBreak: 'break-all',
                  overflow: 'hidden',
                }}
              >
                {name}
              </Typography>
            }
            sx={{ my: 0 }}
          />
        </Box>
      </ListItem>
    );
  },
);

MemberListItem.displayName = 'MemberListItem';

const MembersListMenu = ({ open, onClose, anchorEl, members }) => {
  const { t: translateUi } = useTranslation();
  const theme = useTheme();
  const showProfileOnHover = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const hideProfileTimeoutRef = useRef(undefined);
  const isHoveringProfileRef = useRef(false);
  const wasOpenRef = useRef(false);

  const [localMembers, setLocalMembers] = useState(members);
  const [roleByKey, setRoleByKey] = useState(() => buildRoleByKey(members));
  const [hoveredMember, setHoveredMember] = useState(null);
  const [hoveredRowEl, setHoveredRowEl] = useState(null);

  const clearHideProfileTimeout = useCallback(() => {
    if (hideProfileTimeoutRef.current) {
      clearTimeout(hideProfileTimeoutRef.current);
      hideProfileTimeoutRef.current = undefined;
    }
  }, []);

  const clearHoveredProfile = useCallback(() => {
    setHoveredMember(null);
    setHoveredRowEl(null);
  }, []);

  const scheduleHideProfile = useCallback(() => {
    clearHideProfileTimeout();
    hideProfileTimeoutRef.current = setTimeout(() => {
      if (!isHoveringProfileRef.current) {
        clearHoveredProfile();
      }
    }, 100);
  }, [clearHideProfileTimeout, clearHoveredProfile]);

  useEffect(() => {
    if (!showProfileOnHover) {
      clearHoveredProfile();
    }
  }, [showProfileOnHover, clearHoveredProfile]);

  useEffect(() => {
    const didOpen = open && !wasOpenRef.current;
    wasOpenRef.current = open;

    if (!didOpen) return;

    clearHideProfileTimeout();
    isHoveringProfileRef.current = false;
    setLocalMembers(members);
    setRoleByKey(buildRoleByKey(members));
    clearHoveredProfile();
  }, [open, members, clearHideProfileTimeout, clearHoveredProfile]);

  useEffect(() => {
    return () => {
      clearHideProfileTimeout();
    };
  }, [clearHideProfileTimeout]);

  const handleRowMouseEnter = useCallback(
    (event, member) => {
      if (!showProfileOnHover) return;
      clearHideProfileTimeout();
      setHoveredMember(member);
      setHoveredRowEl(event.currentTarget);
    },
    [showProfileOnHover, clearHideProfileTimeout],
  );

  const handleRowMouseLeave = useCallback(() => {
    if (!isHoveringProfileRef.current) {
      scheduleHideProfile();
    }
  }, [scheduleHideProfile]);

  const handleProfileMouseEnter = useCallback(() => {
    clearHideProfileTimeout();
    isHoveringProfileRef.current = true;
  }, [clearHideProfileTimeout]);

  const handleProfileMouseLeave = useCallback(() => {
    isHoveringProfileRef.current = false;
    scheduleHideProfile();
  }, [scheduleHideProfile]);

  const handleRoleChange = useCallback((key, role) => {
    setRoleByKey((prev) => ({
      ...prev,
      [key]: role,
    }));
  }, []);

  const handleRemove = useCallback((key) => {
    setLocalMembers((prev) => prev.filter((member) => getMemberKey(member) !== key));
  }, []);

  return (
    <>
      <Menu
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        disableAutoFocus
        disableAutoFocusItem
        disableEnforceFocus
        slotProps={{
          list: {
            'aria-label': 'Members list',
            sx: {
              p: 0,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '60vh',
              overflow: 'hidden',
            },
          },
        }}
        sx={{
          [`& .${menuClasses.paper}`]: {
            borderRadius: 6,
            width: 1,
            maxWidth: 375,
            overflow: 'hidden',
            marginLeft: '-30px',
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            py: 2.5,
            px: 3,
          }}
        >
          <Typography component="span" variant="h6">
            {translateUi('ui.sections.project.project_list.memberslistmenu.member_s_list_12cf39d1')}
          </Typography>
          <IconButton
            onClick={onClose}
            aria-label={translateUi(
              'ui.sections.project.project_list.memberslistmenu.close_members_list_7e3082ae',
            )}
            size="small"
          >
            <IconifyIcon icon="material-symbols:close-rounded" color="text.primary" fontSize={20} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            py: 1,
          }}
        >
          {localMembers.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', px: 3, py: 2, textAlign: 'center' }}
            >
              {translateUi(
                'ui.sections.project.project_list.memberslistmenu.no_members_yet_8de84cb2',
              )}
            </Typography>
          ) : (
            <List dense disablePadding>
              {localMembers.map((member) => {
                const key = getMemberKey(member);
                return (
                  <MemberListItem
                    key={key}
                    member={member}
                    role={roleByKey[key] ?? defaultRole}
                    onRoleChange={handleRoleChange}
                    onRemove={handleRemove}
                    onRowMouseEnter={handleRowMouseEnter}
                    onRowMouseLeave={handleRowMouseLeave}
                  />
                );
              })}
            </List>
          )}
        </Box>

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexShrink: 0,
            px: 3,
            py: 2.5,
            gap: 2,
          }}
        >
          <Button
            variant="text"
            color="neutral"
            startIcon={<IconifyIcon icon="material-symbols:add" fontSize={20} />}
            sx={{ mr: 'auto' }}
          >
            {translateUi('ui.sections.project.project_list.memberslistmenu.invite_more_37b0a833')}
          </Button>

          <Stack direction="row" sx={{ gap: 2 }}>
            <Button color="neutral" onClick={onClose}>
              {translateUi('ui.sections.project.project_list.memberslistmenu.cancel_77dfd213')}
            </Button>
            <Button onClick={onClose}>
              {translateUi('ui.sections.project.project_list.memberslistmenu.confirm_04a21221')}
            </Button>
          </Stack>
        </Stack>
      </Menu>

      <MemberProfilePopper
        open={showProfileOnHover && Boolean(hoveredMember)}
        anchorEl={hoveredRowEl}
        user={hoveredMember}
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
      />
    </>
  );
};

export default MembersListMenu;
