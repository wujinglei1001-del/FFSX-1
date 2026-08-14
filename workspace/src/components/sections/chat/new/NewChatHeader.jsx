import { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import { users } from 'data/users';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useChatContext } from 'providers/ChatProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import RecipientAvatar from '../common/RecipientAvatar';

const NewChatHeader = ({ selectedRecipients, onRecipientsChange }) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { down } = useBreakpoints();
  const { handleChatSidebar } = useChatContext();

  const downSm = down('sm');

  useEffect(() => {
    inputRef.current?.focus();
    setTimeout(() => setOpen(true), 100);
    handleChatSidebar(false);
  }, []);

  return (
    <Paper sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center', mb: 3 }}>
        {downSm && (
          <Tooltip title="Conversation list">
            <Button
              shape="circle"
              variant="soft"
              color="neutral"
              onClick={() => handleChatSidebar(true)}
            >
              <IconifyIcon icon="material-symbols:chevron-left-rounded" fontSize={20} />
            </Button>
          </Tooltip>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
          }}
        >
          New message
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Typography
          sx={{
            color: 'text.secondary',
            mt: -0.5,
          }}
        >
          To:{' '}
        </Typography>
        <Autocomplete
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          multiple
          id="tags-standard"
          options={users}
          getOptionLabel={(option) => option.name}
          popupIcon={null}
          value={selectedRecipients}
          onChange={(_, newValue) => onRecipientsChange(newValue)}
          clearIcon={null}
          renderValue={(selectedOptions, getItemProps) =>
            selectedOptions.map((option, index) => {
              const { key, ...itemRest } = getItemProps({ index });

              return (
                <Chip
                  key={key}
                  label={option.name}
                  avatar={<Avatar src={option.avatar} />}
                  {...itemRest}
                />
              );
            })
          }
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;

            return (
              <Stack
                key={key}
                direction="row"
                component="li"
                {...optionProps}
                sx={[
                  {
                    gap: 2,
                    '& > img': { mr: 2, flexShrink: 0 },
                  },
                  ...(Array.isArray(optionProps.sx) ? optionProps.sx : [optionProps.sx]),
                ]}
              >
                <RecipientAvatar recipients={option} />
                <Typography sx={{ lineClamp: 1 }}>{option.name}</Typography>
              </Stack>
            );
          }}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              inputRef={inputRef}
              autoFocus
              size="large"
              fullWidth
              sx={{
                pt: 0,
                [`& .${inputBaseClasses.root}`]: {
                  p: '0px !important',
                  bgcolor: 'transparent',

                  '&:hover': { bgcolor: 'transparent' },

                  [`&.${inputBaseClasses.focused}`]: {
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                  },

                  [`& .${inputBaseClasses.input}`]: {
                    p: '0px !important',
                    height: '100% !important',
                  },
                },
              }}
            />
          )}
          sx={{
            flex: 1,
          }}
        />
      </Stack>
    </Paper>
  );
};

export default NewChatHeader;
