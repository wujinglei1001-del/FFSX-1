import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { FormControlLabel, Radio } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_NAVIGATION_MENU_TYPE } from 'reducers/SettingsReducer';
import SettingsItem from './SettingsItem';
import SettingsPanelRadioGroup from './SettingsPanelRadioGroup';
import { ComboIllustration } from './panel-illustrations/ComboIllustration';
import { SidenavIllustration } from './panel-illustrations/SidenavIllustration';
import { TopnavIllustration } from './panel-illustrations/TopnavIllustration';

const NavigationMenuPanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { navigationMenuType },
    configDispatch,
  } = useSettingsContext();
  const [, setSearchParams] = useSearchParams();

  const {
    settingsPanelConfig: { disableNavigationMenuSection },
  } = useSettingsPanelContext();

  const handleChange = (event) => {
    setSearchParams({}, { replace: true });

    const value = event.target.value;
    configDispatch({
      type: SET_NAVIGATION_MENU_TYPE,
      payload: value,
    });
  };

  return (
    <SettingsPanelRadioGroup
      name="text-direction"
      value={navigationMenuType}
      onChange={handleChange}
    >
      <FormControlLabel
        value="sidenav"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.navigationmenupanel.sidenav_0b22dd7d')}
            image={
              <SidenavIllustration
                active={!disableNavigationMenuSection && navigationMenuType === 'sidenav'}
              />
            }
            active={!disableNavigationMenuSection && navigationMenuType === 'sidenav'}
          />
        }
      />
      <FormControlLabel
        value="topnav"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.navigationmenupanel.topnav_f1732fb1')}
            image={
              <TopnavIllustration
                active={!disableNavigationMenuSection && navigationMenuType === 'topnav'}
              />
            }
            active={!disableNavigationMenuSection && navigationMenuType === 'topnav'}
          />
        }
      />
      <FormControlLabel
        value="combo"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.navigationmenupanel.combo_dcae5862')}
            image={
              <ComboIllustration
                active={!disableNavigationMenuSection && navigationMenuType === 'combo'}
              />
            }
            active={!disableNavigationMenuSection && navigationMenuType === 'combo'}
          />
        }
      />
    </SettingsPanelRadioGroup>
  );
};

export default NavigationMenuPanel;
