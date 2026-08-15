import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ConditionFields from './ConditionFields';
import ConditionalFieldDropdown from './ConditionalFieldDropdown';
import SecondaryConditionFields from './SecondaryConditionFields';
import TriggerDropdown from './TriggerDropdown';
import { isConditionFilterType } from './common/constants';
import BlockDivider from './shared/BlockDivider';

const ConditionBlock = ({
  index,
  canRemove = true,
  onRemove,
  isLast,
  excludedTriggerTypes = [],
  excludedFilterTypes = [],
  onTriggerTypeChange,
  onFilterTypeChange,
}) => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();
  const isPrimary = index === 0;

  const conditionType = useWatch({
    control,
    name: `conditions.${index}.type`,
  });

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Paper background={1} sx={{ p: 3, borderRadius: 2, position: 'relative', outline: 'none' }}>
        <Stack sx={{ gap: 2 }}>
          <Controller
            control={control}
            name={`conditions.${index}.type`}
            render={({ field }) => (
              <Stack sx={{ gap: 1, width: 1 }}>
                {!isPrimary && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {translateUi(
                        'ui.sections.project.automation.conditionblock.also_with_this_6746aa9a',
                      )}
                    </Typography>
                    {canRemove && (
                      <IconButton
                        size="small"
                        onClick={onRemove}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': { color: 'error.main' },
                        }}
                      >
                        <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
                      </IconButton>
                    )}
                  </Box>
                )}

                {isPrimary ? (
                  <TriggerDropdown
                    value={field.value}
                    onChange={onTriggerTypeChange}
                    excludedTypes={excludedTriggerTypes}
                  />
                ) : (
                  <ConditionalFieldDropdown
                    value={field.value}
                    onChange={onFilterTypeChange}
                    excludedTypes={excludedFilterTypes}
                  />
                )}
              </Stack>
            )}
          />

          {isPrimary ? (
            <ConditionFields index={index} type={conditionType} />
          ) : (
            isConditionFilterType(conditionType) && (
              <SecondaryConditionFields index={index} type={conditionType} />
            )
          )}
        </Stack>
      </Paper>
      <BlockDivider isLast={isLast} />
    </Box>
  );
};

export default ConditionBlock;
