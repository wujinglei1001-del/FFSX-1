import { useTranslation } from 'react-i18next';
import { Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SimpleBar from 'components/base/SimpleBar';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import UserByCohortChart from './UserByCohortChart';

const UserByCohort = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1, display: 'flex', flexDirection: 'column' }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.analytics.user_by_cohort.user_activity_by_cohort_c6ec4248',
        )}
        subTitle="Detail information of the products"
        actionComponent={
          <DashboardSelectMenu
            defaultValue="count"
            options={[
              {
                value: 'count',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_cohort.count_per_user_85fcb73e',
                ),
              },
              {
                value: 'retention',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_cohort.retention_rate_af314591',
                ),
              },
              {
                value: 'sessions',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_cohort.sessions_per_user_99e4ee99',
                ),
              },
            ]}
            sx={{ minWidth: 0 }}
          />
        }
        sx={{ mb: 3, flexWrap: 'wrap' }}
      />

      <SimpleBar sx={{ flex: 1, height: 349 }}>
        <Stack direction="row" sx={{ height: 1, minWidth: 600 }}>
          <Table sx={{ width: 'auto' }}>
            <TableHead>
              <TableRow
                sx={{
                  height: 48,
                  '& th': { bgcolor: 'transparent', fontWeight: 400, color: 'text.secondary' },
                }}
              >
                <TableCell sx={{ width: 140, pl: '0px !important' }}>
                  {translateUi(
                    'ui.sections.dashboards.analytics.user_by_cohort.acquisition_e85b4567',
                  )}
                </TableCell>
                <TableCell sx={{ width: 72 }}>
                  {translateUi('ui.sections.dashboards.analytics.user_by_cohort.users_57f2b181')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.time} sx={{ minHeight: { xl: 78 }, td: { border: 0 } }}>
                  <TableCell sx={{ pl: '0px !important', whiteSpace: 'nowrap' }}>
                    {row.time}
                  </TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Stack direction="row" sx={{ flex: 1 }}>
            <UserByCohortChart data={data} sx={{ width: 1, height: '100% !important' }} />
          </Stack>
        </Stack>
      </SimpleBar>
    </Paper>
  );
};

export default UserByCohort;
