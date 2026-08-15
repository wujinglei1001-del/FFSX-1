import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import {
  dateFormats,
  languages,
  listSortOrders,
  numberFormats,
  regions,
  weekDays,
} from 'data/account/language-region';
import { useSnackbar } from 'notistack';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import PreferredLanguage from './PreferredLanguage';
import Region from './Region';

const LanguageRegionTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    defaultValues: {
      languages: [languages[0], languages[6], languages[8]],
      spellCheck: 'basic',
      checkerLanguages: {
        english: true,
        bangla: false,
        french: false,
      },
      region: regions[0],
      temperature: 'celcius',
      measurementSystem: 'metric',
      firstDayOfWeek: weekDays[0],
      dateFormat: dateFormats[0],
      numberFormat: numberFormats[0],
      listSortOrder: listSortOrders[0],
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
            'ui.sections.account.language_region.languageregiontabpanel.preferred_language_dd19a616',
          )}
          subtitle={translateUi(
            'ui.sections.account.language_region.languageregiontabpanel.choose_your_preferred_languages_for_content_and_comm_0bfda911',
          )}
          icon="material-symbols:translate"
        >
          <PreferredLanguage />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.language_region.languageregiontabpanel.region_0f217179',
          )}
          subtitle={translateUi(
            'ui.sections.account.language_region.languageregiontabpanel.set_your_region_settings_adjust_temperature_units_me_89b96345',
          )}
          icon="material-symbols:public"
        >
          <Region />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.language_region.languageregiontabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained">
              {translateUi(
                'ui.sections.account.language_region.languageregiontabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default LanguageRegionTabPanel;
