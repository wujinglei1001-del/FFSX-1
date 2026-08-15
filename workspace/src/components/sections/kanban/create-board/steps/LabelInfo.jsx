import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import ColorPicker from 'components/base/color-picker/ColorPicker';

export const labelInfoFormSchema = yup.object().shape({
  labels: yup
    .array()
    .of(
      yup.object().shape({
        label: yup
          .string()
          .required(
            i18n.t('ui.sections.kanban.create_board.steps.label_name_is_required_b83e3fb2'),
          ),
        color: yup
          .string()
          .required(i18n.t('ui.sections.kanban.create_board.steps.color_is_required_4f0d080c')),
      }),
    )
    .required(),
});

const LabelInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'labels',
  });

  return (
    <>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          direction="row"
          sx={{ gap: 2, alignItems: 'center', mb: 3, position: 'relative' }}
        >
          <Controller
            control={control}
            name={`labels.${index}.label`}
            render={({ field: controllerField }) => {
              return (
                <TextField
                  fullWidth
                  label={`Label ${index + 1}`}
                  error={!!errors.labels?.[index]?.label}
                  helperText={errors.labels?.[index]?.label?.message}
                  {...controllerField}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={`labels.${index}.color`}
            render={({ field: controllerField }) => (
              <ColorPicker
                id={`label-color-picker-${index}`}
                value={controllerField.value}
                onChange={(color) => controllerField.onChange(color)}
              />
            )}
          />

          <IconButton color="error" disabled={!(fields.length > 1)} onClick={() => remove(index)}>
            <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={20} />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="text"
        color="primary"
        startIcon={
          <IconifyIcon icon="material-symbols:add-circle-rounded" sx={{ height: 20, width: 20 }} />
        }
        onClick={() => append({ label: '', color: 'primary.lighter' })}
      >
        {translateUi('ui.sections.kanban.create_board.steps.add_label_591203a2')}
      </Button>
    </>
  );
};

export default LabelInfo;
