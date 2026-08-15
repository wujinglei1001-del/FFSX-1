import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import OptionRow from './OptionRow';
import Questionaries from './Questionaries';

export const applicationDetailsSchema = yup.object({
  candidateData: yup.object({
    name: yup.boolean().required(),
    email: yup.boolean().required(),
    phoneNo: yup.boolean().required(),
  }),
  options: yup.object({
    image: yup.string().required(),
    address: yup.string().required(),
    referredBy: yup.string().required(),
    desiredSalary: yup.string().required(),
    resume: yup.string().required(),
    coverLetter: yup.string().required(),
    websitePortfolio: yup.string().required(),
    education: yup.string().required(),
    workExperience: yup.string().required(),
  }),
});

const ApplicationDetails = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <Stack
      sx={{
        gap: 3,
        alignItems: 'flex-start',
      }}
    >
      <Button
        variant="soft"
        size="small"
        color="neutral"
        startIcon={<IconifyIcon icon="material-symbols:preview" />}
      >
        {translateUi('ui.sections.hiring.admin.new_opening.preview_f1fbb2b4')}
      </Button>
      <Box sx={{ width: 1 }}>
        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          {translateUi('ui.sections.hiring.admin.new_opening.candidate_data_2a98fdee')}
        </Typography>
        <Grid
          container
          sx={{
            mb: 4,
          }}
        >
          <Grid size={{ xs: 6, sm: 4 }}>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textWrap: 'nowrap',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.name_709a2322')}
              </Typography>
              <Controller
                control={control}
                name="candidateData.name"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi('ui.sections.hiring.admin.new_opening.required_eed6bfb4')}
                    sx={{
                      ml: 0,
                      [`& .${formControlLabelClasses.label}`]: { color: 'text.secondary' },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textWrap: 'nowrap',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.email_84add5b2')}
              </Typography>
              <Controller
                control={control}
                name="candidateData.email"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi('ui.sections.hiring.admin.new_opening.required_eed6bfb4')}
                    sx={{
                      ml: 0,
                      [`& .${formControlLabelClasses.label}`]: { color: 'text.secondary' },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 9, sm: 4 }}>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textWrap: 'nowrap',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.phone_no_8578b945')}
              </Typography>
              <Controller
                control={control}
                name="candidateData.phoneNo"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi('ui.sections.hiring.admin.new_opening.required_eed6bfb4')}
                    sx={{
                      ml: 0,
                      [`& .${formControlLabelClasses.label}`]: { color: 'text.secondary' },
                    }}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>

        <Stack
          divider={
            <Divider flexItem orientation="horizontal" sx={{ borderColor: 'dividerLight' }} />
          }
          sx={{ mb: 3 }}
        >
          <Stack
            direction="row"
            sx={{
              gap: 1,
              px: { xs: 1, sm: 3 },
              py: 1,
              height: 46,
              bgcolor: 'background.elevation1',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Stack
              sx={{
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              <Typography variant="subtitle2">
                {translateUi('ui.sections.hiring.admin.new_opening.option_e31d9722')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                justifyContent: 'center',
                flexBasis: { xs: '17.5%', sm: '20%' },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.required_eed6bfb4')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                justifyContent: 'center',
                flexBasis: { xs: '17.5%', sm: '20%' },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.optional_0c6c4102')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                justifyContent: 'center',
                flexBasis: { xs: '17.5%', sm: '20%' },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                }}
              >
                {translateUi('ui.sections.hiring.admin.new_opening.disabled_f4f4473d')}
              </Typography>
            </Stack>
          </Stack>
          <Controller
            control={control}
            name="options.image"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.image_50e19fda')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.address"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.address_d70f93df')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.referredBy"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.referred_by_433a5789')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.desiredSalary"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.desired_salary_f683579b')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.resume"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.resume_b3bd0b5a')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.coverLetter"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.cover_letter_80c40a5c')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.websitePortfolio"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi(
                  'ui.sections.hiring.admin.new_opening.website_portfolio_3b8f63bd',
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="options.education"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.education_aaf87fe5')}
              />
            )}
          />
          <Controller
            control={control}
            name="options.workExperience"
            render={({ field }) => (
              <OptionRow
                field={field}
                label={translateUi('ui.sections.hiring.admin.new_opening.work_experience_dfcdb446')}
              />
            )}
          />
        </Stack>

        <Questionaries />
      </Box>
    </Stack>
  );
};

export default ApplicationDetails;
