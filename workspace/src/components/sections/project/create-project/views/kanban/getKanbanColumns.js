import { tasksPerGroup } from '../../common/helpers';

export const getKanbanColumns = (
  tasks,
  groups,
  groupedTasks,
  hasGroupingEnabled,
  getGroupColor,
) => {
  if (tasks.length === 0) return [];

  if (!hasGroupingEnabled) {
    return [{ tasks, title: '', color: getGroupColor(0) }];
  }

  const columns = [];

  for (let index = 0; index < groupedTasks.length; index++) {
    const group = groups[index];
    const groupLabel = group?.label?.trim() || '';
    if (groupedTasks[index]) {
      const columnTasks = groupedTasks[index]
        .map((taskValue) => tasks.find((task) => task.value.trim() === taskValue))
        .filter((task) => task !== undefined);
      columns.push({ tasks: columnTasks, title: groupLabel, color: getGroupColor(index) });
    }
  }

  const groupedTasksCount = groupedTasks.length * tasksPerGroup;
  const ungroupedTaskValues = tasks.slice(groupedTasksCount).map((task) => task.value.trim());

  if (ungroupedTaskValues.length > 0) {
    const ungroupedColumnsCount = Math.ceil(ungroupedTaskValues.length / tasksPerGroup);
    for (let index = 0; index < ungroupedColumnsCount; index++) {
      const startIndex = index * tasksPerGroup;
      const endIndex = Math.min(startIndex + tasksPerGroup, ungroupedTaskValues.length);
      const columnTaskValues = ungroupedTaskValues.slice(startIndex, endIndex);
      const columnTasks = columnTaskValues
        .map((taskValue) => tasks.find((task) => task.value.trim() === taskValue))
        .filter((task) => task !== undefined);
      columns.push({ tasks: columnTasks, title: '', color: getGroupColor(groupedTasks.length) });
    }
  }

  return columns;
};
