import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import CompletionSlider from './CompletionSlider';
import WeightNumberField from './WeightNumberField';

const ProgressWeightForm = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  const { fields, append, remove, replace, move } = useFieldArray({
    control,
    name: 'progressWeight.subGoals',
  });

  const isAddSubGoal = useWatch({
    control,
    name: 'progressWeight.addSubGoal',
  });

  const handleSubGoalChange = (value) => {
    if (!value) {
      replace([]);
    } else if (fields.length === 0) {
      append({ goal: 'New Subgoal' });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((column) => column.id === active.id);
      const newIndex = fields.findIndex((column) => column.id === over?.id);
      move(oldIndex, newIndex);
    }
  };
  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {translateUi('ui.sections.hrm.performance_management.new_goal.progress_weight_666aa222')}
      </Typography>
      <Stack
        sx={{
          gap: 4,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Stack
            sx={{
              gap: 1,
              alignItems: 'flex-start',
              flexGrow: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
              }}
            >
              {translateUi('ui.sections.hrm.performance_management.new_goal.completion_2ff25568')}
            </Typography>
            <CompletionSlider />
          </Stack>

          <Stack
            sx={{
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
              }}
            >
              {translateUi('ui.sections.hrm.performance_management.new_goal.weight_69c0b815')}
            </Typography>
            <WeightNumberField />
          </Stack>
        </Stack>

        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Controller
            name="progressWeight.addSubGoal"
            control={control}
            render={({ field: { value, onChange, ...rest } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      onChange(newValue);
                      handleSubGoalChange(newValue);
                    }}
                    {...rest}
                  />
                }
                label={translateUi(
                  'ui.sections.hrm.performance_management.new_goal.add_sub_goals_they_will_be_evenly_distributed_across_b07d1faf',
                )}
              />
            )}
          />
          {isAddSubGoal && (
            <SortableDnd items={fields} onDragEnd={handleDragEnd}>
              <Stack
                sx={{
                  gap: 2,
                }}
              >
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  {fields.map((field, index) => (
                    <SubGoalItem key={field.id} field={field} index={index} remove={remove} />
                  ))}
                </Stack>
                <Button
                  color="neutral"
                  startIcon={<IconifyIcon icon={'material-symbols:add-rounded'} />}
                  onClick={() => append({ goal: 'New Subgoal' })}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {translateUi(
                    'ui.sections.hrm.performance_management.new_goal.add_new_sub_goal_17f111fe',
                  )}
                </Button>
              </Stack>
            </SortableDnd>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProgressWeightForm;

const SubGoalItem = ({ index, field, remove }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });
  return (
    <Stack
      ref={setNodeRef}
      direction="row"
      {...attributes}
      sx={[
        {
          gap: 1,
          alignItems: 'center',
          transform: CSS.Transform.toString(transform),
          transition,
        },
        ...(Array.isArray(attributes.sx) ? attributes.sx : [attributes.sx]),
      ]}
    >
      <Button shape="square" color="neutral" {...listeners}>
        <IconifyIcon icon="material-symbols:drag-indicator" sx={{ cursor: 'grab', fontSize: 20 }} />
      </Button>
      <TextField
        fullWidth
        label={`Sub goal ${index + 1}`}
        {...register(`progressWeight.subGoals.${index}.goal`)}
        error={!!errors.progressWeight?.subGoals?.[index]?.goal}
        helperText={errors.progressWeight?.subGoals?.[index]?.goal?.message}
      />
      <Button shape="square" color="error" onClick={() => remove(index)}>
        <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
      </Button>
    </Stack>
  );
};
