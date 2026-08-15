import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, ToggleButton, ToggleButtonGroup, toggleButtonClasses } from '@mui/material';
import SectionHeader from 'components/common/SectionHeader';
import UserByCountryTable from './UserByCountryTable';

const UserByCountry = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const [period, setPeriod] = useState('weekly');

  const handleChange = (event, newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.analytics.user_by_country.users_by_country_bc1b2e6f',
        )}
        subTitle="Detail informations of users"
        actionComponent={
          <ToggleButtonGroup
            color="primary"
            value={period}
            exclusive
            onChange={handleChange}
            aria-label={translateUi(
              'ui.sections.dashboards.analytics.user_by_country.period_170a28a9',
            )}
            sx={{
              [`& .${toggleButtonClasses.root}`]: {
                fontWeight: 600,
                color: 'neutral.dark',
                borderRadius: 2,
                padding: '9px 16px',
              },
            }}
          >
            <ToggleButton value="weekly">
              {translateUi('ui.sections.dashboards.analytics.user_by_country.weekly_158f3da5')}
            </ToggleButton>
            <ToggleButton value="monthly">
              {translateUi('ui.sections.dashboards.analytics.user_by_country.monthly_d31edb7b')}
            </ToggleButton>
            <ToggleButton value="yearly">
              {translateUi('ui.sections.dashboards.analytics.user_by_country.yearly_7622eb5a')}
            </ToggleButton>
          </ToggleButtonGroup>
        }
        sx={{ mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}
      />

      <UserByCountryTable data={data} />
    </Paper>
  );
};

export default UserByCountry;
