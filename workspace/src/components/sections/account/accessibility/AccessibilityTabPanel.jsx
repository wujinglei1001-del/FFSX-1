import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import { useThemeMode } from 'hooks/useThemeMode';
import { useSnackbar } from 'notistack';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import ColorFilter from './ColorFilter';
import Contrast from './Contrast';
import Font from './Font';

const AccessibilityTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();

  const methods = useForm({
    defaultValues: {
      textSize: 14,
      colorFilter: null,
      contrast: isDark ? 'dark' : 'light',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    console.log(data);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        divider={<Divider />}
        sx={{ gap: 5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.font_b97c4d4c',
          )}
          subtitle={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.adjust_the_font_size_to_optimize_readability_and_min_84f7604a',
          )}
          icon="material-symbols:text-fields"
        >
          <Font />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.color_filter_41117a47',
          )}
          subtitle={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.customize_color_filters_to_suit_your_vision_needs_ma_b18d58b3',
          )}
          icon="material-symbols:visibility-outline"
        >
          <ColorFilter />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.contrast_c4fc37ad',
          )}
          subtitle={translateUi(
            'ui.sections.account.accessibility.accessibilitytabpanel.select_a_theme_that_suits_your_style_to_personalize__5a9a3d94',
          )}
          icon="material-symbols:visibility-outline"
        >
          <Contrast />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.accessibility.accessibilitytabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained">
              {translateUi(
                'ui.sections.account.accessibility.accessibilitytabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default AccessibilityTabPanel;
