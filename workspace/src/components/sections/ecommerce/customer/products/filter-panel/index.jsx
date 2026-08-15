import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import FilterSection from './FilterSection';
import PriceFilterSection from './PriceFilterSection';

const FilterPanel = ({ filterOptions }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider sx={{ my: 2 }} />} sx={{ mb: 3 }}>
      {filterOptions.availability && (
        <FilterSection
          defaultOpen
          title={translateUi('ui.sections.ecommerce.customer.products.availability_681b5b5a')}
          options={filterOptions.availability}
          name="availability"
        />
      )}
      {filterOptions.sale && (
        <FilterSection
          defaultOpen
          title={translateUi('ui.sections.ecommerce.customer.products.sale_0028d743')}
          options={filterOptions.sale}
          name="sale"
        />
      )}
      {filterOptions.material && (
        <FilterSection
          defaultOpen
          options={filterOptions.material}
          name="material"
          title={translateUi('ui.sections.ecommerce.customer.products.material_d8169782')}
        />
      )}
      {filterOptions.category && (
        <FilterSection
          defaultOpen
          title={translateUi('ui.sections.ecommerce.customer.products.category_a3c686e7')}
          options={filterOptions.category}
          name="category"
        />
      )}
      {filterOptions.price && (
        <PriceFilterSection defaultOpen defaultValue={filterOptions.price || [0, 5000]} />
      )}
      {filterOptions.features && (
        <FilterSection
          defaultOpen
          title={translateUi('ui.sections.ecommerce.customer.products.features_fc338f87')}
          options={filterOptions.features}
          name="features"
        />
      )}
    </Stack>
  );
};

export default FilterPanel;
