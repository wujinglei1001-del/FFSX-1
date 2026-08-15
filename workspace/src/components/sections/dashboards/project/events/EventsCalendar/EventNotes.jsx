import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import Editor from 'components/base/Editor';

const EventNotes = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography
        component="label"
        sx={{
          mx: 1,
          fontSize: 12,
          fontWeight: 500,
          color: 'text.secondary',
        }}
      >
        {translateUi('ui.sections.dashboards.project.events.add_notes_21f30167')}
      </Typography>
      <Controller
        control={control}
        name="notes"
        render={({ field }) => (
          <Editor
            onChange={field.onChange}
            content={field.value}
            isValid={!errors.notes}
            sx={{
              '& .MuiTiptap-RichTextContent-root .tiptap': {
                minHeight: 96,
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default EventNotes;
