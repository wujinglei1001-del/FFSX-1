import { useMemo, useState } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { InputAdornment, ListSubheader, MenuItem } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const SearchableMultiSelect = ({
  options,
  name,
  getValue,
  renderItem,
  filterOptions,
  getDisplayValue,
  label,
  searchPlaceholder = 'Search',
  maxHeight = 250,
  hideSearch = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return filterOptions(options, search.trim().toLowerCase());
  }, [options, search, filterOptions]);

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        return (
          <StyledTextField
            select
            {...(label ? { label } : {})}
            size="medium"
            fullWidth
            value={selectedValues}
            onChange={(changeEvent) => field.onChange(changeEvent.target.value)}
            error={!!fieldError}
            helperText={fieldError?.message}
            slotProps={{
              ...(label ? { inputLabel: { shrink: true } } : {}),
              select: {
                multiple: true,
                displayEmpty: true,
                renderValue: () => {
                  return getDisplayValue(selectedValues);
                },
                onClose: () => setSearch(''),
                MenuProps: {
                  disableAutoFocusItem: true,
                  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                  transformOrigin: { vertical: 'top', horizontal: 'left' },
                  slotProps: {
                    paper: {
                      sx: {
                        mt: 1,
                        maxHeight,
                      },
                    },
                    list: {
                      sx: { pt: 0 },
                      ...(hideSearch
                        ? {}
                        : {
                            subheader: (
                              <ListSubheader
                                component="div"
                                sx={{
                                  position: 'sticky',
                                  top: 0,
                                  zIndex: 3,
                                  bgcolor: 'background.paper',
                                  minHeight: 72,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                onKeyDown={(keyboardEvent) => keyboardEvent.stopPropagation()}
                                onClick={(clickEvent) => clickEvent.stopPropagation()}
                              >
                                <StyledTextField
                                  size="small"
                                  placeholder={searchPlaceholder}
                                  fullWidth
                                  value={search}
                                  onChange={(changeEvent) => setSearch(changeEvent.target.value)}
                                  slotProps={{
                                    input: {
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <IconifyIcon
                                            icon="material-symbols:search"
                                            sx={{ color: 'text.secondary', fontSize: 20 }}
                                          />
                                        </InputAdornment>
                                      ),
                                    },
                                  }}
                                  onKeyDown={(keyboardEvent) => keyboardEvent.stopPropagation()}
                                  onKeyUp={(keyboardEvent) => keyboardEvent.stopPropagation()}
                                />
                              </ListSubheader>
                            ),
                          }),
                    },
                  },
                },
              },
            }}
          >
            {filteredOptions.map((option) => {
              const optionValue = getValue(option);
              const checked = selectedValues.includes(optionValue);

              return (
                <MenuItem
                  key={optionValue}
                  value={optionValue}
                  sx={{
                    bgcolor: checked ? 'action.selected' : 'transparent',
                    py: 1,
                  }}
                >
                  {renderItem(option, checked)}
                </MenuItem>
              );
            })}
          </StyledTextField>
        );
      }}
    />
  );
};

export default SearchableMultiSelect;
