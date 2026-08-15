import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  stepLabelClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import { enqueueSnackbar } from 'notistack';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import RenderStepData from './RenderStepData';
import CustomerInfo, { customerInfoFormSchema } from './steps/CustomerInfo';
import DeliveryOptions, { deliveryOptionFormSchema } from './steps/DeliveryOptions';
import ShippingAddress, { shippingAddressFormSchema } from './steps/ShippingAddress';

const steps = [
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.checkout.customer_information_49a89ca9');
    },
    content: <CustomerInfo />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.checkout.shipping_address_b3854a10');
    },
    content: <ShippingAddress />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.customer.checkout.delivery_options_d273874e');
    },
    content: <DeliveryOptions />,
  },
];

const checkoutFormSchema = [
  customerInfoFormSchema,
  shippingAddressFormSchema,
  deliveryOptionFormSchema,
  null,
];

const CheckoutStepper = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const methods = useForm({
    //@ts-ignore
    resolver: checkoutFormSchema[activeStep]
      ? //@ts-ignore
        yupResolver(checkoutFormSchema[activeStep])
      : undefined,
    defaultValues: {
      customer: {
        email: 'anyname@email.com',
        firstName: 'Captain',
        lastName: 'Haddock',
        phoneNumber: '12514463453',
      },
      shippingAddress: {
        street: 'Apt: 6/B, 192 Edsel Road',
        townCity: 'Van Nuys',
        postcode: '96580',
        country: 'USA',
        state: 'California',
      },
    },
  });

  const { handleSubmit, trigger, watch } = methods;

  const data = watch();

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepEdit = (step) => {
    setActiveStep(step);
  };

  const onSubmit = (data) => {
    console.log({ data });

    methods.reset();
    enqueueSnackbar('Checkout successful!', {
      variant: 'success',
    });
    navigate(paths.payment);
  };

  const handleProceed = async () => {
    const isValid = await trigger();

    if (isValid) {
      setCompletedSteps((prevCompletedSteps) => {
        const newCompleted = [...prevCompletedSteps];
        newCompleted[activeStep] = true;

        return newCompleted;
      });
      handleNextStep();
    }
  };

  const renderStepData = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <RenderStepData
            stepData={[
              {
                label: translateUi(
                  'ui.sections.ecommerce.customer.checkout.email_address_c94d3175',
                ),
                value: data.customer.email,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.first_name_7e568a90'),
                value: data.customer.firstName,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.last_name_adec36a8'),
                value: data.customer.lastName,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.phone_number_ab25d61b'),
                value: data.customer.phoneNumber,
              },
            ]}
          />
        );

      case 1:
        return (
          <RenderStepData
            stepData={[
              {
                label: translateUi(
                  'ui.sections.ecommerce.customer.checkout.street_address_497a500a',
                ),
                value: data.shippingAddress.street,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.town_city_51d6d30f'),
                value: data.shippingAddress.townCity,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.postcode_ef4d9e99'),
                value: data.shippingAddress.postcode,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.country_d523ebbd'),
                value: data.shippingAddress.country,
              },
              {
                label: translateUi('ui.sections.ecommerce.customer.checkout.state_a7250206'),
                value: data.shippingAddress.state,
              },
            ]}
          />
        );
      case 2:
        return (
          <RenderStepData
            stepData={[
              {
                label: translateUi(
                  'ui.sections.ecommerce.customer.checkout.delivery_option_87c269d5',
                ),
                value: data.deliveryOption,
              },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" id="checkoutForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          connector={<Divider sx={{ my: 4 }} />}
          orientation="vertical"
        >
          {steps.map((step, index) => {
            const isLastStep = activeStep === steps.length - 1;

            return (
              <Step key={step.label} completed={completedSteps[index]}>
                <StepLabel
                  sx={{
                    py: 0,
                    [`& .${stepLabelClasses.iconContainer}`]: {
                      pr: 2,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        lineHeight: 1.4,
                      }}
                    >
                      {step.label}
                    </Typography>
                    {activeStep !== index && completedSteps[index] && (
                      <Button variant="text" size="small" onClick={() => handleStepEdit(index)}>
                        {translateUi('ui.sections.ecommerce.customer.checkout.edit_5301648d')}
                      </Button>
                    )}
                  </Stack>
                </StepLabel>
                <StepContent sx={{ border: 'none', m: 0, pl: 5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'info.main',
                      mt: 1,
                    }}
                  >
                    {translateUi(
                      'ui.sections.ecommerce.customer.checkout.please_fill_out_all_the_required_fields_to_continue_d5cd4c4a',
                    )}
                  </Typography>

                  {step.content}

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.disabled',
                    }}
                  >
                    <Link href={paths.defaultJwtLogin}>
                      {translateUi('ui.sections.ecommerce.customer.checkout.login_4e5a2893')}
                    </Link>{' '}
                    {translateUi('common.or')}{' '}
                    <Link href={paths.defaultJwtSignup}>
                      {translateUi('ui.sections.ecommerce.customer.checkout.signup_894bc414')}
                    </Link>
                    {translateUi(
                      'ui.sections.ecommerce.customer.checkout.to_save_your_information_6c71dfbe',
                    )}
                  </Typography>
                  {!isLastStep && (
                    <Box
                      sx={{
                        textAlign: 'right',
                        mt: 4,
                      }}
                    >
                      <Button
                        type="button"
                        variant="soft"
                        color="primary"
                        endIcon={
                          <IconifyIcon
                            icon="material-symbols:chevron-right-rounded"
                            fontSize="20px !important"
                          />
                        }
                        onClick={handleProceed}
                      >
                        {translateUi('ui.sections.ecommerce.customer.checkout.continue_2e026239')}
                      </Button>
                    </Box>
                  )}
                </StepContent>
                {activeStep !== index && completedSteps[index] && renderStepData(index)}
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </FormProvider>
  );
};

export default CheckoutStepper;
