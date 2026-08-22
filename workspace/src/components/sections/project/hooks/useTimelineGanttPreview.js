import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';
import gantt from 'dhtmlx-gantt';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import CreateTaskTextTemplate from 'components/sections/project/common/CreateTaskTextTemplate';
import {
  createGanttConfig,
  createPreviewColumnTemplate,
  createTimelineGridRowClassTemplate,
  createTimelineTaskClassTemplate,
  createTimelineTaskRowClassTemplate,
} from 'components/sections/project/common/dhtmlxGantt';

export const useTimelineGanttPreview = ({ tasks, getTaskColor }) => {
  const ganttContainer = useRef(null);
  const theme = useTheme();
  const { down } = useBreakpoints();
  const downXl = down('xl');

  useEffect(() => {
    if (!ganttContainer.current || tasks.length === 0) return;

    const g = gantt;

    const config = createGanttConfig('timeline', theme.direction);
    Object.assign(g.config, config);

    g.config.grid_width = downXl ? 200 : 360;

    g.config.columns = createPreviewColumnTemplate(getTaskColor);

    g.config.drag_move = false;
    g.config.drag_resize = false;
    g.config.drag_progress = false;
    g.config.drag_links = false;
    g.config.readonly = true;

    g.templates.task_class = createTimelineTaskClassTemplate(g);
    g.templates.grid_row_class = createTimelineGridRowClassTemplate(g);
    g.templates.task_row_class = createTimelineTaskRowClassTemplate(g);
    g.templates.grid_open = () => '';

    g.templates.task_text = (start, end, task) => {
      const taskColor = getTaskColor(task);
      const peopleCount = task.users ? task.users.length : 0;
      return CreateTaskTextTemplate(task, taskColor, theme, peopleCount);
    };

    g.init(ganttContainer.current);

    const expandedTasks = tasks.map((task) => ({
      ...task,
      $open: task.type === 'project' ? true : task.$open,
    }));

    g.parse({
      data: expandedTasks,
      links: [],
    });

    const groupColorMap = new Map();
    tasks.forEach((task) => {
      if (task.group && !groupColorMap.has(task.group)) {
        groupColorMap.set(task.group, getTaskColor(task));
      }
    });

    const applyTaskBorderColors = () => {
      if (!ganttContainer.current) return;
      requestAnimationFrame(() => {
        if (!ganttContainer.current) return;
        groupColorMap.forEach((color, groupId) => {
          const selector = `.gantt_task_line.group-${groupId}`;
          const rowSelector = `.gantt_row.group-${groupId} .gantt_cell`;
          ganttContainer.current?.querySelectorAll(selector).forEach((element) => {
            element.style.setProperty('border-color', color, 'important');
          });
          ganttContainer.current?.querySelectorAll(rowSelector).forEach((element) => {
            element.style.setProperty('border-color', color, 'important');
          });
        });
      });
    };

    const observer = new MutationObserver(applyTaskBorderColors);
    observer.observe(ganttContainer.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    applyTaskBorderColors();

    return () => {
      observer.disconnect();
      g.clearAll();
    };
  }, [tasks, theme, getTaskColor, downXl]);

  return { ganttContainer };
};
