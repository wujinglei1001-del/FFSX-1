import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import CheckListItem from './CheckListItem';

const CheckList = () => {
  const { t: translateUi } = useTranslation();
  const { setValue, watch } = useFormContext();
  const subtasks = watch('subtasks');
  const completedTask = subtasks.filter((item) => item.checked).length;
  const totalTask = subtasks.length;
  const progressValue = (completedTask / totalTask) * 100;

  const handleChecklistUpdate = (id) => {
    const updatedTasks = subtasks.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setValue('subtasks', updatedTasks);
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {translateUi('ui.sections.kanban.kanban.task_details.check_list_1d9ae30b')}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="caption">{`${completedTask}/${totalTask}`}</Typography>
        <LinearProgress
          variant="determinate"
          color={progressValue === 100 ? 'success' : 'primary'}
          value={progressValue}
        />
      </Box>

      <List
        component="div"
        sx={{
          mb: 2,
          mx: -2,
          px: 2,
          overflowX: { xs: 'auto', md: 'visible' },
          overflowY: 'visible',
        }}
      >
        {subtasks.map((item, index) => (
          <CheckListItem
            key={item.id}
            data={item}
            isLastItem={index === totalTask - 1}
            handleChecklistUpdate={handleChecklistUpdate}
          />
        ))}
      </List>

      <Button
        variant="soft"
        color="neutral"
        startIcon={
          <IconifyIcon icon="material-symbols:add-2-rounded" sx={{ fontSize: '20px !important' }} />
        }
        fullWidth
      >
        {translateUi('ui.sections.kanban.kanban.task_details.add_subtask_65b9d7a6')}
      </Button>
    </Paper>
  );
};

export default CheckList;
