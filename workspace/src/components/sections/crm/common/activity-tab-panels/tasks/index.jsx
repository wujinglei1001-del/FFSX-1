import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import StyledTextField from 'components/styled/StyledTextField';
import TaskList from './TaskList';

const TaskTabPanel = ({ tasksData }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, px: { xs: 0 } }}>
      <Stack
        direction="row"
        sx={{
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <StyledTextField
          placeholder={translateUi(
            'ui.sections.crm.common.activity_tab_panels.search_tasks_73ffe89c',
          )}
          fullWidth
          sx={{ maxWidth: 300 }}
        />
        <Button shape={upSm ? undefined : 'square'} color="neutral" sx={{ ml: 'auto', gap: 0.5 }}>
          <IconifyIcon icon="material-symbols:filter-alt-outline" sx={{ fontSize: 20 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.filter_d7decf1a')}
            </Box>
          )}
        </Button>
        <Button shape={upSm ? undefined : 'square'} color="neutral" sx={{ gap: 0.5 }}>
          <IconifyIcon icon="material-symbols:sort-rounded" sx={{ fontSize: 20 }} />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.crm.common.activity_tab_panels.sort_adc4e96a')}
            </Box>
          )}
        </Button>
      </Stack>
      <SimpleBar sx={{ maxHeight: 504 }}>
        <Stack
          sx={{
            gap: 1,
            mt: 2,
          }}
        >
          {tasksData.map((task) => (
            <TaskList key={task.id} tasksData={task} />
          ))}
        </Stack>
      </SimpleBar>
      <Button sx={{ mt: 3 }}>
        {translateUi('ui.sections.crm.common.activity_tab_panels.load_more_notifications_160c9a66')}
      </Button>
    </Container>
  );
};

export default TaskTabPanel;
