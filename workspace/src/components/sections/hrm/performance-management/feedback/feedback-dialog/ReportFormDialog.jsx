import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { filledInputClasses } from '@mui/material/FilledInput';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import FinalAssessment from './FinalAssessment';
import Questions from './Questions';
import RatingCard from './RatingCard';
import ReportInfo from './ReportInfo';

const reportFormValuesSchema = yup.object({
  communication: yup.object({
    rating: yup.array().of(yup.number().required()).required(),
    comment: yup.string().required().nullable(),
  }),
  teamwork: yup.object({
    rating: yup.array().of(yup.number().required()).required(),
    comment: yup.string().required().nullable(),
  }),
  problemSolving: yup.object({
    rating: yup.array().of(yup.number().required()).required(),
    comment: yup.string().required().nullable(),
  }),
  questions: yup.array().of(yup.string().required()).required().nullable(),
  finalAssessment: yup.string().required().nullable(),
});

const ReportFormDialog = ({ feedback, onClose, sx, ...rest }) => {
  const { t: translateUi } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(reportFormValuesSchema),
    defaultValues: {
      communication: { rating: [5, 5, 5], comment: '' },
      teamwork: { rating: [5, 5, 5, 5], comment: '' },
      problemSolving: { rating: [5, 5, 5], comment: '' },
      questions: [],
      finalAssessment: '',
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log({ data });
    enqueueSnackbar('Assessment submitted successfully', { variant: 'success' });
    onClose();
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        scroll="body"
        maxWidth={false}
        onClose={onClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit(onSubmit),
          },
        }}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            borderRadius: 6,
            overflow: 'visible',
            maxWidth: 600,
            width: { md: 1 },
            ...sx,
          },
        }}
        {...rest}
      >
        <DialogTitle component={Box} sx={{ p: { xs: 3, md: 5 } }}>
          <Stack
            direction="row"
            sx={{
              gap: 1,
              mb: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Avatar src={feedback.user.avatar} sx={{ width: 56, height: 56 }} />
              <Stack
                sx={{
                  gap: 0.5,
                }}
              >
                <Typography variant="h6">{feedback.user.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {`${feedback.user.empId}  ${feedback.user.designation}`}
                </Typography>
              </Stack>
            </Stack>
            <Button shape="circle" onClick={onClose} size="small" color="neutral">
              <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 18 }} />
            </Button>
          </Stack>

          <Stack
            direction="row"
            sx={{
              gap: 1,
              mb: 1,
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                {translateUi(
                  'ui.sections.hrm.performance_management.feedback.appraisal_type_faa94102',
                )}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {feedback.appraisalType}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                {translateUi('ui.sections.hrm.performance_management.feedback.submitted_2e00359b')}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {dayjs(feedback.date).format('MMM D, YYYY')}
              </Typography>
            </Box>
          </Stack>

          <RatingCard
            title={translateUi(
              'ui.sections.hrm.performance_management.feedback.average_rating_3843a4b5',
            )}
            value={feedback.rating}
            paperProps={{
              background: 2,
            }}
            typographyProps={{
              variant: 'subtitle1',
              fontWeight: 700,
            }}
            ratingProps={{
              size: 'medium',
            }}
          />
        </DialogTitle>

        <DialogContent sx={{ pt: 4, p: { xs: 3, md: 5 } }}>
          <Stack
            sx={{
              gap: 3,
            }}
          >
            <ReportInfo
              title={translateUi(
                'ui.sections.hrm.performance_management.feedback.communication_ade0d50c',
              )}
              fieldPrefix="communication"
              ratingList={[
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.clarity_03543111',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.listening_dc353487',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.speaking_a771fe66',
                  ),
                  rating: 5,
                },
              ]}
              formField={
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  placeholder={translateUi(
                    'ui.sections.hrm.performance_management.feedback.add_comment_d89450c8',
                  )}
                  error={!!errors.communication?.comment}
                  helperText={
                    <>
                      <IconifyIcon
                        icon="material-symbols:info-outline-rounded"
                        sx={{ fontSize: 16 }}
                      />
                      <Typography variant="caption">
                        {translateUi(
                          'ui.sections.hrm.performance_management.feedback.type_your_comment_and_press_enter_to_add_it_5929a481',
                        )}
                      </Typography>
                    </>
                  }
                  sx={{
                    [`& .${filledInputClasses.root}`]: { py: 1 },
                    [`& .${formHelperTextClasses.root}`]: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'text.secondary',
                    },
                  }}
                  {...register('communication.comment')}
                />
              }
            />

            <ReportInfo
              title={translateUi(
                'ui.sections.hrm.performance_management.feedback.teamwork_d1f2c905',
              )}
              fieldPrefix="teamwork"
              ratingList={[
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.cooperation_c2057e30',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.supportiveness_a51f0c5a',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.conflict_resolution_18f5e901',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.respect_for_others_a36d3800',
                  ),
                  rating: 5,
                },
              ]}
              formField={
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  placeholder={translateUi(
                    'ui.sections.hrm.performance_management.feedback.add_comment_d89450c8',
                  )}
                  error={!!errors.teamwork?.comment}
                  helperText={
                    <>
                      <IconifyIcon
                        icon="material-symbols:info-outline-rounded"
                        sx={{ fontSize: 16 }}
                      />
                      <Typography variant="caption">
                        {translateUi(
                          'ui.sections.hrm.performance_management.feedback.type_your_comment_and_press_enter_to_add_it_5929a481',
                        )}
                      </Typography>
                    </>
                  }
                  sx={{
                    [`& .${filledInputClasses.root}`]: { py: 1 },
                    [`& .${formHelperTextClasses.root}`]: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'text.secondary',
                    },
                  }}
                  {...register('teamwork.comment')}
                />
              }
            />

            <ReportInfo
              title={translateUi(
                'ui.sections.hrm.performance_management.feedback.problem_solving_531c2fd0',
              )}
              fieldPrefix="problemSolving"
              ratingList={[
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.analytical_thinking_b08753b9',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.decision_making_9594d42d',
                  ),
                  rating: 5,
                },
                {
                  label: translateUi(
                    'ui.sections.hrm.performance_management.feedback.creativity_1bcd331b',
                  ),
                  rating: 5,
                },
              ]}
              formField={
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  placeholder={translateUi(
                    'ui.sections.hrm.performance_management.feedback.add_comment_d89450c8',
                  )}
                  error={!!errors.problemSolving?.comment}
                  helperText={
                    <>
                      <IconifyIcon
                        icon="material-symbols:info-outline-rounded"
                        sx={{ fontSize: 16 }}
                      />
                      <Typography variant="caption">
                        {translateUi(
                          'ui.sections.hrm.performance_management.feedback.type_your_comment_and_press_enter_to_add_it_5929a481',
                        )}
                      </Typography>
                    </>
                  }
                  sx={{
                    [`& .${filledInputClasses.root}`]: { py: 1 },
                    [`& .${formHelperTextClasses.root}`]: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'text.secondary',
                    },
                  }}
                  {...register('problemSolving.comment')}
                />
              }
            />

            <Questions
              questions={[
                {
                  question: translateUi(
                    'ui.sections.hrm.performance_management.feedback.how_does_the_employee_handle_communication_challenge_4ecbe7e3',
                  ),
                },
                {
                  question: translateUi(
                    'ui.sections.hrm.performance_management.feedback.how_does_the_employee_demonstrated_teamwork_7fd7742d',
                  ),
                },
              ]}
            />

            <FinalAssessment />
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            pt: 0,
            pb: { xs: 3, md: 5 },
            px: { xs: 3, md: 5 },
          }}
        >
          <Button color="neutral" onClick={() => onClose()}>
            {translateUi('ui.sections.hrm.performance_management.feedback.cancel_77dfd213')}
          </Button>
          <Button type="reset" variant="soft" color="neutral" onClick={() => onClose()}>
            {translateUi('ui.sections.hrm.performance_management.feedback.save_efc007a3')}
          </Button>
          <Button type="submit" variant="contained">
            {translateUi('ui.sections.hrm.performance_management.feedback.submit_2dacf659')}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default ReportFormDialog;
