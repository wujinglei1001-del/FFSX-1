import { useState } from 'react';
import {
  Chip,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import i18n from 'locales/i18n';

const materialGroups = {
  cover: [
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.linen_74a1ce7d');
      },
      value: 'linen',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.suede_0e0c3560');
      },
      value: 'suede',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.satin_0e368297');
      },
      value: 'satin',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.silk_b9ccbc45');
      },
      value: 'silk',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.velvet_50c8e919');
      },
      value: 'velvet',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.cotton_6e7f4c6b');
      },
      value: 'cotton',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.leather_6b0c0b7d');
      },
      value: 'leather',
    },
  ],
  frame: [
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.cedar_b0b79707');
      },
      value: 'cedar',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.mahogany_05130953');
      },
      value: 'mahogany',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.maple_2c80325e');
      },
      value: 'maple',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.pine_456e097f');
      },
      value: 'pine',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.teak_3beed0a7');
      },
      value: 'teak',
    },
    {
      get label() {
        return i18n.t('ui.sections.ecommerce.customer.product_details.walnut_691ecbcb');
      },
      value: 'walnut',
    },
  ],
  seat: [
    {
      get label() {
        return i18n.t(
          'ui.sections.ecommerce.customer.product_details.foam_10_00_more_will_be_added_e4fdfdfd',
        );
      },
      value: 'foam',
    },
    {
      get label() {
        return i18n.t(
          'ui.sections.ecommerce.customer.product_details.cotton_10_00_more_will_be_added_c0f91e6a',
        );
      },
      value: 'cotton',
    },
  ],
};

const Materials = () => {
  const [selectedMaterials, setSelectedMaterials] = useState({
    cover: 'linen',
    frame: 'cedar',
    seat: 'foam',
  });

  const handleMaterialChange = (group) => (event) => {
    setSelectedMaterials({ ...selectedMaterials, [group]: event.target.value });
  };

  const renderMaterialOptions = (group) => (
    <OptionsRadioGroup value={selectedMaterials[group]} onChange={handleMaterialChange(group)}>
      {materialGroups[group].map(({ label, value }) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={
            <Chip
              variant="soft"
              size="medium"
              color={selectedMaterials[group] === value ? 'primary' : 'neutral'}
              label={label}
              sx={{ textTransform: 'capitalize' }}
              onClick={() => handleMaterialChange(group)({ target: { value } })}
            />
          }
        />
      ))}
    </OptionsRadioGroup>
  );

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Stack sx={{ gap: 5 }}>
        {['cover', 'frame', 'seat'].map((group) => (
          <div key={group}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {`${group.charAt(0).toUpperCase() + group.slice(1)} Material`}
            </Typography>
            <FormControl component="fieldset">{renderMaterialOptions(group)}</FormControl>
          </div>
        ))}
      </Stack>
    </Paper>
  );
};

const OptionsRadioGroup = ({ children, ...rest }) => (
  <RadioGroup
    row
    sx={{
      gap: 1,
      '& .MuiFormControlLabel-root': { margin: 0 },
      '& .MuiRadio-root': { display: 'none' },
    }}
    {...rest}
  >
    {children}
  </RadioGroup>
);

export default Materials;
