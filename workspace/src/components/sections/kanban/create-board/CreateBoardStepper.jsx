import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Stack,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  Stepper,
  Typography,
  stepConnectorClasses,
  stepLabelClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import Background from 'components/sections/kanban/create-board/steps/Background/Background';
import BasicInfo from 'components/sections/kanban/create-board/steps/BasicInfo';
import ColumnStage from 'components/sections/kanban/create-board/steps/ColumnStage/ColumnStage';
import LabelInfo from 'components/sections/kanban/create-board/steps/LabelInfo';
import TeamInvite from 'components/sections/kanban/create-board/steps/TeamInvite/TeamInvite';
import useCreateBoardForm from 'components/sections/kanban/create-board/useCreateBoardStepper';

const steps = [
  {
    get label() {
      return i18n.t(
        'ui.sections.kanban.create_board.createboardstepper.basic_information_b0d5be39',
      );
    },
    content: <BasicInfo />,
  },
  {
    get label() {
      return i18n.t('ui.sections.kanban.create_board.createboardstepper.column_stages_611b6221');
    },
    content: <ColumnStage />,
  },
  {
    get label() {
      return i18n.t('ui.sections.kanban.create_board.createboardstepper.background_64dd60fe');
    },
    content: <Background />,
  },
  {
    get label() {
      return i18n.t('ui.sections.kanban.create_board.createboardstepper.tag_label_dbd33c23');
    },
    content: <LabelInfo />,
  },
  {
    get label() {
      return i18n.t('ui.sections.kanban.create_board.createboardstepper.invite_your_team_722fe78c');
    },
    content: <TeamInvite />,
  },
];

const getBorderColor = (index, activeStep, completedSteps) => {
  if (completedSteps.includes(index)) {
    return 'success.main';
  }
  if (index <= activeStep) {
    return 'primary.main';
  }

  return 'dividerLight';
};

const CreateBoardStepper = () => {
  const { t: translateUi } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useCreateBoardForm(activeStep);
  const { handleSubmit, trigger } = methods;

  const handleSaveAndContinue = async (event) => {
    event.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setCompletedSteps((prev) => [...prev, activeStep]);
      setActiveStep((prev) => prev + 1);
    } else {
      enqueueSnackbar('Please complete the required fields before continuing.', {
        variant: 'error',
      });
    }
  };

  const handleSkip = async () => {
    setActiveStep((prev) => prev + 1);
  };

  const onSubmit = (values) => {
    console.log('Form submitted:', values);
    enqueueSnackbar('Board created successfully', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 680 }}>
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
                onClick={() => setActiveStep(index)}
                sx={{
                  py: 0,
                  [`& .${stepLabelClasses.iconContainer}`]: {
                    pr: 2,
                    fontWeight: 500,
                  },
                  [`& .${stepLabelClasses.root}`]: {
                    py: 0,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: activeStep === index ? 700 : 500,
                  }}
                >
                  {step.label}
                </Typography>
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
                <Box
                  sx={{
                    mt: 2,
                    mb: { xs: 2, md: 4 },
                  }}
                >
                  {step.content}
                </Box>
                <Stack direction="row" sx={{ gap: 2, mb: 0, pb: 3 }}>
                  {steps.length - 1 === activeStep ? (
                    <Button variant="contained" type="submit">
                      {translateUi(
                        'ui.sections.kanban.create_board.createboardstepper.create_board_fc6965dc',
                      )}
                    </Button>
                  ) : (
                    <>
                      <Button variant="soft" onClick={handleSaveAndContinue} type="button">
                        {translateUi(
                          'ui.sections.kanban.create_board.createboardstepper.save_continue_98329f93',
                        )}
                      </Button>
                      <Button variant="text" color="neutral" onClick={handleSkip} type="button">
                        {translateUi(
                          'ui.sections.kanban.create_board.createboardstepper.skip_3da47453',
                        )}
                      </Button>
                    </>
                  )}
                </Stack>
              </StepContent>
              <StepConnector
                sx={{
                  mt: 1,
                  mb: 0.5,
                  minHeight: 24,
                  ...(activeStep === index && {
                    display: 'none',
                  }),
                  ...(index + 1 === steps.length && {
                    display: 'none',
                  }),
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
    </FormProvider>
  );
};

export default CreateBoardStepper;
