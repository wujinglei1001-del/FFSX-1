import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';
import FinalAssessment from './FinalAssessment';
import Questions from './Questions';
import RatingCard from './RatingCard';
import ReportInfo from './ReportInfo';

const ReportDialog = ({ feedback, onClose, sx, ...rest }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Dialog
      scroll="body"
      maxWidth={false}
      onClose={onClose}
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
            comment="Demonstrates clear and concise communication across all levels, ensuring information is understood and effectively conveyed within the team."
          />

          <ReportInfo
            title={translateUi('ui.sections.hrm.performance_management.feedback.teamwork_d1f2c905')}
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
            comment="Actively contributes to team goals by collaborating well with others, showing a strong sense of responsibility and mutual support."
          />

          <ReportInfo
            title={translateUi(
              'ui.sections.hrm.performance_management.feedback.problem_solving_531c2fd0',
            )}
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
          />

          <Questions
            questions={[
              {
                question: translateUi(
                  'ui.sections.hrm.performance_management.feedback.how_does_the_employee_handle_communication_challenge_4ecbe7e3',
                ),
                answer: translateUi(
                  'ui.sections.hrm.performance_management.feedback.communicates_clearly_listens_well_and_resolves_misun_6acc2729',
                ),
              },
              {
                question: translateUi(
                  'ui.sections.hrm.performance_management.feedback.how_does_the_employee_demonstrated_teamwork_7fd7742d',
                ),
                answer: translateUi(
                  'ui.sections.hrm.performance_management.feedback.collaborated_effectively_during_a_key_project_helpin_6205af0e',
                ),
              },
            ]}
          />

          <FinalAssessment assessment="A reliable team member with strong communication, teamwork, and problem-solving skiss. Consistently contributes to positive outcomes." />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
