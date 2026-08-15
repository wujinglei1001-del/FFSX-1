import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip, { chipClasses } from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import IconifyIcon from 'components/base/IconifyIcon';
import CRMDropdownMenu from '../../common/CRMDropdownMenu';

const Deals = ({ deals }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        <Box component="span" sx={{ textTransform: 'capitalize' }}>
          {deals[0].state}
        </Box>{' '}
        {translateUi('ui.sections.crm.deal_details.account.deals_2c874671')}
      </Typography>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        {deals.map((deal) => (
          <Stack
            key={deal.name}
            direction="row"
            sx={{
              p: 3,
              bgcolor: 'background.elevation1',
              borderRadius: 2,
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Stack
              sx={{
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                component={Link}
                sx={[
                  { fontWeight: 700, width: 'max-content' },
                  deal.state === 'past' && { color: 'text.secondary' },
                ]}
              >
                {deal.name}
              </Typography>
              <Stack
                sx={{
                  gap: 1,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {translateUi('ui.sections.crm.deal_details.account.budget_102a5880')}{' '}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>{currencyFormat(deal.budget)}</Typography>
                </Stack>
                {deal.state === 'ongoing' ? (
                  <Stack
                    direction="row"
                    sx={{
                      gap: 0.5,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {translateUi(
                        'ui.sections.crm.deal_details.account.closing_date_77dd8360',
                      )}{' '}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {dayjs(deal.closingDate).format('D MMM, YYYY')}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    sx={{
                      gap: 0.5,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {translateUi('ui.sections.crm.deal_details.account.status_11dc9e19')}{' '}
                    </Typography>
                    <Chip
                      label={deal.status}
                      variant="soft"
                      color={deal.status === 'closed' ? 'success' : 'error'}
                      sx={{
                        [`& .${chipClasses.label}`]: {
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Button shape="square" color="neutral" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <IconifyIcon icon="material-symbols:more-horiz" sx={{ fontSize: 20 }} />
            </Button>
            <CRMDropdownMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={() => setAnchorEl(null)}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Deals;
