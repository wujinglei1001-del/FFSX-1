import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  Stepper,
  Typography,
  stepConnectorClasses,
  stepIconClasses,
  stepLabelClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import DefaultView from 'components/sections/project/create-project/steps/DefaultView';
import Group from 'components/sections/project/create-project/steps/Group';
import InviteMembers from 'components/sections/project/create-project/steps/InviteMembers';
import ProjectTitle from 'components/sections/project/create-project/steps/ProjectTitle';
import Status from 'components/sections/project/create-project/steps/Status';
import Tasks from 'components/sections/project/create-project/steps/Tasks';

const steps = [
  {
    get label() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.project_title_221834d1',
      );
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.tell_us_the_title_of_your_project_c7e8adfc',
      );
    },
    content: <ProjectTitle />,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.create_project.createprojectstepper.tasks_090ec5f5');
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.what_are_some_tasks_you_would_like_to_get_done_9b87def9',
      );
    },
    content: <Tasks />,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.create_project.createprojectstepper.group_171a0606');
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.group_these_tasks_into_different_stages_1fb4a639',
      );
    },
    content: <Group />,
  },
  {
    get label() {
      return i18n.t('ui.sections.project.create_project.createprojectstepper.status_bae7d5be');
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.set_different_statuses_to_attach_with_different_task_cc83b036',
      );
    },
    content: <Status />,
  },
  {
    get label() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.invite_members_a30eb836',
      );
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.add_collaborators_to_your_project_4ba7824d',
      );
    },
    content: <InviteMembers />,
  },
  {
    get label() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.default_view_a244c8d8',
      );
    },
    get description() {
      return i18n.t(
        'ui.sections.project.create_project.createprojectstepper.choose_a_default_view_to_start_65b12060',
      );
    },
    content: <DefaultView />,
  },
];

const getBorderColor = (index, activeStep, completedSteps) => {
  if (completedSteps.includes(index)) return 'success.main';
  if (index <= activeStep) return 'primary.main';
  return 'dividerLight';
};

const CreateProjectStepper = ({ activeStep, setActiveStep, completedSteps, setCompletedSteps }) => {
  const { t: translateUi } = useTranslation();
  const { trigger } = useFormContext();

  const handleContinue = async (event) => {
    event.preventDefault();
    const isValid = await trigger();
    if (!isValid) return;

    setCompletedSteps((prev) => (prev.includes(activeStep) ? prev : [...prev, activeStep]));
    setActiveStep(activeStep + 1);
  };

  const handleBack = (event) => {
    event.preventDefault();
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  return (
    <Box sx={{ pt: { xs: 3, md: 5 }, pr: 1 }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical" connector={null}>
        {steps.map((step, index) => (
          <Step
            key={step.label}
            completed={completedSteps.includes(index)}
            sx={{
              [`& .${stepConnectorClasses.line}`]: {
                borderWidth: 0,
              },
            }}
          >
            <StepButton
              disableRipple
              onClick={() => setActiveStep(index)}
              sx={{
                py: 0,
                [`& .${stepLabelClasses.iconContainer}`]: {
                  pr: 2,
                  fontWeight: 500,
                  [`& .${stepIconClasses.root}`]: {
                    width: 24,
                    height: 24,
                  },
                },
                [`& .${stepLabelClasses.root}`]: {
                  py: 0,
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: activeStep === index ? 700 : 500,
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </StepButton>

            <StepContent
              sx={{
                pl: 3.5,
                pr: 0,
                my: 1,
                borderColor: getBorderColor(index, activeStep, completedSteps),
                borderLeftWidth: 2,
              }}
            >
              <Box sx={{ mt: 2, mb: { xs: 2, md: 4 } }}>{step.content}</Box>

              <Box sx={{ display: 'flex', gap: 0.5, pb: 3, justifyContent: 'flex-end' }}>
                {activeStep > 0 && (
                  <Button variant="soft" color="neutral" onClick={handleBack} type="button">
                    {translateUi(
                      'ui.sections.project.create_project.createprojectstepper.back_b52b36b7',
                    )}
                  </Button>
                )}

                {steps.length - 1 === activeStep ? (
                  <Button variant="contained" type="submit">
                    {translateUi(
                      'ui.sections.project.create_project.createprojectstepper.create_project_a8d8ff51',
                    )}
                  </Button>
                ) : (
                  <Button variant="soft" onClick={handleContinue} type="button">
                    {translateUi(
                      'ui.sections.project.create_project.createprojectstepper.continue_2e026239',
                    )}
                  </Button>
                )}
              </Box>
            </StepContent>

            <StepConnector
              sx={{
                mt: 1,
                mb: 0.5,
                minHeight: 24,
                ...(activeStep === index && { display: 'none' }),
                ...(index + 1 === steps.length && { display: 'none' }),
                ...(activeStep !== index && {
                  borderColor: completedSteps.includes(index) ? 'success.main' : 'dividerLight',
                  borderLeftStyle: 'solid',
                  borderLeftWidth: 2,
                }),
              }}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CreateProjectStepper;
