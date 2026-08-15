import { Fragment, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const options = [
  {
    value: 'timezone',
    get label() {
      return i18n.t('ui.sections.time_tracker.common.time_tracker_header.timezone_d1f7dc89');
    },
  },
  { value: 'gmt', label: 'GMT' },
  { value: 'est', label: 'EST' },
  { value: 'cet', label: 'CET' },
];

const TimezoneSelect = ({ variant = 'textfield' }) => {
  const [timezone, setTimezone] = useState('timezone');

  const [anchorEl, setAnchorEl] = useState(null);

  if (variant === 'button') {
    return (
      <Fragment>
        <Button
          shape="square"
          variant="soft"
          color="neutral"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <IconifyIcon icon="material-symbols:language" sx={{ fontSize: 20 }} />
        </Button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              disabled={option.value === 'timezone'}
              selected={option.value === timezone}
              onClick={() => {
                setTimezone(option.value);
                setAnchorEl(null);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }

  return (
    <StyledTextField
      select
      value={timezone}
      onChange={(e) => setTimezone(e.target.value)}
      sx={{ minWidth: { xs: 160, sm: 120, lg: 150, xl: 160 } }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} disabled={option.value === 'timezone'} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default TimezoneSelect;
