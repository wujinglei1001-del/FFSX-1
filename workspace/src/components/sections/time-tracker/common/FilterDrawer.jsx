import { useTranslation } from 'react-i18next';
import { users } from 'data/users';
import FilterDrawerWrapper from './FilterDrawerWrapper';
import FilterFormGroup from './FilterFormGroup';
import FilterSelect from './FilterSelect';

const FilterDrawer = () => {
  const { t: translateUi } = useTranslation();
  return (
    <FilterDrawerWrapper>
      <FilterSelect
        label={translateUi('ui.sections.time_tracker.common.filterdrawer.member_6853c98a')}
        options={[
          { value: 1, label: users[0].name },
          { value: 2, label: users[1].name },
          { value: 3, label: users[2].name },
        ]}
      />

      <FilterSelect
        label={translateUi('ui.sections.time_tracker.common.filterdrawer.team_21888726')}
        options={[
          {
            value: 1,
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.themewagon_42a442ab'),
          },
          {
            value: 2,
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.mailbluster_2b902ce2'),
          },
          {
            value: 3,
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.hyperninja_c8cf169b'),
          },
        ]}
      />

      <FilterSelect
        label={translateUi('ui.sections.time_tracker.common.filterdrawer.client_1bdd79b1')}
        options={[
          {
            value: 1,
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.acme_corp_8c29ce47'),
          },
          {
            value: 2,
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.zenmobile_92e0da7c'),
          },
          {
            value: 3,
            label: translateUi(
              'ui.sections.time_tracker.common.filterdrawer.brightleaf_tech_ada92ef0',
            ),
          },
        ]}
      />

      <FilterSelect
        label={translateUi('ui.sections.time_tracker.common.filterdrawer.project_f6f4da8d')}
        options={[
          {
            value: 1,
            label: translateUi(
              'ui.sections.time_tracker.common.filterdrawer.website_redesign_38287aad',
            ),
          },
          {
            value: 2,
            label: translateUi(
              'ui.sections.time_tracker.common.filterdrawer.content_marketing_a5238b18',
            ),
          },
          {
            value: 3,
            label: translateUi(
              'ui.sections.time_tracker.common.filterdrawer.lead_gen_compaign_9b79c838',
            ),
          },
        ]}
      />

      <FilterFormGroup
        label={translateUi('ui.sections.time_tracker.common.filterdrawer.billable_ff5d36b9')}
        options={[
          {
            value: 'all',
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.all_6a720856'),
          },
          {
            value: 'billable',
            label: translateUi('ui.sections.time_tracker.common.filterdrawer.billable_ff5d36b9'),
          },
          {
            value: 'non-billable',
            label: translateUi(
              'ui.sections.time_tracker.common.filterdrawer.non_billable_82b5ce99',
            ),
          },
        ]}
      />
    </FilterDrawerWrapper>
  );
};

export default FilterDrawer;
