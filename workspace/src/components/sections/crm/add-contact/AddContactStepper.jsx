import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import CompanyInfoForm, {
  companyInfoSchema,
} from 'components/sections/crm/add-contact/steps/CompanyInfoForm';
import LeadInfoForm, {
  leadInfoSchema,
} from 'components/sections/crm/add-contact/steps/LeadInfoForm';
import PersonalInfoForm, {
  personalInfoSchema,
} from 'components/sections/crm/add-contact/steps/PersonalInfoForm';

const steps = [
  {
    id: 1,
    label: (
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
        }}
      >
        {i18n.t('ui.sections.crm.add_contact.addcontactstepper.personal_info_87a403cb')}
      </Typography>
    ),
    content: (
      <PersonalInfoForm
        label={i18n.t(
          'ui.sections.crm.add_contact.addcontactstepper.personal_information_ad12e422',
        )}
      />
    ),
  },
  {
    id: 2,
    label: (
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          '& br': { display: { xs: 'none', sm: 'inline' } },
        }}
      >
        {i18n.t('ui.sections.crm.add_contact.addcontactstepper.company_info_439ae199')}
      </Typography>
    ),
    content: (
      <CompanyInfoForm
        label={i18n.t('ui.sections.crm.add_contact.addcontactstepper.company_information_2042c7a2')}
      />
    ),
  },
  {
    id: 3,
    label: (
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          '& br': { display: { xs: 'none', sm: 'inline' } },
        }}
      >
        {i18n.t('ui.sections.crm.add_contact.addcontactstepper.lead_info_235321a7')}
      </Typography>
    ),
    content: (
      <LeadInfoForm
        label={i18n.t('ui.sections.crm.add_contact.addcontactstepper.lead_information_9334d1f3')}
      />
    ),
  },
];

const validationSchemas = [personalInfoSchema, companyInfoSchema, leadInfoSchema];

const AddContactStepper = () => {
  const { t: translateUi } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(validationSchemas[activeStep]),
    defaultValues: {
      personalInfo: {},
      companyInfo: {},
      leadInfo: {},
    },
  });

  const { handleSubmit, reset } = methods;

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setCompletedSteps((prev) => ({ ...prev, [activeStep]: true }));
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    console.log('Form data', data);
    enqueueSnackbar('Contact added successfully', { variant: 'success' });
    reset();
    setCompletedSteps({});
    setActiveStep(0);
  };
  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)();
    } else {
      handleNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map(({ id, label }, index) => (
            <Step key={id} completed={!!completedSteps[index]} sx={{ p: 0 }}>
              <StepLabel onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleFormSubmit}>
          <Box sx={{ mb: 7 }}>{steps[activeStep]?.content}</Box>

          <Stack
            direction="row"
            sx={{
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            {activeStep > 0 && (
              <Button variant="soft" color="neutral" onClick={handleBack} sx={{ px: 4 }}>
                {translateUi('ui.sections.crm.add_contact.addcontactstepper.back_b52b36b7')}
              </Button>
            )}

            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="soft" sx={{ px: 4 }}>
                {translateUi('ui.sections.crm.add_contact.addcontactstepper.save_efc007a3')}
              </Button>
            ) : (
              <Button type="submit" variant="soft">
                {translateUi(
                  'ui.sections.crm.add_contact.addcontactstepper.save_continue_98329f93',
                )}
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default AddContactStepper;
