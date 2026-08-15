import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  dialogClasses,
  formControlLabelClasses,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import IconifyIcon from 'components/base/IconifyIcon';
import SharePrivacy from './SharePrivacy';
import ShareRecipientSelector from './ShareRecipientSelector';

const SharePostDialog = ({ shares }) => {
  const { t: translateUi } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedShareOption, setSelectedShareOption] = useState('feed');

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (event) => {
    setSelectedShareOption(event.target.value);
  };

  const handleShare = () => {
    enqueueSnackbar('This post was shared successfully.', { variant: 'success' });
    setIsDialogOpen(false);
  };

  return (
    <>
      <ToggleButton value="share" size="small" disableRipple onClick={() => setIsDialogOpen(true)}>
        <IconifyIcon icon="material-symbols:share-outline" sx={{ fontSize: 18 }} />{' '}
        <Box component="span">{shares}</Box>
      </ToggleButton>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            borderRadius: 6,
            width: 1,
            maxWidth: 375,
          },
        }}
      >
        <DialogTitle
          component="h6"
          sx={{
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {translateUi('ui.sections.social.tab_panels.posts_panel.share_this_post_6f829a82')}
          <IconButton onClick={handleDialogClose}>
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pb: 2 }}>
          <FormControl sx={{ mb: 3 }}>
            <RadioGroup
              name="share-radio-buttons-group"
              value={selectedShareOption}
              onChange={handleChange}
            >
              <FormControlLabel
                sx={{ [`& .${formControlLabelClasses.label}`]: { fontWeight: 500 }, mb: 1 }}
                value="feed"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.social.tab_panels.posts_panel.to_your_feed_ffa2df91',
                )}
              />
              <FormControlLabel
                sx={{ [`& .${formControlLabelClasses.label}`]: { fontWeight: 500 }, mb: 1 }}
                value="email"
                control={<Radio />}
                label={translateUi('ui.sections.social.tab_panels.posts_panel.via_email_60a36e90')}
              />
              <FormControlLabel
                sx={{ [`& .${formControlLabelClasses.label}`]: { fontWeight: 500 }, mb: 1 }}
                value="message"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.social.tab_panels.posts_panel.via_message_1c4bde70',
                )}
              />
            </RadioGroup>
          </FormControl>

          {selectedShareOption === 'feed' ? (
            <SharePrivacy />
          ) : selectedShareOption === 'email' ? (
            <ShareRecipientSelector shareOption={selectedShareOption} />
          ) : (
            <ShareRecipientSelector shareOption={selectedShareOption} />
          )}

          <TextField
            fullWidth
            label={translateUi(
              'ui.sections.social.tab_panels.posts_panel.add_a_message_optional_4a3ec5b3',
            )}
            multiline
            rows={2}
            variant="filled"
          />
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 0,
          }}
        >
          <Button variant="soft" color="neutral" onClick={handleDialogClose}>
            {translateUi('ui.sections.social.tab_panels.posts_panel.cancel_77dfd213')}
          </Button>
          <Button variant="contained" color="primary" onClick={handleShare}>
            {translateUi('ui.sections.social.tab_panels.posts_panel.share_09ca55ca')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SharePostDialog;
