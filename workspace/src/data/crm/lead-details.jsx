import { Avatar, Chip, Link, Typography } from '@mui/material';
import { users } from 'data/users';
import { generateUniqueId } from 'lib/utils';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import CopyableText from 'components/sections/crm/common/CopyableText';

export const contactInfoData = [
  {
    attribute: 'Title',
    value: (
      <Typography variant="body2">
        {i18n.t('ui.data.crm.lead_details.vp_operations_778cd891')}
      </Typography>
    ),
  },
  {
    attribute: 'Account',
    value: (
      <Typography component={Link} href={paths.leadDetails} underline="hover" variant="body2">
        {i18n.t('ui.data.crm.lead_details.waka_waka_plc_d8d0c122')}
      </Typography>
    ),
  },
  {
    attribute: 'Lead Source',
    value: (
      <Typography variant="body2">{i18n.t('ui.data.crm.lead_details.organic_82f86eb9')}</Typography>
    ),
  },
  {
    attribute: 'Email',
    value: <CopyableText text="example_1@gmail.com" link href="mailto:example_1@gmail.com" />,
  },
  {
    attribute: 'Phone No.',
    value: <CopyableText text="+33 6 78 09 34 90" link href="tel:+33 6 78 09 34 90" />,
  },
  {
    attribute: 'Contact Owner',
    value: (
      <Chip
        label={i18n.t('ui.data.crm.lead_details.gerard_p_25428c40')}
        avatar={<Avatar src={users[7].avatar} />}
        variant="soft"
      />
    ),
  },
];

export const ongoingDealsData = [
  {
    id: generateUniqueId(),
    name: 'Replica Badidas Futbol',
    budget: 465000,
    closingDate: '2025-09-21',
    phases: [
      {
        name: 'Contact',
        status: 'done',
      },
      { name: 'MQL', status: 'ongoing' },
      { name: 'SQL', status: 'closed' },
      {
        name: 'Chance',
        status: 'closed',
      },
      {
        name: 'W/L',
        status: 'closed',
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Pumba Jersey Project',
    budget: 105000,
    closingDate: '2025-09-19',
    phases: [
      {
        name: 'Contact',
        status: 'done',
      },
      { name: 'MQL', status: 'done' },
      { name: 'SQL', status: 'done' },
      {
        name: 'Chance',
        status: 'done',
      },
      {
        name: 'W/L',
        status: 'ongoing',
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Almost Original Mike Boots',
    budget: 250000,
    closingDate: 'closed',
    phases: [
      {
        name: 'Contact',
        status: 'done',
      },
      { name: 'MQL', status: 'done' },
      { name: 'SQL', status: 'done' },
      {
        name: 'Chance',
        status: 'done',
      },
      {
        name: 'W/L',
        status: 'done',
      },
    ],
  },
];
