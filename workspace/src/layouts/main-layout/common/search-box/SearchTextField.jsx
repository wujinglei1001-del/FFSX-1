import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const SearchTextField = ({ slotProps, ...rest }) => {
  const { t: translateUi } = useTranslation();
  const { input: inputSlotProps } = slotProps || {};

  return (
    <StyledTextField
      id="search-box"
      placeholder={translateUi('ffax.ui.search')}
      sx={{
        minWidth: 348,
      }}
      slotProps={{
        ...slotProps,
        input: {
          className: 'search-box-input',
          startAdornment: (
            <InputAdornment position="start">
              <IconifyIcon icon="material-symbols:search-rounded" />
            </InputAdornment>
          ),
          ...inputSlotProps,
        },
      }}
      {...rest}
    />
  );
};

export default SearchTextField;
