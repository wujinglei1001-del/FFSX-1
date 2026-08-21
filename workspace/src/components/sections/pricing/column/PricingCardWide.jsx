import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText, { listItemTextClasses } from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useNumberFormat from 'hooks/useNumberFormat';
import { useThemeMode } from 'hooks/useThemeMode';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';

const PricingCardWide = ({ data, isYearly }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const { isDark } = useThemeMode();

  return (
    <Card
      id={!data.price ? 'free' : data.recommended ? 'plans' : undefined}
      sx={[
        {
          p: 5,
          width: 1,
          maxWidth: 600,
          outline: 'none',
          borderRadius: 6,
        },
        !!data.recommended && { bgcolor: 'background.elevation1' },
      ]}
    >
      <CardHeader
        title={
          <Chip label={data.label} variant="soft" color="warning" size="large" sx={{ ml: 11.5 }} />
        }
        sx={[{ p: 0, mb: 2 }, !data.label && { display: 'none' }]}
      />

      <Stack direction="row" sx={{ gap: 4 }}>
        <CardMedia
          component="img"
          image={isDark ? data.image.dark : data.image.light}
          height={64}
          alt={translateUi('common.accessibility.card_image')}
          sx={{
            mb: 4,
            mx: 'auto',
            width: 64,
            objectFit: 'contain',
          }}
        />

        <CardContent sx={{ p: '0 !important', flexGrow: 1 }}>
          <Stack direction="row" sx={{ mb: 2, alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {data.columnTitle}
            </Typography>

            {!data.price ? (
              <Typography variant="h3" sx={{ ml: 2 }}>
                {translateUi('ui.sections.pricing.column.pricingcardwide.free_75f52718')}
              </Typography>
            ) : (
              <>
                <Typography variant="h3" sx={{ ml: 2 }}>
                  {isYearly
                    ? currencyFormat(data.price.yearly)
                    : currencyFormat(data.price.monthly)}
                </Typography>
                <Typography variant="caption" sx={{ ml: 1 }}>
                  / {isYearly ? '年' : '月'}
                </Typography>
              </>
            )}
          </Stack>

          <List
            sx={{
              mb: 3,
              columns: 2,
            }}
            disablePadding
          >
            {data.features.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemIcon>
                  <IconifyIcon
                    icon={
                      item.active
                        ? 'material-symbols:check-rounded'
                        : 'material-symbols:remove-rounded'
                    }
                    color={item.active ? 'success.main' : 'text.disabled'}
                    fontSize={16}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    color: item.active ? 'text.secondary' : 'text.disabled',
                    [`& .${listItemTextClasses.primary}`]: {
                      typography: 'body2',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <CardActions sx={{ p: 0 }}>
            <Button
              variant={data.recommended ? 'contained' : 'soft'}
              href={data.price ? paths.zitadelLogin : paths.zitadelSignup}
              fullWidth
            >
              {!data.price ? '创建免费账户' : '购买并继续'}
            </Button>
          </CardActions>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default PricingCardWide;
