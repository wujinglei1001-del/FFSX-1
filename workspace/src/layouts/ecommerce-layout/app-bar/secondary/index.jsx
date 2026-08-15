import { useEffect, useState } from 'react';
import { Button, Stack, Toolbar } from '@mui/material';
import { kebabCase } from 'lib/utils';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import CollapsedMenu from './CollapsedMenu';

const SecondaryAppbarLinks = [
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.today_s_deals_bc84c286');
    },
    url: '#!',
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.orders_cded0933');
    },
    url: paths.orderList,
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.track_order_51e971d9');
    },
    url: paths.orderTrack,
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.recently_viewed_fd316b7c');
    },
    url: '#!',
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.recommendations_4faa65b5');
    },
    url: '#!',
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.wishlist_6ff33102');
    },
    url: paths.wishlist,
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.membership_53bc9670');
    },
    url: '#!',
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.deals_2c874671');
    },
    url: '#!',
  },
  {
    get label() {
      return i18n.t('ui.layouts.ecommerce_layout.app_bar.secondary.sales_d0edfb6e');
    },
    url: '#!',
  },
];

const breakpointsVisibleLinks = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 9,
  xl: SecondaryAppbarLinks.length,
};

const SecondaryAppbar = () => {
  const { currentBreakpoint } = useBreakpoints();

  const [visibleLinks, setVisibleLinks] = useState([]);
  const [collapsedLinks, setCollapsedLinks] = useState([]);

  useEffect(() => {
    const numVisibleLinks = breakpointsVisibleLinks[currentBreakpoint] || 2;
    setVisibleLinks(SecondaryAppbarLinks.slice(0, numVisibleLinks));
    setCollapsedLinks(SecondaryAppbarLinks.slice(numVisibleLinks));
  }, [currentBreakpoint]);

  return (
    <Toolbar
      component="nav"
      sx={{
        px: { xs: 3, md: 5 },
        minHeight: { xs: 38 },
        bgcolor: 'background.elevation1',
      }}
    >
      <Stack direction="row" sx={{ width: 1 }}>
        {visibleLinks.map(({ label, url }, index) => (
          <Button
            key={kebabCase(label)}
            color="neutral"
            variant="text"
            size="small"
            href={url}
            sx={{
              whiteSpace: 'nowrap',
              px: 1.5,
              ...(index === 1 && { ml: 'auto' }),
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
      {collapsedLinks.length > 0 && <CollapsedMenu links={collapsedLinks} />}
    </Toolbar>
  );
};

export default SecondaryAppbar;
