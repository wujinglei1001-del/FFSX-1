import { useTranslation } from 'react-i18next';
import FilterDrawerWrapper from '../common/FilterDrawerWrapper';
import FilterFormGroup from '../common/FilterFormGroup';
import FilterSelect from '../common/FilterSelect';

const TableFilter = () => {
  const { t: translateUi } = useTranslation();
  return (
    <FilterDrawerWrapper>
      <FilterSelect
        label={translateUi('ui.sections.time_tracker.time_sheets.tablefilter.project_f6f4da8d')}
        options={[
          {
            value: 1,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.website_redesign_38287aad',
            ),
          },
          {
            value: 2,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.content_marketing_a5238b18',
            ),
          },
          {
            value: 3,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.lead_gen_compaign_9b79c838',
            ),
          },
        ]}
      />

      <FilterSelect
        label={translateUi('ui.sections.time_tracker.time_sheets.tablefilter.team_21888726')}
        options={[
          {
            value: 1,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.themewagon_42a442ab',
            ),
          },
          {
            value: 2,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.mailbluster_2b902ce2',
            ),
          },
          {
            value: 3,
            label: translateUi(
              'ui.sections.time_tracker.time_sheets.tablefilter.hyperninja_c8cf169b',
            ),
          },
        ]}
      />

      <FilterFormGroup
        label={translateUi('ui.sections.time_tracker.time_sheets.tablefilter.time_type_aff84e63')}
        options={[
          {
            value: 'all',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.all_6a720856'),
          },
          {
            value: 'normal',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.normal_45e118d0'),
          },
          {
            value: 'idle',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.idle_cc1ebdd0'),
          },
          {
            value: 'manual',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.manual_4e836fdc'),
          },
        ]}
      />

      <FilterFormGroup
        label={translateUi('ui.sections.time_tracker.time_sheets.tablefilter.source_6da13add')}
        options={[
          {
            value: 'all',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.all_6a720856'),
          },
          {
            value: 'desktop',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.desktop_532c67fe'),
          },
          {
            value: 'mobile',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.mobile_b1d70245'),
          },
          {
            value: 'browser',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.browser_54a2cf5e'),
          },
        ]}
      />

      <FilterFormGroup
        label={translateUi('ui.sections.time_tracker.time_sheets.tablefilter.activity_81c0d915')}
        options={[
          {
            value: 'all',
            label: translateUi('ui.sections.time_tracker.time_sheets.tablefilter.all_6a720856'),
          },
          { value: '50-100', label: '50-100%' },
          { value: '20-50', label: '20-50%' },
          { value: '0-20', label: '0-20%' },
        ]}
      />
    </FilterDrawerWrapper>
  );
};

export default TableFilter;
