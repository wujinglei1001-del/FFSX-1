import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, Typography, inputBaseClasses } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import Thumbnail from '../../common/form-fields/Thumbnail';

const PrimaryContentForm = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const title = watch('title') || '';
  const subText = watch('subText') || '';

  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.upload.blog.title_768e0c1c')}
        </Typography>
        <StyledTextField
          {...register('title')}
          fullWidth
          placeholder={translateUi('ui.sections.content.upload.blog.title_768e0c1c')}
          error={!!errors.title}
          helperText={errors.title?.message}
          slotProps={{
            htmlInput: {
              maxLength: 75,
            },
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            textAlign: 'right',
            mt: 0.5,
            mr: 1.5,
          }}
        >
          {title.length}/75
        </Typography>
      </div>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.upload.blog.sub_text_45eb5488')}
        </Typography>

        <StyledTextField
          {...register('subText')}
          fullWidth
          multiline
          rows={3}
          placeholder={translateUi('ui.sections.content.upload.blog.write_the_sub_text_5760c92c')}
          error={!!errors.subText}
          helperText={errors.subText?.message}
          slotProps={{
            htmlInput: {
              maxLength: 140,
            },
          }}
          sx={{ [`.${inputBaseClasses.root}`]: { p: 0 } }}
        />

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            textAlign: 'right',
            mt: 0.5,
            mr: 1.5,
          }}
        >
          {subText.length}/140
        </Typography>
      </div>
      <Thumbnail />
    </Stack>
  );
};

export default PrimaryContentForm;
