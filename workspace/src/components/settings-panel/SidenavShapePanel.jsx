import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { FormControlLabel, Radio } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_SIDENAV_SHAPE } from 'reducers/SettingsReducer';
import SettingsItem from './SettingsItem';
import SettingsPanelRadioGroup from './SettingsPanelRadioGroup';
import { SidenavDefaultIllustration } from './panel-illustrations/SidenavDefaultIllustration';
import { SlimIllustration } from './panel-illustrations/SlimIllustration';
import { StackedIllustration } from './panel-illustrations/StackedIllustration';

const SidenavShapePanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { sidenavType },
    configDispatch,
  } = useSettingsContext();
  const [, setSearchParams] = useSearchParams();

  const {
    settingsPanelConfig: { disableSidenavShapeSection },
  } = useSettingsPanelContext();

  const handleChange = (event) => {
    setSearchParams({}, { replace: true });

    const value = event.target.value;

    configDispatch({
      type: SET_SIDENAV_SHAPE,
      payload: value,
    });
  };

  return (
    <SettingsPanelRadioGroup name="sidenav-shape" value={sidenavType} onChange={handleChange}>
      <FormControlLabel
        value="default"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.sidenavshapepanel.default_808d7dca')}
            image={
              <SidenavDefaultIllustration
                active={!disableSidenavShapeSection && sidenavType === 'default'}
              />
            }
            active={!disableSidenavShapeSection && sidenavType === 'default'}
          />
        }
      />
      <FormControlLabel
        value="slim"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.sidenavshapepanel.slim_5ee371a1')}
            image={
              <SlimIllustration active={!disableSidenavShapeSection && sidenavType === 'slim'} />
            }
            active={!disableSidenavShapeSection && sidenavType === 'slim'}
          />
        }
      />
      <FormControlLabel
        value="stacked"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.sidenavshapepanel.stacked_9eafca46')}
            image={
              <StackedIllustration
                active={!disableSidenavShapeSection && sidenavType === 'stacked'}
              />
            }
            active={!disableSidenavShapeSection && sidenavType === 'stacked'}
          />
        }
      />
    </SettingsPanelRadioGroup>
  );
};

export default SidenavShapePanel;
