import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { users } from 'data/users';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import CRMDropdownMenu from '../common/CRMDropdownMenu';

const LeadDetailsHeader = () => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [starred, setStarred] = useState(false);
  const { down } = useBreakpoints();

  const downSm = down('sm');
  const downMd = down('md');

  return (
    <Paper background={1} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <PageBreadcrumb
            items={[
              {
                label: translateUi('ui.sections.crm.lead_details.leaddetailsheader.home_70f8bb9a'),
                url: paths.crm,
              },
              {
                label: translateUi(
                  'ui.sections.crm.lead_details.leaddetailsheader.lead_details_8b2d0aac',
                ),
                active: true,
              },
            ]}
            sx={{ mb: 2 }}
          />
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, md: 2 },
              alignItems: 'center',
            }}
          >
            <Avatar
              src={users[6].avatar}
              sx={{ width: { xs: 40, md: 56 }, height: { xs: 40, md: 56 } }}
            />

            <Stack
              direction="row"
              sx={{
                gap: 0.75,
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" sx={{ fontSize: { xs: 20, md: 28 } }}>
                {translateUi(
                  'ui.sections.crm.lead_details.leaddetailsheader.tsamina_mina_f6bd64fe',
                )}
              </Typography>
              <Button
                shape="square"
                size={downMd ? 'medium' : 'large'}
                color="neutral"
                onClick={() => setStarred(!starred)}
              >
                <IconifyIcon
                  icon="material-symbols:star-rate-rounded"
                  sx={{ fontSize: 24, color: starred ? 'warning.main' : 'background.elevation4' }}
                />
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          <Button
            variant="soft"
            shape={downSm ? 'square' : undefined}
            color="neutral"
            sx={{ gap: 0.5 }}
          >
            <IconifyIcon icon="material-symbols:edit-outline" />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {translateUi(
                'ui.sections.crm.lead_details.leaddetailsheader.edit_information_7d105ee7',
              )}
            </Box>
          </Button>

          <Button
            variant="soft"
            shape={downSm ? 'square' : undefined}
            color="neutral"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ gap: 0.5 }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {translateUi('ui.sections.crm.lead_details.leaddetailsheader.more_action_0cb6d463')}
            </Box>
            <IconifyIcon icon="material-symbols:expand-more" />
          </Button>

          <CRMDropdownMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleClose={() => setAnchorEl(null)}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default LeadDetailsHeader;
