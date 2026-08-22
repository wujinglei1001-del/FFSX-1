import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import gantt from 'dhtmlx-gantt';
import {
  bindTaskCompleteCheckbox,
  configureTimelineGanttChart,
  initTodayMarker,
} from 'components/sections/project/common/dhtmlxGantt';
import { normalizeChartTaskDates } from 'components/sections/project/common/ganttTaskFormUtils';
import { clearGanttContainer, initGanttOnContainer } from './ganttInstance';
import { useGanttGridCollapse } from './useGanttGridCollapse';

const mapTimelineTasks = (timelineTasks) =>
  timelineTasks.map((task) => ({
    ...task,
    $open: task.type === 'project' ? true : task.$open,
  }));

export const useTimelineGantt = (initialTasks, options) => {
  const ganttContainer = useRef(null);
  const isGanttReady = useRef(false);
  const onTaskClickRef = useRef(options?.onTaskClick);
  onTaskClickRef.current = options?.onTaskClick;
  const theme = useTheme();
  const [tasks, setTasks] = useState(initialTasks);
  const [originalTasks, setOriginalTasks] = useState(initialTasks);
  const [isChartReady, setIsChartReady] = useState(false);

  const { expandedGridWidth, gridDividerLeft, isGridExpanded, toggleGridWidth, syncLayout } =
    useGanttGridCollapse(ganttContainer, isChartReady);

  const renderAndSyncLayout = useCallback(() => {
    gantt.render();
    requestAnimationFrame(syncLayout);
  }, [syncLayout]);

  useEffect(() => {
    if (!ganttContainer.current) return;

    const container = ganttContainer.current;
    const ganttChart = gantt;

    configureTimelineGanttChart(ganttChart, theme, expandedGridWidth);
    initGanttOnContainer(container);
    const cleanupTodayMarker = initTodayMarker(ganttChart);
    ganttChart.parse({ data: mapTimelineTasks(tasks), links: [] });

    const unbindTaskCompleteCheckbox = bindTaskCompleteCheckbox(
      container,
      ganttChart,
      (taskId, completed) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? { ...task, completed } : task)),
        );
      },
      (task) => onTaskClickRef.current?.(normalizeChartTaskDates(task)),
    );

    ganttChart.attachEvent('onAfterTaskMove', () => {
      ganttChart.refreshData();
    });

    isGanttReady.current = true;
    setIsChartReady(true);
    requestAnimationFrame(syncLayout);

    return () => {
      cleanupTodayMarker();
      unbindTaskCompleteCheckbox();
      clearGanttContainer(container);
      isGanttReady.current = false;
      setIsChartReady(false);
    };
  }, [theme.direction]);

  useEffect(() => {
    if (!isGanttReady.current) return;

    configureTimelineGanttChart(gantt, theme, expandedGridWidth);
    renderAndSyncLayout();
  }, [theme, expandedGridWidth, renderAndSyncLayout]);

  useEffect(() => {
    if (!isGanttReady.current) return;

    gantt.parse({ data: mapTimelineTasks(tasks), links: [] });
    renderAndSyncLayout();
  }, [tasks, renderAndSyncLayout]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      setOriginalTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => (task.id === taskId ? updatedTask : task));
      setOriginalTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const searchTasks = (searchTerm) => {
    if (!searchTerm.trim()) {
      setTasks(originalTasks);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const matchingTasks = originalTasks.filter(
      (task) =>
        task.text.toLowerCase().includes(searchLower) ||
        task.group?.toLowerCase().includes(searchLower) ||
        task.users?.some((user) => user.toLowerCase().includes(searchLower)),
    );

    setTasks(
      originalTasks.filter((task) => {
        const taskMatches =
          task.text.toLowerCase().includes(searchLower) ||
          task.group?.toLowerCase().includes(searchLower) ||
          task.users?.some((user) => user.toLowerCase().includes(searchLower));

        return (
          taskMatches ||
          matchingTasks.some((matchingTask) => matchingTask.parent === task.id) ||
          matchingTasks.some((matchingTask) => task.parent === matchingTask.id)
        );
      }),
    );
  };

  return {
    ganttContainer,
    tasks,
    setTasks,
    addTask,
    updateTask,
    searchTasks,
    gridDividerLeft,
    isGridExpanded,
    toggleGridWidth,
    isChartReady,
  };
};
