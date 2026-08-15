import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, TextField } from '@mui/material';

const ProjectTitle = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        fullWidth
        label={translateUi('ui.sections.project.create_project.steps.project_title_221834d1')}
        variant="filled"
        error={Boolean(errors.projectTitle)}
        helperText={errors.projectTitle?.message}
        {...register('projectTitle')}
      />
    </Stack>
  );
};

export default ProjectTitle;
