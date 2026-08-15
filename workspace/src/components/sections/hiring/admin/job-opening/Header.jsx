import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from 'components/common/SearchTextField';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';

const JobOpeningHeader = () => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const downLg = down('lg');

  return (
    <Box sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 2,
          alignItems: { sm: 'flex-end' },
        }}
      >
        <div>
          <PageBreadcrumb
            items={[
              {
                label: translateUi('ui.sections.hiring.admin.job_opening.home_70f8bb9a'),
                url: paths.hiringJobOpening,
              },
              {
                label: translateUi('ui.sections.hiring.admin.job_opening.members_1cb449c1'),
                active: true,
              },
            ]}
            sx={{ mb: 1 }}
          />
          <Typography variant="h4" sx={[downLg && { fontSize: 'h5.fontSize' }]}>
            {translateUi('ui.sections.hiring.admin.job_opening.job_openings_49574894')}
          </Typography>
        </div>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 1,
            flex: 1,
            justifyContent: { sm: 'flex-end' },
            alignItems: { sm: 'center' },
          }}
        >
          <Stack
            direction="row"
            sx={{
              gap: 1,
            }}
          >
            <SearchTextField
              fullWidth
              placeholder={translateUi('ui.sections.hiring.admin.job_opening.search_bce06414')}
              sx={{ maxWidth: { sm: 250 }, ml: { sm: 'auto' } }}
            />
            <Button
              variant="soft"
              color="neutral"
              startIcon={<IconifyIcon icon="material-symbols:filter-alt-outline" />}
              sx={{ textWrap: 'nowrap', flexShrink: 0 }}
            >
              {translateUi('ui.sections.hiring.admin.job_opening.filter_d7decf1a')}
            </Button>
          </Stack>
          <Button
            href={paths.hiringNewOpening}
            variant="contained"
            startIcon={<IconifyIcon icon="material-symbols:add" />}
            sx={{ textWrap: 'nowrap', width: { xs: 1, sm: 'auto' } }}
          >
            {translateUi('ui.sections.hiring.admin.job_opening.new_opening_4023932b')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobOpeningHeader;
