import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

const GeneralSettings = () => {
  const { t: translateUi } = useTranslation();
  const { control, watch } = useFormContext();
  const { showActivity, allwaysShowSidebar, additonalSettings } = watch();

  return (
    <Stack sx={{ gap: 3, mb: 5 }}>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.chat_preferences.generalsettings.show_activity_a306bf73',
          )}
        </Typography>
        {showActivity.map((item, index) => (
          <Controller
            key={item.name}
            control={control}
            name={`showActivity.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={item.label}
                sx={{ gap: 2, ml: 0 }}
              />
            )}
          />
        ))}
      </FormControl>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.chat_preferences.generalsettings.always_show_in_sidebar_b7ad5619',
          )}
        </Typography>
        {allwaysShowSidebar.map((item, index) => (
          <Controller
            key={item.name}
            control={control}
            name={`allwaysShowSidebar.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={item.label}
                sx={{ gap: 2, ml: 0 }}
              />
            )}
          />
        ))}
      </FormControl>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.chat_preferences.generalsettings.sort_adc4e96a')}
        </Typography>
        <Controller
          control={control}
          name="sortOption"
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="color-filter-group-label"
              sx={{ alignItems: 'flex-start' }}
              {...field}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.chat_preferences.generalsettings.all_your_conversations_89fd6970',
                )}
              />
              <FormControlLabel
                value="unread"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.chat_preferences.generalsettings.unread_only_faab23eb',
                )}
              />
              <FormControlLabel
                value="mentions"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.chat_preferences.generalsettings.mentions_only_1dbdcfef',
                )}
              />
              <FormControlLabel
                value="unread_starred"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.chat_preferences.generalsettings.unread_conversations_plus_your_starred_section_5858b9aa',
                )}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.chat_preferences.generalsettings.always_show_in_sidebar_b7ad5619',
          )}
        </Typography>
        {additonalSettings.map((item, index) => (
          <Controller
            key={item.name}
            control={control}
            name={`additonalSettings.${index}.checked`}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} {...field} />}
                label={item.label}
                sx={{ gap: 2, ml: 0 }}
              />
            )}
          />
        ))}
      </FormControl>
    </Stack>
  );
};

export default GeneralSettings;
