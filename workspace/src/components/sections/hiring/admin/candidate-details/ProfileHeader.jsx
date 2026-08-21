import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  Typography,
  selectClasses,
} from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import StyledSelect from 'components/styled/StyledSelect';

const ProfileHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ px: { xs: 3, lg: 5 }, py: 3 }}>
      <PageBreadcrumb
        items={[
          {
            label: translateUi('ui.sections.hiring.admin.candidate_details.home_70f8bb9a'),
            url: '/',
          },
          {
            label: translateUi(
              'ui.sections.hiring.admin.candidate_details.candidate_details_4e4d7cc1',
            ),
            active: true,
          },
        ]}
        sx={{ mb: 2 }}
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          justifyContent: 'space-between',
          rowGap: 3,
          columnGap: 2,
        }}
      >
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Stack
            direction="row"
            sx={{
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Avatar
              alt={users[15].name}
              src={users[15].avatar}
              sx={{ width: 80, height: 80, borderRadius: '50%' }}
            />

            <div>
              <Typography variant="h5" sx={{ typography: { xs: 'h6', md: 'h5' } }}>
                {users[15].name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {translateUi('ui.sections.hiring.admin.candidate_details.applied_a3e4a569')}{' '}
                <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {translateUi('ui.sections.hiring.admin.candidate_details.jan_5_2026_72cebd90')}
                </Box>
              </Typography>
            </div>
          </Stack>

          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Button shape="circle" variant="soft" color="neutral">
              <IconifyIcon icon="material-symbols:arrow-back-rounded" fontSize={20} />
            </Button>

            <Button shape="circle" variant="soft" color="neutral">
              <IconifyIcon icon="material-symbols:arrow-forward-rounded" fontSize={20} />
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            gap: { xs: 2, sm: 4 },
            justifyContent: 'space-between',
            alignItems: { sm: 'flex-end' },
          }}
        >
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
            }}
          >
            <StyledSelect
              variant="filled"
              defaultValue="Member"
              MenuProps={{
                slotProps: {
                  list: {
                    dense: true,
                  },
                },
              }}
              sx={{
                minWidth: { xs: 200, sm: 140, md: 180 },
                [`& .${selectClasses.icon}`]: { right: 8 },
              }}
            >
              <MenuItem value="Member">
                {translateUi('ui.sections.hiring.admin.candidate_details.member_6853c98a')}
              </MenuItem>
              <MenuItem value="Admin">
                {translateUi('ui.sections.hiring.admin.candidate_details.admin_4e7afebc')}
              </MenuItem>
              <MenuItem value="Guest">
                {translateUi('ui.sections.hiring.admin.candidate_details.guest_face83ee')}
              </MenuItem>
            </StyledSelect>

            <Button variant="soft" color="neutral">
              {translateUi('ui.sections.hiring.admin.candidate_details.disqualified_a525f885')}
            </Button>
          </Stack>

          <Box sx={{ textAlign: { sm: 'right' } }}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{
                mb: 1,
              }}
            >
              {translateUi('ui.sections.hiring.admin.candidate_details.job_opeing_96a658df')}{' '}
              <Box
                component="strong"
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                {translateUi(
                  'ui.sections.hiring.admin.candidate_details.february_24_2024_85399bb4',
                )}
              </Box>{' '}
              {translateUi('common.for')}{' '}
              <Box
                component="strong"
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                {translateUi('ui.sections.hiring.admin.candidate_details.sr_desinger_7f8c0184')}
              </Box>
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
              <strong>
                {translateUi('ui.sections.hiring.admin.candidate_details.100_candidates_3bab48f0')}
              </strong>
              {translateUi('ui.sections.hiring.admin.candidate_details.applied_a3e4a569')}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfileHeader;
