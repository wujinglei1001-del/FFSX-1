import { useTranslation } from 'react-i18next';
import { Autocomplete, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';

const Tags = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4, lg: 5 },
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.ecommerce.admin.order.tags_848eed0f')}
        </Typography>

        <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
          {translateUi('ui.sections.ecommerce.admin.order.view_all_tags_fe468f67')}
        </Button>
      </Stack>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        open={false}
        renderValue={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...rest } = getTagProps({ index });

            return (
              <Chip
                key={key}
                variant="soft"
                color="primary"
                sx={{ m: 0.5 }}
                label={option}
                {...rest}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={translateUi('ui.sections.ecommerce.admin.order.tags_848eed0f')}
            placeholder={translateUi('ui.sections.ecommerce.admin.order.add_tags_1dd02add')}
          />
        )}
      />
    </Box>
  );
};

export default Tags;
