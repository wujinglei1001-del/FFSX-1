import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Typography,
  stepLabelClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Inventory from './steps/Inventory';
import MediaFiles from './steps/MediaFiles';
import NameDescription from './steps/NameDescription';
import PricingQuantity from './steps/PricingQuantity';
import Shipping from './steps/Shipping';
import Tags from './steps/Tags';
import ProductInfo from './steps/product-information/ProductInfo';
import Variations from './steps/variations/ProductVariants';
import VitalInfo from './steps/vital-info/VitalInfo';
import useProductListingForm from './useProductListingForm';

const steps = [
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.vital_info_8daec801');
    },
    content: <VitalInfo />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.name_and_description_fa2fb5bc');
    },
    content: <NameDescription />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.product_information_31439650');
    },
    content: <ProductInfo />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.images_and_videos_242a4f6d');
    },
    content: <MediaFiles />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.variations_4fba657a');
    },
    content: <Variations />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.pricing_and_quantity_ff555181');
    },
    content: <PricingQuantity />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.inventory_300d29fd');
    },
    content: <Inventory />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.shipping_694e6062');
    },
    content: <Shipping />,
  },
  {
    get label() {
      return i18n.t('ui.sections.ecommerce.admin.product_listing.tag_982963c1');
    },
    content: <Tags />,
  },
];

const ProductListingStepper = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useProductListingForm(activeStep);

  const { handleSubmit, trigger, watch } = methods;

  const data = watch();

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    console.log({ data });
    enqueueSnackbar('Product added successfully', { variant: 'success' });
    navigate(paths.adminProductList);
  };

  const handleProceed = async () => {
    const isValid = await trigger();
    console.log({ data });

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
      <Box component="form" id="productListingForm" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep} nonLinear connector={<Divider />} orientation="vertical">
          {steps.map((step, index) => {
            const isLastStep = activeStep === steps.length - 1;

            return (
              <Step key={step.label} completed={completedSteps[index]}>
                <Container maxWidth="md" sx={{ p: { xs: 3, md: 5 } }}>
                  <StepButton
                    onClick={() => setActiveStep(index)}
                    sx={{
                      py: 0,
                      [`& .${stepLabelClasses.iconContainer}`]: {
                        pr: 2,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {step.label}
                    </Typography>
                  </StepButton>
                  <StepContent sx={{ border: 'none', m: 0, pl: { xs: 0, sm: 5 }, pr: 0 }}>
                    <Box
                      sx={{
                        my: { xs: 3, md: 5 },
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
                          justifyContent: isLastStep ? 'space-between' : 'flex-start',
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
                          startIcon={<IconifyIcon icon="material-symbols:chevron-left-rounded" />}
                        >
                          {translateUi(
                            'ui.sections.ecommerce.admin.product_listing.previous_50f94286',
                          )}
                        </Button>
                      )}
                      {!isLastStep ? (
                        <Button
                          type="button"
                          variant="soft"
                          color="neutral"
                          onClick={handleProceed}
                          endIcon={<IconifyIcon icon="material-symbols:chevron-right-rounded" />}
                        >
                          {translateUi(
                            'ui.sections.ecommerce.admin.product_listing.finish_and_proceed_ff0cf9d4',
                          )}
                        </Button>
                      ) : (
                        <Stack
                          direction="row"
                          sx={{
                            rowGap: 5,
                            columnGap: 1,
                            width: { xs: 1, sm: 'unset' },
                          }}
                        >
                          <Button
                            type="button"
                            fullWidth
                            variant="soft"
                            color="primary"
                            sx={{ whiteSpace: 'nowrap' }}
                          >
                            {translateUi(
                              'ui.sections.ecommerce.admin.product_listing.archive_product_8ae22add',
                            )}
                          </Button>
                          <Button
                            form="productListingForm"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ whiteSpace: 'nowrap' }}
                          >
                            {translateUi(
                              'ui.sections.ecommerce.admin.product_listing.publish_product_5eeadba1',
                            )}
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </StepContent>
                </Container>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </FormProvider>
  );
};

export default ProductListingStepper;
