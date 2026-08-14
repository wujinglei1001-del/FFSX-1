import { useFormContext } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';

const ProjectTitle = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        fullWidth
        label="Project title"
        variant="filled"
        error={Boolean(errors.projectTitle)}
        helperText={errors.projectTitle?.message}
        {...register('projectTitle')}
      />
    </Stack>
  );
};

export default ProjectTitle;
