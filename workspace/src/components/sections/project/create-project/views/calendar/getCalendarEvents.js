import { tasksPerGroup } from '../../common/helpers';

export const getTaskDatesInMonth = (taskIndex, month) => {
  const monthStart = month.startOf('month');
  const monthEnd = month.endOf('month');
  const daysInMonth = month.daysInMonth();
  const dayOffset = taskIndex % daysInMonth;
  const start = monthStart.add(dayOffset, 'day');
  const desiredDuration = 2;
  const proposedEnd = start.add(desiredDuration - 1, 'day');
  const end = proposedEnd.isAfter(monthEnd) ? monthEnd : proposedEnd;
  return { start, end };
};

export const taskToCalendarEvents = (
  tasks,
  groups,
  hasGroupingEnabled,
  groupedTasks,
  getGroupColor,
  theme,
  viewedMonth,
) => {
  if (!hasGroupingEnabled) {
    const color = getGroupColor(0);

    return tasks.map((task, index) => {
      const { start, end } = getTaskDatesInMonth(index, viewedMonth);

      return {
        id: task.id,
        title: task.value?.trim() || 'Task',
        start: start.format('YYYY-MM-DD'),
        end: end.add(1, 'day').format('YYYY-MM-DD'),
        backgroundColor: theme.vars.palette.background.elevation1,
        borderColor: color,
        display: 'block',
      };
    });
  }

  return tasks.map((task, globalIndex) => {
    const { start, end } = getTaskDatesInMonth(globalIndex, viewedMonth);

    let groupIndex = 0;
    let taskFound = false;
    for (let index = 0; index < groupedTasks.length; index++) {
      const groupTasks = groupedTasks[index];
      const taskInGroupIndex = groupTasks.findIndex(
        (taskValue) => taskValue === task.value?.trim(),
      );
      if (taskInGroupIndex !== -1) {
        groupIndex = index;
        taskFound = true;
        break;
      }
    }

    if (!taskFound) {
      groupIndex = Math.floor(globalIndex / tasksPerGroup);
    }

    const color = getGroupColor(groupIndex);

    return {
      id: task.id,
      title: task.value?.trim() || 'Task',
      start: start.format('YYYY-MM-DD'),
      end: end.add(1, 'day').format('YYYY-MM-DD'),
      backgroundColor: theme.vars.palette.background.elevation1,
      borderColor: color,
      display: 'block',
    };
  });
};
