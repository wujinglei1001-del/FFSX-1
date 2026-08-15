import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { FormControlLabel, Radio } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import SettingsItem from './SettingsItem';
import SettingsPanelRadioGroup from './SettingsPanelRadioGroup';
import { TopnavDefaultIllustration } from './panel-illustrations/TopnavDefaultIllustration';
import { TopnavSlimIllustration } from './panel-illustrations/TopnavSlimIllustration';
import { TopnavStackedIllustration } from './panel-illustrations/TopnavStackedIllustration';

const TopnavShapePanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { topnavType },
    setConfig,
  } = useSettingsContext();

  const {
    settingsPanelConfig: { disableTopShapeSection },
  } = useSettingsPanelContext();

  const [, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    setSearchParams({}, { replace: true });
    const value = event.target.value;
    setConfig({
      topnavType: value,
    });
  };

  return (
    <SettingsPanelRadioGroup name="sidenav-shape" value={topnavType} onChange={handleChange}>
      <FormControlLabel
        value="default"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.topnavshapepanel.default_808d7dca')}
            image={<TopnavDefaultIllustration active={topnavType === 'default'} />}
            active={!disableTopShapeSection && topnavType === 'default'}
          />
        }
      />
      <FormControlLabel
        value="slim"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.topnavshapepanel.slim_5ee371a1')}
            image={<TopnavSlimIllustration active={topnavType === 'slim'} />}
            active={!disableTopShapeSection && topnavType === 'slim'}
          />
        }
      />
      <FormControlLabel
        value="stacked"
        control={<Radio />}
        label={
          <SettingsItem
            label={translateUi('ui.components.settings_panel.topnavshapepanel.stacked_9eafca46')}
            image={<TopnavStackedIllustration active={topnavType === 'stacked'} />}
            active={!disableTopShapeSection && topnavType === 'stacked'}
          />
        }
      />
    </SettingsPanelRadioGroup>
  );
};

export default TopnavShapePanel;
