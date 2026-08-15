import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import { stepLabelClasses } from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Address from './steps/Address';
import Contract from './steps/Contract';
import JobInformation from './steps/JobInformation';
import Pay from './steps/Pay';
import PersonalInformation from './steps/PersonalInformation';
import useNewMemberForm from './useNewMemberForm';

const steps = [
  {
    get label() {
      return i18n.t('ui.sections.member.new_member.newmemberstepper.personal_information_ad12e422');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.member.new_member.newmemberstepper.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
      );
    },
    content: <PersonalInformation />,
  },
  {
    get label() {
      return i18n.t('ui.sections.member.new_member.newmemberstepper.job_information_3e131dd2');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.member.new_member.newmemberstepper.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
      );
    },
    content: <JobInformation />,
  },
  {
    get label() {
      return i18n.t('ui.sections.member.new_member.newmemberstepper.address_d70f93df');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.member.new_member.newmemberstepper.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
      );
    },
    content: <Address />,
  },
  {
    get label() {
      return i18n.t('ui.sections.member.new_member.newmemberstepper.contract_5a0ba3bb');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.member.new_member.newmemberstepper.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
      );
    },
    content: <Contract />,
  },
  {
    get label() {
      return i18n.t('ui.sections.member.new_member.newmemberstepper.pay_80c37573');
    },
    get subtitle() {
      return i18n.t(
        'ui.sections.member.new_member.newmemberstepper.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
      );
    },
    content: <Pay />,
  },
];
const NewMemberStepper = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useNewMemberForm(activeStep);
  const { handleSubmit, trigger, watch } = methods;
  const data = watch();
  const handleNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handlePreviousStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const onSubmit = handleSubmit((data) => {
    console.log({ data, activeStep });
    enqueueSnackbar('New member added successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    navigate(paths.members);
  });
  const handleProceed = async () => {
    const isValid = await trigger();
    console.log({ data, isValid, activeStep });
    if (isValid) {
      setCompletedSteps((prevCompletedSteps) => {
        const newCompleted = [...prevCompletedSteps];
        newCompleted[activeStep] = true;
        return newCompleted;
      });
      handleNextStep();
    }
  };
  return (
    <FormProvider {...methods}>
      <Box component="form" id="newMemberForm" noValidate onSubmit={onSubmit}>
        <Stepper
          activeStep={activeStep}
          nonLinear
          connector={<Divider />}
          orientation="vertical"
          sx={{ gap: 4 }}
        >
          {steps.map((step, index) => {
            const isLastStep = activeStep === steps.length - 1;
            return (
              <Step key={step.label} completed={completedSteps[index]}>
                <StepButton
                  onClick={() => setActiveStep(index)}
                  sx={{
                    py: 0,
                    [`& .${stepLabelClasses.iconContainer}`]: {
                      pr: 2,
                      py: 0.5,
                      alignSelf: 'flex-start',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      lineHeight: 1.5,
                    }}
                  >
                    {step.label}
                  </Typography>
                </StepButton>
                <StepContent sx={{ border: 'none', m: 0, pl: { xs: 0, sm: 5.5 }, pr: 0 }}>
                  <Typography variant="body2" color="info">
                    {step.subtitle}
                  </Typography>
                  <Box
                    sx={{
                      my: 3,
                    }}
                  >
                    {step.content}
                  </Box>

                  <Stack
                    direction={isLastStep ? { xs: 'column', sm: 'row' } : 'row'}
                    sx={[
                      {
                        rowGap: 5,
                        columnGap: 1,
                        width: 1,
                        justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        type="button"
                        variant="soft"
                        color="neutral"
                        sx={{ alignSelf: 'flex-start' }}
                        onClick={handlePreviousStep}
                      >
                        {translateUi(
                          'ui.sections.member.new_member.newmemberstepper.previous_50f94286',
                        )}
                      </Button>
                    )}
                    {!isLastStep ? (
                      <Button
                        type="button"
                        variant="soft"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProceed();
                        }}
                        endIcon={<IconifyIcon icon="material-symbols:chevron-right-rounded" />}
                      >
                        {translateUi(
                          'ui.sections.member.new_member.newmemberstepper.continue_2e026239',
                        )}
                      </Button>
                    ) : (
                      <Button
                        form="newMemberForm"
                        type="submit"
                        variant="contained"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {translateUi(
                          'ui.sections.member.new_member.newmemberstepper.save_efc007a3',
                        )}
                      </Button>
                    )}
                  </Stack>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </FormProvider>
  );
};
export default NewMemberStepper;
