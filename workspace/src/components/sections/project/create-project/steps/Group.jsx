import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, IconButton, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import ColorPicker from 'components/base/color-picker/ColorPicker';
import StyledTextField from 'components/styled/StyledTextField';

const GroupRow = ({ id, index, onRemove, canRemove }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const draggingStyle = isDragging ? { opacity: 0.4 } : {};

  return (
    <Stack
      ref={setNodeRef}
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
        transform: CSS.Translate.toString(transform),
        transition,
        ...draggingStyle,
      }}
    >
      <Button
        variant="text"
        color="neutral"
        shape="square"
        {...attributes}
        {...listeners}
        sx={{ cursor: 'grab', minWidth: 36 }}
      >
        <IconifyIcon icon="material-symbols:drag-indicator" fontSize={20} />
      </Button>
      <StyledTextField
        fullWidth
        placeholder={translateUi('ui.sections.project.create_project.steps.group_name_ebb7e14b')}
        error={Boolean(errors.groups?.[index]?.label)}
        helperText={errors.groups?.[index]?.label?.message}
        {...register(`groups.${index}.label`)}
      />
      <Controller
        name={`groups.${index}.color`}
        control={control}
        render={({ field }) => (
          <ColorPicker id={`group-color-${index}`} value={field.value} onChange={field.onChange} />
        )}
      />
      <IconButton
        aria-label={translateUi('ui.sections.project.create_project.steps.remove_group_9a5319bc')}
        disabled={!canRemove}
        onClick={onRemove}
        sx={{ color: 'text.primary' }}
      >
        <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
      </IconButton>
    </Stack>
  );
};

const Group = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'groups',
  });

  return (
    <Stack sx={{ gap: 1.5 }}>
      <SortableDnd
        items={fields}
        handleDragEnd={(oldIndex, newIndex) => {
          move(oldIndex, newIndex);
        }}
      >
        {fields.map((field, index) => (
          <GroupRow
            key={field.id}
            id={field.id}
            index={index}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}
      </SortableDnd>

      <Button
        variant="text"
        color="primary"
        sx={{ alignSelf: 'flex-start' }}
        startIcon={<IconifyIcon icon="material-symbols:add-rounded" fontSize={20} />}
        onClick={() => append({ label: '', color: '#E0E0E0' })}
      >
        {translateUi('ui.sections.project.create_project.steps.add_another_e9e7205b')}
      </Button>
    </Stack>
  );
};

export default Group;
