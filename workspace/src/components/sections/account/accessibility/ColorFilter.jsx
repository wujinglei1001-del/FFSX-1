import { useState } from 'react';
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
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';
import ColorOptions from './ColorOptions';

const ColorFilter = () => {
  const { t: translateUi } = useTranslation();
  const [enableColorFilter, setEnableColorFilter] = useState(false);
  const { control } = useFormContext();
  const {
    config: { assetsDir },
  } = useSettingsContext();

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.accessibility.colorfilter.color_filter_preview_444fc3d8',
          )}
        </Typography>
        <Stack sx={{ mb: 1.25 }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 2, width: 1, height: 1 }}>
            <div>
              <Image
                src={`${assetsDir}/images/account/3.webp`}
                sx={{ objectFit: 'contain', width: 1, height: 1 }}
              />
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Image
                src={`${assetsDir}/images/account/4.webp`}
                sx={{ objectFit: 'contain', width: 1, height: 1 }}
              />
            </div>
          </Stack>
          <ColorOptions />
        </Stack>
      </Stack>
      <Stack sx={{ gap: 3 }}>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <Switch
            checked={enableColorFilter}
            onChange={(e) => {
              setEnableColorFilter(e.target.checked);
            }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {translateUi('ui.sections.account.accessibility.colorfilter.enable_filter_2f2b7a71')}
          </Typography>
        </Stack>
        <FormControl>
          <Controller
            control={control}
            name="colorFilter"
            render={({ field }) => (
              <RadioGroup
                aria-labelledby="color-filter-group-label"
                sx={{ alignItems: 'flex-start' }}
                {...field}
              >
                <FormControlLabel
                  value="deuteranopia"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.account.accessibility.colorfilter.red_green_green_weak_deuteranopia_40f0f951',
                  )}
                  disabled={!enableColorFilter}
                />
                <FormControlLabel
                  value="protanopia"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.account.accessibility.colorfilter.red_green_red_weak_protanopia_6acff5fa',
                  )}
                  disabled={!enableColorFilter}
                />
                <FormControlLabel
                  value="trianopia"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.account.accessibility.colorfilter.blue_yellow_trianopia_c7aead85',
                  )}
                  disabled={!enableColorFilter}
                />
                <FormControlLabel
                  value="grayscale"
                  control={<Radio />}
                  label={translateUi(
                    'ui.sections.account.accessibility.colorfilter.grayscale_c8b0f2ed',
                  )}
                  disabled={!enableColorFilter}
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default ColorFilter;
