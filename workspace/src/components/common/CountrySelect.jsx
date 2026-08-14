import { Autocomplete, Box, TextField } from '@mui/material';
import { countries } from 'data/countries';
import IconifyIcon from 'components/base/IconifyIcon';
import VirtualizedListbox from 'components/common/VirtualizedListbox';

const CountrySelect = ({
  options = countries,
  fields = { flag: true, name: true, phone: false, code: false },
  renderInput = (params) => <TextField {...params} />,
  ref,
  slotProps: externalSlotProps,
  ...props
}) => {
  return (
    <Autocomplete
      ref={ref}
      id="country-select"
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(renderProps, option) => {
        const { key, ...optionProps } = renderProps;

        return (
          <Box
            key={option.code}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {fields?.flag && <IconifyIcon icon={option.flag} sx={{ mr: 1 }} />}
            {fields?.name && option.label} {fields?.code && `(${option.code})`}{' '}
            {fields?.phone && '+' + option.phone}
          </Box>
        );
      }}
      renderInput={renderInput}
      slotProps={{
        ...externalSlotProps,
        listbox: {
          component: VirtualizedListbox,
          ...externalSlotProps?.listbox,
        },
      }}
      {...props}
    />
  );
};

export default CountrySelect;
