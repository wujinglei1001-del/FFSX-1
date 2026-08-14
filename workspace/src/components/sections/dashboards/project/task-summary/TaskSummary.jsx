import { Stack } from '@mui/material';
import TaskSummaryCard from './TaskSummaryCard';

const TaskSummary = ({ taskMetrics }) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flex: 1 }}>
      {taskMetrics.map((task) => (
        <TaskSummaryCard key={task.title} task={task} />
      ))}
    </Stack>
  );
};

export default TaskSummary;
