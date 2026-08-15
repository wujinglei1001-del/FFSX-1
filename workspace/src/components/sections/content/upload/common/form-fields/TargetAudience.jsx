import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, FormHelperText, Radio, RadioGroup, Typography } from '@mui/material';

const TargetAudience = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {translateUi('ui.sections.content.upload.common.target_audience_5cc6318e')}
      </Typography>
      <Controller
        name="targetAudience"
        control={control}
        defaultValue="all"
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label={translateUi(
                'ui.sections.content.upload.common.suitable_for_all_audiences_0f97d558',
              )}
            />
            <FormControlLabel
              value="children"
              control={<Radio />}
              label={translateUi(
                'ui.sections.content.upload.common.specifically_designed_for_children_43b444d3',
              )}
            />
            <FormControlLabel
              value="adults"
              control={<Radio />}
              label={translateUi(
                'ui.sections.content.upload.common.contains_content_intended_for_adults_3fe75991',
              )}
            />
          </RadioGroup>
        )}
      />
      {errors.targetAudience && (
        <FormHelperText error>{errors.targetAudience.message}</FormHelperText>
      )}
    </div>
  );
};

export default TargetAudience;
