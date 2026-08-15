import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const EventPrivacy = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {translateUi('ui.sections.events.create_event.aside.privacy_cf01481f')}
      </Typography>
      <Controller
        rules={{ required: true }}
        name="eventPrivacy"
        defaultValue="private"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} aria-labelledby="public-event-checkbox" sx={{ rowGap: 3, mb: 3 }}>
            <FormControlLabel
              value="public"
              label={
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    mt: '7px',
                  }}
                >
                  {translateUi(
                    'ui.sections.events.create_event.aside.the_event_will_be_made_public_and_anyone_will_be_abl_9e5ad800',
                  )}
                </Typography>
              }
              control={<Radio />}
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label={
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    mt: '7px',
                  }}
                >
                  {translateUi(
                    'ui.sections.events.create_event.aside.only_people_invited_will_be_able_to_find_this_event__420218c4',
                  )}
                </Typography>
              }
            />
          </RadioGroup>
        )}
      />
      <div>
        <Button
          fullWidth
          color="neutral"
          variant="soft"
          size="small"
          startIcon={
            <IconifyIcon
              icon="material-symbols:outgoing-mail-outline-rounded"
              height={18}
              width={18}
              sx={{ mt: 0.5 }}
            />
          }
        >
          {translateUi('ui.sections.events.create_event.aside.send_invite_11a4b1af')}
        </Button>
        <Typography variant="caption" color="info" sx={{ mt: 1, textAlign: 'center' }}>
          {translateUi('ui.sections.events.create_event.aside.0_people_invited_5ef01f44')}
        </Typography>
      </div>
    </Box>
  );
};

export default EventPrivacy;
