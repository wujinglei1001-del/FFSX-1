import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Slider, Stack, TextField, Typography, inputBaseClasses } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const Font = () => {
  const { t: translateUi } = useTranslation();
  const { control, watch } = useFormContext();
  const textSize = watch('textSize');

  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {translateUi('ui.sections.account.accessibility.font.text_size_3cc6e124')}
      </Typography>
      <TextField
        multiline
        rows={3.5}
        size="medium"
        placeholder={translateUi(
          'ui.sections.account.accessibility.font.lorem_ipsum_dolor_sit_amet_consectetur_0a15b7b7',
        )}
        sx={{
          [`& .${inputBaseClasses.input}`]: {
            fontSize: `${Number(textSize)}px`,
          },
        }}
      />
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <IconifyIcon icon="material-symbols:text-fields" sx={{ fontSize: 24 }} />
        <Controller
          control={control}
          name="textSize"
          render={({ field }) => (
            <Slider
              aria-label={translateUi('common.accessibility.font_size')}
              getAriaValueText={(val) => `${val}px`}
              valueLabelFormat={(val) => `${Number(val)}px`}
              valueLabelDisplay="auto"
              min={12}
              max={24}
              step={1}
              {...field}
            />
          )}
        />
        <IconifyIcon icon="material-symbols:text-fields" sx={{ fontSize: 48 }} />
      </Stack>
    </Stack>
  );
};

export default Font;
