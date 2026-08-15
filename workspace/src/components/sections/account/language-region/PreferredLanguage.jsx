import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  formControlLabelClasses,
} from '@mui/material';
import Languages from './Languages';

const PreferredLanguage = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <Stack sx={{ gap: 3, alignItems: 'flex-start' }}>
      <Languages />
      <FormControl component="fieldset" sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.language_region.preferredlanguage.spell_check_adc4ef1a',
          )}
        </Typography>
        <Controller
          name="spellCheck"
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="spell-check-radio-button-group-label"
              sx={{ alignItems: 'flex-start' }}
              {...field}
            >
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.language_region.preferredlanguage.basic_spell_check_1926421b',
                )}
              />
              <FormControlLabel
                value="advanced"
                control={<Radio />}
                label={
                  <>
                    <Typography component="span" variant="body2">
                      {translateUi(
                        'ui.sections.account.language_region.preferredlanguage.advanced_spell_check_5cdfd42b',
                      )}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                      {translateUi(
                        'ui.sections.account.language_region.preferredlanguage.the_same_spell_checker_that_is_used_in_google_will_b_cb7deb20',
                      )}{' '}
                    </Typography>
                  </>
                }
                sx={{
                  alignItems: 'flex-start',
                  [`.${formControlLabelClasses.label}`]: {
                    mt: 0.5,
                  },
                }}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      <FormControl component="fieldset" sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.language_region.preferredlanguage.use_spell_checker_for_59455d65',
          )}
        </Typography>
        <FormGroup aria-labelledby="spell-checker-checkboxes-label">
          <Controller
            name="checkerLanguages.english"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label={translateUi(
                  'ui.sections.account.language_region.preferredlanguage.english_us_primary_fc2eaf15',
                )}
              />
            )}
          />
          <Controller
            name="checkerLanguages.bangla"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label={translateUi(
                  'ui.sections.account.language_region.preferredlanguage.bangla_68ea04ad',
                )}
              />
            )}
          />
          <Controller
            name="checkerLanguages.french"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label={translateUi(
                  'ui.sections.account.language_region.preferredlanguage.french_44389f6a',
                )}
              />
            )}
          />
        </FormGroup>
      </FormControl>
    </Stack>
  );
};

export default PreferredLanguage;
