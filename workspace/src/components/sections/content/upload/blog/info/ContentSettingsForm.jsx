import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import Accessibility from '../../common/form-fields/Accessibility';
import Language from '../../common/form-fields/Language';
import Tags from '../../common/form-fields/Tags';
import TargetAudience from '../../common/form-fields/TargetAudience';
import Topics from '../../common/form-fields/Topics';

const ContentSettingsForm = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack
      sx={{
        gap: 3,
      }}
    >
      <Topics />
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.upload.blog.canonical_link_b78af068')}
        </Typography>

        <StyledTextField
          {...register('canonicalLink')}
          fullWidth
          placeholder={translateUi('ui.sections.content.upload.blog.link_d0517071')}
          error={!!errors.canonicalLink}
          helperText={errors.canonicalLink?.message}
        />
      </div>
      <Tags />
      <Grid container spacing={1}>
        <Grid size={6}>
          <Accessibility />
        </Grid>

        <Grid size={6}>
          <Language />
        </Grid>
      </Grid>
      <TargetAudience />
    </Stack>
  );
};

export default ContentSettingsForm;
