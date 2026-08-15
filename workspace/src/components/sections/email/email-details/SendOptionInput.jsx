import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Avatar,
  Chip,
  MenuItem,
  Stack,
  Typography,
  buttonBaseClasses,
  inputBaseClasses,
} from '@mui/material';
import { defaultEmails } from 'data/email';
import { useEmailContext } from 'providers/EmailProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledFormControl from 'components/styled/StyledFormControl';
import StyledSelect from 'components/styled/StyledSelect';
import StyledTextField from 'components/styled/StyledTextField';

const SendOptionInput = ({ setSendType, sendType }) => {
  const { t: translateUi } = useTranslation();
  const {
    emailState: { email },
  } = useEmailContext();
  const [values, setValues] = useState([email.user.email, ...defaultEmails]);
  const handleChange = (event) => {
    setSendType(event.target.value);
  };
  useEffect(() => {
    if (sendType === 'Reply') {
      setValues([email.user.email]);
    } else {
      setValues([]);
    }
  }, [sendType, email]);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap' }}>
      <StyledFormControl>
        <StyledSelect
          variant="filled"
          inputProps={{ 'aria-label': 'Send type' }}
          value={sendType}
          onChange={handleChange}
          renderValue={() => (
            <Typography
              variant="subtitle2"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 3 }}
            >
              <IconifyIcon
                icon={
                  sendType === 'Reply'
                    ? 'material-symbols:reply-rounded'
                    : 'material-symbols:forward-rounded'
                }
                sx={{ fontSize: 20 }}
              />
              {sendType}
            </Typography>
          )}
          sx={{ alignSelf: 'flex-start' }}
        >
          <MenuItem value="Reply">
            <IconifyIcon icon="material-symbols:reply-rounded" sx={{ fontSize: 20, mr: 1 }} />
            {translateUi('ui.sections.email.email_details.sendoptioninput.reply_6c2bb735')}
          </MenuItem>
          <MenuItem value="Forward">
            <IconifyIcon icon="material-symbols:forward-rounded" sx={{ fontSize: 20, mr: 1 }} />
            {translateUi('ui.sections.email.email_details.sendoptioninput.forward_ba4e7226')}
          </MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <Autocomplete
        sx={{ flex: 1 }}
        multiple
        freeSolo
        options={defaultEmails}
        value={values}
        disableClearable
        onChange={(event, newValue) => setValues(newValue)}
        renderValue={(value, getItemProps) =>
          value.map((option, index) => {
            const { key, ...rest } = getItemProps({ index });

            return (
              <Chip
                key={key}
                variant="outlined"
                size="medium"
                sx={{ [`&.${buttonBaseClasses.root}`]: { mt: 0 } }}
                avatar={
                  option === email?.user.email ? (
                    <Avatar
                      alt={translateUi(
                        'ui.sections.email.email_details.sendoptioninput.natacha_a235cf0c',
                      )}
                      src={email?.user.avatar}
                    />
                  ) : undefined
                }
                color="neutral"
                label={option}
                {...rest}
              />
            );
          })
        }
        renderInput={(params) => (
          <StyledTextField
            {...params}
            type="email"
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                bgcolor: 'unset',
                gap: 0.5,
                ['&:hover']: {
                  bgcolor: 'unset',
                },
                [`&.${inputBaseClasses.focused}`]: {
                  bgcolor: 'unset !important',
                  boxShadow: 'none',
                },
              },
            }}
            variant="filled"
            placeholder={translateUi(
              'ui.sections.email.email_details.sendoptioninput.type_4b997f01',
            )}
          />
        )}
      />
    </Stack>
  );
};

export default SendOptionInput;
