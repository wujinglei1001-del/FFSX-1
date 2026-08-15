import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import GeneralSettings from './GeneralSettings';

const ChatPreferencesTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    defaultValues: {
      showActivity: [
        {
          name: 'displayDot',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.display_a_dot_on_the_home_icon_for_unread_activity_595d4417',
          ),
        },
      ],
      allwaysShowSidebar: [
        {
          name: 'unreadMessage',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.unread_message_686dd998',
          ),
        },
        {
          name: 'earphoneIcon',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.earphone_icon_in_joining_meeting_85e72c51',
          ),
        },
        {
          name: 'threadsMessage',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.threads_message_8628c492',
          ),
        },
        {
          name: 'draftsMessage',
          checked: false,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.drafts_sent_essage_5c6da56c',
          ),
        },
      ],
      sortOption: 'all',
      additonalSettings: [
        {
          name: '',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.display_profile_picture_next_to_direct_messages_176ffd6d',
          ),
        },
        {
          name: 'organizeInboxes',
          checked: false,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.organize_private_and_public_inboxes_separately_in_th_74dd6dc2',
          ),
        },
        {
          name: 'keepDirectMessages',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.keep_direct_messages_and_apps_separate_from_the_inbo_7e7051ae',
          ),
        },
        {
          name: 'prioritizeUnreadMentions',
          checked: false,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.prioritize_items_with_unread_mentions_at_the_top_of__89432a5b',
          ),
        },
        {
          name: 'groupExternalChats',
          checked: false,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.group_external_chats_under_the_external_connection_s_a861d887',
          ),
        },
        {
          name: 'showMutedItems',
          checked: true,
          label: translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.show_muted_items_outside_the_sidebar_menus_97f89f7c',
          ),
        },
      ],
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    console.log({ data });
    enqueueSnackbar('Updated successfully!', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        divider={<Divider />}
        sx={{ gap: 5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.general_settings_71dd223f',
          )}
          subtitle={translateUi(
            'ui.sections.account.chat_preferences.chatpreferencestabpanel.customize_your_chat_experience_with_settings_for_not_99ae801a',
          )}
          icon="material-symbols:settings-alert-outline-rounded"
        >
          <GeneralSettings />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.chat_preferences.chatpreferencestabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained">
              {translateUi(
                'ui.sections.account.chat_preferences.chatpreferencestabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default ChatPreferencesTabPanel;
