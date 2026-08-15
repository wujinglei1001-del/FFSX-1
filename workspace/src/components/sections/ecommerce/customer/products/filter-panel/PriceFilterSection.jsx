import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Slider, Stack } from '@mui/material';
import NumberTextField from 'components/base/NumberTextField';
import FilterCollapse from './FilterCollapsiblePanel';

const valuetext = (value) => {
  return `$${value}`;
};

const PriceFilterSection = ({ defaultOpen = false, defaultValue }) => {
  const { t: translateUi } = useTranslation();
  const { control, setValue } = useFormContext();

  const priceRange = useWatch({
    control,
    name: 'priceRange',
    defaultValue,
  });

  const handleSliderChange = (event, newValue) => {
    setValue('priceRange', newValue);
  };

  return (
    <FilterCollapse
      defaultOpen={defaultOpen}
      title={translateUi('ui.sections.ecommerce.customer.products.price_3e8248e3')}
    >
      <Box sx={{ px: 1.25 }}>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={valuetext}
          getAriaValueText={valuetext}
          min={defaultValue[0]}
          max={defaultValue[1]}
          sx={{ width: 1 }}
        />
      </Box>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          mt: 1,
        }}
      >
        <NumberTextField
          label={translateUi('ui.sections.ecommerce.customer.products.min_7eb0cee8')}
          value={priceRange[0]}
          onChange={(e) => {
            setValue('priceRange', [Number(e.target.value), priceRange[1]]);
          }}
        />
        <NumberTextField
          label={translateUi('ui.sections.ecommerce.customer.products.max_a95e85ae')}
          value={priceRange[1]}
          onChange={(e) => {
            setValue('priceRange', [priceRange[0], Number(e.target.value)]);
          }}
        />
      </Stack>
    </FilterCollapse>
  );
};

export default PriceFilterSection;
