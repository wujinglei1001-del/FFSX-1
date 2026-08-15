import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, autocompleteClasses } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { categories } from 'data/e-commerce/product-listing';
import IconifyIcon from 'components/base/IconifyIcon';

const CategorySelect = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="vitalInfo.category"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Autocomplete
          id="category"
          fullWidth
          popupIcon={<IconifyIcon icon="material-symbols:search-rounded" fontSize="24" />}
          options={categories}
          getOptionLabel={(option) => option}
          value={categories.includes(field.value) ? field.value : null}
          onChange={(_, value) => field.onChange(value || '')}
          isOptionEqualToValue={(option, value) => option === value || value === ''}
          renderInput={(params) => (
            <TextField
              {...params}
              label={translateUi(
                'ui.sections.ecommerce.admin.product_listing.select_category_a2a5cafe',
              )}
              variant="filled"
              error={!!errors.vitalInfo?.category}
              helperText={errors.vitalInfo?.category?.message}
              sx={{
                [`& .${autocompleteClasses.popupIndicator}`]: {
                  [`&.${autocompleteClasses.popupIndicatorOpen}`]: {
                    transform: 'unset',
                  },
                },
              }}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option, inputValue, { insideWords: true });
            const parts = parse(option, matches);

            const { key, ...restProps } = props;

            return (
              <li key={key} {...restProps}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
      )}
    />
  );
};

export default CategorySelect;
