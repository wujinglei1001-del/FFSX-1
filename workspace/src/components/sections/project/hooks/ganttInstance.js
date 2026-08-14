import gantt from 'dhtmlx-gantt';

let ganttMountedContainer = null;

export const initGanttOnContainer = (container) => {
  if (ganttMountedContainer === container) return;

  if (ganttMountedContainer) {
    gantt.clearAll();
  }

  gantt.init(container);
  ganttMountedContainer = container;
};

export const clearGanttContainer = (container) => {
  gantt.clearAll();
  container.innerHTML = '';
  if (ganttMountedContainer === container || gantt.$container === container) {
    ganttMountedContainer = null;
  }
};
