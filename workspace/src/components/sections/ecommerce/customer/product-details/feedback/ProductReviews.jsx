import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  MenuItem,
  Rating,
  Stack,
  Typography,
  chipClasses,
  dividerClasses,
  ratingClasses,
} from '@mui/material';
import { productReviewTags, productReviews } from 'data/e-commerce/products';
import { kebabCase } from 'lib/utils';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import StyledTextField from 'components/styled/StyledTextField';

const ProductReviews = () => {
  const { t: translateUi } = useTranslation();
  const [activeTag, setActiveTag] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const handleChipClick = (label) => {
    setActiveTag(label);
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 3,
          mb: 5,
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {productReviewTags.map((tag) => (
            <Chip
              key={kebabCase(tag.label)}
              label={
                <>
                  {tag.label}
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: tag.label === activeTag ? 'primary' : 'text.disabled',
                      ml: 0.5,
                      fontSize: '0.75rem',
                    }}
                  >
                    {tag.count}
                  </Typography>
                </>
              }
              color={tag.label === activeTag ? 'primary' : 'neutral'}
              size="medium"
              variant="soft"
              onClick={() => handleChipClick(tag.label)}
              sx={{
                textTransform: 'capitalize',
                [`& .${chipClasses.label}`]: {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            />
          ))}
        </Stack>
        <FormControl sx={{ maxWidth: { sm: 200 }, width: 1 }}>
          <StyledTextField
            select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
            }}
          >
            <MenuItem value="recent">
              {translateUi(
                'ui.sections.ecommerce.customer.product_details.sort_by_most_recent_abb421f2',
              )}
            </MenuItem>
            <MenuItem value="oldest">
              {translateUi(
                'ui.sections.ecommerce.customer.product_details.sort_by_oldest_b3580db0',
              )}
            </MenuItem>
            <MenuItem value="helpful">
              {translateUi(
                'ui.sections.ecommerce.customer.product_details.sort_by_most_helpful_19c22de5',
              )}
            </MenuItem>
            <MenuItem value="relevant">
              {translateUi(
                'ui.sections.ecommerce.customer.product_details.sort_by_most_relevant_3fbeb0a6',
              )}
            </MenuItem>
          </StyledTextField>
        </FormControl>
      </Stack>
      <Stack sx={{ gap: 5 }}>
        {productReviews.map(({ id, user, date, content, helpfulCount }) => (
          <Box key={id}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Avatar alt={user.name} src={user.image} sx={{ width: 48, height: 48 }} />
                <div>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.disabled',
                    }}
                  >
                    {date}
                  </Typography>
                </div>
              </Stack>
              <DashboardMenu
                icon={<IconifyIcon icon="material-symbols-light:more-vert" fontSize={22} />}
                menuItems={[
                  {
                    label: translateUi(
                      'ui.sections.ecommerce.customer.product_details.hide_34d8b60f',
                    ),
                  },
                  {
                    label: translateUi(
                      'ui.sections.ecommerce.customer.product_details.share_09ca55ca',
                    ),
                  },
                  {
                    label: translateUi(
                      'ui.sections.ecommerce.customer.product_details.report_abuse_ef459ef9',
                    ),
                  },
                ]}
              />
            </Stack>
            <Rating
              name="product-rating"
              value={5}
              readOnly
              icon={<IconifyIcon icon="material-symbols:star-rounded" />}
              sx={{
                mb: 2,
                [`& .${ratingClasses.iconFilled}`]: {
                  color: 'warning.main',
                },
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                mb: 1,
              }}
            >
              {content.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: { xs: 4, sm: 2 },
              }}
            >
              {content.body}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              divider={<Divider orientation="vertical" flexItem />}
              sx={{
                columnGap: 3,
                rowGap: 1,
                alignItems: { sm: 'center' },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {helpfulCount}
                {translateUi(
                  'ui.sections.ecommerce.customer.product_details.people_found_it_helpful_1cea6731',
                )}
              </Typography>
              <Stack direction="row" sx={{ gap: 1.5 }}>
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  startIcon={<IconifyIcon icon="material-symbols:thumb-up-outline-rounded" />}
                >
                  {translateUi('ui.sections.ecommerce.customer.product_details.helpful_45e36dd9')}
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  startIcon={<IconifyIcon icon="material-symbols:thumb-down-outline-rounded" />}
                >
                  {translateUi(
                    'ui.sections.ecommerce.customer.product_details.not_helpful_85efce01',
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
        <Divider sx={{ [`& .${dividerClasses.wrapper}`]: { p: 0 } }}>
          <Button color="neutral" variant="soft" sx={{ borderRadius: 10 }}>
            {translateUi('ui.sections.ecommerce.customer.product_details.load_more_dfe60ca9')}
          </Button>
        </Divider>
      </Stack>
    </>
  );
};

export default ProductReviews;
