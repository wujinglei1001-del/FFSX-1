import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ApplicationFormSection from '../common/ApplicationFormSection';

const PreScreenQuestions = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <ApplicationFormSection name="Pre-Screen Questions">
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <div>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.hiring.candidate.job_application.1_why_did_you_choose_to_apply_to_this_company_f0fd7815',
            )}
          </Typography>
          <TextField
            label={translateUi('ui.sections.hiring.candidate.job_application.answer_a16a4eda')}
            fullWidth
            error={!!errors.questionaries?.preScreen?.applyingReason}
            helperText={errors.questionaries?.preScreen?.applyingReason?.message}
            {...register('questionaries.preScreen.applyingReason')}
          />
        </div>
        <div>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.hiring.candidate.job_application.2_what_are_your_greatest_strengths_4e342ad9',
            )}
          </Typography>
          <TextField
            label={translateUi('ui.sections.hiring.candidate.job_application.answer_a16a4eda')}
            fullWidth
            error={!!errors.questionaries?.preScreen?.greatestStrengths}
            helperText={errors.questionaries?.preScreen?.greatestStrengths?.message}
            {...register('questionaries.preScreen.greatestStrengths')}
          />
        </div>
        <div>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.hiring.candidate.job_application.3_how_do_you_prefer_to_work_on_tasks_0a671d11',
            )}
          </Typography>
          <Controller
            control={control}
            name="questionaries.preScreen.workPreference"
            render={({ field }) => (
              <RadioGroup
                aria-labelledby="color-filter-group-label"
                sx={{
                  alignItems: 'flex-start',
                  [`& .${formControlLabelClasses.label}`]: {
                    color: 'text.secondary',
                  },
                }}
                {...field}
              >
                <FormControlLabel
                  value="independent"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.hiring.candidate.job_application.independently_1a7e41be',
                  )}
                />
                <FormControlLabel
                  value="collaborative"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.hiring.candidate.job_application.collaboratively_5d7ee0c5',
                  )}
                />
                <FormControlLabel
                  value="clear-deadline"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.hiring.candidate.job_application.with_clear_deadlines_357fb1d3',
                  )}
                />
                <FormControlLabel
                  value="creative-freedom"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.hiring.candidate.job_application.with_creative_freedom_9e88c503',
                  )}
                />
              </RadioGroup>
            )}
          />
        </div>
        <div>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {translateUi(
              'ui.sections.hiring.candidate.job_application.4_have_you_worked_remotely_before_ea950bfe',
            )}
          </Typography>
          <Controller
            control={control}
            name="questionaries.preScreen.remoteWork"
            render={({ field }) => (
              <RadioGroup
                row
                aria-labelledby="color-filter-group-label"
                sx={{
                  alignItems: 'flex-start',
                  [`& .${formControlLabelClasses.label}`]: {
                    color: 'text.secondary',
                  },
                }}
                {...field}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={translateUi('ui.sections.hiring.candidate.job_application.yes_5397e058')}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label={translateUi('ui.sections.hiring.candidate.job_application.no_816c52fd')}
                />
              </RadioGroup>
            )}
          />
        </div>
      </Stack>
    </ApplicationFormSection>
  );
};

export default PreScreenQuestions;
