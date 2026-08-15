import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { filledInputClasses } from '@mui/material/FilledInput';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

const FinalAssessment = ({ assessment, sx }) => {
  const { t: translateUi } = useTranslation();
  const methods = useFormContext();
  return (
    <Stack
      sx={{
        gap: 1,
        ...sx,
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>
        {translateUi('ui.sections.hrm.performance_management.feedback.final_assessment_b88c2c33')}
      </Typography>
      {assessment ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {assessment}
        </Typography>
      ) : (
        <TextField
          multiline
          fullWidth
          rows={2}
          placeholder={translateUi(
            'ui.sections.hrm.performance_management.feedback.add_comment_d89450c8',
          )}
          helperText={
            <>
              <IconifyIcon icon="material-symbols:info-outline-rounded" sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {translateUi(
                  'ui.sections.hrm.performance_management.feedback.type_your_comment_and_press_enter_to_add_it_5929a481',
                )}
              </Typography>
            </>
          }
          sx={{
            [`& .${filledInputClasses.root}`]: { py: 1 },
            [`& .${formHelperTextClasses.root}`]: {
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            },
          }}
          {...methods?.register('finalAssessment')}
        />
      )}
    </Stack>
  );
};

export default FinalAssessment;
