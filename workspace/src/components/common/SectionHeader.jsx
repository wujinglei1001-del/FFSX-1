import { isValidElement } from 'react';
import { Stack, Typography } from '@mui/material';

const SectionHeader = ({ title, subTitle, actionComponent, ...rest }) => {
  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 4,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <div style={{ minWidth: 0 }}>
        <Typography variant="h6" sx={{ mb: 1, whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
        {typeof subTitle === 'string' && (
          <Typography
            variant="subtitle2"
            component="p"
            sx={{
              fontWeight: 'regular',
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {subTitle}
          </Typography>
        )}
        {isValidElement(subTitle) && subTitle}
      </div>
      {actionComponent}
    </Stack>
  );
};

export default SectionHeader;
