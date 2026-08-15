import { MenuItem, TextField } from '@mui/material';
import i18n from 'locales/i18n';
import StyledTextField from 'components/styled/StyledTextField';

const defaultOptions = [
  {
    value: 1,
    get label() {
      return i18n.t('ui.components.common.dashboardselectmenu.last_month_9cce45bf');
    },
  },
  {
    value: 6,
    get label() {
      return i18n.t('ui.components.common.dashboardselectmenu.last_6_months_14d5436c');
    },
  },
  {
    value: 12,
    get label() {
      return i18n.t('ui.components.common.dashboardselectmenu.last_12_months_0245d916');
    },
  },
];

const DashboardSelectMenu = ({
  options = defaultOptions,
  onChange,
  defaultValue = defaultOptions[0].value,
  label,
  size = 'small',
  variant = 'custom',
  menuItemProps,
  sx,
  ...rest
}) => {
  const Component = variant === 'custom' ? StyledTextField : TextField;
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Component
      select
      defaultValue={defaultValue}
      label={variant !== 'custom' ? label : undefined}
      variant={variant !== 'custom' ? variant : undefined}
      size={size}
      onChange={({ target: { value } }) => handleChange(value)}
      sx={{ width: 150, minWidth: 120, ...sx }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem {...menuItemProps} value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Component>
  );
};

export default DashboardSelectMenu;
