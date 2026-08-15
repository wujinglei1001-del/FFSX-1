import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const PodcastPlaylistMeta = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid size={6}>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {translateUi('ui.sections.content.upload.media.episode_no_16878bb5')}
          </Typography>

          <StyledTextField
            placeholder={translateUi('ui.sections.content.upload.media.number_b7baa1d4')}
            type="number"
            fullWidth
            error={!!errors.episodeNo}
            inputProps={{ min: 1 }}
            {...register('episodeNo', { valueAsNumber: true })}
          />
          {errors.episodeNo && (
            <FormHelperText error sx={{ mx: '14px' }}>
              {errors.episodeNo.message}
            </FormHelperText>
          )}
        </Box>
      </Grid>
      <Grid size={6}>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {translateUi('ui.sections.content.upload.media.season_no_2253828b')}
          </Typography>

          <StyledTextField
            placeholder={translateUi('ui.sections.content.upload.media.number_b7baa1d4')}
            type="number"
            fullWidth
            error={!!errors.seasonNo}
            inputProps={{ min: 1 }}
            {...register('seasonNo', { valueAsNumber: true })}
          />
          {errors.seasonNo && (
            <FormHelperText error sx={{ mx: '14px' }}>
              {errors.seasonNo.message}
            </FormHelperText>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default PodcastPlaylistMeta;
