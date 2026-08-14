import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

const useProjectTable = (tableData) => {
  const [data, setData] = useState(tableData);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingDraft, setEditingDraft] = useState({});
  const [pendingEditId, setPendingEditId] = useState(null);

  const patchEditingDraft = useCallback((patch) => {
    setEditingDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const startEdit = useCallback(
    (rowId) => {
      const row = findRowById(data, rowId);
      if (!row) return;
      setEditingRowId(rowId);
      setEditingDraft({ ...row });
    },
    [data],
  );

  const saveEdit = useCallback(
    (rowId) => {
      if (editingRowId !== rowId) return;

      if (!editingDraft || Object.keys(editingDraft).length === 0) {
        setEditingRowId(null);
        setEditingDraft({});
        return;
      }

      setData((currentData) =>
        replaceRowById(currentData, rowId, (existing) => ({ ...existing, ...editingDraft })),
      );
      setEditingRowId(null);
      setEditingDraft({});
    },
    [editingDraft, editingRowId],
  );

  const cancelEdit = useCallback(() => {
    setEditingRowId(null);
    setEditingDraft({});
  }, []);

  const deleteRow = useCallback(
    (rowId) => {
      setData((currentData) => deleteRowById(currentData, rowId));
      if (editingRowId === rowId) {
        setEditingRowId(null);
        setEditingDraft({});
      }
    },
    [editingRowId],
  );

  const addNewTask = useCallback(() => {
    setData((prev) => {
      const newId = (parseInt(prev[prev.length - 1].id) + 1).toString();
      const newTask = {
        id: newId,
        name: 'Name of the Task',
        collaborator: [],
        status: 'Running',
        label: 'Issue',
        priority: 'Medium',
        dependingOn: 'Depending on...',
        startDate: dayjs().format('YYYY-MM-DD'),
        dueDate: dayjs().format('YYYY-MM-DD'),
      };
      setPendingEditId(newId);
      return [...prev, newTask];
    });
  }, []);

  const addNewSubtask = useCallback((parentId) => {
    setData((prev) => {
      const subTaskList = prev.find((task) => task.id === parentId)?.subTasks || [];
      const newId = (parseFloat(subTaskList[subTaskList.length - 1].id) + 0.1).toString();
      const newSubtask = {
        id: newId,
        name: 'Name of the Subtask',
        collaborator: [],
        status: 'Running',
        label: 'Issue',
        priority: 'Medium',
        dependingOn: 'Depending on...',
        startDate: dayjs().format('YYYY-MM-DD'),
        dueDate: dayjs().format('YYYY-MM-DD'),
      };
      setPendingEditId(newId);
      return replaceRowById(prev, parentId, (parent) => ({
        ...parent,
        subTasks: [...(parent.subTasks || []), newSubtask],
      }));
    });
  }, []);

  const reorderTasks = useCallback((newOrder) => setData(newOrder), []);

  const reorderSubtasks = useCallback((parentId, newSubtasks) => {
    setData((prev) =>
      replaceRowById(prev, parentId, (parent) => ({
        ...parent,
        subTasks: newSubtasks,
      })),
    );
  }, []);

  useEffect(() => {
    if (pendingEditId) {
      const row = findRowById(data, pendingEditId);
      if (row) {
        startEdit(pendingEditId);
        setPendingEditId(null);
      }
    }
  }, [data, pendingEditId, startEdit]);

  return {
    data,
    editingRowId,
    editingDraft,
    patchEditingDraft,
    startEdit,
    saveEdit,
    cancelEdit,
    deleteRow,
    addNewTask,
    addNewSubtask,
    reorderTasks,
    reorderSubtasks,
  };
};

export default useProjectTable;

const findRowById = (rows, id) => {
  for (const row of rows) {
    if (row.id === id) return row;
    if (row.subTasks?.length) {
      const found = findRowById(row.subTasks, id);
      if (found) return found;
    }
  }
  return undefined;
};

const replaceRowById = (rows, id, updater) => {
  return rows.map((row) => {
    if (row.id === id) return updater(row);
    if (row.subTasks?.length) {
      return { ...row, subTasks: replaceRowById(row.subTasks, id, updater) };
    }
    return row;
  });
};

const deleteRowById = (rows, id) => {
  const out = [];
  for (const row of rows) {
    if (row.id === id) continue;
    if (row.subTasks?.length) {
      out.push({ ...row, subTasks: deleteRowById(row.subTasks, id) });
    } else {
      out.push(row);
    }
  }
  return out;
};
