import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import StyledTextField from 'components/styled/StyledTextField';

const Transcript = () => {
  const { t: translateUi } = useTranslation();
  const {
    formState: { errors },
    register,
    control,
  } = useFormContext();

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.content.upload.media.subtitle_transcript_4f854923')}
        </Typography>
        <Controller
          control={control}
          name="transcript.autoGenerate"
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch size="small" checked={field.value} {...field} />}
              label={translateUi('ui.sections.content.upload.media.auto_generate_a970fbbd')}
              sx={{ gap: 1, mx: 0, flexDirection: 'row-reverse' }}
            />
          )}
        />
      </Stack>
      <StyledTextField
        fullWidth
        multiline
        rows={8}
        placeholder={translateUi('ui.sections.content.upload.media.add_subtitle_44a6804c')}
        error={!!errors.transcript?.subtitle}
        helperText={errors.transcript?.subtitle?.message}
        {...register('transcript.subtitle')}
        sx={{
          '& .MuiInputBase-root': {
            pt: 0,
          },
        }}
      />
    </div>
  );
};

export default Transcript;
