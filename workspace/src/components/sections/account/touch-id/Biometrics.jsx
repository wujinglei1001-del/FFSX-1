import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';

const Biometrics = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.touch_id.biometrics.manage_touch_id_features_6ff4a848')}
        </Typography>
        <Stack sx={{ gap: 1 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <InfoCard
              key={index}
              sx={{
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                  bgcolor: 'background.elevation2',
                  '& .iconify': {
                    visibility: 'visible',
                  },
                },
              }}
            >
              <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                <IconifyIcon icon="material-symbols-light:fingerprint" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {translateUi('ui.sections.account.touch_id.biometrics.fingerprint_fed4c905')}
                  {index + 1}
                </Typography>
              </Stack>
              <IconifyIcon
                icon="material-symbols:delete-outline-rounded"
                sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
              />
            </InfoCard>
          ))}
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          startIcon={<IconifyIcon icon="material-symbols:add" sx={{ fontSize: 20 }} />}
          onClick={() => setOpen(true)}
        >
          {translateUi('ui.sections.account.touch_id.biometrics.add_fingerprint_997ff7eb')}
        </Button>
      </Stack>
      <AccountDialog
        open={open}
        handleDialogClose={() => setOpen(false)}
        title={translateUi('ui.sections.account.touch_id.biometrics.add_fingerprint_997ff7eb')}
        subtitle={translateUi(
          'ui.sections.account.touch_id.biometrics.touch_id_enrollment_was_interrupted_1b996e9f',
        )}
        handleDiscard={() => setOpen(false)}
        handleConfirm={() => setOpen(false)}
        sx={{ width: 1 }}
      >
        <Stack
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: 120,
              width: 120,
              border: '4px solid',
              borderColor: 'success.main',
              borderRadius: '50%',
            }}
          >
            <IconifyIcon
              icon="material-symbols-light:fingerprint"
              sx={{
                fontSize: 80,
                color: 'success.main',
                position: 'absolute',
                top: 15,
                left: 15,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translateUi(
              'ui.sections.account.touch_id.biometrics.your_fingerprint_can_be_used_to_unlock_your_account_01df0a77',
            )}
          </Typography>
        </Stack>
      </AccountDialog>
    </>
  );
};

export default Biometrics;
