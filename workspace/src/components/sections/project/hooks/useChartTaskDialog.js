import { useCallback, useMemo, useState } from 'react';

export const useChartTaskDialog = ({ addTask, updateTask, toFormData, fromFormData }) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const onTaskClick = useCallback((task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  }, []);

  const handleOpenCreateDialog = useCallback(() => {
    setEditingTask(null);
    setTaskDialogOpen(true);
  }, []);

  const handleTaskDialogOpenChange = useCallback((open) => {
    setTaskDialogOpen(open);
    if (!open) {
      setEditingTask(null);
    }
  }, []);

  const handleTaskSubmit = useCallback(
    (formData) => {
      if (editingTask) {
        updateTask(editingTask.id, fromFormData(formData, editingTask));
        return;
      }

      addTask(fromFormData(formData));
    },
    [addTask, updateTask, fromFormData, editingTask],
  );

  const taskDialogInitialValues = useMemo(
    () => (editingTask ? toFormData(editingTask) : undefined),
    [editingTask, toFormData],
  );

  return {
    taskDialogOpen,
    taskDialogMode: editingTask ? 'edit' : 'create',
    taskDialogInitialValues,
    onTaskClick,
    handleOpenCreateDialog,
    handleTaskDialogOpenChange,
    handleTaskSubmit,
  };
};
