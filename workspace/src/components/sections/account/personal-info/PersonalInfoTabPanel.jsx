import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import AvatarDropBox from 'components/base/AvatarDropBox';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Address from './Address';
import Birthday from './Birthday';
import Email from './Email';
import Names from './Names';
import Phone from './Phone';
import UserName from './UserName';

const PersonalInfoTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <AvatarDropBox
          onDrop={(acceptedFiles) => {
            console.log({ acceptedFiles });
          }}
        />
      </Stack>
      <Stack divider={<Divider />} sx={{ gap: 5 }}>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.name_709a2322',
          )}
          subtitle={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.edit_your_name_here_if_you_wish_to_make_any_changes__f7c10ef6',
          )}
          icon="material-symbols:badge-outline"
        >
          <Stack sx={{ gap: 1 }}>
            <Names />
            <UserName />
          </Stack>
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.birthday_a6b9d69f',
          )}
          subtitle={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.adjust_your_date_of_birth_to_ensure_it_s_accurate_in_66b20085',
          )}
          icon="material-symbols:cake-outline"
        >
          <Birthday />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.address_d70f93df',
          )}
          subtitle={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.you_can_edit_your_address_and_control_who_can_see_it_5c6d74f7',
          )}
          icon="material-symbols:location-on-outline"
        >
          <Address />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.phone_77064d52',
          )}
          subtitle={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.add_a_personal_or_official_phone_number_to_stay_conn_c49faa95',
          )}
          icon="material-symbols:call-outline"
        >
          <Phone />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.email_address_09ba557f',
          )}
          subtitle={translateUi(
            'ui.sections.account.personal_info.personalinfotabpanel.edit_your_primary_email_address_for_notifications_an_2e14e99b',
          )}
          icon="material-symbols:mail-outline"
        >
          <Email />
        </AccountTabPanelSection>
      </Stack>
    </>
  );
};

export default PersonalInfoTabPanel;
