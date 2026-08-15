import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Drawer, Grid, IconButton, Paper, Typography } from '@mui/material';
import { drawerClasses } from '@mui/material/Drawer';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import ProjectHeader from 'components/sections/project/common/ProjectHeader';
import CreateProjectPreview from 'components/sections/project/create-project/CreateProjectPreview';
import CreateProjectStepper from 'components/sections/project/create-project/CreateProjectStepper';
import useCreateProjectStepper from 'components/sections/project/create-project/useCreateProjectStepper';

const CreateProjectForm = () => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upLg = up('lg');
  const { topbarHeight } = useNavContext();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const methods = useCreateProjectStepper(activeStep);
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log('Create project form submitted:', values);
  };

  const projectSetupButton = (
    <Button
      variant="contained"
      color="primary"
      type="button"
      onClick={() => setDrawerOpen(true)}
      startIcon={<IconifyIcon icon="material-symbols:tune-rounded" sx={{ fontSize: 18 }} />}
    >
      {translateUi('ui.sections.project.create_project.createprojectform.project_setup_307abfd2')}
    </Button>
  );

  const stepperContent = (
    <Box sx={{ pb: 3 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {translateUi(
          'ui.sections.project.create_project.createprojectform.create_project_a8d8ff51',
        )}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 420,
        }}
      >
        {translateUi(
          'ui.sections.project.create_project.createprojectform.just_take_a_little_bit_time_to_give_us_some_informat_d716d43d',
        )}
      </Typography>

      <CreateProjectStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        completedSteps={completedSteps}
        setCompletedSteps={setCompletedSteps}
      />
    </Box>
  );

  return (
    <FormProvider {...methods}>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {!upLg && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .${drawerClasses.paper}`]: {
                width: 1,
                maxWidth: 375,
              },
            }}
          >
            <SimpleBar>
              <Box
                sx={{
                  py: 3,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {translateUi(
                    'ui.sections.project.create_project.createprojectform.project_setup_a0e72cd3',
                  )}
                </Typography>
                <IconButton color="default" size="small" onClick={() => setDrawerOpen(false)}>
                  <IconifyIcon
                    icon="material-symbols:close-small-rounded"
                    sx={{ fontSize: 24, color: 'neutral.dark' }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ px: 3, py: 3 }}>{stepperContent}</Box>
            </SimpleBar>
          </Drawer>
        )}

        <Grid container spacing={{ xs: 3, lg: 0 }} wrap="nowrap">
          {upLg && (
            <Grid
              size={{ lg: 3 }}
              sx={{
                flexShrink: 0,
                minWidth: 344,
              }}
            >
              <Paper
                sx={({ mixins }) => ({
                  height: mixins.contentHeight(topbarHeight),
                  overflow: 'hidden',
                  position: 'sticky',
                  top: topbarHeight,
                  bgcolor: 'background.paper',
                  p: { xs: 3, lg: 5 },
                  borderRadius: 0,
                  outline: 'none !important',
                })}
              >
                <SimpleBar>{stepperContent}</SimpleBar>
              </Paper>
            </Grid>
          )}

          <Grid size={{ xs: 12, lg: 9 }} sx={{ minWidth: 0 }}>
            {!upLg && (
              <ProjectHeader
                title={translateUi(
                  'ui.sections.project.create_project.createprojectform.create_a_project_a469a595',
                )}
                showTaskDialog={false}
                topActions={projectSetupButton}
              />
            )}
            <Box sx={{ p: { xs: 3, lg: 5 } }}>
              <CreateProjectPreview />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default CreateProjectForm;
