import { useEffect, useRef } from 'react';

export const useRowDragDrop = ({ onRowReorder, enabled = true }) => {
  const draggedRowRef = useRef(null);
  const draggedRowIdRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const getDropPosition = (event, row) => {
      const rect = row.getBoundingClientRect();
      const clientY = event.clientY ?? event.pageY ?? 0;
      const offsetY = clientY - rect.top;
      return offsetY > rect.height / 2 ? 'after' : 'before';
    };

    const handleDragStart = (event) => {
      const target = event.target;
      const row = target?.closest('.sg-table-row');
      if (!row) return;

      const isDraggable = row.classList.contains('sg-table-row-level-1');
      if (!isDraggable) return;

      draggedRowRef.current = row;

      const rowId = row.getAttribute('data-row-id');
      if (rowId) {
        draggedRowIdRef.current = parseInt(rowId, 10);
      } else {
        const rowText = row.textContent?.trim();
        if (rowText) draggedRowIdRef.current = rowText;
      }

      row.classList.add('dragging');

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', '');
      }
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';

      const target = event.target;
      const row = target?.closest('.sg-table-row');
      if (!row || row === draggedRowRef.current) return;
      if (!row.classList.contains('sg-table-row-level-1')) return;

      const pos = getDropPosition(event, row);

      row.classList.remove('drag-over', 'drag-over-before', 'drag-over-after');
      row.classList.add('drag-over');

      if (pos === 'after') row.classList.add('drag-over-after');
      else row.classList.add('drag-over-before');
    };

    const handleDragLeave = (event) => {
      const target = event.target;
      const row = target?.closest('.sg-table-row');
      if (!row) return;
      row.classList.remove('drag-over', 'drag-over-before', 'drag-over-after');
    };

    const handleDrop = (event) => {
      event.preventDefault();

      const target = event.target;
      const targetRow = target?.closest('.sg-table-row');

      if (!targetRow || !draggedRowRef.current) return;
      if (!targetRow.classList.contains('sg-table-row-level-1')) return;
      if (!draggedRowIdRef.current) return;

      const pos = getDropPosition(event, targetRow);

      const targetRowId = targetRow.getAttribute('data-row-id');
      const targetRowText = targetRow.textContent?.trim();

      const targetId = targetRowId ? parseInt(targetRowId, 10) : targetRowText;
      const draggedId =
        typeof draggedRowIdRef.current === 'number'
          ? draggedRowIdRef.current
          : draggedRowIdRef.current;

      if (onRowReorder && draggedId !== targetId) {
        onRowReorder(draggedId, targetId, pos);
      }

      targetRow.classList.remove('drag-over', 'drag-over-before', 'drag-over-after');
      draggedRowRef.current.classList.remove('dragging');
      draggedRowRef.current = null;
      draggedRowIdRef.current = null;
    };

    const handleDragEnd = () => {
      document.querySelectorAll('.sg-table-row').forEach((row) => {
        row.classList.remove('dragging', 'drag-over', 'drag-over-before', 'drag-over-after');
      });
      draggedRowRef.current = null;
      draggedRowIdRef.current = null;
    };

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, [enabled, onRowReorder]);

  return {
    makeRowDraggable: (rowElement, rowId) => {
      rowElement.setAttribute('draggable', 'true');
      rowElement.setAttribute('data-row-id', rowId.toString());
      rowElement.classList.add('draggable-row');
    },
  };
};
