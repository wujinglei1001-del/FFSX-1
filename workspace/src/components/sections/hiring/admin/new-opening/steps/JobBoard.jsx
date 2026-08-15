import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import * as yup from 'yup';

export const jobBoardSchema = yup.object({
  boards: yup
    .object({
      linkedIn: yup.boolean().required(),
      indeed: yup.boolean().required(),
      facebook: yup.boolean().required(),
    })
    .required(),
});

const JobBoard = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  const { up } = useBreakpoints();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  const upSm = up('sm');

  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid size={6}>
        <Paper background={2} sx={{ px: { xs: 1, sm: 2 }, py: 1, outline: 0, borderRadius: 2 }}>
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Avatar
              src={`${assetsDir}/images/logo/29.svg`}
              alt={translateUi('ui.sections.hiring.admin.new_opening.linkedin_logo_ace0db17')}
              sx={{ width: 40, height: 40, bgcolor: 'transparent' }}
            />
            <Stack
              direction="row"
              sx={{
                width: 1,
                justifyContent: { xs: 'flex-end', sm: 'space-between' },
                alignItems: 'center',
              }}
            >
              {upSm && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  LinkedIn
                </Typography>
              )}
              <Controller
                control={control}
                name="boards.linkedIn"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label=""
                    sx={{ mr: 0 }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={6}>
        <Paper background={2} sx={{ px: { xs: 1, sm: 2 }, py: 1, outline: 0, borderRadius: 2 }}>
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Avatar
              src={`${assetsDir}/images/logo/28.svg`}
              alt={translateUi('ui.sections.hiring.admin.new_opening.indeed_logo_e72bb5d1')}
              sx={{ width: 40, height: 40, bgcolor: 'transparent' }}
            />
            <Stack
              direction="row"
              sx={{
                width: 1,
                justifyContent: { xs: 'flex-end', sm: 'space-between' },
                alignItems: 'center',
              }}
            >
              {upSm && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {translateUi('ui.sections.hiring.admin.new_opening.indeed_52186fa5')}
                </Typography>
              )}
              <Controller
                control={control}
                name="boards.indeed"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label=""
                    sx={{ mr: 0 }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={6}>
        <Paper background={2} sx={{ px: { xs: 1, sm: 2 }, py: 1, outline: 0, borderRadius: 2 }}>
          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Avatar
              src={`${assetsDir}/images/logo/27.svg`}
              alt={translateUi('ui.sections.hiring.admin.new_opening.facebook_logo_f72dc2bb')}
              sx={{ width: 40, height: 40, bgcolor: 'transparent' }}
            />
            <Stack
              direction="row"
              sx={{
                width: 1,
                justifyContent: { xs: 'flex-end', sm: 'space-between' },
                alignItems: 'center',
              }}
            >
              {upSm && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Facebook
                </Typography>
              )}
              <Controller
                control={control}
                name="boards.facebook"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label=""
                    sx={{ mr: 0 }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default JobBoard;
