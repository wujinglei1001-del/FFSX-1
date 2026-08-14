import { Checkbox, Chip, Typography } from '@mui/material';
import { LABEL_OPTIONS } from '../common/constants';
import SearchableMultiSelect from '../shared/SearchableMultiSelect';

const getLabelPillSx = (label) => {
  switch (label) {
    case 'Admin':
      return {
        bgcolor: (theme) => theme.vars.palette.chBlue[100],
        color: (theme) => theme.vars.palette.chBlue[700],
      };
    case 'Modification':
      return {
        bgcolor: (theme) => theme.vars.palette.chOrange[100],
        color: (theme) => theme.vars.palette.chOrange[700],
      };
    case 'Bug':
      return {
        bgcolor: (theme) => theme.vars.palette.chRed[100],
        color: (theme) => theme.vars.palette.chRed[700],
      };
    default:
      return {
        bgcolor: (theme) => theme.vars.palette.chGrey[100],
        color: 'text.primary',
      };
  }
};

const LabelConditionFields = ({
  index,
  name,
  textFieldLabel,
  placeholder,
  searchPlaceholder,
  hideSearch,
}) => {
  const fieldName = name ?? (typeof index === 'number' ? `conditions.${index}.value` : '');

  if (!fieldName) return null;

  return (
    <SearchableMultiSelect
      options={[...LABEL_OPTIONS]}
      name={fieldName}
      getValue={(label) => label}
      renderItem={(label, checked) => {
        const pillSx = getLabelPillSx(label);
        return (
          <>
            <Checkbox checked={checked} sx={{ p: 0, mr: 2 }} />
            <Chip
              variant="filled"
              size="large"
              label={
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'inherit' }}>
                  {label}
                </Typography>
              }
              sx={{
                ...pillSx,
                width: 1,
                borderRadius: 2,
                px: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            />
          </>
        );
      }}
      filterOptions={(options, query) => {
        if (!query) return options;
        return options.filter((label) => label.toLowerCase().includes(query));
      }}
      getDisplayValue={(selectedLabels) => {
        return selectedLabels.length
          ? selectedLabels.join(', ')
          : (placeholder ?? 'Select a label');
      }}
      label={textFieldLabel === undefined ? 'Label' : textFieldLabel}
      searchPlaceholder={searchPlaceholder ?? 'Search label'}
      hideSearch={hideSearch}
      maxHeight={250}
    />
  );
};

export default LabelConditionFields;
