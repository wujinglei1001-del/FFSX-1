import { useTranslation } from 'react-i18next';
import { Box, Button, Paper, Stack } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import ProjectDataTable from './ProjectDataTable';

const ProductRoadmap = ({ projectInfos }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.project.product_roadmap.product_roadmap_fd90f95b',
        )}
        subTitle="Status of completion for all tasks"
        sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1, alignItems: 'flex-end' }}
        actionComponent={
          <>
            <Button
              href={paths.createProject}
              variant="soft"
              shape={upSm ? undefined : 'square'}
              sx={{ ml: 'auto', gap: 0.5 }}
            >
              <IconifyIcon
                icon="material-symbols:add-rounded"
                sx={{ fontSize: 16, ml: { sm: -0.5 } }}
              />
              {upSm && (
                <Box component="span">
                  {translateUi('ui.sections.dashboards.project.product_roadmap.add_new_344d8b9a')}
                </Box>
              )}
            </Button>
            <DashboardMenu size="medium" />
          </>
        }
      />
      <Stack sx={{ gap: 3 }}>
        {projectInfos.map((projectInfo) => (
          <ProjectDataTable key={projectInfo.id} projectInfo={projectInfo} />
        ))}
      </Stack>
    </Paper>
  );
};

export default ProductRoadmap;
