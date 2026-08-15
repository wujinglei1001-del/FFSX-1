import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import DraggableColumnItem from 'components/sections/kanban/create-board/steps/ColumnStage/DraggableColumnItem';

export const columnInfoSchema = yup.object().shape({
  columns: yup.array().of(
    yup.object().shape({
      columnType: yup
        .string()
        .required(i18n.t('ui.sections.kanban.create_board.steps.task_type_is_required_9beed0bf')),
      hasCardLimit: yup.boolean(),
      cardLimit: yup
        .number()
        .min(1, i18n.t('ui.sections.kanban.create_board.steps.min_1_c7689138'))
        .max(20, i18n.t('ui.sections.kanban.create_board.steps.max_20_393194b3')),
    }),
  ),
});

const ColumnStage = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    name: 'columns',
    control,
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((column) => column.id === active.id);
      const newIndex = fields.findIndex((column) => column.id === over?.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      <SortableDnd items={fields} onDragEnd={handleDragEnd}>
        <Stack sx={{ gap: 3, mb: 3 }}>
          {fields.map((item, index) => (
            <DraggableColumnItem key={item.id} item={item} index={index} remove={remove} />
          ))}
        </Stack>
      </SortableDnd>

      <Button
        variant="text"
        color="primary"
        startIcon={
          <IconifyIcon icon="material-symbols:add-circle-rounded" sx={{ height: 20, width: 20 }} />
        }
        onClick={() =>
          append({
            columnType: 'To Do',
            cardLimit: 20,
            color: 'warning.lighter',
            hasCardLimit: false,
          })
        }
      >
        {translateUi('ui.sections.kanban.create_board.steps.add_new_column_f1790322')}
      </Button>
    </Box>
  );
};

export default ColumnStage;
