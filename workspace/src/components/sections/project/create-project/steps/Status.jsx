import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import ColorPicker from 'components/base/color-picker/ColorPicker';
import StyledTextField from 'components/styled/StyledTextField';

const StatusRow = ({ id, group, index, onRemove, canRemove, colorPickerId }) => {
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
  const groupErrors = errors.statuses?.[group];

  return (
    <Stack
      ref={setNodeRef}
      direction="row"
      sx={{
        alignItems: 'center',
        gap: 1,
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
        placeholder={translateUi('ui.sections.project.create_project.steps.pending_96f608c1')}
        error={Boolean(groupErrors?.[index]?.label)}
        helperText={groupErrors?.[index]?.label?.message}
        {...register(`statuses.${group}.${index}.label`)}
      />

      <Controller
        name={`statuses.${group}.${index}.color`}
        control={control}
        render={({ field }) => (
          <ColorPicker id={colorPickerId} value={field.value} onChange={field.onChange} />
        )}
      />

      <IconButton
        aria-label={translateUi('ui.sections.project.create_project.steps.remove_status_1ef24586')}
        disabled={!canRemove}
        onClick={onRemove}
        sx={{ color: 'text.primary' }}
      >
        <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
      </IconButton>
    </Stack>
  );
};

const StatusGroup = ({ title, group }) => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `statuses.${group}`,
  });

  const handleDragEnd = (oldIndex, newIndex) => {
    move(oldIndex, newIndex);
  };

  return (
    <div>
      <Typography
        variant="overline"
        sx={{
          color: 'text.secondary',
        }}
      >
        {title}
      </Typography>
      <Stack sx={{ gap: 1.5, mt: 1 }}>
        <SortableDnd items={fields} handleDragEnd={handleDragEnd}>
          {fields.map((field, index) => (
            <StatusRow
              key={field.id}
              id={field.id}
              group={group}
              index={index}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
              colorPickerId={`status-${group}-${index}`}
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
    </div>
  );
};

const Status = () => {
  useFormContext();
  const { t: translateUi } = useTranslation();

  return (
    <Stack sx={{ gap: 2.5 }}>
      <StatusGroup title={translateUi('common_labels.incomplete')} group="incomplete" />
      <StatusGroup title={translateUi('common_labels.active')} group="active" />
      <StatusGroup title={translateUi('common_labels.completed')} group="completed" />
    </Stack>
  );
};

export default Status;
